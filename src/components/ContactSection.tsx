import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { BriefFormData } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { MagneticButton } from './MagneticButton';
import { cn } from '../lib/utils';

// Brief submissions are POSTed as JSON to a form service (Formspree,
// Web3Forms, etc.) configured via env vars — see .env.example.
//   VITE_FORM_ENDPOINT   e.g. https://formspree.io/f/xxxx
//                        or https://api.web3forms.com/submit
//   VITE_FORM_ACCESS_KEY access key required by Web3Forms (optional for Formspree)
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
const FORM_ACCESS_KEY = import.meta.env.VITE_FORM_ACCESS_KEY as string | undefined;
const isFormConfigured = Boolean(FORM_ENDPOINT);

interface ContactSectionProps {
  onCloseModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onCloseModal }) => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState<BriefFormData>({
    clientName: '',
    clientEmail: '',
    companyName: '',
    services: ['video'],
    budget: '$1,000 - $3,000',
    timeline: '1-2 Weeks',
    projectOverview: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const toggleService = (service: string) => {
    setFormData((prev) => {
      if (prev.services.includes(service)) {
        if (prev.services.length === 1) return prev; // keep at least 1
        return { ...prev, services: prev.services.filter((s) => s !== service) };
      } else {
        return { ...prev, services: [...prev.services, service] };
      }
    });
  };

  const buildPayload = () => ({
    ...formData,
    subject: `New Project Brief from ${formData.clientName}${
      formData.companyName ? ` (${formData.companyName})` : ''
    }`,
    ...(FORM_ACCESS_KEY ? { access_key: FORM_ACCESS_KEY } : {}),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.clientName.trim() || !formData.clientEmail.trim()) {
      setFormError(t('contact.errorRequired'));
      return;
    }

    if (!isFormConfigured) {
      setFormError(t('contact.errorNotConfigured'));
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(buildPayload()),
      });

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      setIsSubmitting(false);
      setSubmitted(true);
    } catch {
      setIsSubmitting(false);
      setFormError(t('contact.errorFailed'));
    }
  };

  const FormContent = (
    <div className="w-full">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 sm:p-12 rounded-3xl text-center max-w-2xl mx-auto shadow-xl dark:shadow-2xl"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-accent/20 text-accent flex items-center justify-center mx-auto mb-6 border border-emerald-500 dark:border-accent">
            <CheckCircle2 size={40} />
          </div>

          <h3 className="text-2xl font-semibold tracking-tight uppercase font-display text-[var(--text-main)] mb-4">
            {t('contact.successTitle')}
          </h3>

          <p className="text-base text-[var(--text-muted)] mb-8 leading-relaxed font-normal">
            {t('contact.successPrefix')} <strong className="text-[var(--text-main)]">{formData.clientName}</strong> {t('contact.successBody')}
          </p>

          <MagneticButton
            onClick={() => {
              setSubmitted(false);
              if (onCloseModal) onCloseModal();
            }}
            className="px-8 py-3.5 min-h-[44px] bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 font-semibold text-sm uppercase tracking-wider rounded-full transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]"
          >
            {t('btn.submitAnotherBrief')}
          </MagneticButton>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
          
          {/* Services Selector */}
          <div>
            <label className="text-sm font-mono uppercase text-accent tracking-widest block mb-3 font-semibold">
              {t('contact.labelServices')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'video', label: t('contact.service.video') },
                { id: 'motion', label: t('contact.service.motion') },
                { id: 'voice', label: t('contact.service.voice') },
                { id: 'full', label: t('contact.service.full') },
              ].map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => toggleService(s.id)}
                  className={cn(
                    'p-3.5 min-h-[44px] rounded-xl border text-sm font-semibold text-left transition-all',
                    formData.services.includes(s.id)
                      ? 'bg-accent border-accent text-black shadow-sm'
                      : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/60 hover:text-slate-950 dark:hover:text-white'
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span>{s.label}</span>
                    {formData.services.includes(s.id) && <CheckCircle2 size={14} />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-mono uppercase text-slate-600 dark:text-white/50 tracking-widest block mb-2 font-medium">
                {t('contact.labelName')}
              </label>
              <input
                type="text"
                required
                placeholder={t('contact.phName')}
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] focus:border-accent focus:ring-2 focus:ring-[#10b981]/40 rounded-xl p-4 text-base text-[var(--text-main)] outline-none transition-colors shadow-sm dark:shadow-none backdrop-blur-md"
              />
            </div>

            <div>
              <label className="text-sm font-mono uppercase text-slate-600 dark:text-white/50 tracking-widest block mb-2 font-medium">
                {t('contact.labelEmail')}
              </label>
              <input
                type="email"
                required
                placeholder={t('contact.phEmail')}
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] focus:border-accent focus:ring-2 focus:ring-[#10b981]/40 rounded-xl p-4 text-base text-[var(--text-main)] outline-none transition-colors shadow-sm dark:shadow-none backdrop-blur-md"
              />
            </div>

            <div>
              <label className="text-sm font-mono uppercase text-slate-600 dark:text-white/50 tracking-widest block mb-2 font-medium">
                {t('contact.labelCompany')}
              </label>
              <input
                type="text"
                placeholder={t('contact.phCompany')}
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] focus:border-accent focus:ring-2 focus:ring-[#10b981]/40 rounded-xl p-4 text-base text-[var(--text-main)] outline-none transition-colors shadow-sm dark:shadow-none backdrop-blur-md"
              />
            </div>
          </div>

          {/* Budget & Timeline Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-mono uppercase text-slate-600 dark:text-white/50 tracking-widest block mb-2 font-medium">
                {t('contact.labelBudget')}
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] focus:border-accent focus:ring-2 focus:ring-[#10b981]/40 rounded-xl p-4 text-base text-[var(--text-main)] outline-none transition-colors shadow-sm dark:shadow-none backdrop-blur-md"
              >
                <option value="< $1,000">{t('contact.budget.under1k')}</option>
                <option value="$1,000 - $3,000">{t('contact.budget.1to3')}</option>
                <option value="$3,000 - $7,000">{t('contact.budget.3to7')}</option>
                <option value="$7,000+">{t('contact.budget.7plus')}</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-mono uppercase text-slate-600 dark:text-white/50 tracking-widest block mb-2 font-medium">
                {t('contact.labelTimeline')}
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] focus:border-accent focus:ring-2 focus:ring-[#10b981]/40 rounded-xl p-4 text-base text-[var(--text-main)] outline-none transition-colors shadow-sm dark:shadow-none backdrop-blur-md"
              >
                <option value="ASAP (< 7 Days)">{t('contact.timeline.asap')}</option>
                <option value="1-2 Weeks">{t('contact.timeline.1to2')}</option>
                <option value="3-4 Weeks">{t('contact.timeline.3to4')}</option>
                <option value="Flexible">{t('contact.timeline.flexible')}</option>
              </select>
            </div>
          </div>

          {/* Project Overview */}
          <div>
            <label className="text-xs font-mono uppercase text-slate-600 dark:text-white/50 tracking-widest block mb-2 font-medium">
              {t('contact.labelProject')}
            </label>
            <textarea
              rows={4}
              placeholder={t('contact.phProject')}
              value={formData.projectOverview}
              onChange={(e) => setFormData({ ...formData, projectOverview: e.target.value })}
              className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] focus:border-accent focus:ring-2 focus:ring-[#10b981]/40 rounded-xl p-4 text-base text-[var(--text-main)] outline-none transition-colors shadow-sm dark:shadow-none"
            />
          </div>

          {/* Submit Button */}
          {!isFormConfigured && (
            <div className="flex items-center gap-2.5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-sm font-medium">
              <AlertCircle size={18} className="shrink-0" />
              <span>
                {t('contact.noticePre')} <code className="font-mono">VITE_FORM_ENDPOINT</code> {t('contact.noticePost')}
              </span>
            </div>
          )}
          {formError && (
            <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-600/10 border border-red-600/40 text-red-600 dark:text-red-400 text-sm font-medium">
              <AlertCircle size={18} className="shrink-0" />
              <span>{formError}</span>
            </div>
          )}
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
          >
            <MagneticButton
              type="submit"
              disabled={isSubmitting || !isFormConfigured}
              className="w-full py-5 min-h-[48px] bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 font-extrabold text-base sm:text-lg uppercase tracking-wider rounded-2xl transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>{t('btn.transmitting')}</span>
              ) : isFormConfigured ? (
                <>
                  <span>{t('btn.sendBrief')}</span>
                  <Send size={20} />
                </>
              ) : (
                <span>{t('btn.formNotConfigured')}</span>
              )}
            </MagneticButton>
          </motion.div>
        </form>
      )}
    </div>
  );

  return (
    <div data-lenis-prevent className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-slate-950/80 dark:bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div data-lenis-prevent className="relative bg-[var(--bg-canvas)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-10 w-full max-w-4xl my-auto max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onCloseModal}
          className="absolute top-6 right-6 p-2.5 min-w-[44px] min-h-[44px] rounded-full bg-slate-200 dark:bg-white/5 border border-[var(--border-color)] text-slate-700 dark:text-white/70 hover:text-slate-950 dark:hover:text-white flex items-center justify-center"
        >
          <X size={20} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight uppercase font-display text-[var(--text-main)]">
            {t('contact.headingLet')} <span className="text-accent">{t('contact.headingTogether')}</span>
          </h2>
        </div>

        {FormContent}
      </div>
    </div>
  );
};
