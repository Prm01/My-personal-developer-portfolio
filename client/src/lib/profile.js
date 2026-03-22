export const PROFILE = {
  name: 'Pramod Yadav',
  githubUsername: 'Prm01',
  githubUrl: 'https://github.com/Prm01',
  linkedinUrl: 'https://www.linkedin.com/in/pramod-yadav-7810b5299/',
  leetcodeUrl: 'https://leetcode.com/u/PramodYadav1/',
  codolioUrl: 'https://codolio.com/profile/xcodex',
  resumeUrl: '/resume.pdf',
  /**
   * Shared folder (Anyone with the link can view) — opens in Drive.
   * Prefer open?id= — works more reliably than /drive/folders/ alone.
   */
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

