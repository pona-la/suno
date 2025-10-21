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
    "/en/": {
      status: 301,
      destination: "/",
    },
  },
});
