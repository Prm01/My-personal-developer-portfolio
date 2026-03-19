import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

import SectionShell from './ui/SectionShell';
import TiltCard from './ui/TiltCard';
import { PrimaryLink } from './ui/Buttons';
import { PROFILE } from '../lib/profile';

export default function Resume() {
  return (
    <SectionShell
      id="resume"
      label="06 — Resume"
      title="Resume, ready to share"
      subtitle="A clean, recruiter-friendly snapshot — downloadable and previewable."
      className="bg-white dark:bg-slate-900/10"
    >
      <div className="grid gap-8 lg:grid-cols-2 items-start">
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
              <div className="mt-6">
                <PrimaryLink href={PROFILE.resumeUrl}>
                  Download
                </PrimaryLink>
              </div>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-rose-500/10 flex items-center justify-center shrink-0">
              <Download size={18} className="text-violet-600 dark:text-violet-300" />
            </div>
          </div>
        </TiltCard>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiltCard className="p-5 md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-rose-500/10 flex items-center justify-center">
                <FileText size={18} className="text-slate-700 dark:text-slate-200" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Resume preview
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Embedded PDF preview (replace placeholder anytime).
                </p>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-black/10">
              <iframe
                title="Resume preview"
                src={PROFILE.resumeUrl}
                className="w-full h-[520px]"
              />
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </SectionShell>
  );
}

