// Lists Atmo Engine Pro's releases, read live from this site's repository on
// GitHub, so the site never needs updating when a version is published.
// renderReleases(container, { all }) shows the beta (only while it's newer
// than the latest stable) and the latest stable; with `all`, older ones too.
const REPO = "saad-khan-rind/atmo-engine-pro-site";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function link(text, href) {
  const a = el("a", "", text);
  a.href = href;
  return a;
}

function versionOf(release) {
  return (release.name.match(/(\d+)\.(\d+)\.(\d+)/) || []).slice(1).map(Number);
}

function isNewer(a, b) {
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return (a[i] || 0) > (b[i] || 0);
  return false;
}

function releaseCard(release, isLatest) {
  const apk = release.assets.find((a) => a.name === "AtmoEnginePro.apk");
  const name = release.name.replace(/^Atmo Engine Pro /, "").replace(/ \(beta\)$/, "");
  const article = el("article", "card release" + (isLatest ? " latest" : ""));
  const head = el("div", "release-head");
  head.append(el("h3", "", name));
  if (isLatest) head.append(el("span", "badge stable", "Latest stable"));
  else if (release.prerelease) head.append(el("span", "badge beta", "Beta"));
  article.append(head);

  const date = new Date(release.published_at || release.created_at);
  article.append(el("p", "small muted", date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })));

  const notes = (release.body || "").split("\n").map((l) => l.replace(/^•\s*/, "").trim()).filter(Boolean);
  if (notes.length) {
    const ul = el("ul", "notes");
    notes.forEach((n) => ul.append(el("li", "", n)));
    article.append(ul);
  }
  if (apk) {
    const a = el("a", isLatest ? "button" : "button ghost");
    a.href = apk.browser_download_url;
    a.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-download"/></svg>';
    a.append(`Download · ${(apk.size / 1048576).toFixed(1)} MB`);
    a.setAttribute("aria-label", `Download ${name}, ${(apk.size / 1048576).toFixed(1)} MB`);
    article.append(a);
  }
  return article;
}

function renderReleases(container, { all }) {
  const fallback = () => {
    const p = el("p", "muted");
    p.append(
      "Couldn't load the list right now. ",
      link("Download the latest stable version", `https://github.com/${REPO}/releases/latest/download/AtmoEnginePro.apk`),
      " or see every version on ",
      link("GitHub", `https://github.com/${REPO}/releases`),
      "."
    );
    container.replaceChildren(p);
  };
  fetch(`https://api.github.com/repos/${REPO}/releases?per_page=30`, { headers: { Accept: "application/vnd.github+json" } })
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((releases) => {
      const published = releases.filter((r) => !r.draft);
      const stable = published.filter((r) => !r.prerelease)
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
      // The rolling beta is only worth showing while it's ahead of the latest stable.
      const beta = published.filter((r) => r.prerelease && (!stable[0] || isNewer(versionOf(r), versionOf(stable[0]))));
      const shown = [...beta, stable[0], ...(all ? stable.slice(1) : [])].filter(Boolean);
      if (!shown.length) return fallback();
      container.replaceChildren(...shown.map((r) => releaseCard(r, r === stable[0])));
    })
    .catch(fallback);
}
