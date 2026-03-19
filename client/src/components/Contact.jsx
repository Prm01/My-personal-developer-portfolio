import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';

import { API_URL } from '../lib/api';

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: data.message || 'Message sent!' });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', msg: data.error || 'Something went wrong' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to send. Is the server running?' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="section-pad bg-white dark:bg-slate-900/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="max-w-xl mx-auto"
      >
        <span className="section-label">07 — Connect</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-display gradient-text">
          Get in Touch
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
          Have a project in mind or want to collaborate? Reach out!
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
          <a
            href="mailto:pramodyadav2948@gmail.com"
            className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-white/5 hover:border-violet-400 dark:hover:border-violet-500 transition-all card-hover"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
              <Mail size={22} />
            </div>
            <span className="text-slate-700 dark:text-slate-300 font-medium">pramodyadav2948@gmail.com</span>
          </a>
          <a
            href="tel:+917268895239"
            className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-white/5 hover:border-violet-400 dark:hover:border-violet-500 transition-all card-hover"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
              <Phone size={22} />
            </div>
            <span className="text-slate-700 dark:text-slate-300 font-medium">+91-7268895239</span>
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Name *"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
          />
          <input
            type="email"
            placeholder="Email *"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
          />
          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
          />
          <textarea
            placeholder="Message *"
            required
            rows={4}
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none resize-none transition-all"
          />
          {status && (
            <p className={status.type === 'success' ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-rose-500 dark:text-rose-400 font-medium'}>
              {status.msg}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Send size={20} /> {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
