export const FEATURED_PROJECT_IDS = []; // optional: set to project _id values from API

export const FALLBACK_PROJECTS_PREMIUM = [
  {
    _id: 'p1',
    title: 'Air Quality Index (AQI) Prediction',
    description:
      'Machine Learning model to predict AQI using pollutant data (CO, Ozone, NO2, PM2.5) with clear evaluation and visualization.',
    techStack: [
      'Python',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Matplotlib',
      'Seaborn'
    ],
    highlights: [
      'Developed a Random Forest regression model achieving high prediction accuracy for AQI values.',
      'Performed data cleaning, feature selection, and correlation analysis of pollutants.',
      'Visualized Actual vs Predicted AQI trends and implemented AQI category mapping (Good, Moderate, Unhealthy, etc.).'
    ],
    impact: ['Random Forest', 'AQI category mapping', 'Actual vs Predicted charts'],
    github: 'https://github.com/Prm01',
    live: null,
    image: '/projects/aqi.png',
    featured: true
  },
  {
    _id: 'p2',
    title: 'Doctor Appointment System',
    description:
      'Full-stack MERN appointment booking with role-based dashboards for Patient, Doctor, and Admin — plus JWT auth and cloud deployment.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST'],
    highlights: [
      'Built responsive frontend using React.js with role-based dashboards for Patient, Doctor, and Admin.',
      'Designed RESTful backend APIs for authentication, booking, and payments.',
      'Implemented secure JWT-based authentication and role-based access.',
      'Built database schema for users, doctors, appointments, transactions.',
      'Deployed backend on cloud using Render.'
    ],
    impact: ['Role-based dashboards', 'JWT auth', 'Deployed on Render'],
    github: 'https://github.com/Prm01',
    live: null,
    image: '/projects/doctor.png',
    featured: true
  },
  {
    _id: 'p3',
    title: 'Portfolio Website',
    description:
      'Responsive developer portfolio with premium animations, dark/light mode, and modern layout techniques for a strong first impression.',
    techStack: [
      'React.js',
      'HTML5',
      'CSS3',
      'JavaScript',
      'Responsive Design'
    ],
    highlights: [
      'Implemented advanced CSS features including Grid, Flexbox, animations, and dark/light mode.',
      'Optimized for mobile devices, improving mobile engagement by 30%.'
    ],
    impact: ['Dark/Light mode', 'CSS Grid + Flexbox', 'Mobile-first UX'],
    github: 'https://github.com/Prm01',
    live: null,
    image: '/projects/portfolio.svg',
    featured: true
  },
  {
    _id: 'p4',
    title: 'ESP Website',
    description:
      'A modern, responsive website experience with premium UI, performance-minded layout, and a clean content structure.',
    techStack: ['React', 'Tailwind', 'Framer Motion'],
    github: 'https://github.com/Prm01',
    live: null,
    image: null
  },
  {
    _id: 'p5',
    title: 'Weather App',
    description:
      'Weather forecast experience with a minimalist UI, quick search, and API-driven states.',
    techStack: ['React', 'APIs', 'Tailwind'],
    github: 'https://github.com/Prm01',
    live: null,
    image: null
  },
  {
    _id: 'p6',
    title: 'GitHub Profile Viewer',
    description:
      'A fast GitHub profile explorer with repo insights, clean loading states, and a smooth search-driven UX.',
    techStack: ['React', 'GitHub API', 'Tailwind'],
    github: 'https://github.com/Prm01',
    live: null,
    image: null
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
      'Built an AI-powered chatbot for loan assistance that automates customer queries and supports loan-related decision-making across the journey.',
    tech: ['MERN Stack', 'AI/ML', 'APIs', 'AI Chatbot', 'Finance', 'Hackathon'],
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
    repo: 'ESP Website',
    description:
      'Website enhancements with modern UI patterns and performance-minded styling.',
    tech: ['React', 'Tailwind'],
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

