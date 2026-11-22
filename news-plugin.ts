import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";

export type NewsItem = {
  date: string;
  title: string;
  summary: string;
  url: string;
  category: string;
  tags?: string[];
};

const HOST = "https://mikanseilaboratory.github.io";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function dotted(date: string): string {
  return date.replace(/-/g, ".");
}

function chips(item: NewsItem): string {
  const tags = (item.tags ?? [])
    .map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`)
    .join("");
  return `<time datetime="${item.date}">${dotted(item.date)}</time>
                  <span class="chip chip--warm">${escapeHtml(item.category)}</span>${tags}`;
}

const ARROW = `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" /></svg>`;

/** ホームのニュース欄（全件をカードで並べる） */
function homeCard(item: NewsItem): string {
  return `            <article>
              <a href="${escapeHtml(item.url)}" class="card card--link flex h-full flex-col p-6" target="_blank" rel="noopener noreferrer">
                <div class="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  ${chips(item)}
                </div>
                <h3 class="mt-3 text-lg font-semibold leading-snug tracking-tight text-white">
                  ${escapeHtml(item.title)}
                </h3>
                <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                  ${escapeHtml(item.summary)}
                </p>
                <span class="link-arrow mt-auto pt-5">
                  noteで読む
                  ${ARROW}
                </span>
              </a>
            </article>`;
}

/** ニュース一覧ページの1件 */
function listItem(item: NewsItem): string {
  return `                <li>
                  <a href="${escapeHtml(item.url)}" class="card card--link block p-6 md:p-7" target="_blank" rel="noopener noreferrer">
                    <div class="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                      ${chips(item)}
                    </div>
                    <h3 class="mt-4 text-lg font-semibold leading-snug text-white md:text-xl">
                      ${escapeHtml(item.title)}
                    </h3>
                    <p class="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
                      ${escapeHtml(item.summary)}
                    </p>
                    <span class="link-arrow mt-4">noteで読む</span>
                  </a>
                </li>`;
}

function jsonLd(items: NewsItem[]): string {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${HOST}/news/#webpage`,
        url: `${HOST}/news/`,
        name: "ニュース",
        description: "未完成成果物研究所のニュース一覧。",
        inLanguage: "ja",
        isPartOf: { "@id": `${HOST}/#website` },
      },
      {
        "@type": "ItemList",
        name: "ニュース",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Article",
            headline: item.title,
            datePublished: `${item.date}T12:00:00+09:00`,
            url: item.url,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: `${HOST}/` },
          { "@type": "ListItem", position: 2, name: "ニュース", item: `${HOST}/news/` },
        ],
      },
    ],
  };
  return `    <script type="application/ld+json">\n${JSON.stringify(graph, null, 2)}\n    </script>`;
}

function feed(items: NewsItem[]): string {
  const itemXml = items
    .map((item) => {
      const published = new Date(`${item.date}T12:00:00+09:00`).toUTCString();
      return `    <item>
      <title>${escapeHtml(item.title)}</title>
      <link>${escapeHtml(item.url)}</link>
      <guid isPermaLink="false">${escapeHtml(item.url)}</guid>
      <pubDate>${published}</pubDate>
      <category>${escapeHtml(item.category)}</category>
      <description>${escapeHtml(item.summary)}</description>
    </item>`;
    })
    .join("\n");
  const lastBuild = new Date(`${items[0]?.date ?? "2026-01-01"}T12:00:00+09:00`).toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>未完成成果物研究所 ニュース</title>
    <link>${HOST}/news/</link>
    <description>未完成成果物研究所がnoteに掲載した開発記録と、現場での試験運用の記録。</description>
    <language>ja</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${HOST}/news/feed.xml" rel="self" type="application/rss+xml" />
${itemXml}
  </channel>
</rss>
`;
}

/**
 * `data/news.json` を唯一の情報源として、ホームのニュース欄・ニュース一覧・
 * 構造化データ・RSS を生成する。記事を追加しても表示側が取り残されない。
 */
export function newsPlugin(root: string): Plugin {
  const newsFile = resolve(root, "data/news.json");

  function loadNews(): NewsItem[] {
    const parsed = JSON.parse(readFileSync(newsFile, "utf-8")) as NewsItem[];
    return [...parsed].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  }

  return {
    name: "mikansei-news",
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        const file = ctx.filename;
        if (!file) return html;
        if (file === resolve(root, "index.html")) {
          const items = loadNews();
          return html.replace("<!-- news:latest -->", items.map(homeCard).join("\n"));
        }
        if (file === resolve(root, "news/index.html")) {
          const items = loadNews();
          return html
            .replace("<!-- news:list -->", items.map(listItem).join("\n"))
            .replace("<!-- news:jsonld -->", jsonLd(items));
        }
        return html;
      },
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url ?? "").split("?")[0];
        if (pathname !== "/news/feed.xml") return next();
        res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache");
        res.end(feed(loadNews()));
      });
      server.watcher.add(newsFile);
      server.watcher.on("change", (changed) => {
        if (resolve(changed) === newsFile) server.ws.send({ type: "full-reload" });
      });
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "news/feed.xml", source: feed(loadNews()) });
    },
  };
}
