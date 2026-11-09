export const person = {
  name: "Aemane MOUTEIROU",
  handle: "aemane",
  role: "Data / MLOps engineer",
  school: "M1 MIAGE · Université Paris Dauphine – PSL",
  email: "aemane.mouteirou@dauphine.eu",
  location: "Paris, FR",
  seeking: ["Data Engineering", "MLOps", "Ops / DevOps"],
  avatar: "/images/avatar.jpg",
};

export const social = [
  { name: "github", href: "https://github.com/aemane-m" },
  { name: "linkedin", href: "https://www.linkedin.com/in/aemane-mouteirou/" },
  { name: "email", href: `mailto:${person.email}` },
];

export const headline =
  "Je construis des pipelines de données et des chaînes MLOps reproductibles, observables et déployables.";

export type Experience = { company: string; role: string; period: string; points: string[]; hash: string };

export const experience: Experience[] = [
  {
    hash: "a91c4e2",
    company: "Université Paris Dauphine – PSL (CIP)",
    role: "Stagiaire technique Data/IA",
    period: "oct. 2024 → août 2025",
    points: [
      "Pipeline Python pour le support technopédagogique : ~9 000 tickets collectés, anonymisés et catégorisés (multi-thread).",
      "Classification automatique par LLM exécutés en local (Ollama) ; ~1 900 questions récurrentes extraites en base de connaissances.",
      "Prototype de chatbot (Crisp) relié aux tutoriels Moodle.",
    ],
  },
  {
    hash: "5be07d1",
    company: "Lab Photo Dauphine (bénévolat)",
    role: "Secrétaire général",
    period: "juin 2024 → juin 2025",
    points: [
      "Coordination d'une association de 50+ membres : administratif, partenariats, dossier de subvention.",
      "Refonte et maintenance du site labphotodauphine.fr (WordPress).",
    ],
  },
  {
    hash: "c3d8f60",
    company: "LCL",
    role: "Auxiliaire technicien prêts immobiliers (CDD)",
    period: "juil. 2024 → sept. 2024",
    points: [
      "Traitement de dossiers de financement : conformité, complétude des pièces, suivi et relances.",
      "Application des procédures de conformité bancaire et de lutte contre la fraude.",
    ],
  },
  {
    hash: "7f12a9b",
    company: "Université Paris Dauphine – PSL",
    role: "Assistant support pédagogique & technique (temps partiel)",
    period: "sept. 2021 → sept. 2024",
    points: [
      "Moodle multi-établissements PSL : structuration de cours, assistance, supports de formation.",
      "Automatisations récurrentes en Python (extraction et analyse de données Moodle).",
    ],
  },
];

export const education = [
  { period: "2025 → 2026", title: "Master MIAGE (M1)", where: "Paris Dauphine – PSL", focus: "IA & décision · systèmes répartis · SGBD · sécurité des SI · BPM" },
  { period: "2024 → 2025", title: "Licence MIAGE (L3)", where: "Paris Dauphine – PSL", focus: "Analyse de données · réseaux · algorithmique des graphes · BDD relationnelles" },
  { period: "2022 → 2024", title: "Licence Mathématiques-Informatique (L1–L2)", where: "Paris Dauphine – PSL", focus: "Algèbre · analyse · probabilités · algorithmique (Python)" },
];

export type Level = "pratique" | "apprentissage";
export const pipeline: { stage: string; sql: string; items: { name: string; level: Level }[] }[] = [
  { stage: "ingest", sql: "orchestration & messaging", items: [{ name: "Airflow", level: "apprentissage" }, { name: "Kafka", level: "apprentissage" }, { name: "n8n", level: "pratique" }] },
  { stage: "store", sql: "stockage & requêtage", items: [{ name: "SQL", level: "pratique" }, { name: "PostgreSQL", level: "pratique" }, { name: "SQLite", level: "pratique" }, { name: "DuckDB", level: "apprentissage" }, { name: "Parquet", level: "apprentissage" }] },
  { stage: "transform", sql: "traitement & ML", items: [{ name: "Python", level: "pratique" }, { name: "Pandas", level: "pratique" }, { name: "scikit-learn", level: "pratique" }, { name: "MLflow", level: "apprentissage" }, { name: "Feast", level: "apprentissage" }] },
  { stage: "serve", sql: "API & déploiement", items: [{ name: "FastAPI", level: "pratique" }, { name: "Docker", level: "pratique" }, { name: "GitHub Actions", level: "pratique" }, { name: "Django", level: "pratique" }] },
  { stage: "observe", sql: "monitoring", items: [{ name: "Prometheus", level: "apprentissage" }, { name: "Grafana", level: "apprentissage" }] },
];
