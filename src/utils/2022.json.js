import events from "content/schedules/2022.json";

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
          title_en: event.title || "unknown",
          title_tok: event.title || "unknown",
          description_en: event.description || "unknown",
          description_tok: event.description || "unknown",
          language: undefined,
          links: {},
          vod: "",
        },
  );

  return new Response(JSON.stringify(panels, null, 2));
}
