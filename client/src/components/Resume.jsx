import { Download } from 'lucide-react';

import SectionShell from './ui/SectionShell';
import TiltCard from './ui/TiltCard';
import { PrimaryLink, SecondaryLink } from './ui/Buttons';
import { PROFILE, getResumePdfHref } from '../lib/profile';

export default function Resume() {
  const pdfHref = getResumePdfHref();

  return (
    <SectionShell
      id="resume"
      label="06 — Resume"
      title="Resume, ready to share"
      subtitle="A clean, recruiter-friendly snapshot — downloadable from here or Google Drive."
      className="bg-white dark:bg-slate-900/10"
    >
      <div className="max-w-2xl mx-auto">
        <TiltCard className="p-7 md:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-500">
                PDF
              </p>
              <h3 className="mt-2 text-2xl font-display font-semibold text-slate-900 dark:text-white">
                Download Resume
              </h3>
              <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                If you like what you see, this is the fastest way to get the full
                picture—skills, projects, and experience in one page.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryLink href={pdfHref} download="Pramod-Yadav-Resume.pdf">
                  Download
                </PrimaryLink>
                <SecondaryLink href={PROFILE.resumeDriveUrl} icon="external">
                  Google Drive
                </SecondaryLink>
              </div>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-rose-500/10 flex items-center justify-center shrink-0">
              <Download size={18} className="text-violet-600 dark:text-violet-300" />
            </div>
          </div>
        </TiltCard>
      </div>
    </SectionShell>
  );
}
