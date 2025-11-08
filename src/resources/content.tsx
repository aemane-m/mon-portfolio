import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text, List, ListItem, Column, AccordionGroup, Icon } from "@once-ui-system/core";

const person: Person = {
  firstName: "Aemane",
  lastName: "MOUTEIROU",
  name: `Aemane MOUTEIROU`,
  role: "Étudiant en M1 MIAGE (Dauphine – PSL) • MLOps & Data Science",
  avatar: "/images/avatar.jpg",
  email: "aemane.mouteirou@dauphine.eu",
  location: "Europe/Paris",
  languages: ["Français", "Anglais"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>S’abonner à la newsletter de {person.firstName}</>,
  description: (
    <>
      Articles clairs et concrets sur l’ingénierie des données, le MLOps et l’automatisation.
      Je documente mon <strong>apprentissage continu</strong> (modèles ML, orchestration, CI/CD).
    </>
  ),
};

const social: Social = [
  { name: "GitHub", icon: "github", link: "https://github.com/aemane-m" },
  { name: "LinkedIn", icon: "linkedin", link: "https://www.linkedin.com/in/aemane-mouteirou/" },
  { name: "Email", icon: "email", link: `mailto:${person.email}` },
];

const home: Home = {
  path: "/",
  image: "/images/avatar.jpg",
  label: "Accueil",
  title: `Portfolio de ${person.name}`,
  description: `Travaux et apprentissages en ${person.role}`,
  headline: <> J’utilise l’IA et le MLOps pour transformer les données en leviers de décision.</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Projets</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          À la une
        </Text>
      </Row>
    ),
    href: "/work/optimisation-portefeuille-sectoriel",
  },
  subline: (
      <Text align="justify">
        Étudiant en <strong>M1 MIAGE</strong> à Dauphine – PSL, je conçois des solutions mêlant 
        <strong> Machine Learning</strong> et <strong>ingénierie logicielle</strong> pour répondre à des besoins métiers concrets :
        automatisation, aide à la décision, et analyse prédictive.  
        J’intègre les principes du <strong>MLOps</strong> — orchestration, traçabilité et CI/CD — afin de rendre
        les modèles <strong>fiables, reproductibles et déployables en production</strong>.
      </Text>
  ),
};

const about: About = {
  path: "/about",
  label: "À propos",
  title: `À propos – ${person.name}`,
  description: `Parcours et projets de ${person.name}, ${person.role} – ${person.location}`,
  tableOfContent: { display: true, subItems: false },
  avatar: { display: true },
  calendar: { display: false, link: "https://cal.com" },

  // ====== INTRO / INFOS ======
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <Text align="justify">
          Je suis étudiant en M1 MIAGE à l’Université Paris Dauphine – PSL. Mes domaines de formation couvrent
          la programmation orientée objet, les bases de données, l’algorithmique, l’analyse de données et les systèmes d’information.
        </Text>
        <Text align="justify">
          Mon focus actuel : <strong>industrialiser le machine learning (MLOps)</strong> — passer d’un prototype à un service
          stable, reproductible et observable. J’avance par itérations courtes et je documente chaque étape.
        </Text>
        <Text align="justify" onBackground="neutral-medium">
          <strong>Apprentissage en cours</strong> : orchestration <em>(Airflow)</em>, gestion des expériences
          <em> (MLflow)</em>, conteneurisation <em>(Docker)</em> et streaming de données <em>(Kafka)</em> — 
          explorés et intégrés dans mon projet personnel <strong>Quant-Ops</strong>.
        </Text>
        <Text align="justify">
          Ce projet agit comme un terrain d’expérimentation pour consolider mes connaissances en MLOps,
          tout en développant de bonnes pratiques de versionning, de monitoring et d’architecture distribuée.
        </Text>
      </>
    ),
  },

  // ====== EXPÉRIENCES ======
  work: {
    display: true,
    title: "Expérience",
    experiences: [
      {
        company: "Université Paris Dauphine – PSL",
        timeframe: "oct. 2024 — août 2025",
        role: "Stagiaire technique Data/IA",
        achievements: [
          <>Conception d’un pipeline pour améliorer le support technopédagogique (PSL).</>,
          <>Traitement d’environ 9&nbsp;000 tickets : collecte, anonymisation, catégorisation (exécutions multi-thread).</>,
          <>Classification automatique avec des LLM exécutés en local via Ollama.</>,
          <>Extraction de plus de 1&nbsp;900 questions récurrentes pour une base de connaissances.</>,
          <>Prototype de chatbot (Crisp) reliant les questions aux tutoriels Moodle, avec parcours guidés.</>,
        ],
        images: [],
      },
      {
        company: "Lab Photo Dauphine (Bénévolat)",
        timeframe: "juin 2024 — juin 2025",
        role: "Secrétaire général",
        achievements: [
          <>Coordination administrative d’une association (50+ membres, 54 ans d’existence).</>,
          <>Rédaction de procès-verbaux, dossiers de domiciliation, déclarations préfectorales.</>,
          <>Organisation des entretiens et inscriptions, partenariats, gestion de la messagerie officielle.</>,
          <>Refonte & maintenance du site web <a href="https://www.labphotodauphine.fr">www.labphotodauphine.fr</a> via WordPress.</>,
          <>Organisation des remises de prix (2022–2024).</>,
          <>Rédaction d’un dossier de subvention pour l’édition 2024–2025 du concours photo.</>,
        ],
        images: [],
      },
      {
        company: "Université Paris Dauphine – PSL",
        timeframe: "sept. 2021 — sept. 2024",
        role: "Assistant support pédagogique & technique (temps partiel)",
        achievements: [
          <>Contribution à Moodle multi-établissements (PSL) : structuration d’espaces de cours, assistance et suivi.</>,
          <>Production de supports de formation et tests de nouveaux outils pédagogiques.</>,
          <>Automatisations récurrentes via scripts Python (extraction et analyse de données Moodle).</>,
        ],
        images: [],
      },
      {
        company: "LCL",
        timeframe: "juil. 2024 — sept. 2024",
        role: "Auxiliaire Technicien Prêts Immobiliers (CDD)",
        achievements: [
          <>Participation à la gestion opérationnelle et administrative des crédits immobiliers pour les clients particuliers.</>,
          <>Traitement des dossiers de financement : vérification des pièces justificatives, conformité réglementaire, complétude des documents</>,
          <>Saisie et mise à jour des informations clients dans les outils internes de gestion bancaire</>,
          <>Suivi de l’avancement des dossiers et relances en cas de pièces manquantes ou incohérences</>,
          <>Interaction avec les agences et chargés de clientèle pour assurer un traitement fluide et réactif</>,
          <>Application des procédures internes en lien avec la conformité bancaire, la lutte contre la fraude et le respect des délais d’instruction</>,
          <>Familiarisation avec les outils métiers et les processus de financement dans le secteur bancaire</>,
        ],
        images: [],
      },
      
    ],
  },


// ====== FORMATIONS (bloc unique avec AccordionGroup amélioré) ======
studies: {
  display: true,
  title: "Formations",
  institutions: [
    {
      name: "Université Paris Dauphine – PSL",
      description: (
        <>
          {/* Intro mieux formulée + respiration */}
          <Text variant="label-strong-m">Parcours universitaire (L1 → M1)</Text><br />
          <Text align="justify" marginTop="8" marginBottom="16">
            Parcours progressif en mathématiques, informatique et systèmes d’information. 
            Aujourd’hui en <strong>M1 MIAGE</strong>, je consolide mes bases logicielles et décisionnelles 
            tout en approfondissant le <strong>Machine Learning</strong> et le <strong>MLOps</strong> via le projet 
            <strong> Quant-Ops</strong> (orchestration, traçabilité, containers, messaging).
          </Text> <br />


          {/* Titre d’accordéon custom (couleur marque + icône) */}
          <AccordionGroup
            style={{ marginTop: 8 }}  // espace au-dessus de l’accordéon
            items={[
              {
                title: (
                  <Row gap="8" vertical="center">
                    <Text variant="label-strong-m" onBackground="brand-strong">Master MIAGE (M1) — 2025–2026</Text>
                  </Row>
                ),
                content: (
                  <Column gap="8">
                    <Text variant="label-strong-s">IA & Décision</Text>
                    <List>
                      <ListItem>Artificial Intelligence</ListItem>
                      <ListItem>Machine Learning and Applications</ListItem>
                      <ListItem>Décision collective et multicritère</ListItem>
                      <ListItem>Decision Under Uncertainty</ListItem>
                      <ListItem>Computer Ethics &amp; Data Protection</ListItem>
                    </List>

                    <Line marginTop="8" />
                    <Text variant="label-strong-s">Développement & Systèmes d’information</Text>
                    <List>
                      <ListItem>Programmation Objet avancée</ListItem>
                      <ListItem>Programmation Web</ListItem>
                      <ListItem>Systèmes et algorithmes répartis</ListItem>
                      <ListItem>Systèmes d’information avancés</ListItem>
                      <ListItem>Data Base Management System</ListItem>
                      <ListItem>Sécurité des systèmes d’information</ListItem>
                      <ListItem>Business Process Management</ListItem>
                    </List>

                    <Line marginTop="8" />
                    <Text variant="label-strong-s">Business & Management</Text>
                    <List>
                      <ListItem>Organisation et communication</ListItem>
                      <ListItem>Marketing</ListItem>
                      <ListItem>Marchés financiers</ListItem>
                      <ListItem>Notions générales de droit</ListItem>
                      <ListItem>Jeux d’entreprise</ListItem>
                      <ListItem>Anglais professionnel</ListItem>
                    </List>
                  </Column>
                ),
              },
              {
                title: (
                  <Row gap="8" vertical="center">
                    <Icon name="book-open" />
                    <Text variant="label-strong-m" onBackground="brand-strong">Licence MIAGE (L3) — 2024–2025</Text>
                  </Row>
                ),
                content: (
                  <Column gap="8">
                    <Text variant="label-strong-s">Data, Modélisation & Logique</Text>
                    <List>
                      <ListItem>Analyse de données</ListItem>
                      <ListItem>Probabilités et statistiques</ListItem>
                      <ListItem>Introduction to Logic</ListItem>
                      <ListItem>Modélisation en programmation linéaire</ListItem>
                    </List>

                    <Line marginTop="8" />
                    <Text variant="label-strong-s">Développement & Systèmes</Text>
                    <List>
                      <ListItem>Java-Objet</ListItem>
                      <ListItem>Systèmes d’exploitation</ListItem>
                      <ListItem>Réseaux : infrastructures</ListItem>
                      <ListItem>Algorithmes et applications dans les graphes</ListItem>
                      <ListItem>Bases de données relationnelles</ListItem>
                      <ListItem>Ingénierie des systèmes d’information</ListItem>
                    </List>

                    <Line marginTop="8" />
                    <Text variant="label-strong-s">Communication & Langues</Text>
                    <List>
                      <ListItem>Communication — analyse et pratique</ListItem>
                      <ListItem>Sociologie des organisation</ListItem>
                      <ListItem>Critical thinking</ListItem>
                      <ListItem>Anglais</ListItem>
                    </List>
                  </Column>
                ),
              },
              {
                title: (
                  <Row gap="8" vertical="center">
                    <Icon name="layers" />
                    <Text variant="label-strong-m" onBackground="brand-strong"> Licence Mathématiques-Informatique (L1–L2)</Text>
                  </Row>
                ),
                content: (
                  <Column gap="8">
                    <Text variant="label-strong-s">Maths fondamentales & Numérique</Text>
                    <List>
                      <ListItem>Algèbre linéaire</ListItem>
                      <ListItem>Analyse</ListItem>
                      <ListItem>Algèbre &amp; méthodes numériques</ListItem>
                      <ListItem>Probabilité</ListItem>
                    </List>

                    <Line marginTop="8" />
                    <Text variant="label-strong-s">Algo, Informatique & Sciences sociales</Text>
                    <List>
                      <ListItem>Algorithmique et programmation (Python)</ListItem>
                      <ListItem>Macroéconomie</ListItem>
                      <ListItem>Microéconomie</ListItem>
                      <ListItem>Enjeux écologiques du XXIᵉ siècle</ListItem>
                    </List>

                    <Line marginTop="8" />
                    <Text variant="label-strong-s">Ouverture</Text>
                    <List>
                      <ListItem>Introduction to Finance</ListItem>
                      <ListItem>Langues (Anglais et Espagnol)</ListItem>
                    </List>
                  </Column>
                ),
              },
            ]}
          />
        </>
      ),
    },
  ],
},

  // ====== COMPÉTENCES TECHNIQUES ======
  technical: {
    display: true,
    title: "Compétences techniques",
    skills: [
      {
        title: "MLOps & pipelines (apprentissage en cours)",
        description: (
          <>
            Conception de chaînes complètes : ingestion → préparation → entraînement → évaluation → déploiement → suivi (logs/metrics).  
            Je m’intéresse particulièrement à la <strong> mise en production et au CI/CD</strong>, c’est-à-dire à tout le cycle
            <strong> du développement à la production</strong>, incluant l’automatisation des tests, du packaging et du déploiement.
            Je progresse activement sur l’orchestration, la traçabilité et la messagerie (Kafka).
            <List>
              <ListItem>Orchestration : Airflow (DAGs, sensors, retries, scheduling)</ListItem>
              <ListItem>Expérimentations : MLflow (runs, paramètres, métriques, artefacts)</ListItem>
              <ListItem>Conteneurs & packaging : Docker, images reproductibles</ListItem>
              <ListItem>CI/CD : automatisation des pipelines de déploiement (GitHub Actions, intégration continue)</ListItem>
              <ListItem>Messagerie : Kafka (topics, partitions, offsets)</ListItem>
            </List>
          </>
        ),
        tags: [
          { name: "MLflow", icon: "mlflow" },
          { name: "Airflow", icon: "airflow" },
          { name: "Docker", icon: "docker" },
          { name: "Kafka", icon: "kafka" },
          { name: "FastAPI", icon: "fastapi" },
          { name: "Django", icon: "django" },
          { name: "GitHub Actions (CI/CD)", icon: "github" },
        ],
        images: [],
      },
      {
        title: "Data Science (modèles & évaluation)",
        description: (
          <>
            Préparation des données, features, entraînement supervisé, validation croisée, évaluation et monitoring basique
            (tableaux de bord simples).
          </>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "Pandas", icon: "python" },
          { name: "scikit-learn", icon: "python" },
          { name: "SciPy", icon: "python" },
          { name: "NumPy", icon: "python" },
          { name: "SQL", icon: "database" },
        ],
        images: [],
      },
      {
        title: "LLM & automatisation",
        description: (
          <>
            <Text align="justify" style={{ textAlign: "justify", textJustify: "inter-word" }}>
              Utilisation de <strong>modèles de langage</strong> pour l’automatisation et l’analyse. 
              Classification locale via <strong>Ollama</strong>, expérimentation de modèles hébergés sur 
              <strong> Hugging Face</strong> et interaction avec des APIs comme <strong>ChatGPT. </strong>
            </Text>

            <Text align="justify" style={{ textAlign: "justify", textJustify: "inter-word" }}>
              Intégrations concrètes avec <strong>Crisp</strong> et <strong>Moodle</strong> pour la 
              catégorisation, la normalisation des sorties et l’évaluation automatique. 
              Développement de <strong>scripts d’automatisation</strong> pour orchestrer et comparer 
              les performances des modèles.
            </Text>

            <List marginTop="8">
              <ListItem>Intégration d’APIs LLM (ChatGPT, Hugging Face, Ollama)</ListItem>
              <ListItem>Pipeline local de classification et d’extraction</ListItem>
              <ListItem>Automatisation d’évaluations (JSON, parsing, cohérence des sorties)</ListItem>
              <ListItem>Connecteurs vers Crisp &amp; Moodle</ListItem>
            </List>
          </>
        ),
        tags: [
          { name: "Ollama", icon: "ai" },
          { name: "Hugging Face", icon: "huggingface" },
          { name: "ChatGPT", icon: "openai" },
          { name: "Pydantic", icon: "pydantic" },
          { name: "LangChain", icon: "langchain" },
          { name: "Crisp", icon: "bolt" },
          { name: "Scripting", icon: "terminal" },
        ],
        images: [],
      },
      {
        title: "Java & systèmes",
        description: (
          <>
            Développement orienté objet en Java, interfaces JavaFX, accès aux données (JDBC), PostgreSQL et tests (JUnit).
          </>
        ),
        tags: [
          { name: "Java", icon: "java" },
          { name: "JavaFX", icon: "code" },
          { name: "PostgreSQL", icon: "postgres" },
          { name: "JUnit5", icon: "test" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Articles : data, MLOps et mise en production",
  description: `Dernières publications et retours d’expérience de ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Projets",
  title: `Projets – ${person.name}`,
  description: `Sélection de projets techniques (données, MLOps et développement) avec explications détaillées et limites connues.`,
};

export { person, social, newsletter, home, about, blog, work };