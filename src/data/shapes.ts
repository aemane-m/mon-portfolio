// Forme de points associée à chaque projet (accueil et page projet).
export const shapes: Record<string, { layout: string; note: string }> = {
  "quant-mlops": { layout: "series", note: "A financial time series: each dot is an observation, orange dots are detected signals." },
  quantlab: { layout: "clusters", note: "Many strategies, one portable engine that runs on either platform." },
  "sas-to-pyspark": { layout: "grid", note: "The same data, moved from one platform to another and laid back in order." },
  "finance-tracker": { layout: "bars", note: "Spending grouped by category — the dashboard’s main chart." },
  stage: { layout: "bars", note: "Thousands of requests grouped into a handful of themes." },
  homelab: { layout: "cluster", note: "Three cluster nodes, each running its own pods, all wired together." },
  cinerestore: { layout: "film", note: "Six frames of film, scanned one after another." },
  labphoto: { layout: "shelves", note: "A gallery wall: many photographers, many photos, one place to update them." },
  "sgeb-bibliotheque": { layout: "shelves", note: "A bookshelf: each dot is a book, orange ones are on loan." },
  "tsp-ecosystem-genetic-javafx": { layout: "tsp", note: "A delivery round: linking 42 cities by the shortest route." },
  "chat-c-ncurses": { layout: "network", note: "One server at the centre, several users connected at the same time." },
};
export const roomLabel = { data: "Data", infra: "Infrastructure", darkroom: "Darkroom", foundations: "Foundations" } as const;
