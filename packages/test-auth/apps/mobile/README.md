# Test Auth - Mobile

setup with `npx`

## Monorepo setup notes

Metro in Expo does not come with monorepo support by default. Need to configure first.

Reference: <https://docs.expo.dev/guides/monorepos/>

- copy and pasted [metro.config.js](https://docs.expo.dev/guides/monorepos/#modify-the-metro-config)
- did NOT change `package.json`'s `main` property to `index.js` (Meaning also did not create `index.js`)
  - because using Expo Router. The `index.js` in the docs seems to be for non Expo Router projects.
- created `.env` and added `EXPO_USE_METRO_WORKSPACE_ROOT=1` (See `.env.example`)
