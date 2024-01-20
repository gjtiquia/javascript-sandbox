# Test Auth - Mobile

setup with `npx`

## Monorepo setup notes

Metro in Expo does not come with monorepo support by default. Need to configure first.

Reference: <https://docs.expo.dev/guides/monorepos/>

- copy and pasted [metro.config.js](https://docs.expo.dev/guides/monorepos/#modify-the-metro-config)
- did NOT change `package.json`'s `main` property to `index.js` (Meaning also did not create `index.js`)
  - because using Expo Router. The `index.js` in the docs seems to be for non Expo Router projects.
- created `.env` and added `EXPO_USE_METRO_WORKSPACE_ROOT=1` (See `.env.example`)

## EAS Build setup notes

Remember to run the commands in the root of the app directory, not the root of the monorepo.

Reference: <https://docs.expo.dev/build/setup/>

- installed CLI
- logged into Expo account
- configure
  - (ignored .env config)
  - (for monorepo setup, did not add `postinstall` script)
  - changed `app.json` `name` and `slug` properties
  - ran `eas build:configure`

- build
  - set parent `package.json` as `private` because EAS build uses Yarn workspaces and requires to be private.
    - unsure how to force use npm workspaces, as they only provide first-class support for Yarn workspaces
    - <https://docs.expo.dev/build-reference/limitations/#yarn-workspaces-is-recommended-for-monorepos-official-guidance-for-others-is-limited>
  - ran `eas build`
    - `eas build` builds production as default (ie. AAB build for android, not APK)
    - `eas build --profile development` to use the development build profile specified in `eas.json`
      - `"distribution": "internal"` means it will use APK for android.
      - `"developmentClient": true` means it will use `expo-dev-client` to make a [development build](https://docs.expo.dev/develop/development-builds/introduction/)
        - may prompt to download `expo-dev-client` and will run `npm install` automatically
  - followed prompts and setup for android
  - did not do iOS because requires developer account
  - (note: it did not use "env" configuration, need to wait for build to see if Expo Router works)
