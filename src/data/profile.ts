export const person = {
  name: "Aemane MOUTEIROU",
  handle: "aemane",
  role: "Data engineer · MLOps",
  school: "MSc 2 MIAGE · Paris Dauphine – PSL",
  email: "aemane.mouteirou@dauphine.eu",
  location: "Paris, FR",
  seeking: ["Data Engineering"],
  contract: "Permanent role (CDI) from 2027",
  open: "all industries",
  avatar: "/images/avatar.jpg",
};

export const social = [
  { name: "github", href: "https://github.com/aemane-m" },
  { name: "linkedin", href: "https://www.linkedin.com/in/aemane-mouteirou/" },
  { name: "email", href: `mailto:${person.email}` },
];

import type { Lang } from "../i18n";

export const headline: Record<Lang, string> = {
  en: "I turn raw data into reliable decisions — from collection to dashboard, working with technical and business teams alike.",
  fr: "Je transforme des données brutes en décisions fiables — de la collecte au tableau de bord, avec les équipes techniques comme métier.",
};

export type Experience = { company: string; role: string; period: string; points: string[]; hash: string };

export const experience: Record<Lang, Experience[]> = {
  en: [
    { hash: "e4a7b13", company: "Allianz", role: "Data Engineer — work-study (alternance)", period: "May 2026 → 2027", points: [
      "Setting up a Databricks data platform: a medallion architecture decoupled from the infrastructure, pipeline orchestration and data governance.",
      "Moving workloads from SAS to PySpark, and building a tool that exports data from SAS and Azure straight into Databricks, shaped by constraints specific to Allianz.",
    ] },
    { hash: "a91c4e2", company: "Paris Dauphine – PSL University (CIP)", role: "Data/AI Technical Intern", period: "Oct 2024 → Aug 2025", points: [
      "Python pipeline for the educational-technology support desk: ~9,000 tickets collected, anonymised and categorised (multi-threaded).",
      "Automatic classification with locally-run LLMs (Ollama); ~1,900 recurring questions extracted into a knowledge base.",
      "Chatbot prototype (Crisp) linked to Moodle tutorials.",
    ] },
    { hash: "5be07d1", company: "Lab Photo Dauphine (volunteer)", role: "Member & website maintainer", period: "Jun 2025 → today", points: [
      "Still a member of the film-photography association, and still in charge of its website.",
      "Rebuilding the site from WordPress to Astro with an editor volunteers can use without code (see the project).",
    ] },
    { hash: "5be07d0", company: "Lab Photo Dauphine (volunteer)", role: "Secretary General", period: "Jun 2024 → Jun 2025", points: [
      "Coordinated a 50+ member association: administration, partnerships, grant application.",
      "Rebuilt and maintained the labphotodauphine.fr website (WordPress).",
    ] },
    { hash: "c3d8f60", company: "LCL", role: "Mortgage Loan Technical Assistant (fixed-term)", period: "Jul 2024 → Sep 2024", points: [
      "Processed financing files: compliance checks, document completeness, follow-ups.",
      "Applied banking compliance and anti-fraud procedures.",
    ] },
    { hash: "7f12a9b", company: "Paris Dauphine – PSL University", role: "Educational & Technical Support Assistant (part-time)", period: "Sep 2021 → Sep 2024", points: [
      "Multi-institution Moodle at PSL: course-space structuring, user support, training material.",
      "Recurring automation in Python (extraction and analysis of Moodle data).",
    ] },
  ],
  fr: [
    { hash: "e4a7b13", company: "Allianz", role: "Data Engineer — alternance", period: "mai 2026 → 2027", points: [
      "Mise en place d'une plateforme de données Databricks : architecture en médaillon découplée de l'infrastructure, orchestration des pipelines et gouvernance des données.",
      "Migration de traitements de SAS vers PySpark, et développement d'un outil qui exporte des données de SAS et d'Azure directement vers Databricks, façonné par des contraintes propres à Allianz.",
    ] },
    { hash: "a91c4e2", company: "Université Paris Dauphine – PSL (CIP)", role: "Stagiaire technique Data/IA", period: "oct. 2024 → août 2025", points: [
      "Pipeline Python pour le support technopédagogique : environ 9 000 tickets collectés, anonymisés et catégorisés (multi-thread).",
      "Classification automatique par des LLM exécutés en local (Ollama) ; environ 1 900 questions récurrentes extraites dans une base de connaissances.",
      "Prototype de chatbot (Crisp) relié aux tutoriels Moodle.",
    ] },
    { hash: "5be07d1", company: "Lab Photo Dauphine (bénévolat)", role: "Membre et webmaster", period: "juin 2025 → aujourd'hui", points: [
      "Toujours membre de l'association de photographie argentique, et toujours en charge de son site web.",
      "Refonte du site de WordPress vers Astro, avec un éditeur que les bénévoles utilisent sans coder (voir le projet).",
    ] },
    { hash: "5be07d0", company: "Lab Photo Dauphine (bénévolat)", role: "Secrétaire général", period: "juin 2024 → juin 2025", points: [
      "Coordination d'une association de plus de 50 membres : administratif, partenariats, dossier de subvention.",
      "Refonte et maintenance du site labphotodauphine.fr (WordPress).",
    ] },
    { hash: "c3d8f60", company: "LCL", role: "Auxiliaire technicien prêts immobiliers (CDD)", period: "juil. 2024 → sept. 2024", points: [
      "Traitement de dossiers de financement : conformité, complétude des pièces, suivi et relances.",
      "Application des procédures de conformité bancaire et de lutte contre la fraude.",
    ] },
    { hash: "7f12a9b", company: "Université Paris Dauphine – PSL", role: "Assistant support pédagogique et technique (temps partiel)", period: "sept. 2021 → sept. 2024", points: [
      "Moodle multi-établissements de PSL : structuration d'espaces de cours, assistance aux utilisateurs, supports de formation.",
      "Automatisations récurrentes en Python (extraction et analyse de données Moodle).",
    ] },
  ],
};

export const education: Record<Lang, { period: string; title: string; where: string; focus: string }[]> = {
  en: [
    { period: "2026 → 2027", title: "MSc 2 MIAGE", where: "Paris Dauphine – PSL", focus: "Current year" },
    { period: "2025 → 2026", title: "MSc 1 MIAGE", where: "Paris Dauphine – PSL", focus: "AI & decision-making · distributed systems · DBMS · information-systems security · BPM" },
    { period: "2024 → 2025", title: "BSc MIAGE (Year 3)", where: "Paris Dauphine – PSL", focus: "Data analysis · networks · graph algorithms · relational databases" },
    { period: "2022 → 2024", title: "BSc Mathematics & Computer Science (Years 1–2)", where: "Paris Dauphine – PSL", focus: "Algebra · analysis · probability · algorithmics (Python)" },
  ],
  fr: [
    { period: "2026 → 2027", title: "Master 2 MIAGE", where: "Paris Dauphine – PSL", focus: "Année en cours" },
    { period: "2025 → 2026", title: "Master 1 MIAGE", where: "Paris Dauphine – PSL", focus: "IA et décision · systèmes répartis · SGBD · sécurité des SI · BPM" },
    { period: "2024 → 2025", title: "Licence MIAGE (L3)", where: "Paris Dauphine – PSL", focus: "Analyse de données · réseaux · algorithmique des graphes · bases de données relationnelles" },
    { period: "2022 → 2024", title: "Licence Mathématiques-Informatique (L1–L2)", where: "Paris Dauphine – PSL", focus: "Algèbre · analyse · probabilités · algorithmique (Python)" },
  ],
};

export type Level = "pratique" | "apprentissage";
type Tool = { name: string; level: Level };
const T = (name: string, level: Level = "pratique"): Tool => ({ name, level });
const L = "apprentissage" as const;
const stages: { stage: string; plain: { en: string; fr: string }; sql: { en: string; fr: string }; items: Tool[] }[] = [
  { stage: "ingest", plain: { en: "Collect", fr: "Collecter" }, sql: { en: "orchestration & messaging", fr: "orchestration et messagerie" }, items: [T("Airflow", L), T("Kafka", L), T("n8n")] },
  { stage: "store", plain: { en: "Store", fr: "Stocker" }, sql: { en: "storage & querying", fr: "stockage et requêtage" }, items: [T("SQL"), T("Databricks"), T("Spark", L), T("Delta Lake", L), T("PostgreSQL"), T("SQLite"), T("DuckDB", L), T("Parquet", L), T("TrueNAS")] },
  { stage: "transform", plain: { en: "Transform & model", fr: "Transformer et modéliser" }, sql: { en: "processing & ML", fr: "traitement et ML" }, items: [T("Python"), T("Pandas"), T("scikit-learn"), T("MLflow", L), T("Feast", L)] },
  { stage: "serve", plain: { en: "Deliver", fr: "Livrer" }, sql: { en: "APIs & deployment", fr: "API et déploiement" }, items: [T("FastAPI"), T("Docker"), T("GitHub Actions"), T("GitLab CI"), T("Kubernetes"), T("Terraform", L), T("Argo CD"), T("Ansible"), T("Proxmox"), T("Django")] },
  { stage: "observe", plain: { en: "Monitor", fr: "Surveiller" }, sql: { en: "monitoring", fr: "supervision" }, items: [T("Prometheus", L), T("Grafana", L)] },
];
export const pipeline = (lang: Lang) => stages.map((s) => ({ stage: s.stage, plain: s.plain[lang], sql: s.sql[lang], items: s.items }));

export const business: Record<Lang, { title: string; text: string }[]> = {
  en: [
    { title: "Understand the need before coding", text: "On Dauphine's support desk I worked with the support team to find the questions that came up most, then automated how they are handled." },
    { title: "Rigour with sensitive data", text: "Anonymisation of ~9,000 tickets at the CIP; compliance work and mortgage-file processing at LCL." },
    { title: "Make results readable", text: "Reports, dashboards and documentation written for non-technical readers (a 50+ member association, training material)." },
  ],
  fr: [
    { title: "Comprendre le besoin avant de coder", text: "Au support de Dauphine, j'ai travaillé avec l'équipe d'assistance pour repérer les questions qui revenaient le plus, puis j'ai automatisé leur traitement." },
    { title: "Rigueur sur les données sensibles", text: "Anonymisation d'environ 9 000 tickets au CIP ; travail de conformité et traitement de dossiers de crédit chez LCL." },
    { title: "Rendre les résultats lisibles", text: "Rapports, tableaux de bord et documentation écrits pour des lecteurs non techniques (une association de plus de 50 membres, supports de formation)." },
  ],
};
