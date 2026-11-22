type PageId = "home" | "products" | "news" | "community" | "members" | "contact";

type NavItem = { id: PageId; href: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { id: "products", href: "/products/", label: "プロダクト" },
  { id: "news", href: "/news/", label: "ニュース" },
  { id: "community", href: "/#community", label: "コミュニティ" },
  { id: "members", href: "/#members", label: "メンバー" },
  { id: "contact", href: "/#contact", label: "お問い合わせ" },
];

const PRODUCT_LINKS: { href: string; label: string }[] = [
  { href: "/products/iryx.html", label: "Iryx" },
  { href: "/products/eiviz.html", label: "eiviz" },
  { href: "/products/streamdeck.html", label: "Stream Deck プラグイン" },
  { href: "/products/omt-tools.html", label: "OMT Community Tools" },
  { href: "/products/vmix-utility.html", label: "vmix-utility" },
  { href: "/products/srt-uri-generator.html", label: "SRT URI Generator" },
  { href: "/products/stagetimer.html", label: "ステージタイマー" },
];

const SITE_LINKS: { href: string; label: string }[] = [
  { href: "/news/", label: "ニュース" },
  { href: "/#community", label: "利用いただいているコミュニティ" },
  { href: "/#technology", label: "技術スタック" },
  { href: "/#members", label: "メンバー" },
  { href: "/#support", label: "ご支援" },
  { href: "/#contact", label: "お問い合わせ" },
];

const RESOURCE_LINKS: { href: string; label: string; external?: boolean }[] = [
  { href: "https://github.com/MikanseiLaboratory", label: "GitHub Organization", external: true },
  { href: "https://x.com/MikanseiDev", label: "X（@MikanseiDev）", external: true },
  { href: "https://discord.gg/YUbmg9Hq37", label: "Discord コミュニティ", external: true },
  { href: "https://github.com/MikanseiLaboratory/manuals", label: "マニュアル", external: true },
  { href: "https://subs.twitch.tv/flowingspdg", label: "Twitch で支援", external: true },
];

const SITE_GITHUB_HREF = "https://github.com/MikanseiLaboratory";
const SITE_X_HREF = "https://x.com/MikanseiDev";
const DISCORD_INVITE_HREF = "https://discord.gg/YUbmg9Hq37";

const ICON_GITHUB = `<svg class="h-[1.15rem] w-[1.15rem] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
</svg>`;

const ICON_X = `<svg class="h-[1.15rem] w-[1.15rem] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.72-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
</svg>`;

const ICON_DISCORD = `<svg class="h-[1.15rem] w-[1.15rem] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
</svg>`;

const ICON_CLASS =
  "inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white";

function socialIconNav(ariaLabel: string): string {
  return `
    <nav class="flex items-center gap-0.5" aria-label="${ariaLabel}">
      <a href="${SITE_GITHUB_HREF}" class="${ICON_CLASS}" target="_blank" rel="noopener noreferrer" aria-label="GitHub（新しいタブで開く）">
        ${ICON_GITHUB}
      </a>
      <a href="${SITE_X_HREF}" class="${ICON_CLASS}" target="_blank" rel="noopener noreferrer" aria-label="X（新しいタブで開く）">
        ${ICON_X}
      </a>
      <a href="${DISCORD_INVITE_HREF}" class="${ICON_CLASS}" target="_blank" rel="noopener noreferrer" aria-label="Discord（新しいタブで開く）">
        ${ICON_DISCORD}
      </a>
    </nav>
  `;
}

function isCurrent(current: PageId, id: PageId): boolean {
  return current === id;
}

function desktopNav(current: PageId): string {
  return NAV_ITEMS.map(
    (item) =>
      `<a href="${item.href}" class="nav-link"${isCurrent(current, item.id) ? ' aria-current="page"' : ""}>${item.label}</a>`,
  ).join("");
}

function mobileNav(current: PageId): string {
  return NAV_ITEMS.map(
    (item) =>
      `<a href="${item.href}" class="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-zinc-200 transition-colors hover:bg-white/[0.06] hover:text-white"${
        isCurrent(current, item.id) ? ' aria-current="page"' : ""
      }>
        <span>${item.label}</span>
        <svg class="h-4 w-4 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>`,
  ).join("");
}

class SocialLinks extends HTMLElement {
  connectedCallback(): void {
    const variant = this.getAttribute("data-variant") ?? "page";
    const ariaLabel =
      this.getAttribute("aria-label") ??
      (variant === "footer" ? "外部リンク" : "公式の GitHub、X、Discord");
    const linkClass =
      variant === "footer"
        ? "inline-flex items-center gap-2 rounded text-sm font-medium text-zinc-400 transition-colors hover:text-cyan-300"
        : "inline-flex items-center gap-2 rounded text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300";
    this.innerHTML = `
      <nav class="flex flex-wrap gap-x-6 gap-y-2" aria-label="${ariaLabel}">
        <a href="${SITE_GITHUB_HREF}" class="${linkClass}" target="_blank" rel="noopener noreferrer">
          ${ICON_GITHUB}
          <span>GitHub</span>
        </a>
        <a href="${SITE_X_HREF}" class="${linkClass}" target="_blank" rel="noopener noreferrer">
          ${ICON_X}
          <span>X</span>
        </a>
        <a href="${DISCORD_INVITE_HREF}" class="${linkClass}" target="_blank" rel="noopener noreferrer">
          ${ICON_DISCORD}
          <span>Discord</span>
        </a>
      </nav>
    `;
  }
}

class SiteHeader extends HTMLElement {
  connectedCallback(): void {
    const current = (this.getAttribute("data-current") ?? "home") as PageId;
    const home = current === "home";
    const homeHref = home ? "#hero" : "/";

    this.innerHTML = `
      <header class="site-header" data-site-header>
        <div class="mx-auto flex h-16 w-full max-w-[88rem] items-center justify-between gap-3 px-5 md:h-[4.5rem] md:px-8">
          <a href="${homeHref}" class="brand">
            <img
              src="/logo.png"
              alt=""
              width="512"
              height="512"
              class="h-8 w-8 shrink-0 object-contain md:h-9 md:w-9"
              decoding="async"
            />
            <span class="flex min-w-0 flex-col">
              <span class="text-[13px] font-semibold tracking-tight text-white md:text-sm">未完成成果物研究所</span>
              <span class="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-500">Mikansei Laboratory</span>
            </span>
          </a>

          <nav class="hidden items-center gap-0.5 lg:flex" aria-label="メインナビゲーション">
            ${desktopNav(current)}
          </nav>

          <div class="flex items-center gap-1.5">
            <div class="hidden items-center gap-0.5 sm:flex">
              ${socialIconNav("公式の GitHub、X、Discord")}
            </div>
            <a href="/#contact" class="btn btn--ghost hidden md:inline-flex">お問い合わせ</a>
            <button
              type="button"
              class="icon-link lg:hidden"
              aria-expanded="false"
              aria-controls="site-menu"
              aria-label="メニューを開く"
              data-menu-toggle
            >
              <svg class="h-5 w-5" data-icon-open viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/>
              </svg>
              <svg class="hidden h-5 w-5" data-icon-close viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div
          id="site-menu"
          class="site-menu border-t border-white/10 bg-[#07080b]/95 px-5 pb-7 pt-3 backdrop-blur-xl lg:hidden"
          data-menu
          data-open="false"
        >
          <nav class="flex flex-col" aria-label="メインナビゲーション（モバイル）">
            ${mobileNav(current)}
          </nav>
          <div class="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
            ${socialIconNav("公式の GitHub、X、Discord（モバイル）")}
            <a href="/#contact" class="btn btn--primary">お問い合わせ</a>
          </div>
        </div>
      </header>
      ${home ? "" : '<div class="h-16 md:h-[4.5rem]" aria-hidden="true"></div>'}
    `;

    const toggle = this.querySelector<HTMLButtonElement>("[data-menu-toggle]");
    const menu = this.querySelector<HTMLElement>("[data-menu]");
    const iconOpen = this.querySelector<SVGElement>("[data-icon-open]");
    const iconClose = this.querySelector<SVGElement>("[data-icon-close]");
    if (!toggle || !menu || !iconOpen || !iconClose) return;

    const setOpen = (open: boolean): void => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
      menu.dataset.open = String(open);
      open ? menu.removeAttribute("hidden") : menu.setAttribute("hidden", "");
      iconOpen.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
      document.body.classList.toggle("overflow-hidden", open);
    };

    // 初期状態は閉じる（JS 無効時はメニューを表示しない）
    setOpen(false);

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 1023px)").matches) setOpen(false);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    window.matchMedia("(min-width: 1024px)").addEventListener("change", (event) => {
      if (event.matches) setOpen(false);
    });

    const header = this.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;
    const onScroll = (): void => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback(): void {
    const year = new Date().getFullYear();
    const productLinks = PRODUCT_LINKS.map(
      (link) => `<li><a class="footer-link" href="${link.href}">${link.label}</a></li>`,
    ).join("");
    const siteLinks = SITE_LINKS.map(
      (link) => `<li><a class="footer-link" href="${link.href}">${link.label}</a></li>`,
    ).join("");
    const resourceLinks = RESOURCE_LINKS.map((link) =>
      link.external
        ? `<li><a class="footer-link" href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}<span class="sr-only">（新しいタブで開く）</span></a></li>`
        : `<li><a class="footer-link" href="${link.href}">${link.label}</a></li>`,
    ).join("");

    this.innerHTML = `
      <footer class="site-footer">
        <div class="shell py-14 md:py-20">
          <div class="flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p class="eyebrow">Contact</p>
              <p class="mt-3 max-w-xl text-xl font-semibold tracking-tight text-white md:text-2xl">
                導入の相談も、不具合の連絡も。現場の言葉でどうぞ。
              </p>
            </div>
            <a class="btn btn--primary" href="/#contact">お問い合わせ</a>
          </div>

          <div class="grid gap-10 pt-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.6fr_0.6fr_0.7fr]">
            <div>
              <a href="/" class="brand">
                <img src="/logo.png" alt="" width="512" height="512" class="h-9 w-9 object-contain" decoding="async" />
                <span class="flex flex-col">
                  <span class="text-sm font-semibold text-white">未完成成果物研究所</span>
                  <span class="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-500">Mikansei Laboratory</span>
                </span>
              </a>
              <p class="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
                vMix・ATEM・OMT・NDI・SRT 周辺のツールとハードウェアを開発する技術者コミュニティです。
              </p>
              <div class="mt-5">
                ${socialIconNav("公式の GitHub、X、Discord（フッター）")}
              </div>
            </div>

            <div>
              <h2 class="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Products</h2>
              <ul class="mt-4 space-y-2.5">${productLinks}</ul>
            </div>

            <div>
              <h2 class="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Site</h2>
              <ul class="mt-4 space-y-2.5">${siteLinks}</ul>
            </div>

            <div>
              <h2 class="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Links</h2>
              <ul class="mt-4 space-y-2.5">${resourceLinks}</ul>
            </div>
          </div>

          <div class="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs leading-relaxed text-zinc-500 md:flex-row md:items-start md:justify-between">
            <p>© ${year} 未完成成果物研究所 / Mikansei Laboratory</p>
            <p class="max-w-2xl md:text-right">
              vMix、ATEM、Stream Deck、OMT、NDI などは各社の商標または登録商標です。当サイトで配布するツールは各社の公式製品ではありません。
            </p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("social-links", SocialLinks);
customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);

const sceneCanvas = document.querySelector<HTMLCanvasElement>("#lab-scene");
if (sceneCanvas) {
  void import("./scene").then(({ mountLabScene }) => {
    mountLabScene(sceneCanvas);
  });
}
