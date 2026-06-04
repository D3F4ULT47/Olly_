import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, AlertTriangle, Shield, Clock, ChevronDown, X } from 'lucide-react'

const severityOptions = [
  { id: 'normal', label: 'Normal', icon: Shield, description: 'Standard response tone', color: 'from-emerald-500 to-teal-500' },
  { id: 'high', label: 'High Stakes', icon: AlertTriangle, description: 'e.g. food poisoning claim', color: 'from-amber-500 to-orange-500' },
  { id: 'urgent', label: 'Urgent Escalation', icon: Clock, description: 'Requires immediate action', color: 'from-red-500 to-rose-500' },
]

export default function EnhanceSheet({ onClose, onApply, savedPhrases = [] }) {
  const [severity, setSeverity] = useState('normal')
  const [selectedSnippet, setSelectedSnippet] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleApply = () => {
    onApply({ severity, selectedSnippet })
  }

  const hasSnippets = savedPhrases.length > 0

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 z-[90] bg-black/50"
        style={{ backdropFilter: 'blur(4px)' }}
      />

      {/* Bottom sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="absolute bottom-0 left-0 right-0 z-[95] bg-navy-900 rounded-t-3xl border-t border-white/10 shadow-2xl max-h-[85%] overflow-y-auto"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="px-5 pb-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
                <Zap className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <h2 className="text-white text-[16px] font-bold">Direct the Enhancement</h2>
                <p className="text-white/40 text-[11px]">Customize how Olly improves this response</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-white/50" />
            </button>
          </div>

          {/* Severity section — PRESERVED EXACTLY */}
          <div className="mb-5">
            <h3 className="text-white/60 text-[11px] font-semibold uppercase tracking-wider mb-3">
              Mark Review Severity
            </h3>
            <div className="space-y-2">
              {severityOptions.map((option) => {
                const Icon = option.icon
                const isSelected = severity === option.id
                return (
                  <button
                    key={option.id}
                    onClick={() => setSeverity(option.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all ${isSelected
                        ? 'bg-white/[0.08] border border-brand-primary/40 shadow-lg shadow-brand-primary/10'
                        : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]'
                      }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? `bg-gradient-to-br ${option.color}` : 'bg-white/10'
                      }`}>
                      <Icon className={`w-4.5 h-4.5 ${isSelected ? 'text-white' : 'text-white/40'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`text-[13px] font-semibold ${isSelected ? 'text-white' : 'text-white/60'}`}>
                        {option.label}
                      </p>
                      <p className="text-[11px] text-white/30">{option.description}</p>
                    </div>
                    {/* Radio indicator */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-brand-primary' : 'border-white/15'
                      }`}>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2.5 h-2.5 rounded-full bg-brand-primary"
                        />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Smart Snippets section — NEW (Fix 3, Step B) */}
          <div className="mb-6">
            <h3 className="text-white/60 text-[11px] font-semibold uppercase tracking-wider mb-3">
              Enhance with Your Brand Voice
            </h3>

            <div className="relative">
              {/* Dropdown trigger */}
              <button
                onClick={() => hasSnippets && setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full flex items-center gap-2.5 p-3.5 rounded-2xl transition-all ${isDropdownOpen
                    ? 'bg-white/[0.08] border border-brand-primary/40'
                    : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]'
                  } ${!hasSnippets ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="w-7 h-7 rounded-lg bg-brand-primary/15 flex items-center justify-center flex-shrink-0">
                  <SparklesIcon className="w-3.5 h-3.5 text-brand-accent" />
                </div>
                <span className={`flex-1 text-left text-[12px] ${selectedSnippet ? 'text-white/80' : 'text-white/35'
                  }`}>
                  {selectedSnippet || (hasSnippets ? 'Select a smart snippet…' : 'No snippets saved yet. Add them in Settings.')}
                </span>
                {hasSnippets && (
                  <ChevronDown className={`w-4 h-4 text-white/30 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                )}
              </button>

              {/* Dropdown list */}
              {isDropdownOpen && hasSnippets && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="mt-1.5 rounded-2xl bg-navy-800 border border-white/10 shadow-xl shadow-black/40 overflow-hidden max-h-[180px] overflow-y-auto"
                >
                  {savedPhrases.map((phrase, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedSnippet(phrase)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-3 text-[12px] transition-colors border-b border-white/5 last:border-b-0 ${selectedSnippet === phrase
                          ? 'bg-brand-primary/15 text-brand-accent'
                          : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                        }`}
                    >
                      {phrase}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Apply button — PRESERVED EXACTLY */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleApply}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-[14px] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20"
          >
            <Zap className="w-4 h-4" />
            Apply & Regenerate
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}

function SparklesIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  )
}
