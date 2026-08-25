# `@bmhien/bot`

[![CI](https://github.com/bm-hien/bmh-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/bm-hien/bmh-sdk/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@bmhien/bot)](https://www.npmjs.com/package/@bmhien/bot)
[![license](https://img.shields.io/npm/l/@bmhien/bot)](./LICENSE)

Typed Telegram Bot SDK shared by BMH Code, Visual Flow, webhooks, and local
long polling. It targets Node.js 20 or newer and other runtimes that provide
the Web Fetch APIs (`fetch`, `Request`, `Response`, `FormData`, and `Blob`).

## Install

```bash
npm install @bmhien/bot
```

To test the unreleased `main` branch directly, npm can install the public
repository and build it locally:

```bash
npm install github:bm-hien/bmh-sdk
```

## Create a bot

```ts
import { Bot } from '@bmhien/bot';

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

## Reusable flow functions

Move reusable visual-safe steps into project modules with `defineFlowFunction`,
then run them with the same handler context through `ctx.run()`:

```ts
// flows/welcome.ts
import { defineFlowFunction } from '@bmhien/bot';

export const welcome = defineFlowFunction('Welcome sequence', async (ctx) => {
  await ctx.telegram.sendChatAction('typing');
  await ctx.reply('Welcome to BMH');
});
```

```ts
// main.ts
import { Bot } from '@bmhien/bot';
import { welcome } from './flows/welcome';

const bot = new Bot();
bot.command('start', async (ctx) => {
  await ctx.run(welcome);
});

export default bot;
```

BMH discovers named, relative imports of exported flow functions and exposes
them as draggable **Project functions** in Visual Flow. Nested functions are
supported. Recursive imports, unresolved exports, more than 20 nested levels,
and more than 200 compiled steps are rejected. Moving a module in the BMH file
explorer rewrites resolvable relative imports when the project is saved.

Visual-safe functions can capture selected action results and reuse their fields
in later nodes. HTTP captures expose `status`, `ok`, and `body`; Telegram API and
forum-topic captures expose the Bot API result directly:

```ts
export const openSupportTopic = defineFlowFunction('Open support topic', async (ctx) => {
  const topic = await ctx.telegram.createForumTopic('Support');
  await ctx.reply('Created topic {{result.topic.message_thread_id}}');

  const lookup = await ctx.http.request('https://api.example.com/user', { method: 'GET' });
  await ctx.reply('User: {{result.lookup.body.name}}');
});
```

The Canvas **Save result as** field creates the same declaration. Result scopes
are isolated per matching trigger. Names must be safe identifiers up to 32
characters; HTTP bodies are capped at 64 KB and captured templates are bounded
by depth, field count, and value length.

Project barrels are supported too. A function may be imported through an
`index.ts` that uses `export { internalName as publicName } from './module'` or
`export * from './module'`; generated code keeps the public import path and
alias while the compiler safely resolves the implementation. Re-export and
function-call cycles are rejected.

## Run locally with long polling

```ts
import { Bot, TelegramClient, runTelegramPolling } from '@bmhien/bot';

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
} from '@bmhien/bot';

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
polls, buttons, reactions, forwarding, copying, editing, deleting, pinning,
moderation, and chat administration.
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

Inside a handler, dedicated helpers validate common limits before making a
request:

```ts
await ctx.telegram.deleteMessages(['101', '102']);
await ctx.telegram.promoteMember(ctx.userId!, {
  can_manage_chat: true,
  can_delete_messages: true,
});
await ctx.telegram.setAdministratorTitle(ctx.userId!, 'Moderator');
await ctx.telegram.setDefaultPermissions({
  can_send_messages: true,
  can_react_to_messages: true,
});
```

For generated output in a private chat, `sendMessageDraft()` shows an ephemeral
partial response and can expose Telegram's Stop button. Drafts expire after
about 30 seconds, so always send the final message afterward:

```ts
await ctx.telegram.sendMessageDraft(1, 'Thinking…', {
  canStop: true,
  keepOnStop: true,
});
const answer = await createAnswer(ctx.text ?? '');
await ctx.reply(answer);
```

Listen for `stopped_message_generation` to cancel your own generation task when
the user presses Stop; `ctx.draftId` identifies the exact generation to cancel.
Reuse the same non-zero draft ID when updating a preview.

Telegram Business updates also expose `ctx.businessConnectionId`. The checklist
helpers inherit that connection and the current chat/message automatically:

```ts
bot.on('business_message', async (ctx) => {
  const checklistMessage = await ctx.telegram.sendChecklist({
    title: 'Launch tasks',
    tasks: [{ id: 1, text: 'Review' }, { id: 2, text: 'Ship' }],
    othersCanMarkTasksAsDone: true,
  });

  await ctx.telegram.editChecklist({
    title: 'Updated tasks',
    tasks: [{ id: 1, text: 'Shipped' }],
  }, { messageId: checklistMessage.message_id });
});
```

Checklist titles are limited to 1–255 characters. Each checklist contains 1–30
tasks with unique positive IDs and 1–100 characters of task text. Both helpers
return a typed `TelegramMessage`; pass `businessConnectionId` explicitly only
when acting outside the current Business update.

Answerable query updates also have context-aware helpers, so query IDs never
need to be copied out of the raw update:

```ts
bot.on('inline_query', async (ctx) => {
  await ctx.telegram.answerInlineQuery([
    {
      type: 'article',
      id: 'help',
      title: 'Help',
      input_message_content: { message_text: 'How can I help?' },
    },
  ], { cacheTime: 60, isPersonal: true });
});

bot.on('shipping_query', (ctx) => ctx.telegram.answerShippingQuery(true, {
  shippingOptions: [
    { id: 'standard', title: 'Standard', prices: [{ label: 'Delivery', amount: 500 }] },
  ],
}));

bot.on('pre_checkout_query', (ctx) =>
  ctx.telegram.answerPreCheckoutQuery(true));

bot.on('guest_message', (ctx) => ctx.telegram.answerGuestQuery({
  type: 'article',
  id: 'guest-reply',
  title: 'Reply',
  input_message_content: { message_text: 'Welcome' },
}));
```

The helpers enforce Telegram's conditional payload rules and allow only one
successful answer per query context. Visual Flow additionally requires the
matching trigger and detects repeated answers inside imported flow functions.

Payments use a semantic `successful_payment` event in addition to Telegram's
raw `message` update. It works in hosted flows, webhooks, long polling, and
reusable project functions:

```ts
bot.command('buy', (ctx) => ctx.telegram.sendInvoice({
  title: 'Premium access',
  description: 'Unlock premium access',
  payload: `order-${ctx.userId}`,
  currency: 'XTR',
  prices: [{ label: 'Premium access', amount: 100 }],
}));

bot.on('pre_checkout_query', (ctx) =>
  ctx.telegram.answerPreCheckoutQuery(true));

bot.on('successful_payment', async (ctx) => {
  const payment = ctx.successfulPayment!;
  await deliverPurchase(payment.invoice_payload);

  // These arguments are optional in this handler. The SDK uses the actor and
  // Telegram charge ID from the completed payment when they are omitted.
  // await ctx.telegram.refundStarPayment();
  // await ctx.telegram.editStarSubscription(true);
});
```

For Telegram Stars (`XTR`), `sendInvoice()` requires exactly one labeled price,
omits the provider token, and rejects unsupported tips, customer-detail, and
flexible-shipping options. Refund and subscription helpers require a positive
user ID and a non-empty Telegram payment charge ID.

Forum topics have dedicated helpers and Visual Flow nodes as well. Topic
actions default to the thread that produced the current message, or accept an
explicit thread ID:

```ts
await ctx.telegram.createForumTopic('Support', { iconColor: 7322096 });
await ctx.telegram.editForumTopic({ name: 'Help desk' });
await ctx.telegram.closeForumTopic();
await ctx.telegram.reopenForumTopic();
await ctx.telegram.unpinAllForumTopicMessages();
// Destructive: deletes the topic and every message inside it.
await ctx.telegram.deleteForumTopic();
```

Topic names and Telegram's six supported icon colors are validated locally.
Pass `iconCustomEmojiId: null` to `editForumTopic()` to remove a custom icon.
`createForumTopic()` returns a typed `TelegramForumTopic`, including its
`message_thread_id`, name, icon color, optional custom emoji, and implicit-name
flag. Generic `telegram.call<M, T>()` also accepts an explicit result type for
specialist methods.

`leaveChat()` is terminal in Visual Flow: it must be the last action on its
path, and the runtime stops downstream work after the bot leaves.

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
- `ctx.text`, `ctx.messageId`, `ctx.messageThreadId`, and `ctx.callbackData`
  expose common values.
- `ctx.draftId` identifies the stopped generation preview, while
  `ctx.businessConnectionId` identifies the current Telegram Business session.
- `ctx.inlineQueryId`, `ctx.shippingQueryId`, `ctx.preCheckoutQueryId`, and
  `ctx.guestQueryId` identify answerable query lifecycles.
- `ctx.successfulPayment` contains the normalized completed invoice, including
  its payload and durable Telegram payment charge ID.
- `ctx.userId` identifies the actor; it is never assumed to be a destination.
- `ctx.chatId` exists only when Telegram supplies a real chat.
- `ctx.reply()` and `ctx.telegram.*` perform chat-aware actions.
- `ctx.when()` evaluates the same simple text conditions used by Visual Flow.

Some updates, including inline queries and poll answers, may not carry a chat.
Use the matching query helper rather than calling `ctx.reply()`.

`successful_payment` is an SDK semantic event nested inside the raw `message`
update. Register it with `bot.on()`, but keep `message`—not
`successful_payment`—in Telegram `allowedUpdates`.

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
| `defineFlowFunction` | Declare a reusable module function for code and Visual Flow. |
| `TELEGRAM_METHODS` | Readonly catalog of recognized Bot API methods. |
| `TELEGRAM_UPDATE_TYPES` | Readonly catalog of recognized update fields. |
| `TELEGRAM_FORUM_TOPIC_ICON_COLORS` | The six topic icon colors accepted by Telegram. |
| `TELEGRAM_CHAT_PERMISSION_FIELDS` | Supported `ChatPermissions` field names. |
| `TELEGRAM_ADMINISTRATOR_RIGHT_FIELDS` | Supported administrator-right field names. |

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
