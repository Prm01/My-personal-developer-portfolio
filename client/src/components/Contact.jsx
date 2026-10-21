import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Send, CheckCircle2, Copy, Check, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PROFILE } from '../lib/profile';

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errMsg, setErrMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrMsg('Please complete all required fields.');
      return;
    }
    setStatus('sending');
    setErrMsg('');

    try {
      // Send to Formspree
      const response = await fetch('https://formspree.io/f/mqkenbwd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || 'Portfolio Inquiry',
          message: form.message,
          to: PROFILE.email
        })
      });

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback to direct mailto
        window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
        setStatus('success');
      }
    } catch (err) {
      // Graceful fallback to mailto
      window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
      setStatus('success');
    }
  };

  return (
    <section id="contact" ref={ref} className="section-pad relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="section-label">07 — Contact</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Let&apos;s Build Something{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Impactful Together
            </span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Available for Summer 2026 engineering internships, open-source initiatives, and technical collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          {/* Contact Details & Socials Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Primary Email Card */}
            <div className="p-6 rounded-2xl card-glass border border-blue-500/20 dark:border-purple-500/20">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Primary Contact
              </span>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 dark:bg-purple-950/40 border border-blue-500/20 dark:border-purple-500/20 flex items-center justify-center text-blue-600 dark:text-purple-400 shrink-0">
                  <Mail size={22} aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-blue-500 dark:hover:text-purple-400 truncate block transition-colors"
                  >
                    {PROFILE.email}
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Academic email (RGIPT)
                  </p>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            {/* Social Channels (GitHub, LinkedIn) */}
            <div className="p-6 rounded-2xl card-glass border border-blue-500/20 dark:border-purple-500/20">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-4">
                Connect &amp; Profiles
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    name: 'GitHub',
                    handle: '@Prm01',
                    url: PROFILE.githubUrl,
                    icon: Github
                  },
                  {
                    name: 'LinkedIn',
                    handle: 'pramod-yadav',
                    url: PROFILE.linkedinUrl,
                    icon: Linkedin
                  },
                  {
                    name: 'Secondary Mail',
                    handle: 'pramodyadav2948',
                    url: `mailto:${PROFILE.secondaryEmail}`,
                    icon: Mail
                  }
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-blue-500 dark:group-hover:text-purple-400 transition-colors">
                        <Icon size={16} aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-blue-500 dark:group-hover:text-purple-400 transition-colors">
                          {social.name}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                          {social.handle}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Closing statement */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 dark:border-purple-500/20">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 text-center sm:text-left">
                &ldquo;Let&apos;s build something impactful together.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Working Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-6 sm:p-8 rounded-2xl card-glass border border-blue-500/20 dark:border-purple-500/20"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={30} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                    Message Dispatched!
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out. I will review your message and reply promptly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 btn-secondary text-xs font-semibold !py-2.5"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-2">
                    Send a Direct Message
                  </h3>

                  {errMsg && (
                    <div
                      role="alert"
                      className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold"
                    >
                      {errMsg}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Internship / Open Source Collaboration"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Hi Pramod, I came across your portfolio..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus-visible:ring-2 focus-visible:ring-blue-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full btn-accent !py-3.5 text-sm font-semibold disabled:opacity-60"
                  >
                    <Send size={16} aria-hidden="true" />
                    <span>{status === 'sending' ? 'Transmitting...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
