// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { config } from "selo-components/config";

const deploy = import.meta.env.PROD
  ? { site: `https://${config.hostname}/` }
  : { site: "http://localhost/" };

// https://astro.build/config
export default defineConfig({
  ...deploy,
  integrations: [mdx(), sitemap()],
  redirects: {
    "/en/": "/",
    "/2025/": "/en/2025/",
    "/2024/": "/en/2024/",
    "/2023/": "/en/2023/",
    "/2022/": "/en/2022/",
    "/2021/": "/en/2021/",
  },
});
