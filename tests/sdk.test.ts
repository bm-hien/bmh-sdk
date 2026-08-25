import assert from 'node:assert/strict';
import test from 'node:test';
import {
  Bot,
  createTelegramContext,
  createTelegramWebhookHandler,
  defineFlowFunction,
  parseTelegramUpdate,
  runTelegramPolling,
  TelegramClient,
  TelegramClientError,
  TELEGRAM_ADMINISTRATOR_RIGHT_FIELDS,
  TELEGRAM_CHAT_PERMISSION_FIELDS,
  TELEGRAM_EVENT_TYPES,
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

function successfulPaymentUpdate(updateId = 30): TelegramUpdate {
  return {
    update_id: updateId,
    message: {
      message_id: updateId * 10,
      date: 1_700_000_000,
      chat: { id: 7, type: 'private' },
      from: telegramUser(),
      successful_payment: {
        currency: 'XTR',
        total_amount: 100,
        invoice_payload: 'order-7',
        telegram_payment_charge_id: `tg-charge-${updateId}`,
        provider_payment_charge_id: `provider-charge-${updateId}`,
        is_recurring: true,
        subscription_expiration_date: 1_800_000_000,
      },
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
  assert.ok(TELEGRAM_EVENT_TYPES.includes('successful_payment'));
  assert.deepEqual(TELEGRAM_RUNTIME_MANAGED_METHODS, ['getUpdates', 'setWebhook', 'deleteWebhook', 'logOut', 'close']);
  assert.ok(TELEGRAM_CHAT_PERMISSION_FIELDS.includes('can_react_to_messages'));
  assert.ok(TELEGRAM_CHAT_PERMISSION_FIELDS.includes('can_edit_tag'));
  assert.ok(TELEGRAM_ADMINISTRATOR_RIGHT_FIELDS.includes('can_send_welcome_messages'));
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

  const stopped = parseTelegramUpdate({
    update_id: 4,
    stopped_message_generation: { chat: { id: 7, type: 'private' }, message_thread_id: 12, draft_id: -91 },
  });
  assert.equal(stopped?.draftId, '-91');
  assert.equal(stopped?.messageThreadId, '12');
});

test('parser exposes dedicated lifecycle IDs for inline, shipping, pre-checkout, and guest queries', () => {
  const inline = parseTelegramUpdate({ update_id: 10, inline_query: { id: 'inline-10', from: telegramUser(), query: '', offset: '' } });
  const shipping = parseTelegramUpdate({ update_id: 11, shipping_query: { id: 'shipping-11', from: telegramUser(), invoice_payload: 'order', shipping_address: {} } });
  const checkout = parseTelegramUpdate({ update_id: 12, pre_checkout_query: { id: 'checkout-12', from: telegramUser(), currency: 'USD', total_amount: 500, invoice_payload: 'order' } });
  const guest = parseTelegramUpdate({
    update_id: 13,
    guest_message: { message_id: 13, date: 1, chat: { id: -100, type: 'supergroup' }, guest_query_id: 'guest-13', text: 'hello' },
  });
  assert.equal(inline?.inlineQueryId, 'inline-10');
  assert.equal(shipping?.shippingQueryId, 'shipping-11');
  assert.equal(checkout?.preCheckoutQueryId, 'checkout-12');
  assert.equal(guest?.guestQueryId, 'guest-13');
});

test('parser and dispatcher expose successful payments without sending semantic events as allowed_updates', async () => {
  const parsed = parseTelegramUpdate(successfulPaymentUpdate());
  assert.equal(parsed?.kind, 'successful_payment');
  assert.equal(parsed?.updateType, 'message');
  assert.equal(parsed?.successfulPayment?.telegram_payment_charge_id, 'tg-charge-30');

  const calls: string[] = [];
  const bot = new Bot()
    .on('message', () => { calls.push('message'); })
    .on('successful_payment', (context) => {
      calls.push(context.successfulPayment?.invoice_payload ?? 'missing');
    });
  const handler = createTelegramWebhookHandler(bot, new TelegramClient('123:test', { fetch: async () => json(true) }));
  const response = await handler(new Request('https://example.com', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(successfulPaymentUpdate()),
  }));
  assert.equal(response.status, 200);
  assert.deepEqual(calls, ['message', 'order-7']);
  assert.equal(TELEGRAM_UPDATE_TYPES.includes('successful_payment' as never), false);
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

test('local flow functions and moderation helpers share the normalized context', async () => {
  const requests: Array<{ method: string; body: Record<string, unknown> }> = [];
  const client = new TelegramClient('123:test', {
    fetch: async (input, init) => {
      requests.push({ method: String(input).split('/').at(-1)!, body: JSON.parse(String(init?.body ?? '{}')) });
      return json(true);
    },
  });
  const context = createTelegramContext(messageUpdate(), client);
  assert.ok(context);
  const nested = defineFlowFunction('Nested', async (ctx) => { await ctx.telegram.sendSticker('sticker-id', '👋'); });
  const moderation = defineFlowFunction('Moderation', async (ctx) => {
    await ctx.run(nested);
    await ctx.telegram.banMember(ctx.userId!, { revokeMessages: true });
    await ctx.telegram.restrictMember(ctx.userId!, { can_send_messages: false });
    await ctx.telegram.deleteMessages([ctx.messageId!, '11']);
    await ctx.telegram.promoteMember(ctx.userId!, { can_manage_chat: true, can_delete_messages: true });
    await ctx.telegram.setAdministratorTitle(ctx.userId!, 'Moderator');
    await ctx.telegram.setMemberTag(ctx.userId!, 'Member');
    await ctx.telegram.setDefaultPermissions({ can_send_messages: true });
    await ctx.telegram.setChatTitle('Builders');
    await ctx.telegram.unpinAllMessages();
    await ctx.telegram.leaveChat();
  });
  await context.run(moderation);
  assert.deepEqual(requests.map((request) => request.method), [
    'sendSticker', 'banChatMember', 'restrictChatMember', 'deleteMessages', 'promoteChatMember',
    'setChatAdministratorCustomTitle', 'setChatMemberTag', 'setChatPermissions', 'setChatTitle',
    'unpinAllChatMessages', 'leaveChat',
  ]);
  assert.equal(requests[1].body.user_id, 7);
  assert.equal(requests[1].body.revoke_messages, true);
  assert.deepEqual(requests[2].body.permissions, { can_send_messages: false });
  assert.deepEqual(requests[3].body.message_ids, [10, 11]);
  assert.equal(requests[4].body.can_manage_chat, true);
  assert.equal(requests[5].body.custom_title, 'Moderator');
  assert.equal(requests[6].body.tag, 'Member');
  assert.deepEqual(requests[7].body.permissions, { can_send_messages: true });
  await assert.rejects(() => context.run({} as never), /defineFlowFunction/);
  assert.throws(() => context.telegram.banMember('invalid'), /positive safe integer/);
  assert.throws(() => context.telegram.restrictMember('7', {}), /at least one supported boolean field/);
  assert.throws(() => context.telegram.deleteMessages([]), /1-100 message IDs/);
  assert.throws(() => context.telegram.deleteMessages(['10', '10']), /must be unique/);
  assert.throws(() => context.telegram.promoteMember('7', {}), /supported boolean field/);
  assert.throws(() => context.telegram.setAdministratorTitle('7', 'Mod 👋'), /cannot contain emoji/);
});

test('forum-topic helpers default to the current thread and validate Telegram topic rules', async () => {
  const requests: Array<{ method: string; body: Record<string, unknown> }> = [];
  const client = new TelegramClient('123:test', {
    fetch: async (input, init) => {
      const method = String(input).split('/').at(-1)!;
      requests.push({ method, body: JSON.parse(String(init?.body ?? '{}')) });
      return json(method === 'createForumTopic'
        ? { message_thread_id: 91, name: 'Support', icon_color: 7322096 }
        : true);
    },
  });
  const update = messageUpdate(40, 'topic');
  update.message!.message_thread_id = 77;
  const context = createTelegramContext(update, client);
  assert.ok(context);
  assert.equal(context.messageThreadId, '77');
  const topic = await context.telegram.createForumTopic('Support', { iconColor: 7322096 });
  assert.equal(topic.message_thread_id, 91);
  assert.equal(topic.name, 'Support');
  await context.telegram.editForumTopic({ name: 'Help desk', iconCustomEmojiId: null });
  await context.telegram.closeForumTopic();
  await context.telegram.reopenForumTopic('88');
  await context.telegram.deleteForumTopic();
  await context.telegram.unpinAllForumTopicMessages();
  assert.deepEqual(requests.map((request) => request.method), [
    'createForumTopic', 'editForumTopic', 'closeForumTopic', 'reopenForumTopic', 'deleteForumTopic',
    'unpinAllForumTopicMessages',
  ]);
  assert.equal(requests[0].body.chat_id, '-100123');
  assert.equal(requests[0].body.icon_color, 7322096);
  assert.equal(requests[1].body.message_thread_id, 77);
  assert.equal(requests[1].body.icon_custom_emoji_id, '');
  assert.equal(requests[3].body.message_thread_id, 88);
  assert.throws(() => context.telegram.createForumTopic('Bad', { iconColor: 123 as never }), /icon color is not supported/);
  assert.throws(() => context.telegram.editForumTopic({}), /require a name or icon change/);
  const noThread = createTelegramContext(messageUpdate(41, 'no thread'), client)!;
  assert.throws(() => noThread.telegram.closeForumTopic(), /message thread ID/);
});

test('message drafts validate private-chat streaming previews and return typed success', async () => {
  const requests: Array<{ method: string; body: Record<string, unknown> }> = [];
  const client = new TelegramClient('123:test', {
    fetch: async (input, init) => {
      requests.push({ method: String(input).split('/').at(-1)!, body: JSON.parse(String(init?.body ?? '{}')) });
      return json(true);
    },
  });
  const update = messageUpdate(42, 'generate');
  update.message!.chat = { id: 7, type: 'private', first_name: 'Minh' };
  update.message!.message_thread_id = 12;
  const context = createTelegramContext(update, client, { parseMode: 'HTML' })!;
  const sent = await context.telegram.sendMessageDraft(-91, '<b>Working</b>', { canStop: true, keepOnStop: true });
  assert.equal(sent, true);
  assert.deepEqual(requests, [{ method: 'sendMessageDraft', body: {
    chat_id: 7, draft_id: -91, text: '<b>Working</b>', message_thread_id: 12,
    parse_mode: 'HTML', can_stop: true, keep_on_stop: true,
  } }]);
  assert.throws(() => context.telegram.sendMessageDraft(0), /non-zero safe integer/);
  assert.throws(() => context.telegram.sendMessageDraft(1, 'x'.repeat(4097)), /0-4096/);
  assert.throws(() => context.telegram.sendMessageDraft(1, '', { messageThreadId: 0 }), /positive safe integer/);
  assert.throws(() => context.telegram.sendMessageDraft(1, '', { unsupported: true } as never), /Unsupported Telegram message draft option/);
  assert.throws(() => createTelegramContext(messageUpdate(43), client)!.telegram.sendMessageDraft(1), /private chats/);
  const stoppedContext = createTelegramContext({
    update_id: 44,
    stopped_message_generation: { chat: { id: 7, type: 'private' }, draft_id: -91 },
  }, client)!;
  assert.equal(stoppedContext.draftId, '-91');
});

test('Business checklist helpers inherit update context and validate the complete input contract', async () => {
  const requests: Array<{ method: string; body: Record<string, unknown> }> = [];
  const client = new TelegramClient('123:test', {
    fetch: async (input, init) => {
      const method = String(input).split('/').at(-1)!;
      requests.push({ method, body: JSON.parse(String(init?.body ?? '{}')) });
      return json({ message_id: method === 'sendChecklist' ? 501 : 500, date: 1, chat: { id: 7, type: 'private' } });
    },
  });
  const context = createTelegramContext({
    update_id: 45,
    business_message: {
      business_connection_id: 'business-45', message_id: 500, date: 1,
      chat: { id: 7, type: 'private' }, from: telegramUser(), text: 'tasks',
    },
  }, client, { disableNotification: false, protectContent: false })!;
  assert.equal(context.businessConnectionId, 'business-45');

  const sent = await context.telegram.sendChecklist({
    title: 'Launch tasks',
    tasks: [{ id: 1, text: 'Review' }, { id: 2, text: 'Ship', parseMode: 'HTML' }],
    othersCanAddTasks: true, othersCanMarkTasksAsDone: true,
  }, { disableNotification: true, protectContent: true });
  assert.equal(sent.message_id, 501);
  const edited = await context.telegram.editChecklist({
    title: 'Updated tasks', tasks: [{ id: 1, text: 'Shipped' }],
  });
  assert.equal(edited.message_id, 500);
  assert.deepEqual(requests, [
    { method: 'sendChecklist', body: {
      business_connection_id: 'business-45', chat_id: '7',
      checklist: {
        title: 'Launch tasks',
        tasks: [{ id: 1, text: 'Review' }, { id: 2, text: 'Ship', parse_mode: 'HTML' }],
        others_can_add_tasks: true, others_can_mark_tasks_as_done: true,
      },
      disable_notification: true, protect_content: true,
    } },
    { method: 'editMessageChecklist', body: {
      business_connection_id: 'business-45', chat_id: '7', message_id: 500,
      checklist: { title: 'Updated tasks', tasks: [{ id: 1, text: 'Shipped' }] },
    } },
  ]);

  assert.throws(() => context.telegram.sendChecklist({
    title: 'Tasks', tasks: [{ id: 1, text: 'One' }, { id: 1, text: 'Duplicate' }],
  }), /task IDs must be unique/);
  assert.throws(() => context.telegram.sendChecklist({ title: 'Tasks', tasks: [] }), /require 1-30 tasks/);
  assert.throws(() => context.telegram.sendChecklist({ title: 'x'.repeat(256), tasks: [{ id: 1, text: 'One' }] }), /title must be 1-255/);
  assert.throws(() => context.telegram.sendChecklist({ title: 'Tasks', tasks: [{ id: 1, text: 'x'.repeat(101) }] }), /text must be 1-100/);
  assert.throws(() => context.telegram.sendChecklist({ title: 'Tasks', tasks: [{ id: 1, text: 'One' }] }, {
    unsupported: true,
  } as never), /Unsupported Telegram checklist option/);
  assert.throws(() => context.telegram.editChecklist({ title: 'Tasks', tasks: [{ id: 1, text: 'One' }] }, {
    messageId: 0,
  }), /positive message ID/);
  assert.throws(() => createTelegramContext(messageUpdate(46), client)!.telegram.sendChecklist({
    title: 'Tasks', tasks: [{ id: 1, text: 'One' }],
  }), /business connection ID/);
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

test('query helpers build valid payloads, reject invalid combinations, and answer once per context', async () => {
  const calls: Array<{ method: string; body: Record<string, unknown> }> = [];
  const client = new TelegramClient('123:test', {
    fetch: async (input, init) => {
      calls.push({ method: String(input).split('/').at(-1)!, body: JSON.parse(String(init?.body ?? '{}')) });
      return json(true);
    },
  });
  const inline = createTelegramContext({ update_id: 20, inline_query: { id: 'inline-20', from: telegramUser(), query: '', offset: '' } }, client);
  const shipping = createTelegramContext({ update_id: 21, shipping_query: { id: 'shipping-21', from: telegramUser(), invoice_payload: 'order', shipping_address: {} } }, client);
  const checkout = createTelegramContext({ update_id: 22, pre_checkout_query: { id: 'checkout-22', from: telegramUser(), currency: 'USD', total_amount: 500, invoice_payload: 'order' } }, client);
  const guest = createTelegramContext({
    update_id: 23,
    guest_message: { message_id: 23, date: 1, chat: { id: -100, type: 'supergroup' }, guest_query_id: 'guest-23', text: 'hello' },
  }, client);
  assert.ok(inline && shipping && checkout && guest);

  await inline.telegram.answerInlineQuery([{ type: 'article', id: 'one', title: 'One' }], {
    cacheTime: 60, isPersonal: true, nextOffset: 'next',
  });
  await shipping.telegram.answerShippingQuery(true, {
    shippingOptions: [{ id: 'standard', title: 'Standard', prices: [{ label: 'Delivery', amount: 500 }] }],
  });
  await checkout.telegram.answerPreCheckoutQuery(false, 'Sold out');
  await guest.telegram.answerGuestQuery({ type: 'article', id: 'guest-one', title: 'Reply' });

  assert.deepEqual(calls.map((call) => call.method), [
    'answerInlineQuery', 'answerShippingQuery', 'answerPreCheckoutQuery', 'answerGuestQuery',
  ]);
  assert.equal(calls[0].body.inline_query_id, 'inline-20');
  assert.equal(calls[0].body.cache_time, 60);
  assert.equal(calls[1].body.shipping_query_id, 'shipping-21');
  assert.equal(calls[2].body.error_message, 'Sold out');
  assert.equal(calls[3].body.guest_query_id, 'guest-23');

  await assert.rejects(() => inline.telegram.answerInlineQuery([]), /already been answered/);
  assert.throws(() => createTelegramContext(messageUpdate(), client)!.telegram.answerInlineQuery([]), /matching Telegram query handler/);
  assert.throws(() => createTelegramContext({ update_id: 24, shipping_query: { id: 'shipping-24' } }, client)!.telegram.answerShippingQuery(true), /requires at least one shipping option/);
  assert.throws(() => createTelegramContext({ update_id: 25, pre_checkout_query: { id: 'checkout-25' } }, client)!.telegram.answerPreCheckoutQuery(false), /requires an error message/);
  assert.throws(() => createTelegramContext({ update_id: 26, guest_message: { message_id: 26, date: 1, chat: { id: 1, type: 'private' }, guest_query_id: 'guest-26' } }, client)!.telegram.answerGuestQuery({ type: '', id: 'x' }), /type is required/);
});

test('invoice, Stars refund, and subscription helpers validate and use completed-payment defaults', async () => {
  const calls: Array<{ method: string; body: Record<string, unknown> }> = [];
  const client = new TelegramClient('123:test', {
    fetch: async (input, init) => {
      calls.push({ method: String(input).split('/').at(-1)!, body: JSON.parse(String(init?.body ?? '{}')) });
      return json(true);
    },
  });
  const context = createTelegramContext(successfulPaymentUpdate(31), client, { protectContent: true });
  assert.ok(context);
  assert.equal(context.successfulPayment?.telegram_payment_charge_id, 'tg-charge-31');
  await context.telegram.sendInvoice({
    title: 'Premium', description: 'Premium access', payload: 'renew-7', currency: 'XTR',
    prices: [{ label: 'Premium', amount: 100 }],
  });
  await context.telegram.refundStarPayment();
  await context.telegram.editStarSubscription(true);

  assert.deepEqual(calls.map((call) => call.method), ['sendInvoice', 'refundStarPayment', 'editUserStarSubscription']);
  assert.deepEqual(calls[0].body.prices, [{ label: 'Premium', amount: 100 }]);
  assert.equal(calls[0].body.provider_token, undefined);
  assert.equal(calls[0].body.protect_content, true);
  assert.equal(calls[1].body.user_id, 7);
  assert.equal(calls[1].body.telegram_payment_charge_id, 'tg-charge-31');
  assert.equal(calls[2].body.is_canceled, true);

  assert.throws(() => context.telegram.sendInvoice({
    title: 'Broken', description: 'Two Star components', payload: 'broken', currency: 'XTR',
    prices: [{ label: 'One', amount: 10 }, { label: 'Two', amount: 20 }],
  }), /exactly one labeled price/);
  assert.throws(() => context.telegram.sendInvoice({
    title: 'Broken', description: 'Tips for Stars', payload: 'broken', currency: 'XTR',
    prices: [{ label: 'One', amount: 10 }], maxTipAmount: 5,
  }), /do not support tips/);
  assert.throws(() => createTelegramContext(messageUpdate(), client)!.telegram.refundStarPayment(), /payment charge ID/);
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
