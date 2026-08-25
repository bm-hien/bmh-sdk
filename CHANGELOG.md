# Changelog

All notable changes to this project are documented here.

## 0.1.0 - 2026-08-25

- Add the runtime-neutral `Bot` handler registry.
- Add Web Standard Telegram webhook and cancellable polling adapters.
- Add normalized contexts and common Telegram action helpers.
- Add typed JSON calls, multipart uploads, file URLs, and structured API errors.
- Cover Telegram Bot API 10.3 with 185 recognized methods and 27 update types.
- Add the semantic `successful_payment` event plus validated invoice, Stars
  refund, and subscription-renewal helpers shared with Visual Flow modules.
- Add six validated forum-topic helpers with current-thread defaults and
  matching Visual Flow nodes.
- Resolve reusable flow functions through `index.ts` barrels, named re-export
  aliases, and `export *` chains with ambiguity and cycle guards.
- Ship ESM, CommonJS, and TypeScript declarations with no runtime dependencies.
