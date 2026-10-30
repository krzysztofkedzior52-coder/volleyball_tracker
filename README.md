# Volleyball Stat Tracker

A phone-first web app for tracking volleyball stats courtside: password-protected, shared live between
coaches, with lineups, rotation, libero, subs, tournaments / scrimmages / practices, and per-player stats.

It is plain HTML/JS — no build step. Host it anywhere static; GitHub Pages is free.

## Step 1 — Put it on GitHub Pages (5 minutes, free)

1. On github.com create a new repository (e.g. `volleyball-stats`). Public is fine (see "Security" below).
2. Upload **all** the files from this folder to the repository root: `index.html`, `config.js`, `sw.js`,
   `manifest.webmanifest`, `icon.svg`, `firestore.rules`, `README.md`, `.nojekyll`.
   (Web UI: **Add file → Upload files**, drag everything in, **Commit changes**.)
3. Go to **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**,
   branch **main**, folder **/ (root)**, then **Save**.
4. After a minute your site is live at `https://<your-username>.github.io/<repo-name>/`.

Open it on your phone. With nothing else set up it runs in **single-device mode**: you create a team
password and the stats are stored (encrypted) in that browser only. Great for one stat-taker on one
phone; not shared.

**Tip:** on the phone, use *Add to Home Screen* (Share menu in Safari, ⋮ menu in Chrome). After the first
online load the app also opens with no signal.

## Step 2 — Share live stats between coaches/devices (optional, free)

GitHub Pages is static hosting, so shared data needs a small database. Firebase's free plan is plenty.

1. Go to <https://console.firebase.google.com> → **Add project** (turn Analytics off).
2. In the project: **Build → Firestore Database → Create database** → choose a location near you →
   start in **production mode**.
3. **Firestore → Rules** tab → replace everything with the contents of `firestore.rules` → **Publish**.
4. **Project settings (gear) → General → Your apps → Web (`</>`)** → register an app (no hosting) →
   copy the `firebaseConfig` values.
5. Edit `config.js` in your GitHub repo (pencil icon) and paste them in:

   ```js
   window.VBS_CONFIG = {
     firebase: {
       apiKey: "AIza...",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project",
       appId: "1:1234567890:web:abcdef"
     }
   };
   ```
   Commit. Wait a minute for Pages to redeploy.
6. Open your site → **Create a new team** → choose the team password. Then **Settings → Show team link**
   and send that link to your coaches. They open it, enter the team password, and see (and can record)
   the same live data.

## How access works (read this)

* Your team link looks like `https://…/#t=<long random code>`. The code selects your team's data in the
  database; without it nobody can find your data.
* Every record is encrypted in the browser with a key that is unlocked by the **team password**.
  The database (and Google) only ever holds ciphertext.
* **Anyone who has the team link can also overwrite or delete the data** (they just can't read it
  without the password). Keep the link among your coaches, and **export a backup occasionally**
  (Settings → *Export a backup*). A backup is not encrypted — store it privately.
* The password cannot be recovered. If it is lost, the team data is unreadable; use *Forgot password →
  wipe & start over* and restore from a backup.
* The repository can be public: the Firebase config values are not secrets.

## Costs and limits

* Firebase free (Spark) plan: ~20,000 writes and 50,000 reads per day. Recording one game uses roughly
  a few hundred to ~1,000 writes, so several games per day is fine.
* Single-device mode uses the browser's local storage (~5 MB): plenty for a season, but export a backup
  now and then. Clearing browser data erases it.

## Updating the app

Replace `index.html` (and `sw.js` if it changed) in the repo. Open devices pick up the new version on
their next online load. To force every device to refresh cached files, change `V` at the top of `sw.js`.

## Testing with made-up data

*Settings → Testing: add 20 demo games* fills the app with simulated games from your roster so you can
check the stats. *Testing: remove demo games* removes exactly those.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole app |
| `config.js` | Optional Firebase settings for shared data |
| `sw.js`, `manifest.webmanifest`, `icon.svg` | Offline + install-to-home-screen |
| `firestore.rules` | Security rules to publish in Firebase |
