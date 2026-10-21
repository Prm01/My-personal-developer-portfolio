export const STATS = [
  {
    id: 's1',
    numericValue: 500,
    suffix: '+',
    label: 'DSA Problems Solved',
    sub: 'CodeChef · Codeforces · GeeksforGeeks'
  },
  {
    id: 's2',
    numericValue: 2,
    prefix: 'Top ',
    suffix: '%',
    label: 'JEE Advanced Qualified',
    sub: 'National rank among 1.2M+ candidates'
  },
  {
    id: 's3',
    numericValue: 3,
    suffix: ' Major',
    label: 'Production & AI Projects',
    sub: 'Deployed full-stack & agentic systems'
  }
];

export const PROJECTS = [
  {
    id: 'rahat',
    title: 'Rahat: Urban Flood & Heat Early Warning',
    tagline: 'Heat and flood early warning system for Delhi\'s 290 municipal wards',
    problem: 'Urban flood and extreme heat events endanger vulnerable populations across Delhi\'s 290 municipal wards without timely localized warnings.',
    categories: ['Full Stack', 'AI', 'Backend'],
    outcomes: [
      'Built real-time heat and flood early warning pipeline covering Delhi\'s 290 wards using FastAPI and PostgreSQL.',
      'Orchestrated cloud architecture with AWS Bedrock, Rekognition, S3, RDS, CloudFront, MCP server protocols, and Web Push notifications.',
      'Ensured mission-critical stability and sub-second dispatch with 35 comprehensive end-to-end integration tests.'
    ],
    techStack: [
      'FastAPI',
      'PostgreSQL',
      'AWS Bedrock',
      'AWS Rekognition',
      'AWS S3',
      'AWS RDS',
      'CloudFront',
      'MCP',
      'Web Push',
      '35 e2e tests'
    ],
    image: '/projects/rahat.svg',
    live: 'https://d17rx6mkixl5iz.cloudfront.net/',
    github: 'https://github.com/Prm01/Rahat',
    featured: true
  },
  {
    id: 'bhoomi',
    title: 'BhoomiAI: Land Record Digitization',
    tagline: 'Land record digitization and agentic validation platform',
    problem: 'Manual land record digitization is slow, error-prone, and susceptible to title fraud and archival misinterpretation.',
    categories: ['AI', 'Full Stack'],
    outcomes: [
      'Automated archival document digitization utilizing TrOCR models paired with LangChain agentic verification pipelines.',
      'Achieved 92% field extraction accuracy across complex, degraded vernacular land record documents.',
      'Slashed document processing turnaround time from 15 minutes to under 1 minute per record (>93% latency reduction).'
    ],
    techStack: [
      'TrOCR',
      'LangChain',
      'Agentic AI',
      'Python',
      'FastAPI',
      'React',
      'Computer Vision'
    ],
    image: '/projects/bhoomi.svg',
    live: 'https://smart-land-digitization.vercel.app/',
    github: 'https://github.com/Prm01',
    featured: true
  },
  {
    id: 'doctor',
    title: 'Doctor Appointment System',
    tagline: 'Full-stack healthcare booking platform with role dashboards',
    problem: 'Healthcare scheduling bottlenecks and inaccessible interfaces limit timely patient care and doctor availability management.',
    categories: ['Full Stack', 'Backend'],
    outcomes: [
      'Architected full-stack MERN booking platform featuring 3 role-based dashboards (Patient, Doctor, Admin) with JWT security.',
      'Elevated Lighthouse accessibility audit score from 79 to a perfect 100 with WCAG compliant UI patterns.',
      'Implemented secure REST APIs, payment workflows, and automated cloud deployment on Render with CI/CD.'
    ],
    techStack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'Tailwind CSS',
      'Render'
    ],
    image: '/projects/doctor.png',
    live: 'https://full-stack-project-1-vau7.onrender.com/',
    github: 'https://github.com/Prm01',
    featured: true
  },
  {
    id: 'finance',
    title: 'Finance Dashboard UI',
    tagline: 'High-performance portfolio and analytics dashboard',
    problem: 'Financial users need dense, real-time portfolio analytics and cash flow visualizations without layout shifts or render lag.',
    categories: ['Full Stack'],
    outcomes: [
      'Engineered interactive financial analytics interface with responsive charting, KPI summaries, and transaction logging.',
      'Optimized component rendering and memoized state for zero-lag interactions and glassmorphism UI styling.',
      'Deployed to production on Render with responsive cross-device layouts and 95+ mobile and desktop performance benchmarks.'
    ],
    techStack: [
      'React.js',
      'Tailwind CSS',
      'Vite',
      'Lucide Icons',
      'Responsive Design',
      'Render'
    ],
    image: '/projects/finance.svg',
    live: 'https://finance-dashboard-ui-1.onrender.com/',
    github: 'https://github.com/Prm01',
    featured: true
  }
];

export const EXPERIENCE_DATA = [
  {
    id: 'polluxa',
    role: 'Automation Intern',
    org: 'Polluxa',
    period: 'May 2026 – Jul 2026',
    location: 'Remote',
    summary: 'Automated high-volume lead pipelines, built CRM test automation tools, and resolved core infrastructure issues.',
    bullets: [
      'Reduced lead-processing turnaround time from 30 minutes to 10 minutes per lead (67% faster processing) via automated Python/JS Playwright workflows and Chrome extensions.',
      'Drove a +20% increase in qualified client acquisition by integrating Apollo.io verified-email retrieval with REST APIs, token authentication, and deduplication logic.',
      'Built a dedicated CRM test automation tool and resolved 20 of 25+ critical automation and pipeline issues to achieve robust production stability.'
    ],
    tags: ['Python', 'JavaScript', 'Playwright', 'Chrome Extensions', 'REST APIs', 'Apollo.io', 'CRM Test Automation']
  }
];

export const SKILL_GROUPS = [
  {
    id: 'frontend',
    category: 'Frontend',
    iconName: 'Layout',
    skills: ['React.js', 'Vite', 'Tailwind CSS', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Responsive Design']
  },
  {
    id: 'backend',
    category: 'Backend',
    iconName: 'Server',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'PostgreSQL', 'MongoDB', 'JWT Auth']
  },
  {
    id: 'cloud',
    category: 'Cloud & DevOps',
    iconName: 'Cloud',
    skills: ['AWS Bedrock', 'AWS Rekognition', 'AWS S3', 'AWS RDS', 'CloudFront', 'Docker', 'Git & GitHub', 'GitHub Actions', 'CI/CD', 'Render', 'Vercel']
  },
  {
    id: 'ai',
    category: 'AI-ML',
    iconName: 'Cpu',
    skills: ['TrOCR', 'LangChain', 'Model Context Protocol (MCP)', 'Python', 'Computer Vision', 'Hugging Face', 'Gemini API', 'scikit-learn']
  },
  {
    id: 'languages',
    category: 'Languages',
    iconName: 'Code2',
    skills: ['C++', 'Python', 'JavaScript', 'SQL', 'HTML / CSS']
  }
];

export const OPEN_SOURCE_DATA = {
  headline: 'Contributed on GSoC',
  contributions: [
    {
      id: 'neutralinojs',
      name: 'Neutralinojs (neutralinojs-cli)',
      type: 'Desktop Application Framework',
      description: 'Contributed to the portable cross-platform desktop application framework CLI, focusing on CLI stability, toolchain reliability, developer experience (DX), and release readiness.',
      tech: ['Node.js', 'CLI', 'Tooling', 'Open Source'],
      prUrl: 'https://github.com/search?q=org%3Aneutralinojs+author%3APrm01&type=pullrequests',
      repoUrl: 'https://github.com/neutralinojs/neutralinojs-cli'
    },
    {
      id: 'learning-unlimited',
      name: 'Learning Unlimited (ESP-Website)',
      type: 'Educational Logistics Platform',
      description: 'Contributed to the open-source educational software powering Splash programs nationwide. Solved platform issues, improved interface workflows, and collaborated on PR reviews.',
      tech: ['Python', 'Web Framework', 'Logistics', 'Open Source'],
      prUrl: 'https://github.com/search?q=org%3Alearning-unlimited+author%3APrm01&type=pullrequests',
      repoUrl: 'https://github.com/learning-unlimited/ESP-Website'
    }
  ],
  gsocNote: {
    badge: 'Contributed on GSoC',
    title: 'Contributed on GSoC (Google Summer of Code)',
    text: 'Contributed on GSoC with a dedicated focus on open-source developer tooling, system automation, and agentic AI workflows. Committed to steady contribution cadences, transparent PR reviews, and community collaboration.'
  }
};

export const CODING_PROFILES = [
  {
    id: 'codechef',
    platform: 'CodeChef',
    handle: 'pramod_yadav',
    url: 'https://www.codechef.com/users/pramod_yadav',
    description: 'Active competitive programmer solving algorithmic challenges in division contests.',
    accent: '#b45309'
  },
  {
    id: 'codeforces',
    platform: 'Codeforces',
    handle: 'Prm01',
    url: 'https://codeforces.com/profile/Prm01',
    description: 'Regular participant in rated rounds focusing on graph theory, trees, and dynamic programming.',
    accent: '#2563eb'
  },
  {
    id: 'geeksforgeeks',
    platform: 'GeeksforGeeks',
    handle: 'pramodyadav2948',
    url: 'https://www.geeksforgeeks.org/user/pramodyadav2948/',
    description: 'Extensive problem solving in data structures, algorithms, and core computing fundamentals.',
    accent: '#16a34a'
  }
];

export const ACHIEVEMENTS_DATA = [
  {
    id: 'jee',
    title: 'JEE Main & Advanced Qualified (Top 2%)',
    description: 'Ranked in the top 2% nationally among over 1.2 million aspirants in India\'s premier engineering entrance examinations.',
    badge: 'National Rank'
  },
  {
    id: 'scholarship',
    title: 'RGIPT Merit-cum-Means Scholarship',
    description: 'Awarded to top academic performers in B.Tech Mathematics & Computing at Rajiv Gandhi Institute of Petroleum Technology.',
    badge: 'Academic Merit'
  },
  {
    id: 'gdsc',
    title: 'Design Executive at GDSC RGIPT',
    description: 'Led visual design initiatives and technical student activities; facilitated peer learning programs with 500+ cloud badges earned.',
    badge: 'Leadership'
  }
];
