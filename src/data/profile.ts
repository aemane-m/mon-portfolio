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

export const headline = "I turn raw data into reliable decisions — from collection to dashboard, working with technical and business teams alike.";

export type Experience = { company: string; role: string; period: string; points: string[]; hash: string };

export const experience: Experience[] = [
  {
    hash: "e4a7b13",
    company: "Allianz",
    role: "Data Engineer — work-study (alternance)",
    period: "May 2026 → 2027",
    points: [
      "Migrating a datamart from SAS to PySpark on Databricks, and working through the technical challenges that come with it.",
      "Building a tool that exports data from SAS and Azure straight into Databricks, shaped by constraints specific to Allianz.",
    ],
  },
  {
    hash: "a91c4e2",
    company: "Paris Dauphine – PSL University (CIP)",
    role: "Data/AI Technical Intern",
    period: "Oct 2024 → Aug 2025",
    points: [
      "Python pipeline for the educational-technology support desk: ~9,000 tickets collected, anonymised and categorised (multi-threaded).",
      "Automatic classification with locally-run LLMs (Ollama); ~1,900 recurring questions extracted into a knowledge base.",
      "Chatbot prototype (Crisp) linked to Moodle tutorials.",
    ],
  },
  {
    hash: "5be07d1",
    company: "Lab Photo Dauphine (volunteer)",
    role: "Member & website maintainer",
    period: "Jun 2025 → today",
    points: [
      "Still a member of the film-photography association, and still in charge of its website.",
      "Rebuilding the site from WordPress to Astro with an editor volunteers can use without code (see the project).",
    ],
  },
  {
    hash: "5be07d0",
    company: "Lab Photo Dauphine (volunteer)",
    role: "Secretary General",
    period: "Jun 2024 → Jun 2025",
    points: [
      "Coordinated a 50+ member association: administration, partnerships, grant application.",
      "Rebuilt and maintained the labphotodauphine.fr website (WordPress).",
    ],
  },
  {
    hash: "c3d8f60",
    company: "LCL",
    role: "Mortgage Loan Technical Assistant (fixed-term)",
    period: "Jul 2024 → Sep 2024",
    points: [
      "Processed financing files: compliance checks, document completeness, follow-ups.",
      "Applied banking compliance and anti-fraud procedures.",
    ],
  },
  {
    hash: "7f12a9b",
    company: "Paris Dauphine – PSL University",
    role: "Educational & Technical Support Assistant (part-time)",
    period: "Sep 2021 → Sep 2024",
    points: [
      "Multi-institution Moodle at PSL: course-space structuring, user support, training material.",
      "Recurring automation in Python (extraction and analysis of Moodle data).",
    ],
  },
];

export const education = [
  { period: "2026 → 2027", title: "MSc 2 MIAGE", where: "Paris Dauphine – PSL", focus: "Current year" },
  { period: "2025 → 2026", title: "MSc 1 MIAGE", where: "Paris Dauphine – PSL", focus: "AI & decision-making · distributed systems · DBMS · information-systems security · BPM" },
  { period: "2024 → 2025", title: "BSc MIAGE (Year 3)", where: "Paris Dauphine – PSL", focus: "Data analysis · networks · graph algorithms · relational databases" },
  { period: "2022 → 2024", title: "BSc Mathematics & Computer Science (Years 1–2)", where: "Paris Dauphine – PSL", focus: "Algebra · analysis · probability · algorithmics (Python)" },
];

export type Level = "pratique" | "apprentissage";
export const pipeline: { stage: string; plain: string; sql: string; items: { name: string; level: Level }[] }[] = [
  { stage: "ingest", plain: "Collect", sql: "orchestration & messaging", items: [{ name: "Airflow", level: "apprentissage" }, { name: "Kafka", level: "apprentissage" }, { name: "n8n", level: "pratique" }] },
  { stage: "store", plain: "Store", sql: "storage & querying", items: [{ name: "SQL", level: "pratique" }, { name: "Databricks", level: "pratique" }, { name: "Spark", level: "apprentissage" }, { name: "Delta Lake", level: "apprentissage" }, { name: "PostgreSQL", level: "pratique" }, { name: "SQLite", level: "pratique" }, { name: "DuckDB", level: "apprentissage" }, { name: "Parquet", level: "apprentissage" }] },
  { stage: "transform", plain: "Transform & model", sql: "processing & ML", items: [{ name: "Python", level: "pratique" }, { name: "Pandas", level: "pratique" }, { name: "scikit-learn", level: "pratique" }, { name: "MLflow", level: "apprentissage" }, { name: "Feast", level: "apprentissage" }] },
  { stage: "serve", plain: "Deliver", sql: "APIs & deployment", items: [{ name: "FastAPI", level: "pratique" }, { name: "Docker", level: "pratique" }, { name: "GitHub Actions", level: "pratique" }, { name: "GitLab CI", level: "pratique" }, { name: "Kubernetes", level: "pratique" }, { name: "Terraform", level: "apprentissage" }, { name: "Argo CD", level: "pratique" }, { name: "Ansible", level: "pratique" }, { name: "Proxmox", level: "pratique" }, { name: "TrueNAS", level: "pratique" }, { name: "Django", level: "pratique" }] },
  { stage: "observe", plain: "Monitor", sql: "monitoring", items: [{ name: "Prometheus", level: "apprentissage" }, { name: "Grafana", level: "apprentissage" }] },
];

export const business = [
  { title: "Understand the need before coding", text: "On Dauphine's support desk I worked with the support team to find the questions that came up most, then automated how they are handled." },
  { title: "Rigour with sensitive data", text: "Anonymisation of ~9,000 tickets at the CIP; compliance work and mortgage-file processing at LCL." },
  { title: "Make results readable", text: "Reports, dashboards and documentation written for non-technical readers (a 50+ member association, training material)." },
];
