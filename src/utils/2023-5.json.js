import events from "content/schedules/2025.json";

export function GET() {
  let panels = events.map((event) =>
    event.title == "break" || event.performer == "break"
      ? { duration: event.duration }
      : {
          duration: event.duration,
          panelist: event.performer || "unknown",
          category: (() => {
            if (event.categories?.includes("informational"))
              return "informational";
            if (event.categories?.includes("entertainment"))
              return "entertainment";
            if (event.categories?.includes("music")) return "music";
            if (event.categories?.includes("game")) return "game";
            return "other";
          })(),
          title_en: event.title?.split(" | ")[0]?.trim() || "unknown",
          title_tok: event.title?.split(" | ")[1]?.trim() || "unknown",
          description_en:
            event.description
              ?.replaceAll("\n", " ")
              .match(/(?<=lang=\"en\"\>).*?(?=\<\/div\>)/gm)
              // .match(/(?<=lang=\"en\"\>\<p\>).*?(?=\<\/p\>)/gm)
              ?.join(" ")
              .trim() || "unknown",
          description_tok:
            event.description
              ?.replaceAll("\n", " ")
              .match(/(?<=lang=\"tok\"\>).*?(?=\<\/div\>)/gm)
              // .match(/(?<=lang=\"tok\"\>\<p\>).*?(?=\<\/p\>)/gm)
              ?.join(" ")
              .trim() || "unknown",
          links: {
            youtube: event.youtube,
            soundcloud: event.soundcloud,
            bandcamp: event.bandcamp,
            spotify: event.spotify,
            kofi: event.kofi,
            website: event.website,
            discord: event.discord,
          },
          vod: "",
        },
  );

  return new Response(JSON.stringify(panels, null, 2));
}
