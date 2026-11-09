// Forme de points associée à chaque projet (accueil et page projet).
export const shapes: Record<string, { layout: string; note: string; fr: string }> = {
  "quant-mlops": { layout: "series", note: "A financial time series: each dot is an observation, orange dots are detected signals.", fr: "Une série temporelle financière : chaque point est une observation, les points orange sont des signaux détectés." },
  quantlab: { layout: "clusters", note: "Many strategies, one portable engine that runs on either platform.", fr: "Plusieurs stratégies, un moteur portable qui tourne sur l'une ou l'autre plateforme." },
  "databricks-data-platform": { layout: "grid", note: "Data laid out layer by layer, from raw to ready to use.", fr: "Des données rangées couche par couche, du brut au prêt à l'emploi." },
  "finance-tracker": { layout: "bars", note: "Spending grouped by category — the dashboard’s main chart.", fr: "Des dépenses regroupées par catégorie — le graphique principal du tableau de bord." },
  "f1-electre": { layout: "tsp", note: "A calendar built one race at a time: each step picks the next stop.", fr: "Un calendrier construit course après course : chaque étape choisit la suivante." },
  "pacman-ai": { layout: "grid", note: "A maze board: dots to eat, ghosts to avoid.", fr: "Un labyrinthe : des points à manger, des fantômes à éviter." },
  stage: { layout: "bars", note: "Thousands of requests grouped into a handful of themes.", fr: "Des milliers de demandes regroupées en quelques grands thèmes." },
  homelab: { layout: "cluster", note: "Three machines, each running its own services, all wired together.", fr: "Trois machines, chacune avec ses services, toutes reliées entre elles." },
  cinerestore: { layout: "film", note: "Six frames of film, scanned one after another.", fr: "Six photogrammes de pellicule, numérisés l'un après l'autre." },
  labphoto: { layout: "shelves", note: "A gallery wall: many photographers, many photos, one place to update them.", fr: "Un mur de galerie : beaucoup de photographes, beaucoup de photos, un seul endroit pour les mettre à jour." },
  "sgeb-bibliotheque": { layout: "shelves", note: "A bookshelf: each dot is a book, orange ones are on loan.", fr: "Une étagère : chaque point est un livre, en orange ceux qui sont empruntés." },
  "tsp-ecosystem-genetic-javafx": { layout: "tsp", note: "A delivery round: linking 42 cities by the shortest route.", fr: "Une tournée : relier 42 villes par le chemin le plus court." },
  "chat-c-ncurses": { layout: "network", note: "One server at the centre, several users connected at the same time.", fr: "Un serveur au centre, plusieurs utilisateurs connectés en même temps." },
};
export const roomLabel = {
  en: { data: "Data", infra: "Infrastructure", darkroom: "Darkroom", foundations: "Foundations" },
  fr: { data: "Données", infra: "Infrastructure", darkroom: "Chambre noire", foundations: "Bases" },
} as const;
export const roomBlurb = {
  en: { data: "Pipelines, platforms and the questions behind them.", infra: "A home datacentre, run the way a team would run production.", darkroom: "Film, machines and the software that connects them.", foundations: "University projects where I learnt the craft." },
  fr: { data: "Pipelines, plateformes et les questions qui les motivent.", infra: "Un datacentre à la maison, exploité comme une équipe exploiterait la production.", darkroom: "La pellicule, les machines et le logiciel qui les relie.", foundations: "Projets universitaires où j'ai appris le métier." },
} as const;
