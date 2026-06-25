import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ArrowLeft, Check, Sparkles, AlertCircle, ExternalLink } from "lucide-react";
import { GOOGLE_FORM_URL } from "../lib/constants";
import { getPublicState, isSupabaseConfigured, submitRegistration, validateRegistration } from "../lib/inceptionApi";

export default function RegisterModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState({
    loading: false,
    open: true,
    limit: 500,
    count: 0,
  });

  // Track the element that opened the modal so we can restore focus on close
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Save the currently focused element (the button that opened this)
      triggerRef.current = document.activeElement;
      getPublicState()
        .then((state) => {
          const limit = Number(state.settings.registration_limit) || 0;
          const count = Number(state.registrationCount) || 0;
          setRegistrationStatus({
            loading: false,
            open: Boolean(state.settings.registration_open) && (!limit || count < limit),
            limit,
            count,
          });
        })
        .catch((error) => {
          console.error("Failed to load registration status:", error);
          setRegistrationStatus((prev) => ({ ...prev, loading: false }));
        });
    } else {
      // Restore focus to the trigger element when modal closes
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  // Form states
  const [formData, setFormData] = useState({
    teamName: "",
    collegeName: "",
    email: "",
    phone: "",
    leaderName: "",
    member2Name: "",
    member3Name: "",
    member4Name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const allErrors = validateRegistration(formData);
    const tempErrors = {};
    ["teamName", "collegeName", "email", "phone"].forEach((key) => {
      if (allErrors[key]) tempErrors[key] = allErrors[key];
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateStep2 = () => {
    const allErrors = validateRegistration(formData);
    const tempErrors = {};
    ["leaderName", "member2Name", "member3Name", "member4Name"].forEach((key) => {
      if (allErrors[key]) tempErrors[key] = allErrors[key];
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const prevStep = () => {
    setErrors({});
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateStep2()) return;
    if (!registrationStatus.open) {
      setSubmitError("Registrations are currently closed.");
      return;
    }
    if (!isSupabaseConfigured()) {
      setSubmitError("Online registration is not configured yet. Please use the Google Form fallback.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitRegistration(formData);
      setRegistrationId(result.registration_id || "");
      setIsSubmitting(false);
      setSubmitted(true);
      setRegistrationStatus((prev) => ({ ...prev, count: prev.count + 1 }));
    } catch (error) {
      if (error.fieldErrors) setErrors(error.fieldErrors);
      setSubmitError(error.message || "Registration failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setErrors({});
    setSubmitted(false);
    setRegistrationId("");
    setSubmitError("");
    setFormData({
      teamName: "",
      collegeName: "",
      email: "",
      phone: "",
      leaderName: "",
      member2Name: "",
      member3Name: "",
      member4Name: "",
    });
    onClose();
  };

  // Animation variants for sliding steps
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 150 : -150,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: (direction) => ({
      x: direction < 0 ? 150 : -150,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Dark Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 360, damping: 26 }}
            className="relative w-full max-w-lg bg-white/98 border border-stone-200/60 rounded-3xl overflow-hidden shadow-[0_15px_50px_-10px_rgba(255,85,0,0.12)] z-10 flex flex-col max-h-[90vh] md:max-h-[85vh]"
          >
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 bg-[#faf6f0]/60 backdrop-blur-md">
              <div>
                <h3 
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-xl font-extrabold uppercase tracking-wide text-[#1c1917]"
                >
                  INCEPTION <span className="text-[#ff5500]">Registration</span>
                </h3>
                <p className="text-stone-550 text-xs tracking-wider mt-0.5">
                  {submitted ? "SUBMISSION SUCCESSFUL" : `STEP ${step} OF 2: ${
                    step === 1 ? "TEAM CONTEXT" : "TEAM MEMBERS"
                  }`}
                </p>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close registration modal"
                className="text-stone-500 hover:text-stone-850 bg-stone-50 hover:bg-[#ff5500]/10 p-2 rounded-full border border-stone-200/60 hover:border-[#ff5500]/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] focus-visible:ring-offset-2"
              >
                <X size={18} />
              </button>
            </div>

            {/* Steps Progress Bar */}
            {!submitted && (
              <div className="h-1 bg-stone-100 flex">
                <div 
                  className="bg-gradient-to-r from-[#ff5500] to-[#ff8c42] transition-all duration-300 shadow-[0_0_10px_#ff5500]"
                  style={{ width: `${(step / 2) * 100}%` }}
                />
              </div>
            )}

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 custom-scroll">
              <AnimatePresence mode="wait" custom={step}>
                {submitted ? (
                  // Success State
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center justify-center text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 flex items-center justify-center text-[#ff5500] mb-6 animate-pulse">
                      <Check size={32} className="stroke-[3]" />
                    </div>
                    <h4 
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className="text-2xl font-extrabold tracking-wide text-[#1c1917] mb-3"
                    >
                      Registration Completed!
                    </h4>
                    <p className="text-stone-600 text-sm max-w-sm leading-relaxed mb-6 font-light">
                      Thank you for registering <strong className="text-stone-850 font-semibold">{formData.teamName}</strong>. 
                      Please save this ID for future reference.
                    </p>
                    <div className="mb-6 rounded-2xl border border-[#ff5500]/20 bg-[#ff5500]/5 px-5 py-3 font-mono text-lg font-black tracking-wider text-[#e04d00]">
                      {registrationId || "INC-2026-0000"}
                    </div>
                    <p className="text-stone-500 text-xs max-w-sm leading-relaxed mb-6 font-light">
                      A confirmation can be sent to <span className="text-[#e04d00] font-semibold">{formData.email}</span> by the organizing team.
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-8 py-3 bg-[#ff5500] hover:bg-[#ff8c42] text-white font-bold rounded-full uppercase tracking-wider text-xs shadow-lg transition-colors"
                    >
                      Close Window
                    </button>
                  </motion.div>
                ) : (
                  // Form Fields
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!registrationStatus.open && !registrationStatus.loading && (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 flex items-start gap-2">
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <span>Registrations are currently closed.</span>
                      </div>
                    )}
                    {!isSupabaseConfigured() && (
                      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800 flex items-start gap-2">
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <span>Supabase is not configured yet. Use the Google Form fallback until environment variables are added.</span>
                      </div>
                    )}
                    {submitError && (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 flex items-start gap-2">
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}
                    
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        custom={1}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="space-y-4"
                      >
                        <div>
                          <label htmlFor="teamName" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">Team Name</label>
                          <input
                            type="text"
                            id="teamName"
                            name="teamName"
                            value={formData.teamName}
                            onChange={handleChange}
                            placeholder="e.g. CyberKnights"
                            required
                            minLength={2}
                            aria-invalid={errors.teamName ? "true" : "false"}
                            aria-describedby={errors.teamName ? "teamName-error" : undefined}
                            className="input-branded"
                          />
                          {errors.teamName && (
                            <span id="teamName-error" className="text-red-500 text-xs flex items-center gap-1 mt-1 font-light">
                              <AlertCircle size={12} /> {errors.teamName}
                            </span>
                          )}
                        </div>

                        <div>
                          <label htmlFor="collegeName" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">College / Institution</label>
                          <input
                            type="text"
                            id="collegeName"
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleChange}
                            placeholder="e.g. Loyola-ICAM College of Engineering"
                            required
                            minLength={3}
                            aria-invalid={errors.collegeName ? "true" : "false"}
                            aria-describedby={errors.collegeName ? "collegeName-error" : undefined}
                            className="input-branded"
                          />
                          {errors.collegeName && (
                            <span id="collegeName-error" className="text-red-500 text-xs flex items-center gap-1 mt-1 font-light">
                              <AlertCircle size={12} /> {errors.collegeName}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">Contact Email</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="leader@college.edu"
                              required
                              aria-invalid={errors.email ? "true" : "false"}
                              aria-describedby={errors.email ? "email-error" : undefined}
                              className="input-branded"
                            />
                            {errors.email && (
                              <span id="email-error" className="text-red-500 text-xs flex items-center gap-1 mt-1 font-light">
                                <AlertCircle size={12} /> {errors.email}
                              </span>
                            )}
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">Contact Phone</label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="10-digit number"
                              required
                              pattern="[0-9]{10}"
                              aria-invalid={errors.phone ? "true" : "false"}
                              aria-describedby={errors.phone ? "phone-error" : undefined}
                              className="input-branded"
                            />
                            {errors.phone && (
                              <span id="phone-error" className="text-red-500 text-xs flex items-center gap-1 mt-1 font-light">
                                <AlertCircle size={12} /> {errors.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        custom={2}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="space-y-4"
                      >
                        <div>
                          <label htmlFor="leaderName" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">Member 1 Name (Team Leader)</label>
                          <input
                            type="text"
                            id="leaderName"
                            name="leaderName"
                            value={formData.leaderName}
                            onChange={handleChange}
                            placeholder="Full name of Team Leader"
                            required
                            minLength={2}
                            aria-invalid={errors.leaderName ? "true" : "false"}
                            aria-describedby={errors.leaderName ? "leaderName-error" : undefined}
                            className="input-branded"
                          />
                          {errors.leaderName && (
                            <span id="leaderName-error" className="text-red-500 text-xs flex items-center gap-1 mt-1 font-light">
                              <AlertCircle size={12} /> {errors.leaderName}
                            </span>
                          )}
                        </div>

                        <div>
                          <label htmlFor="member2Name" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">Member 2 Name</label>
                          <input
                            type="text"
                            id="member2Name"
                            name="member2Name"
                            value={formData.member2Name}
                            onChange={handleChange}
                            placeholder="Full name of Member 2"
                            required
                            minLength={2}
                            aria-invalid={errors.member2Name ? "true" : "false"}
                            aria-describedby={errors.member2Name ? "member2Name-error" : undefined}
                            className="input-branded"
                          />
                          {errors.member2Name && (
                            <span id="member2Name-error" className="text-red-500 text-xs flex items-center gap-1 mt-1 font-light">
                              <AlertCircle size={12} /> {errors.member2Name}
                            </span>
                          )}
                        </div>

                        <div>
                          <label htmlFor="member3Name" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">Member 3 Name</label>
                          <input
                            type="text"
                            id="member3Name"
                            name="member3Name"
                            value={formData.member3Name}
                            onChange={handleChange}
                            placeholder="Full name of Member 3"
                            required
                            minLength={2}
                            aria-invalid={errors.member3Name ? "true" : "false"}
                            aria-describedby={errors.member3Name ? "member3Name-error" : undefined}
                            className="input-branded"
                          />
                          {errors.member3Name && (
                            <span id="member3Name-error" className="text-red-500 text-xs flex items-center gap-1 mt-1 font-light">
                              <AlertCircle size={12} /> {errors.member3Name}
                            </span>
                          )}
                        </div>

                        <div>
                          <label htmlFor="member4Name" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">Member 4 Name</label>
                          <input
                            type="text"
                            id="member4Name"
                            name="member4Name"
                            value={formData.member4Name}
                            onChange={handleChange}
                            placeholder="Full name of Member 4"
                            required
                            minLength={2}
                            aria-invalid={errors.member4Name ? "true" : "false"}
                            aria-describedby={errors.member4Name ? "member4Name-error" : undefined}
                            className="input-branded"
                          />
                          {errors.member4Name && (
                            <span id="member4Name-error" className="text-red-500 text-xs flex items-center gap-1 mt-1 font-light">
                              <AlertCircle size={12} /> {errors.member4Name}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}

                  </form>
                )}
              </AnimatePresence>
            </div>

            {/* Footer / Buttons */}
            {!submitted && (
              <div className="px-6 py-5 border-t border-stone-100 bg-[#faf6f0]/60 backdrop-blur-md flex items-center justify-between gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-5 py-3 rounded-full border border-stone-300 text-stone-700 font-semibold text-xs tracking-wider uppercase hover:bg-[#ff5500]/10 hover:text-[#ff5500] flex items-center gap-1.5 transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] focus-visible:ring-offset-2"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                ) : (
                  // Google Form fallback
                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-500 hover:text-[#ff5500] text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 transition-colors select-none font-light py-1"
                  >
                    Use Google Form <ExternalLink size={12} />
                  </a>
                )}

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-[#ff5500] hover:bg-[#ff8c42] text-white font-extrabold text-xs tracking-wider uppercase rounded-full flex items-center gap-1.5 transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] focus-visible:ring-offset-2"
                  >
                    Continue <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !registrationStatus.open || !isSupabaseConfigured()}
                    className="px-8 py-3 bg-gradient-to-r from-[#ff5500] to-[#ff8c42] text-white font-extrabold text-xs tracking-wider uppercase rounded-full flex items-center gap-1.5 transition-all shimmer-btn shadow-[0_4px_15px_-3px_rgba(255,85,0,0.5)] select-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] focus-visible:ring-offset-2"
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <Sparkles size={14} /> Confirm &amp; Submit
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
