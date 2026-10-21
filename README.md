# Atmo Engine Pro website

**Live site:** https://saad-khan-rind.github.io/atmo-engine-pro-site/
(the app's "Get a licence key" button links here)

The public website for Atmo Engine Pro: product page (the lock screen clock,
Now Playing and Pro's other features), pricing, and the privacy, terms and
refund policies. This repository's Releases also hold the app itself.

## How it's wired

- **Buy:** both Buy links go to the Gumroad product,
  https://khansaad5.gumroad.com/l/atmo-engine-pro (US$2.99). Gumroad takes the
  payment and gives the buyer their licence key and a link to the app here.
- **Community:** the Pro Telegram group, https://t.me/atmoenginepro, is linked
  from the site's Community section and every page's footer.
- **Activate:** the app checks keys with the licence service (a Cloudflare
  Worker, in the private Pro repository), which asks Gumroad and allows each
  key on 3 phones.
- **Publish:** `.github/workflows/static.yml` deploys the site to GitHub Pages
  on every push to `main`, exactly as the files are (`.nojekyll`, no build).
- **Releases:** `releases.js` reads this repository's releases live from
  GitHub's API. The main page's Releases section shows the beta (while it's
  newer than stable) and the latest stable; `releases.html` lists every
  version. Neither needs updating by hand.
- **Phones:** below 900px wide, the header links give way to a bottom pill
  navigation (Home, Features, Releases, FAQ, Community) that marks the
  section being read.
- **Downloads and updates:** the private Pro repository's release workflow
  publishes every stable version as its own release, marked Latest, and keeps
  the newest beta in the `beta` pre-release. Each holds `AtmoEnginePro.apk`
  and a `version.json` with the version and release notes.
  - The site and the Gumroad product link to
    `releases/latest/download/AtmoEnginePro.apk`.
  - The app checks `releases/latest/download/version.json`, and
    `releases/download/beta/version.json` for users who turned on beta updates.

  So don't rename, delete or edit those releases and files by hand.

## Atmo Engine

Atmo Engine Pro is the full version of
[Atmo Engine](https://github.com/saad-khan-rind/NOSAtmosphereEffect), the free
and open-source live wallpaper app, also on
[Google Play](https://play.google.com/store/apps/details?id=com.saad_khan_rind.atmosphere_effect)
and [F-Droid](https://f-droid.org/packages/com.saad_khan_rind.atmosphere_effect/).

## Community

- **Atmo Engine Pro:** [Telegram group](https://t.me/atmoenginepro)
- **Atmo Engine:** [Telegram group](https://t.me/atmosphereEffect)

## Author

**Saad Ullah Khan**
📍 Passau, Germany
📧 [khansaad45678900@gmail.com](mailto:khansaad45678900@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/saadullahkhan456)
💻 [GitHub](https://github.com/saad-khan-rind)
📄 [Download Resume](https://drive.google.com/uc?export=download&id=1tGnnqq0MRVyqwtv5bXd9xt2qbgw91nZe)
🌐 [Portfolio](https://portfolio-frontend-lovat-nine.vercel.app)
