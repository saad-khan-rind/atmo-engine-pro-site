# Atmo Engine Pro website

**Live site:** https://saad-khan-rind.github.io/atmo-engine-pro-site/
(the app's "Get a licence key" button links here)

The public website for Atmo Engine Pro: product page, pricing, and the privacy,
terms and refund policies. Served with GitHub Pages from
the `main` branch.

The app and licence keys are delivered by Gumroad, not from this repository.

## How it's wired

- **Buy:** both Buy links go to the Gumroad product,
  https://khansaad5.gumroad.com/l/atmo-engine-pro (US$2.99). Gumroad takes the
  payment, emails the licence key and delivers the APK.
- **Activate:** the app checks keys with the licence service (a Cloudflare
  Worker, in the private Pro repository), which asks Gumroad and allows each
  key on 3 phones.
- **Publish:** GitHub Pages serves the `main` branch, root folder. Pushing to
  `main` updates the site.
- **Downloads and updates:** this repository's Releases hold the app. The
  private Pro repository's release workflow publishes each stable version as
  its own release (marked Latest) and keeps the newest beta in the `beta`
  pre-release. The site, the Gumroad product and the app's update check all
  use `releases/latest/download/AtmoEnginePro.apk` and its `version.json`, so
  don't rename or delete those files by hand.
