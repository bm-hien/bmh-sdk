# Contributing

Thank you for helping improve `@bmh/bot`.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Local checks

```bash
npm ci
npm run check
```

Add or update tests for behavior changes. Keep the public API runtime-neutral:
the SDK may use Web Fetch APIs, but must not import private BMH application code
or depend on a particular hosting provider.

When Telegram changes the Bot API, update the method and update-type catalogs,
their related types, the documented API version, and coverage tests together.

## Pull requests

Use a focused branch and explain the user-visible behavior. Do not commit bot
tokens, webhook secrets, `.env` files, generated `dist/` output, or package
tarballs. CI must pass before merging.
