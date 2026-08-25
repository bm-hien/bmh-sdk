# `@bmh/bot`

[![CI](https://github.com/bm-hien/bmh-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/bm-hien/bmh-sdk/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@bmh/bot)](https://www.npmjs.com/package/@bmh/bot)
[![license](https://img.shields.io/npm/l/@bmh/bot)](./LICENSE)

Typed Telegram Bot SDK shared by BMH Code, Visual Flow, webhooks, and local
long polling. It targets Node.js 20 or newer and other runtimes that provide
the Web Fetch APIs (`fetch`, `Request`, `Response`, `FormData`, and `Blob`).

## Install

```bash
npm install @bmh/bot
```

## Create a bot

```ts
import { Bot } from '@bmh/bot';

const bot = new Bot();

bot.command('start', async (ctx) => {
  await ctx.reply('Welcome to BMH');
  await ctx.telegram.sendButtons('Choose an action', [
    { text: 'Continue', data: 'continue' },
  ]);
});

bot.callback('continue', async (ctx) => {
  await ctx.telegram.answerCallback('Ready');
  await ctx.telegram.editMessage('Let us begin.');
});

bot.on('message', async (ctx) => {
  if (ctx.when('message.text contains "help"')) {
    await ctx.reply('How can I help?');
  }
});

export default bot;
```

The same `Bot` definition can be edited in BMH Code or imported into a local
application. Delivery is selected separately, so handlers do not change when
you switch between hosted webhooks and local polling.

## Run locally with long polling

```ts
import { Bot, TelegramClient, runTelegramPolling } from '@bmh/bot';

const bot = new Bot();
const telegram = new TelegramClient(process.env.TELEGRAM_BOT_TOKEN!);
const controller = new AbortController();

bot.command('start', (ctx) => ctx.reply('Running locally'));

process.once('SIGINT', () => controller.abort());
process.once('SIGTERM', () => controller.abort());

await runTelegramPolling(bot, telegram, {
  signal: controller.signal,
  timeout: 30,
  allowedUpdates: ['message', 'callback_query'],
  onError: (error) => console.error(error),
});
```

Polling is cancellable, skips duplicate updates, advances its offset only after
dispatch succeeds, and honors Telegram's `retry_after` response metadata.

Do not run polling and a webhook for the same bot token at the same time.

## Receive webhooks

```ts
import {
  Bot,
  TelegramClient,
  createTelegramWebhookHandler,
} from '@bmh/bot';

const bot = new Bot();
const telegram = new TelegramClient(process.env.TELEGRAM_BOT_TOKEN!);

bot.on('message', (ctx) => ctx.reply(`Received: ${ctx.text ?? ''}`));

export const handleTelegram = createTelegramWebhookHandler(bot, telegram, {
  secretToken: process.env.TELEGRAM_WEBHOOK_SECRET,
  parseMode: 'HTML',
  protectContent: true,
});
```

Pass a Web Standard `Request` to `handleTelegram`; it returns a Web Standard
`Response`. Configure Telegram with the same webhook secret so requests include
the `X-Telegram-Bot-Api-Secret-Token` header.

## Call the Telegram Bot API

Convenience helpers cover common actions such as messages, media, locations,
polls, buttons, reactions, forwarding, copying, editing, deleting, and pinning.
Use the typed `call()` escape hatch for specialist methods:

```ts
const me = await telegram.call<'getMe', { id: number; username?: string }>(
  'getMe',
  {},
);

await telegram.call('banChatMember', {
  chat_id: -1001234567890,
  user_id: 123456789,
  revoke_messages: true,
});
```

The SDK recognizes all 185 Telegram Bot API 10.3 method names and all 27
update types. Common methods have dedicated parameter types; other methods
accept `Record<string, unknown>` so new and specialized Telegram features do
not require a package release before they can be used.

For multipart uploads, pass `FormData` and let the Fetch implementation create
the multipart boundary:

```ts
const form = new FormData();
form.set('chat_id', '123456789');
form.set('document', new Blob([bytes]), 'report.pdf');
await telegram.upload('sendDocument', form);
```

Use `await telegram.getFileUrl(fileId)` to resolve an API file ID to a download
URL.

## Handler context

Every handler receives a normalized `BotContext`:

- `ctx.update` and `ctx.updateType` retain the typed raw update and its type.
- `ctx.text`, `ctx.messageId`, and `ctx.callbackData` expose common values.
- `ctx.userId` identifies the actor; it is never assumed to be a destination.
- `ctx.chatId` exists only when Telegram supplies a real chat.
- `ctx.reply()` and `ctx.telegram.*` perform chat-aware actions.
- `ctx.when()` evaluates the same simple text conditions used by Visual Flow.

Some updates, including inline queries and poll answers, may not carry a chat.
Use their dedicated Bot API answer method rather than calling `ctx.reply()`.

## Public API

| Export | Purpose |
| --- | --- |
| `Bot` | Register commands, callbacks, and update listeners. |
| `TelegramClient` | Send JSON and multipart Bot API requests. |
| `TelegramClientError` | Read `errorCode`, `retryAfter`, and `migrateToChatId`. |
| `createTelegramWebhookHandler` | Create a Web Standard webhook handler. |
| `runTelegramPolling` | Run cancellable local long polling. |
| `dispatchTelegramUpdate` | Dispatch one raw update through a bot. |
| `parseTelegramUpdate` | Normalize one raw update without network access. |
| `createTelegramContext` | Build the context used by handlers. |
| `TELEGRAM_METHODS` | Readonly catalog of recognized Bot API methods. |
| `TELEGRAM_UPDATE_TYPES` | Readonly catalog of recognized update fields. |

ES modules, CommonJS, and TypeScript declarations are included in the npm
package. The package has no runtime dependencies.

## Security

Keep bot tokens and webhook secrets in environment variables. The client does
not include the token in its transport error messages. Validate user-controlled
URLs and payloads before forwarding them to Telegram or another service.

See [SECURITY.md](./SECURITY.md) for private vulnerability reporting.

## Documentation and development

- BMH documentation: <https://bm-hien.github.io/bmh-docs/#/telegram/overview>
- Telegram Bot API: <https://core.telegram.org/bots/api>
- Contributing: [CONTRIBUTING.md](./CONTRIBUTING.md)
- Release process: [RELEASING.md](./RELEASING.md)

```bash
npm ci
npm run check
```

`npm run check` typechecks, runs the behavioral tests, builds both module
formats, packs the exact npm artifact, installs it into a temporary project,
and verifies both ESM and CommonJS imports.

## License

[MIT](./LICENSE)
