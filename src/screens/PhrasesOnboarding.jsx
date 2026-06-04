import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Sparkles, ArrowRight, Plus, X } from 'lucide-react'

const screenVariants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, x: -60, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
}

const defaultPhrases = [
  //{ id: 1, text: 'Our chef takes food quality very seriously.', category: 'Industry', enabled: true },
  { id: 2, text: 'Here is a 10% Zomato PROMOCODE for your next order.', category: 'Zomato', enabled: true },
  { id: 3, text: "We've alerted our Swiggy delivery partners about this.", category: 'Swiggy', enabled: false },
  { id: 4, text: 'Sorry for the cold food, the Bangalore traffic is tough!', category: 'Regional', enabled: true },
  // { id: 5, text: 'We truly value your feedback and are working to improve.', category: 'Apology', enabled: false },
  // { id: 6, text: 'Your satisfaction means the world to us.', category: 'General', enabled: true },
]

const categoryColors = {
  // Industry: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/20' },
  Zomato: { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/20' },
  Swiggy: { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/20' },
  Regional: { bg: 'bg-teal-500/15', text: 'text-teal-400', border: 'border-teal-500/20' },
  //  Apology: { bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/20' },
  // General: { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/20' },
  Custom: { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/20' },
}

export default function PhrasesOnboarding({ onContinue, onSkip, onSavePhrases }) {
  const [phrases, setPhrases] = useState(defaultPhrases)
  const [customInput, setCustomInput] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  // Report saved (enabled) phrases up to App whenever they change
  useEffect(() => {
    if (onSavePhrases) {
      const enabled = phrases.filter(p => p.enabled).map(p => p.text)
      onSavePhrases(enabled)
    }
  }, [phrases, onSavePhrases])

  const togglePhrase = (id) => {
    setPhrases(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p))
  }

  const addCustomPhrase = () => {
    if (customInput.trim()) {
      setPhrases(prev => [...prev, {
        id: Date.now(),
        text: customInput.trim(),
        category: 'Custom',
        enabled: true,
      }])
      setCustomInput('')
      setIsAdding(false)
    }
  }

  const removePhrase = (id) => {
    setPhrases(prev => prev.filter(p => p.id !== id))
  }

  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full flex flex-col pt-10"
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center mb-4 shadow-lg shadow-brand-primary/30"
        >
          <Sparkles className="w-7 h-7 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[22px] font-bold text-white leading-tight mb-2"
        >
          Let Olly Know About Your Business
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-white/50 leading-relaxed"
        >
          Olly noticed you're a restaurant on{' '}
          <span className="text-zomato-red font-medium">Zomato</span> &{' '}
          <span className="text-swiggy-orange font-medium">Swiggy</span>.
          in Bengalore city.
        </motion.p>
      </div>

      {/* Phrases list */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2.5">
        {/* Fix 2: Add custom phrase input FIRST — above all recommendations */}
        {isAdding ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="rounded-2xl bg-white/[0.06] border border-brand-primary/30 p-3.5"
          >
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Type your custom phrase..."
              className="w-full bg-transparent text-white/90 text-[13px] placeholder:text-white/30 resize-none outline-none min-h-[48px]"
              autoFocus
              rows={2}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={addCustomPhrase}
                className="flex-1 py-2 rounded-xl bg-brand-primary/20 text-brand-accent text-xs font-semibold hover:bg-brand-primary/30 transition-colors"
              >
                Add Phrase
              </button>
              <button
                onClick={() => { setIsAdding(false); setCustomInput('') }}
                className="px-4 py-2 rounded-xl bg-white/5 text-white/50 text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            onClick={() => setIsAdding(true)}
            className="w-full rounded-2xl border-2 border-dashed border-white/10 hover:border-brand-primary/30 p-4 flex items-center justify-center gap-2 text-white/40 hover:text-brand-accent transition-all group"
          >
            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-[13px] font-medium">Add your own custom phrase</span>
          </motion.button>
        )}

        {/* AI-recommended phrase cards */}
        {phrases.map((phrase, index) => {
          const colors = categoryColors[phrase.category] || categoryColors.General
          return (
            <motion.div
              key={phrase.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.06 }}
              className={`relative group rounded-2xl p-3.5 transition-all duration-300 ${phrase.enabled
                ? 'bg-white/[0.06] border border-white/10'
                : 'bg-white/[0.02] border border-white/5'
                }`}
            >
              <div className="flex items-start gap-3">
                {/* Toggle */}
                <button
                  onClick={() => togglePhrase(phrase.id)}
                  className={`mt-0.5 w-[42px] h-[24px] rounded-full flex-shrink-0 relative transition-all duration-300 ${phrase.enabled
                    ? 'bg-gradient-to-r from-brand-primary to-brand-accent shadow-md shadow-brand-primary/20'
                    : 'bg-white/10'
                    }`}
                >
                  <motion.div
                    layout
                    className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm"
                    style={{ left: phrase.enabled ? '21px' : '3px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                      {phrase.category}
                    </span>
                  </div>
                  <p className={`text-[13px] leading-relaxed transition-colors ${phrase.enabled ? 'text-white/90' : 'text-white/40'
                    }`}>
                    {phrase.text}
                  </p>
                </div>

                {/* Remove button for custom phrases */}
                {phrase.category === 'Custom' && (
                  <button
                    onClick={() => removePhrase(phrase.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-white/10"
                  >
                    <X className="w-3.5 h-3.5 text-white/40" />
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom actions */}
      <div className="px-6 pb-10 pt-3 space-y-2.5 bg-gradient-to-t from-navy-950 via-navy-950/95 to-transparent">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-[15px] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 transition-shadow"
        >
          Save & Continue
          <ArrowRight className="w-4.5 h-4.5" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          onClick={onSkip}
          className="w-full py-3 rounded-2xl text-white/40 text-[13px] font-medium hover:text-white/60 hover:bg-white/5 transition-all"
        >
          Skip for now
        </motion.button>
      </div>
    </motion.div>
  )
}
