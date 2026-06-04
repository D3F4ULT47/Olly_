import { motion } from 'framer-motion'
import { ArrowRight, Play, SkipForward, RefreshCw } from 'lucide-react'

const screenVariants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, x: -60, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
}

export default function VideoWalkthroughScreen({ onContinue }) {
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
        <span className="text-white/60 text-[13px] font-medium">How it works</span>
        <button
          onClick={onContinue}
          className="text-white/60 hover:text-white/90 text-[12px] font-medium transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Video card */}
      <div className="flex-1 flex flex-col px-5 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="w-full h-[320px] rounded-3xl bg-navy-800 flex items-center justify-center relative overflow-hidden border border-white/5 shadow-2xl"
        >
          {/* HTML5 Video element */}
          <video 
            className="w-full h-full object-cover opacity-80"
            controls
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          
          {/* Optional fallback/overlay play button if we didn't use native controls
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <button className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all shadow-lg">
              <Play className="w-6 h-6 text-white ml-1" />
            </button>
          </div>
          */}
        </motion.div>

        {/* Text content */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-white text-[22px] font-bold leading-tight mt-6 mb-2"
        >
          See Olly in action
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-white/45 text-[13px] leading-relaxed"
        >
          Watch how Olly helps you review, edit, enhance and automate customer responses.
        </motion.p>
      </div>

      {/* Bottom: progress dots + button */}
      <div className="px-5 pb-10 pt-4">
        {/* Progress dots - matching onboarding exactly */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <motion.div className="w-[6px] h-[6px] rounded-full bg-white/20 transition-all duration-300" />
          <motion.div className="w-[6px] h-[6px] rounded-full bg-white/20 transition-all duration-300" />
          <motion.div className="w-[6px] h-[6px] rounded-full bg-white/20 transition-all duration-300" />
          <motion.div layout className="h-[6px] w-6 rounded-full bg-brand-primary transition-all duration-300" />
        </div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="w-full py-3.5 rounded-full bg-white/10 border border-white/15 text-white text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
