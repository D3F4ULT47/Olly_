import { motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'

const screenVariants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, x: -60, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
}

const slides = [
  {
    id: 0,
    headline: 'Your customers post reviews everywhere',
    subtext: 'Olly monitors Zomato, Swiggy, Google and more — so you never miss a review that needs attention.',
    buttonLabel: 'Continue',
    gradientFrom: 'from-amber-500/30',
    gradientTo: 'to-teal-500/30',
    illustrationBg: 'from-amber-400 to-orange-500',
    illustrationIcon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
        {/* Stars cluster */}
        <circle cx="40" cy="25" r="8" fill="#FBBF24" />
        <circle cx="22" cy="40" r="6" fill="#F97316" />
        <circle cx="58" cy="40" r="6" fill="#2DD4BF" />
        <circle cx="30" cy="58" r="5" fill="#A78BFA" />
        <circle cx="50" cy="58" r="5" fill="#F472B6" />
        {/* Connection lines */}
        <path d="M40 25 L22 40 M40 25 L58 40 M22 40 L30 58 M58 40 L50 58 M30 58 L50 58" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Central star */}
        <path d="M40 18l1.5 4.5h4.7l-3.8 2.8 1.5 4.5-3.9-2.8-3.9 2.8 1.5-4.5-3.8-2.8h4.7z" fill="#FDE68A" />
      </svg>
    ),
  },
  {
    id: 1,
    headline: 'Olly will respond within 30 mins in your style',
    subtext: 'Our AI learns your brand voice and crafts thoughtful responses that sound just like you.',
    buttonLabel: 'Continue',
    gradientFrom: 'from-blue-500/30',
    gradientTo: 'to-indigo-500/30',
    illustrationBg: 'from-blue-400 to-indigo-500',
    illustrationIcon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
        {/* Phone shape */}
        <rect x="24" y="12" width="32" height="56" rx="6" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="rgba(255,255,255,0.1)" />
        <rect x="28" y="22" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />
        <rect x="28" y="28" width="18" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
        <rect x="28" y="34" width="20" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
        {/* Clock icon */}
        <circle cx="40" cy="52" r="8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
        <path d="M40 47v5l3 3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Person silhouette */}
        <circle cx="60" cy="24" r="5" fill="rgba(45,212,191,0.5)" />
        <ellipse cx="60" cy="34" rx="6" ry="4" fill="rgba(45,212,191,0.3)" />
      </svg>
    ),
  },
  {
    id: 2,
    headline: 'Customers feel heard and engaged',
    subtext: 'Build loyalty by responding to every review promptly and personally — Olly does the heavy lifting.',
    buttonLabel: 'Setup auto responses',
    gradientFrom: 'from-emerald-500/30',
    gradientTo: 'to-teal-500/30',
    illustrationBg: 'from-emerald-400 to-teal-500',
    illustrationIcon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
        {/* Chat bubbles */}
        <rect x="10" y="20" width="36" height="22" rx="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <path d="M20 42 L16 50 L26 42" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="16" y="27" width="24" height="2.5" rx="1.25" fill="rgba(255,255,255,0.3)" />
        <rect x="16" y="32" width="18" height="2.5" rx="1.25" fill="rgba(255,255,255,0.2)" />
        {/* Heart */}
        <path d="M56 28c0-4 3.5-7 7-7s7 3 7 7c0 8-14 16-14 16S42 36 42 28c0-4 3.5-7 7-7s7 3 7 7z" fill="rgba(244,114,182,0.5)" stroke="rgba(244,114,182,0.7)" strokeWidth="1.5" />
        {/* Smile */}
        <circle cx="56" cy="56" r="10" stroke="rgba(251,191,36,0.5)" strokeWidth="1.5" fill="rgba(251,191,36,0.1)" />
        <path d="M51 58c1.5 2.5 3.5 4 5 4s3.5-1.5 5-4" stroke="rgba(251,191,36,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="53" cy="54" r="1" fill="rgba(251,191,36,0.6)" />
        <circle cx="59" cy="54" r="1" fill="rgba(251,191,36,0.6)" />
      </svg>
    ),
  },
]

export default function OnboardingSlide({ slideIndex, onContinue, onClose }) {
  const slide = slides[slideIndex]

  return (
    <motion.div
      key={`onboarding-${slideIndex}`}
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full flex flex-col pt-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-white/60 text-[13px] font-medium">How it works</span>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/15 transition-colors"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>
      </div>

      {/* Illustration card */}
      <div className="flex-1 flex flex-col px-5 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`w-full h-[320px] rounded-3xl bg-gradient-to-br ${slide.gradientFrom} ${slide.gradientTo} flex items-center justify-center relative overflow-hidden border border-white/5`}
        >
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating circles */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-8 left-8 w-16 h-16 rounded-full bg-white/5"
            />
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-12 right-6 w-20 h-20 rounded-full bg-white/5"
            />
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-1/3 right-12 w-10 h-10 rounded-full bg-white/5"
            />
            {/* Small stars */}
            {[
              { x: '15%', y: '20%', s: 3 },
              { x: '75%', y: '15%', s: 2 },
              { x: '85%', y: '65%', s: 2.5 },
              { x: '10%', y: '75%', s: 2 },
              { x: '50%', y: '10%', s: 1.5 },
              { x: '35%', y: '85%', s: 2 },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{ left: s.x, top: s.y, width: s.s, height: s.s }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}
          </div>

          {/* Illustration icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
            className={`w-40 h-40 rounded-3xl bg-gradient-to-br ${slide.illustrationBg} flex items-center justify-center shadow-2xl relative z-10`}
          >
            {slide.illustrationIcon}
          </motion.div>
        </motion.div>

        {/* Text content */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-white text-[22px] font-bold leading-tight mt-6 mb-2"
        >
          {slide.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-white/45 text-[13px] leading-relaxed"
        >
          {slide.subtext}
        </motion.p>
      </div>

      {/* Bottom: progress dots + button */}
      <div className="px-5 pb-10 pt-4">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              layout
              className={`h-[6px] rounded-full transition-all duration-300 ${
                i === slideIndex
                  ? 'w-6 bg-brand-primary'
                  : 'w-[6px] bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* CTA Button - pill-shaped white on dark */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="w-full py-3.5 rounded-full bg-white/10 border border-white/15 text-white text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
        >
          {slide.buttonLabel}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
