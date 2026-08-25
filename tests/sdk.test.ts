import assert from 'node:assert/strict';
import test from 'node:test';
import {
  Bot,
  createTelegramContext,
  createTelegramWebhookHandler,
  parseTelegramUpdate,
  runTelegramPolling,
  TelegramClient,
  TelegramClientError,
  TELEGRAM_METHODS,
  TELEGRAM_RUNTIME_MANAGED_METHODS,
  TELEGRAM_UPDATE_TYPES,
  type TelegramMethod,
  type TelegramUpdate,
} from '../src/index';

function telegramUser(id = 7) {
  return { id, is_bot: false, first_name: 'Minh', username: 'minh' };
}

function messageUpdate(updateId = 1, text = '/start'): TelegramUpdate {
  return {
    update_id: updateId,
    message: {
      message_id: updateId * 10,
      date: 1_700_000_000,
      chat: { id: -100123, type: 'supergroup', title: 'Test' },
      from: telegramUser(),
      text,
    },
  };
}

function callbackUpdate(inline = false): TelegramUpdate {
  return {
    update_id: 2,
    callback_query: {
      id: 'callback-2',
      chat_instance: 'instance',
      from: telegramUser(),
      data: 'confirm',
      ...(inline
        ? { inline_message_id: 'inline-2' }
        : {
            message: {
              message_id: 20,
              date: 1_700_000_001,
              chat: { id: -100123, type: 'supergroup' },
              text: 'Choose',
            },
          }),
    },
  };
}

function json(result: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify({ ok: true, result }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
    ...init,
  });
}

test('Telegram catalogs match Bot API 10.3 coverage without duplicates', () => {
  assert.equal(TELEGRAM_METHODS.length, 185);
  assert.equal(new Set(TELEGRAM_METHODS).size, 185);
  assert.equal(TELEGRAM_UPDATE_TYPES.length, 27);
  assert.equal(new Set(TELEGRAM_UPDATE_TYPES).size, 27);
  assert.deepEqual(TELEGRAM_RUNTIME_MANAGED_METHODS, ['getUpdates', 'setWebhook', 'deleteWebhook', 'logOut', 'close']);
});

test('Bot registers commands, exact callbacks, catch-all callbacks, and update listeners', async () => {
  const client = new TelegramClient('123:test', { fetch: async () => json(true) });
  const context = createTelegramContext(callbackUpdate(), client);
  assert.ok(context);
  const calls: string[] = [];
  const bot = new Bot()
    .command('/start', () => { calls.push('command'); })
    .callback('confirm', () => { calls.push('exact'); })
    .callback('', () => { calls.push('catch-all'); })
    .on('callback_query', () => { calls.push('listener'); });

  await bot.dispatch('command', 'start', context);
  await bot.dispatch('callback_query', 'confirm', context);
  assert.deepEqual(calls, ['command', 'exact', 'catch-all', 'listener']);
  assert.throws(() => new Bot().command('bad-name', () => undefined), /letters, digits, or underscores/);
});

test('parser normalizes commands, mentions, captions, callbacks, and chatless updates', () => {
  const command = parseTelegramUpdate(messageUpdate(1, '/start@sample_bot now'));
  assert.equal(command?.kind, 'command');
  assert.equal(command?.command, 'start');
  assert.equal(command?.chatId, '-100123');
  assert.equal(command?.user?.id, '7');

  const caption = messageUpdate(2, '');
  caption.message!.caption = '/caption_is_not_a_command';
  assert.equal(parseTelegramUpdate(caption)?.kind, 'message');
  assert.equal(parseTelegramUpdate(caption)?.text, '/caption_is_not_a_command');

  const callback = parseTelegramUpdate(callbackUpdate(true));
  assert.equal(callback?.callbackQueryId, 'callback-2');
  assert.equal(callback?.inlineMessageId, 'inline-2');
  assert.equal(callback?.chatId, undefined);

  const pollAnswer = parseTelegramUpdate({
    update_id: 3,
    poll_answer: { poll_id: 'poll', user: telegramUser(99), option_ids: [0] },
  });
  assert.equal(pollAnswer?.updateType, 'poll_answer');
  assert.equal(pollAnswer?.user?.id, '99');
  assert.equal(pollAnswer?.chatId, undefined);
});

test('parser rejects malformed, ambiguous, and unknown-only updates', () => {
  assert.equal(parseTelegramUpdate({ update_id: -1, message: messageUpdate().message }), null);
  assert.equal(parseTelegramUpdate({
    ...messageUpdate(),
    callback_query: callbackUpdate().callback_query,
  }), null);
  assert.equal(parseTelegramUpdate({ update_id: 4, future_update: {} }), null);
});

test('TelegramClient sends typed JSON and unwraps successful results', async () => {
  const requests: Array<{ url: string; init?: RequestInit }> = [];
  const client = new TelegramClient('123:test', {
    fetch: async (input, init) => {
      requests.push({ url: String(input), init });
      return json({ id: 1, is_bot: true, first_name: 'BMH' });
    },
  });
  const result = await client.call('getMe', {});
  assert.deepEqual(result, { id: 1, is_bot: true, first_name: 'BMH' });
  assert.equal(requests[0].url, 'https://api.telegram.org/bot123:test/getMe');
  assert.equal(requests[0].init?.method, 'POST');
  assert.equal(requests[0].init?.body, '{}');
  assert.equal((requests[0].init?.headers as Record<string, string>)['content-type'], 'application/json');
});

test('TelegramClient rejects unsupported methods and sanitizes transport errors', async () => {
  let requests = 0;
  const client = new TelegramClient('secret-token', {
    fetch: async () => {
      requests += 1;
      throw new Error('request included secret-token');
    },
  });
  await assert.rejects(
    client.call('notAMethod' as TelegramMethod, {}),
    (error: unknown) => error instanceof TelegramClientError && error.status === 0 && /Unsupported/.test(error.message),
  );
  assert.equal(requests, 0);
  await assert.rejects(client.call('getMe', {}), (error: unknown) => {
    assert.ok(error instanceof TelegramClientError);
    assert.doesNotMatch(error.message, /secret-token/);
    return true;
  });
});

test('TelegramClient preserves API retry metadata and rejects invalid JSON', async () => {
  const apiError = new TelegramClient('123:test', {
    fetch: async () => new Response(JSON.stringify({
      ok: false,
      error_code: 429,
      description: 'Too Many Requests',
      parameters: { retry_after: 2, migrate_to_chat_id: -100999 },
    }), { status: 429 }),
  });
  await assert.rejects(apiError.call('sendMessage', { chat_id: 1, text: 'Hi' }), (error: unknown) => {
    assert.ok(error instanceof TelegramClientError);
    assert.equal(error.status, 429);
    assert.equal(error.errorCode, 429);
    assert.equal(error.retryAfter, 2);
    assert.equal(error.migrateToChatId, -100999);
    return true;
  });

  const invalid = new TelegramClient('123:test', {
    fetch: async () => new Response('not-json', { status: 502 }),
  });
  await assert.rejects(invalid.call('getMe', {}), /returned an invalid response/);
});

test('multipart uploads leave boundary headers to Fetch and file URLs encode paths', async () => {
  const requests: RequestInit[] = [];
  const client = new TelegramClient('123:test', {
    fetch: async (input, init = {}) => {
      requests.push(init);
      return String(input).endsWith('/getFile') ? json({ file_path: 'reports/a file.pdf' }) : json(true);
    },
  });
  const form = new FormData();
  form.set('chat_id', '1');
  form.set('document', new Blob(['report']), 'report.txt');
  await client.upload('sendDocument', form);
  assert.equal(requests[0].headers, undefined);
  assert.ok(requests[0].body instanceof FormData);
  assert.equal(
    await client.getFileUrl('file-id'),
    'https://api.telegram.org/file/bot123:test/reports/a%20file.pdf',
  );
});

test('context helpers validate and map message actions to Bot API requests', async () => {
  const bodies: Array<Record<string, unknown>> = [];
  const client = new TelegramClient('123:test', {
    fetch: async (_input, init) => {
      bodies.push(JSON.parse(String(init?.body ?? '{}')));
      return json(true);
    },
  });
  const context = createTelegramContext(messageUpdate(), client, {
    parseMode: 'HTML',
    disableNotification: true,
    protectContent: true,
  });
  assert.ok(context);
  await context.reply('<b>Hello</b>');
  await context.telegram.sendButtons('Choose', [{ text: 'Continue', data: 'continue' }]);
  await context.telegram.sendLocation(10.7769, 106.7009);
  assert.deepEqual(bodies[0], {
    chat_id: '-100123',
    text: '<b>Hello</b>',
    parse_mode: 'HTML',
    disable_notification: true,
    protect_content: true,
  });
  assert.deepEqual(bodies[1].reply_markup, {
    inline_keyboard: [[{ text: 'Continue', callback_data: 'continue' }]],
  });
  assert.equal(bodies[2].latitude, 10.7769);
  assert.throws(
    () => context.telegram.sendButtons('Choose', [{ text: 'Bad', data: 'x'.repeat(65) }]),
    /1-64 bytes/,
  );
  assert.throws(() => context.telegram.sendLocation(100, 0), /latitude/);
});

test('chatless callback context can answer and edit inline messages but cannot reply', async () => {
  const calls: Array<{ method: string; body: Record<string, unknown> }> = [];
  const client = new TelegramClient('123:test', {
    fetch: async (input, init) => {
      calls.push({
        method: String(input).split('/').at(-1)!,
        body: JSON.parse(String(init?.body ?? '{}')),
      });
      return json(true);
    },
  });
  const context = createTelegramContext(callbackUpdate(true), client);
  assert.ok(context);
  await context.telegram.answerCallback('Done');
  await context.telegram.editMessage('Updated');
  assert.deepEqual(calls[0], {
    method: 'answerCallbackQuery',
    body: { callback_query_id: 'callback-2', text: 'Done', show_alert: false },
  });
  assert.deepEqual(calls[1], {
    method: 'editMessageText',
    body: { inline_message_id: 'inline-2', text: 'Updated' },
  });
  assert.throws(() => context.reply('No chat'), /do not provide a chat/);
});

test('webhook validates method, secret, JSON, update IDs, and dispatches safely', async () => {
  const replies: string[] = [];
  const bot = new Bot().command('start', (context) => { replies.push(context.text ?? ''); });
  const client = new TelegramClient('123:test', { fetch: async () => json(true) });
  const handler = createTelegramWebhookHandler(bot, client, { secretToken: 'webhook_secret' });

  assert.equal((await handler(new Request('https://example.com', { method: 'GET' }))).status, 405);
  assert.equal((await handler(new Request('https://example.com', { method: 'POST', body: '{}' }))).status, 401);

  const headers = { 'content-type': 'application/json', 'X-Telegram-Bot-Api-Secret-Token': 'webhook_secret' };
  assert.equal((await handler(new Request('https://example.com', { method: 'POST', headers, body: '{' }))).status, 400);
  assert.equal((await handler(new Request('https://example.com', {
    method: 'POST', headers, body: JSON.stringify({ update_id: -1 }),
  }))).status, 400);
  assert.equal((await handler(new Request('https://example.com', {
    method: 'POST', headers, body: JSON.stringify({ update_id: 99, future_update: {} }),
  }))).status, 200);
  assert.equal((await handler(new Request('https://example.com', {
    method: 'POST', headers, body: JSON.stringify(messageUpdate()),
  }))).status, 200);
  assert.deepEqual(replies, ['/start']);
});

test('polling advances offsets after dispatch, skips duplicates, and aborts cleanly', async () => {
  const controller = new AbortController();
  const offsets: number[] = [];
  let request = 0;
  const client = new TelegramClient('123:test', {
    fetch: async (_input, init) => {
      const body = JSON.parse(String(init?.body ?? '{}'));
      offsets.push(body.offset);
      request += 1;
      if (request === 1) return json([messageUpdate(2, 'first'), messageUpdate(1, 'duplicate')]);
      controller.abort();
      return json([]);
    },
  });
  const messages: string[] = [];
  const bot = new Bot().on('message', (context) => { messages.push(context.text ?? ''); });
  await runTelegramPolling(bot, client, {
    signal: controller.signal,
    allowedUpdates: ['message'],
    timeout: 30,
    limit: 100,
  });
  assert.deepEqual(messages, ['first']);
  assert.deepEqual(offsets, [0, 3]);
});

test('polling validates options before making requests', async () => {
  let requests = 0;
  const client = new TelegramClient('123:test', {
    fetch: async () => { requests += 1; return json([]); },
  });
  await assert.rejects(runTelegramPolling(new Bot(), client, {
    allowedUpdates: ['not_real' as never],
  }), /unsupported Telegram update type/);
  await assert.rejects(runTelegramPolling(new Bot(), client, { offset: 1.2 }), /safe integer/);
  await assert.rejects(runTelegramPolling(new Bot(), client, { timeout: Number.NaN }), /finite number/);
  assert.equal(requests, 0);
});
