# Releasing `@bmh/bot`

Releases are published from GitHub Actions with npm trusted publishing.

## One-time npm setup

1. Create or select the public npm package named `@bmh/bot` under the `@bmh`
   scope.
2. In the package's npm settings, add a trusted publisher for the GitHub
   repository `bm-hien/bmh-sdk` and workflow `.github/workflows/publish.yml`.
3. Require two-factor authentication for maintainers and automation changes.

The first package publication may require an npm account with permission to the
`@bmh` scope. Later releases use GitHub's short-lived OIDC identity and do not
store a long-lived npm token in repository secrets.

## Publish a version

1. Update `version` in `package.json` and `package-lock.json`.
2. Update the Bot API version and tests if Telegram's API surface changed.
3. Run `npm run check` and `npm audit`.
4. Merge the release commit into `main`.
5. Create a GitHub release whose tag exactly matches `v<package version>`, for
   example `v0.1.0`.

The release workflow verifies the tag, repeats all package checks, and runs
`npm publish --access public` with provenance.

After publication, verify both registry metadata and a clean installation:

```bash
npm view @bmh/bot version dist.integrity
npm install @bmh/bot
```
