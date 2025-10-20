// This file and the other ones were used to reformat schedules from past years.
// Keep in mind that after they were reformatted they were also manually edited.
// Keeping this in the repository on the off chance that someone will be doing
// something similar again. (Please don't, this was very annoying to do.)

import events from "content/schedules/2021.json";

export function GET() {
  let panels = events.map((event) =>
    event.title == "break" || event.performer == "break"
      ? { duration: event.duration }
      : {
          duration: event.duration,
          panelist: event.performer || "unknown",
          category: (() => {
            if (event.categories?.includes("toki sona")) return "informational";
            if (event.categories?.includes("toki musi")) return "entertainment";
            if (event.categories?.includes("kalama musi")) return "music";
            if (event.categories?.includes("musi musi")) return "game";
            return "other";
          })(),
          title_en: event.title?.split(" | ")[0]?.trim() || "unknown",
          title_tok: event.title?.split(" | ")[1]?.trim() || "unknown",
          description_en:
            event.description
              ?.replaceAll("\n", " ")
              .match(/(?<=lang=\"en\"\>).*?(?=\<\/p\>)/gm)
              ?.join(" ")
              .trim() || "unknown",
          description_tok:
            event.description
              ?.replaceAll("\n", " ")
              .match(/(?<=lang=\"tok\"\>).*?(?=\<\/p\>)/gm)
              ?.join(" ")
              .trim() || "unknown",
          links: {
            youtube: event.youtube,
            soundcloud: event.soundcloud,
            bandcamp: event.bandcamp,
            website: event.website,
          },
          vod: "",
        },
  );

  return new Response(JSON.stringify(panels, null, 2));
}
