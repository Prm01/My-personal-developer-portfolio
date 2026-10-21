import { Helmet } from 'react-helmet-async';
import { PROFILE } from '../lib/profile';

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFILE.name,
  jobTitle: 'Full Stack & AI Developer',
  description: 'B.Tech Mathematics & Computing at RGIPT (2027). Open Source Contributor to Learning Unlimited and Neutralinojs. Building distributed systems, agentic AI pipelines, and high-performance applications.',
  url: 'https://my-personal-developer-portfolio.onrender.com',
  email: PROFILE.email,
  sameAs: [
    PROFILE.githubUrl,
    PROFILE.linkedinUrl,
    PROFILE.codeforcesUrl,
    PROFILE.codechefUrl
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Rajiv Gandhi Institute of Petroleum Technology (RGIPT)'
  },
  knowsAbout: [
    'Full Stack Development',
    'Artificial Intelligence',
    'FastAPI',
    'React',
    'PostgreSQL',
    'AWS Bedrock',
    'LangChain',
    'TrOCR',
    'Node.js',
    'Docker',
    'Competitive Programming',
    'Mathematics & Computing'
  ]
};

export default function SEO({
  title = 'Pramod Yadav | Full Stack & AI Developer | Open Source Contributor (RGIPT 2027)',
  description = 'Pramod Yadav — B.Tech Mathematics & Computing at RGIPT. Full Stack & AI Developer. Open Source: contributed to two organizations, Learning Unlimited and Neutralinojs. Projects: Rahat (AWS Bedrock), BhoomiAI (TrOCR + LangChain), and MERN platforms.',
  keywords = 'Pramod Yadav, Full Stack Developer, AI Developer, RGIPT, Mathematics and Computing, Rahat, BhoomiAI, FastAPI, AWS Bedrock, TrOCR, LangChain, Neutralinojs, Learning Unlimited, CodeChef, Codeforces, GeeksforGeeks, React, Node.js',
  image = '/og-image.png'
}) {
  const url = typeof window !== 'undefined' ? window.location.href : 'https://my-personal-developer-portfolio.onrender.com';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Pramod Yadav" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(PERSON_SCHEMA)}
      </script>
    </Helmet>
  );
}
