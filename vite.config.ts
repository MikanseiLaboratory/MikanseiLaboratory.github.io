import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

/** Vite がエントリ CSS の link を module スクリプトの後に出すため FOUC になるのを防ぎ、アプリ CSS を先に読み込む。 */
function cssBeforeAppScript(): Plugin {
  return {
    name: "css-before-app-script",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const scriptStart = html.indexOf('<script type="module"');
        if (scriptStart === -1) return html;
        const scriptEnd = html.indexOf("</script>", scriptStart) + "</script>".length;
        const scriptTag = html.slice(scriptStart, scriptEnd);
        if (!scriptTag.includes("/assets/main-")) return html;

        const linkStart = html.indexOf('<link rel="stylesheet"', scriptEnd);
        if (linkStart === -1) return html;
        const linkEnd = html.indexOf(">", linkStart) + 1;
        const linkTag = html.slice(linkStart, linkEnd);
        if (!linkTag.includes("/assets/main-")) return html;
        if (linkStart < scriptStart) return html;

        return (
          html.slice(0, scriptStart) + linkTag + "\n    " + scriptTag + html.slice(linkEnd)
        );
      },
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [tailwindcss(), cssBeforeAppScript()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, "index.html"),
        productsIndex: resolve(root, "products/index.html"),
        productIryx: resolve(root, "products/iryx.html"),
        productEiviz: resolve(root, "products/eiviz.html"),
        productOmtTools: resolve(root, "products/omt-tools.html"),
        productVmixUtility: resolve(root, "products/vmix-utility.html"),
        productStreamDeck: resolve(root, "products/streamdeck.html"),
        productSrtUriGenerator: resolve(root, "products/srt-uri-generator.html"),
        productStageTimer: resolve(root, "products/stagetimer.html"),
        newsIndex: resolve(root, "news/index.html"),
        newsKagari16: resolve(root, "news/2026-11-23-kagari-16.html"),
      },
    },
  },
});
