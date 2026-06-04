import { motion } from 'framer-motion'
import { CloudSun, Palmtree, Star, ArrowRight } from 'lucide-react'

const screenVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
}

export default function FinalScreen({ onDone }) {
  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full flex flex-col pt-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3">
        <h1 className="text-white text-[15px] font-semibold">Auto-response is set ✓</h1>
        <div className="w-8 h-8" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Illustration card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
          className="w-full h-[260px] rounded-3xl bg-gradient-to-br from-amber-500/15 via-teal-500/10 to-brand-primary/15 border border-white/5 relative overflow-hidden flex items-center justify-center mb-6"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            {[
              { x: '10%', y: '15%', s: 2 },
              { x: '80%', y: '10%', s: 2.5 },
              { x: '90%', y: '70%', s: 2 },
              { x: '5%', y: '80%', s: 1.5 },
              { x: '45%', y: '5%', s: 2 },
              { x: '65%', y: '90%', s: 1.5 },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{ left: s.x, top: s.y, width: s.s, height: s.s }}
                animate={{ opacity: [0.15, 0.7, 0.15] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-6 left-6 w-14 h-14 rounded-full bg-white/5"
            />
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-8 right-8 w-18 h-18 rounded-full bg-white/5"
            />
          </div>

          {/* Scene elements */}
          <div className="relative w-[240px] h-[200px]">
            {/* Sun */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-2 right-6"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 shadow-lg shadow-amber-400/30 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-200 to-amber-300" />
              </div>
            </motion.div>

            {/* Cloud */}
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-4 left-2"
            >
              <CloudSun className="w-10 h-10 text-white/20" />
            </motion.div>

            {/* Palm trees */}
            <div className="absolute bottom-2 left-4">
              <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity }}>
                <Palmtree className="w-14 h-14 text-teal-400/60" />
              </motion.div>
            </div>
            <div className="absolute bottom-2 right-6">
              <motion.div animate={{ rotate: [2, -2, 2] }} transition={{ duration: 3.5, repeat: Infinity }}>
                <Palmtree className="w-12 h-12 text-emerald-400/50" />
              </motion.div>
            </div>

            {/* Hammock */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <svg width="120" height="50" viewBox="0 0 120 50" fill="none">
                <path d="M10 10 Q60 50 110 10" stroke="url(#hammockGrad)" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M10 10 Q60 45 110 10" stroke="none" fill="rgba(167, 139, 250, 0.1)" />
                <circle cx="60" cy="30" r="5" fill="rgba(167, 139, 250, 0.4)" />
                <ellipse cx="60" cy="38" rx="8" ry="4" fill="rgba(167, 139, 250, 0.3)" />
                <defs>
                  <linearGradient id="hammockGrad" x1="10" y1="10" x2="110" y2="10">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Floating stars */}
            {[
              { x: 30, y: 20, size: 'w-3 h-3', delay: 0 },
              { x: 90, y: 30, size: 'w-2 h-2', delay: 0.3 },
              { x: 150, y: 15, size: 'w-2.5 h-2.5', delay: 0.6 },
              { x: 70, y: 8, size: 'w-2 h-2', delay: 0.9 },
            ].map((star, i) => (
              <motion.div
                key={i}
                className={`absolute ${star.size}`}
                style={{ left: star.x, top: star.y }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, delay: star.delay, repeat: Infinity }}
              >
                <Star className="w-full h-full text-amber-300/50" fill="currentColor" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Text */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white text-[22px] font-bold mb-2 text-center leading-tight"
        >
          Take that break you{'\n'}deserve! Olly will{'\n'}handle the rest.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-white/40 text-[13px] text-center leading-relaxed max-w-[280px] mb-4"
        >
          Your reviews will get a reply in 20 minutes. We will set up auto-response for this Business.
        </motion.p>

        {/* Olly learned badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-brand-primary/10 border border-brand-primary/20"
        >
          <svg className="w-4 h-4 text-brand-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          </svg>
          <span className="text-brand-accent text-[12px] font-semibold">Olly has learnt your style</span>
        </motion.div>
      </div>

      {/* Bottom button */}
      <div className="px-5 pb-10 pt-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileTap={{ scale: 0.97 }}
          onClick={onDone}
          className="w-full py-3.5 rounded-full bg-white/10 border border-white/15 text-white text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
        >
          Awesome!
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
