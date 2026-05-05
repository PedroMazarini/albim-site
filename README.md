# Albim Deeplink Site

This folder contains the Albim deeplink site for `albim.mazarini.app` and a minimal root page for `mazarini.app`.

## Expected structure in production

- `index.html` for `mazarini.app`
- `trade/index.html`
- `styles.css`
- `app.js`
- `.well-known/apple-app-site-association`
- `.well-known/assetlinks.json`
- `assets/albimlogo.webp`
- `assets/album_onboarding.webp`
- `assets/appstore.svg`
- `assets/googleplay.svg`

## Still required before going live

1. Copy the logo, onboarding image, and store badge SVGs into `assets/`.
   - Suggested sources:
   - `composeApp/src/commonMain/composeResources/drawable/albimlogo.webp`
   - `composeApp/src/commonMain/composeResources/drawable/album_onboarding.webp`
   - `assets/appstore.svg`
   - `assets/googleplay.svg`
2. Replace the iOS placeholder URL in `app.js`.
3. Replace `TEAM_ID.app.mazarini.albim` in `.well-known/apple-app-site-association`.
4. Replace `RELEASE_SHA256_FINGERPRINT` in `.well-known/assetlinks.json`.
5. Serve the `.well-known` files with:
   - `Content-Type: application/json` for `assetlinks.json`
   - `Content-Type: application/json` or no forced extension mapping for `apple-app-site-association`
6. Use `index.html` as the root page for `mazarini.app`.
7. Use `trade/index.html` plus the shared `styles.css`, `app.js`, `.well-known`, and `assets/` files for `albim.mazarini.app`.

## Where to get the remaining values

### Apple `TEAM_ID`

- Apple Developer account
- Xcode project signing settings
- App Store Connect identifiers page

The final value must look like:

`ABCDE12345.app.mazarini.albim`

### Android `sha256_cert_fingerprints`

Use the SHA-256 fingerprint from the certificate that signs the production app:

- Google Play Console > App integrity > App signing key certificate
- Or your release keystore if you are not using Play App Signing

Example command:

```bash
keytool -list -v -keystore your-release-key.jks -alias your-alias
```

## URL contract used by the app

The app generates links like:

`https://albim.mazarini.app/trade/?album=...&user=...&owned=...&total=...&duplicates=...`

The only required parameter is `album`.
