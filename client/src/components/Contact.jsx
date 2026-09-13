import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { PROFILE } from '../lib/profile';

// Set these in client/.env:
//   VITE_EMAILJS_SERVICE_ID=service_xxx
//   VITE_EMAILJS_TEMPLATE_ID=template_xxx
//   VITE_EMAILJS_PUBLIC_KEY=your_public_key
const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const USE_EMAILJS      = !!(EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_KEY);

import { API_URL } from '../lib/api';

async function sendViaEmailJS(form) {
  const emailjs = await import('@emailjs/browser');
  return emailjs.send(
    EMAILJS_SERVICE,
    EMAILJS_TEMPLATE,
    { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
    EMAILJS_KEY
  );
}

async function sendViaBackend(form) {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [errMsg, setErrMsg] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      if (USE_EMAILJS) {
        await sendViaEmailJS(form);
      } else {
        await sendViaBackend(form);
      }
      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      setErrMsg(err.message || 'Failed to send. Please try again.');
      setStatus('error');
    }
  };

  const field = (key, type = 'text', placeholder, rows) => {
    const base = 'w-full px-5 py-4 rounded-2xl border bg-white dark:bg-slate-800/50 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400';
    const border = errors[key]
      ? 'border-rose-400 dark:border-rose-500'
      : 'border-slate-200 dark:border-slate-700';
    const props = {
      placeholder,
      value: form[key],
      onChange: (ev) => { setForm({ ...form, [key]: ev.target.value }); setErrors({ ...errors, [key]: '' }); },
      className: `${base} ${border}`
    };
    return (
      <div>
        {rows
          ? <textarea {...props} rows={rows} />
          : <input type={type} {...props} />}
        {errors[key] && <p className="mt-1 text-xs text-rose-500">{errors[key]}</p>}
      </div>
    );
  };

  return (
    <section id="contact" ref={ref} className="section-pad bg-white dark:bg-slate-900/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto"
      >
        <span className="section-label">07 — Connect</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-display gradient-text">
          Get in Touch
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
          Have a project in mind or want to collaborate? Reach out!
        </p>

        <a
          href={`mailto:${PROFILE.email}`}
          className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-white/5 hover:border-violet-400 dark:hover:border-violet-500 transition-all card-hover mb-10"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
            <Mail size={22} />
          </div>
          <span className="text-slate-700 dark:text-slate-300 font-medium">{PROFILE.email}</span>
        </a>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-16 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              >
                <CheckCircle2 size={56} className="text-emerald-500" />
              </motion.div>
              <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white">
                Message sent!
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Thanks for reaching out — I'll get back to you soon.
              </p>
              <button
                onClick={() => setStatus(null)}
                className="mt-2 text-sm text-violet-600 dark:text-violet-400 underline underline-offset-2"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {field('name', 'text', 'Name *')}
              {field('email', 'email', 'Email *')}
              {field('subject', 'text', 'Subject')}
              {field('message', 'text', 'Message *', 4)}

              {status === 'error' && (
                <p className="text-rose-500 dark:text-rose-400 text-sm font-medium">{errMsg}</p>
              )}

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
