import { Helmet } from 'react-helmet-async';

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Pramod Yadav',
  jobTitle: 'Full-Stack Developer & Automation/AI Engineer',
  description: 'B.Tech Mathematics & Computing at RGIPT. Building automation tools, LLM-integrated apps, and full-stack products.',
  url: 'https://my-personal-developer-portfolio.onrender.com',
  sameAs: [
    'https://github.com/Prm01',
    'https://linkedin.com/in/pramod-yadav-7810b5299'
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Rajiv Gandhi Institute of Petroleum Technology (RGIPT)'
  },
  knowsAbout: ['React', 'Node.js', 'Python', 'Machine Learning', 'Automation', 'Full-Stack Development']
};

export default function SEO({
  title = 'Pramod Yadav | Full-Stack Developer & Automation/AI Engineer',
  description = 'B.Tech Mathematics & Computing at RGIPT. Building automation tools, LLM-integrated apps, and full-stack products. Explore my projects.',
  keywords = 'Pramod Yadav, Full Stack Developer, Automation Engineer, MERN, React, Node.js, Python, Machine Learning, RGIPT',
  image = '/og-image.png'
}) {
  const url = typeof window !== 'undefined' ? window.location.href : 'https://my-personal-developer-portfolio.onrender.com';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Pramod Yadav" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={url} />

      {/* Person schema */}
      <script type="application/ld+json">
        {JSON.stringify(PERSON_SCHEMA)}
      </script>
    </Helmet>
  );
}
