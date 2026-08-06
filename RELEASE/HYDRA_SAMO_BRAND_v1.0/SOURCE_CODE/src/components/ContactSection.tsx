import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, X, AlertCircle, ChevronDown } from 'lucide-react';
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

/**
 * Glassmorphic minimal brief — a single frosted pane blended into the page
 * behind it. Sections were merged into each other rather than card grids: the
 * four service cards collapsed into one selection box, and name/company
 * combined into a single field. Only the essential scope survives.
 */
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

  // Esc closes the brief; tapping the backdrop closes it too (see the overlay
  // onClick below). The panel itself stops propagation so taps inside never
  // dismiss the window.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCloseModal]);

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

  const glassInput =
    'w-full bg-[#fffdf5]/60 dark:bg-white/5 border border-[var(--border-color)] focus:border-accent focus:ring-2 focus:ring-[#10b981]/40 rounded-xl px-4 py-3.5 text-base text-[var(--text-main)] outline-none transition-all shadow-sm dark:shadow-none backdrop-blur-md placeholder:text-slate-400 dark:placeholder:text-white/30';

  const glassSelect = cn(glassInput, 'appearance-none cursor-pointer pr-10');

  const fieldLabel =
    'block text-xs uppercase tracking-widest text-slate-600 dark:text-white/50 mb-2 font-medium';

  /* Styled selection — a native select wrapped with a soft emerald chevron so
     the package/budget/timeline pickers read as concept-blended controls
     rather than bare browser dropdowns. */
  const SelectField: React.FC<{
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
  }> = ({ value, onChange, options }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={glassSelect}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
      />
    </div>
  );

  const FormContent = (
    <div className="w-full">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-modal rounded-[24px] p-8 sm:p-10 text-center max-w-xl mx-auto"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-accent/20 text-accent flex items-center justify-center mx-auto mb-6 border border-emerald-500 dark:border-accent">
            <CheckCircle2 size={40} />
          </div>

          <h3 className="text-2xl font-medium tracking-tight uppercase font-display text-[var(--text-main)] mb-4">
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
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Scope — merged services as a single selection box */}
          <div>
            <label className={fieldLabel}>{t('contact.labelService')}</label>
            <SelectField
              value={formData.services[0]}
              onChange={(v) => setFormData((prev) => ({ ...prev, services: [v] }))}
              options={[
                { value: 'video', label: t('contact.service.video') },
                { value: 'motion', label: t('contact.service.motion') },
                { value: 'voice', label: t('contact.service.voice') },
                { value: 'full', label: t('contact.service.full') },
              ]}
            />
          </div>

          {/* Contact — name/company merged into one field */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={fieldLabel}>{t('contact.labelNameCompany')} *</label>
              <input
                type="text"
                required
                placeholder={t('contact.phNameCompany')}
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className={glassInput}
              />
            </div>

            <div>
              <label className={fieldLabel}>{t('contact.labelEmail')} *</label>
              <input
                type="email"
                required
                placeholder={t('contact.phEmail')}
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                className={glassInput}
              />
            </div>
          </div>

          {/* Plan — budget & timeline share one row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={fieldLabel}>{t('contact.labelBudget')}</label>
              <SelectField
                value={formData.budget}
                onChange={(v) => setFormData({ ...formData, budget: v })}
                options={[
                  { value: '< $1,000', label: t('contact.budget.under1k') },
                  { value: '$1,000 - $3,000', label: t('contact.budget.1to3') },
                  { value: '$3,000 - $7,000', label: t('contact.budget.3to7') },
                  { value: '$7,000+', label: t('contact.budget.7plus') },
                ]}
              />
            </div>

            <div>
              <label className={fieldLabel}>{t('contact.labelTimeline')}</label>
              <SelectField
                value={formData.timeline}
                onChange={(v) => setFormData({ ...formData, timeline: v })}
                options={[
                  { value: 'ASAP (< 7 Days)', label: t('contact.timeline.asap') },
                  { value: '1-2 Weeks', label: t('contact.timeline.1to2') },
                  { value: '3-4 Weeks', label: t('contact.timeline.3to4') },
                  { value: 'Flexible', label: t('contact.timeline.flexible') },
                ]}
              />
            </div>
          </div>

          {/* Project overview */}
          <div>
            <label className={fieldLabel}>{t('contact.labelProject')}</label>
            <textarea
              rows={4}
              placeholder={t('contact.phProject')}
              value={formData.projectOverview}
              onChange={(e) => setFormData({ ...formData, projectOverview: e.target.value })}
              className={cn(glassInput, 'resize-none')}
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
              className="w-full py-5 min-h-[48px] bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 font-semibold text-base sm:text-lg uppercase tracking-wider rounded-2xl transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
    <div
      data-lenis-prevent
      onClick={onCloseModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--bg-canvas)]/35 dark:bg-black/40 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={t('contact.headingLet')}
    >
      <div
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="relative glass-modal glass-modal--blend rounded-[28px] p-6 sm:p-8 w-full max-w-2xl my-auto max-h-[92vh] overflow-y-auto"
      >
        <button
          onClick={onCloseModal}
          aria-label={t('modal.close')}
          className="absolute top-5 right-5 p-2.5 min-w-[44px] min-h-[44px] rounded-full bg-[#fffdf5]/70 dark:bg-white/5 border border-[var(--border-color)] text-slate-700 dark:text-white/70 hover:text-slate-950 dark:hover:text-white flex items-center justify-center backdrop-blur-md"
        >
          <X size={20} />
        </button>

        <div className="mb-6 pr-10">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight uppercase font-display text-[var(--text-main)]">
            {t('contact.headingLet')} <span className="text-accent">{t('contact.headingTogether')}</span>
          </h2>
        </div>

        {FormContent}
      </div>
    </div>
  );
};
