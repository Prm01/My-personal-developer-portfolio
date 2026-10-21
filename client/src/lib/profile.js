export const PROFILE = {
  name: 'Pramod Yadav',
  role: 'Full Stack & AI Developer',
  githubUsername: 'Prm01',
  githubUrl: 'https://github.com/Prm01',
  linkedinUrl: 'https://linkedin.com/in/pramod-yadav-7810b5299',
  email: '23mc3037@rgipt.ac.in',
  secondaryEmail: 'pramodyadav2948@gmail.com',
  codechefUrl: 'https://www.codechef.com/users/pramod_yadav',
  codeforcesUrl: 'https://codeforces.com/profile/Prm01',
  geeksforgeeksUrl: 'https://www.geeksforgeeks.org/user/pramodyadav2948/',
  codolioUrl: 'https://codolio.com/profile/xcodex',
  institution: 'Rajiv Gandhi Institute of Petroleum Technology (RGIPT)',
  degree: 'B.Tech Mathematics & Computing',
  batch: '2027',
  resumeUrl: '/resume.pdf',
  resumeDriveUrl:
    'https://drive.google.com/open?id=1dephhzBTIKX-E0BAzrMot2fsc0T82vrU'
};

/** Absolute URL to the PDF — avoids broken iframe/embed with relative paths on some hosts. */
export function getResumePdfHref() {
  if (typeof window === 'undefined') return '/resume.pdf';
  const base = import.meta.env.BASE_URL || '/';
  try {
    return new URL('resume.pdf', window.location.origin + base).href;
  } catch {
    return '/resume.pdf';
  }
}
