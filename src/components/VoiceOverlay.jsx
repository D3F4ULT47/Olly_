import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mic, X, Check } from 'lucide-react'

const words = ['Add', 'a', '15%', 'discount', 'for', 'their', 'next', 'visit', 'and', 'mention', 'our', 'new', 'chef']

export default function VoiceOverlay({ onClose, onComplete, quotedText }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isListening, setIsListening] = useState(true)

  useEffect(() => {
    if (!isListening) return

    const interval = setInterval(() => {
      setCurrentWordIndex(prev => {
        if (prev >= words.length - 1) {
          return prev
        }
        return prev + 1
      })
    }, 350)

    return () => clearInterval(interval)
  }, [isListening])

  const displayedText = words.slice(0, currentWordIndex + 1).join(' ')

  const handleDone = () => {
    onComplete("Add a 15% discount for their next visit and mention our new chef.")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', backgroundColor: 'rgba(0,0,0,0.65)' }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-14 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X className="w-5 h-5 text-white/70" />
      </button>

      {/* Title */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white/60 text-sm font-medium mb-6"
      >
        Listening...
      </motion.p>

      {/* Quoted Text (if any) */}
      {quotedText && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 px-6 py-4 mx-8 bg-white/5 border border-white/10 rounded-2xl"
        >
          <p className="text-center text-white text-lg font-medium leading-relaxed">
            "{quotedText}"
          </p>
        </motion.div>
      )}

      {/* Voice animation bars */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="flex items-center gap-2.5 mb-8 h-16"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="voice-bar"
            style={{
              animationPlayState: isListening ? 'running' : 'paused',
            }}
          />
        ))}
      </motion.div>

      {/* Mic icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center shadow-2xl shadow-brand-primary/40 mb-8"
      >
        <Mic className="w-8 h-8 text-white" />
      </motion.div>

      {/* Live transcription */}
      <div className="px-8 max-w-[340px] min-h-[60px]">
        <motion.p
          key={currentWordIndex}
          className="text-center text-white text-lg font-medium leading-relaxed"
        >
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-0.5 h-5 bg-brand-accent ml-1 align-middle"
          />
        </motion.p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-10">
        <button
          onClick={onClose}
          className="px-6 py-3 rounded-2xl bg-white/10 text-white/70 text-sm font-medium hover:bg-white/15 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDone}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/40 transition-shadow"
        >
          <Check className="w-4 h-4" />
          Done
        </button>
      </div>
    </motion.div>
  )
}
