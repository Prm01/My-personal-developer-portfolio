import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'Pramod Yadav | Full Stack Developer & AI Enthusiast',
  description = 'B.Tech Mathematics & Computing at RGIPT. Full Stack Developer specializing in MERN stack, Machine Learning, and AI. Explore my projects and get in touch.',
  keywords = 'Pramod Yadav, Full Stack Developer, MERN, React, Node.js, MongoDB, Machine Learning, AI, RGIPT',
  image = '/og-image.png'
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
    </Helmet>
  );
}
