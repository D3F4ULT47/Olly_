import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, RefreshCw } from 'lucide-react'

const screenVariants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, x: -60, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
}

export default function LoadingScreen({ onComplete, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

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
        <h1 className="text-white text-[15px] font-semibold">Setting up auto-response</h1>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/15 transition-colors"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>
      </div>

      {/* Centered loading */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Spinner */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="relative mb-8"
        >
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border-2 border-white/10 border-t-brand-primary"
          />
          {/* Inner icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw className="w-6 h-6 text-brand-accent/60" />
            </motion.div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-[15px] font-medium mb-2"
        >
          Generating a response…
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white/30 text-[12px] text-center"
        >
          Olly is crafting a reply that matches your brand voice
        </motion.p>

        {/* Animated dots */}
        <div className="flex gap-1.5 mt-6">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-brand-primary"
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
