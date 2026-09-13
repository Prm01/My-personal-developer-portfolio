export const FEATURED_PROJECT_IDS = ['p1', 'p2', 'p3'];

export const FALLBACK_PROJECTS_PREMIUM = [
  {
    _id: 'p1',
    title: 'AIR_Q – Urban Air Quality Intelligence',
    description:
      'Multi-source pipeline (OpenAQ, CPCB, NASA FIRMS) powering an XGBoost model for 7-day AQI forecasting with SHAP-based source attribution and LLM-powered health advisories.',
    techStack: ['Python', 'Streamlit', 'XGBoost', 'SHAP', 'scikit-learn', 'SQLite', 'Gemini'],
    highlights: [
      'Built multi-source data pipeline ingesting OpenAQ, CPCB, and NASA FIRMS data.',
      'XGBoost model for 7-day AQI forecasting with SHAP-based source attribution and anomaly detection.',
      'LLM-powered health advisory (Hugging Face, Gemini, template fallback) across 10 cities.',
      'What-if AQI simulator and deployed on Render.'
    ],
    impact: ['7-day AQI forecast', 'SHAP attribution', 'LLM health advisory'],
    github: 'https://github.com/Prm01',
    live: null,
    image: '/projects/aqi.png',
    featured: true
  },
  {
    _id: 'p2',
    title: 'LinkedIn Lead Chrome Extension',
    description:
      'Live on the Chrome Web Store — converts LinkedIn people-search results into CRM leads via REST API with a daily-cap counter, Playwright automation, and Apollo.io verified-email retrieval.',
    techStack: ['JavaScript', 'Chrome Extension', 'Playwright', 'Apollo.io', 'REST API'],
    highlights: [
      'Live on Chrome Web Store; converts LinkedIn search results into CRM leads in real time.',
      'Playwright + Apollo.io automated verified-email retrieval — 67% faster (30→10 min).',
      'Token auth, retry logic, and duplicate-lead detection built in.'
    ],
    impact: ['67% faster lead processing', 'Chrome Web Store', 'Duplicate detection'],
    github: 'https://github.com/Prm01',
    live: null,
    image: null,
    featured: true
  },
  {
    _id: 'p3',
    title: 'Doctor Appointment System',
    description:
      'Full-stack healthcare booking platform with 3 role-based dashboards (Patient/Doctor/Admin), JWT-secured REST APIs, payment workflows, and cloud deployment on Render.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    highlights: [
      'Three role-based dashboards: Patient, Doctor, and Admin with distinct workflows.',
      'JWT-secured REST APIs for authentication, booking, and payment flows.',
      'Deployed on Render with full CI/CD pipeline.'
    ],
    impact: ['Role-based dashboards', 'JWT auth', 'Deployed on Render'],
    github: 'https://github.com/Prm01',
    live: 'https://full-stack-project-1-vau7.onrender.com/',
    image: '/projects/doctor.png',
    featured: true
  }
];

export const EXPERIENCE = [
  {
    id: 'e1',
    role: 'Automation Intern',
    org: 'Polluxa',
    period: 'May 2026 – Jul 2026',
    desc: 'Built a Chrome extension (content scripts, service workers, REST APIs) writing leads into a CRM in real time. Built Python/JavaScript Playwright automation cutting lead-processing time 67% (30→10 min). Integrated Apollo.io APIs with token auth, retries, and duplicate detection. Promoted from Product Intern to Automation Intern in 1 month. Contributed to a 20% increase in client acquisition.',
    tags: ['Python', 'JavaScript', 'Playwright', 'REST API', 'Claude'],
    highlight: 'Promoted in 1 month · 20% client acquisition increase'
  },
  {
    id: 'e2',
    role: 'Design Executive / Coordinator',
    org: 'GDSC RGIPT',
    period: 'Aug 2024 – Aug 2026',
    desc: 'Led a student volunteer team for event planning and execution. Designed event posters and creatives. Facilitated Google Cloud Arcade peer learning with 500+ badges completed by participants.',
    tags: ['Canva', 'Adobe', 'Leadership', 'Google Cloud'],
    highlight: '500+ Cloud Arcade badges · Event design lead'
  }
];

export const EDUCATION = [
  {
    id: 'ed1',
    degree: 'B.Tech – Mathematics & Computing',
    institute: 'Rajiv Gandhi Institute of Petroleum Technology (RGIPT)',
    location: 'Jais, Uttar Pradesh',
    period: 'Aug 2023 – May 2027',
    tags: ['Mathematics', 'Computing', 'Algorithms', 'ML']
  },
  {
    id: 'ed2',
    degree: 'Senior Secondary (Class XII) – PCM',
    institute: 'City Montessori Inter College',
    location: 'Lucknow, Uttar Pradesh',
    period: '2021 – 2023',
    tags: ['Physics', 'Chemistry', 'Mathematics']
  }
];

export const AWARDS = [
  {
    id: 'a1',
    title: 'JEE Main & Advanced',
    desc: 'Ranked in top 2% nationally among 1M+ candidates.'
  },
  {
    id: 'a2',
    title: '500+ DSA Problems Solved',
    desc: 'Across LeetCode, CodeChef, Codeforces, InterviewBit, and GeeksForGeeks.'
  },
  {
    id: 'a3',
    title: 'Merit-cum-Scholarship',
    desc: 'Awarded to top 10% of students at RGIPT based on academic performance.'
  }
];

export const HACKATHONS = [
  {
    id: 'h1',
    name: 'Indo–Russia Hackathon',
    result: 'Hackathon in progress',
    badge: 'Ongoing',
    role: 'Full Stack Developer',
    description:
      'Currently working on an AI-powered loan sales and approval system designed for real-world constraints and fast iteration.',
    tech: ['MERN Stack', 'Machine Learning'],
    icon: 'trophy',
    dateLabel: 'Hackathon'
  },
  {
    id: 'h2',
    name: 'Krish AI Hackathon',
    result: 'Government Problem Statement',
    role: 'AI/ML Developer',
    description:
      'Built an AI-powered solution for real-world challenges based on a government problem statement.',
    tech: ['Python', 'Machine Learning', 'APIs'],
    icon: 'award',
    dateLabel: 'Hackathon'
  },
  {
    id: 'h3',
    name: 'EY Techathon 6.0',
    result: 'Selected for Round 2',
    badge: 'Selected for Round 2 — National Level',
    role: 'Full Stack Developer',
    description:
      'Built an AI-powered chatbot for loan assistance that automates customer queries and supports loan-related decision-making.',
    tech: ['MERN Stack', 'AI/ML', 'APIs', 'AI Chatbot', 'Finance'],
    icon: 'code',
    dateLabel: 'Hackathon'
  }
];

export const OSS_HIGHLIGHTS = [
  {
    id: 'o1',
    repo: 'neutrallinojs-cli',
    description:
      'CLI improvements and contributions focused on reliability, DX, and release readiness.',
    tech: ['Node.js', 'CLI'],
    url: 'https://github.com/search?q=neutrallinojs-cli&type=repositories'
  },
  {
    id: 'o2',
    repo: 'Swiggy Clone (Live API)',
    description:
      'Food delivery UI with live restaurant and menu APIs, cart flow, and responsive styling.',
    tech: ['React', 'REST APIs', 'CSS'],
    url: 'https://github.com/Prm01'
  },
  {
    id: 'o3',
    repo: 'Other meaningful repos',
    description:
      'Smaller contributions, fixes, and iterations across projects — focused on reliability and developer experience.',
    tech: ['Open Source', 'Collaboration', 'DX'],
    url: 'https://github.com/Prm01?tab=repositories'
  }
];
