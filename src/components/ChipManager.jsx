import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Plus, GripVertical, RefreshCw, Zap, Smile, Briefcase, MessageCircle, Heart, Type } from 'lucide-react'

const availableChips = [
  { id: 'regenerate', label: 'Regenerate', icon: RefreshCw },
  { id: 'enhance', label: 'Enhance', icon: Zap },
  { id: 'friendlier', label: 'Make it friendlier', icon: Smile },
  { id: 'professional', label: 'Make it professional', icon: Briefcase },
  { id: 'empathetic', label: 'Humanized', icon: Heart },
  { id: 'concise', label: 'Make it concise', icon: Type },
  { id: 'conversational', label: 'Make it More Organic', icon: MessageCircle },
]

export default function ChipManager({ chips, onUpdateChips, onClose }) {
  const [localChips, setLocalChips] = useState(chips)

  const toggleChip = (id) => {
    setLocalChips(prev => {
      const existing = prev.find(c => c.id === id)
      if (existing) {
        return prev.map(c => c.id === id ? { ...c, active: !c.active } : c)
      } else {
        const template = availableChips.find(c => c.id === id)
        if (template) {
          return [...prev, { ...template, active: true }]
        }
        return prev
      }
    })
  }

  const handleSave = () => {
    onUpdateChips(localChips)
    onClose()
  }

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

      {/* Popover */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="absolute bottom-[140px] left-4 right-4 z-[95] bg-navy-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div>
            <h3 className="text-white text-[14px] font-semibold">Action Chips</h3>
            <p className="text-white/40 text-[11px]">Add or remove chips from your workspace</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-white/50" />
          </button>
        </div>

        {/* Chip list */}
        <div className="p-3 space-y-1.5 max-h-[250px] overflow-y-auto">
          {availableChips.map((chip) => {
            const Icon = chip.icon
            const localChip = localChips.find(c => c.id === chip.id)
            const isActive = localChip?.active ?? false

            return (
              <button
                key={chip.id}
                onClick={() => toggleChip(chip.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive
                    ? 'bg-brand-primary/10 border border-brand-primary/20'
                    : 'bg-white/[0.02] border border-transparent hover:bg-white/5'
                  }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isActive ? 'bg-brand-primary/20' : 'bg-white/5'
                  }`}>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-accent' : 'text-white/30'}`} />
                </div>
                <span className={`text-[13px] font-medium ${isActive ? 'text-white/90' : 'text-white/40'}`}>
                  {chip.label}
                </span>
                <div className={`ml-auto w-4.5 h-4.5 rounded-md border flex items-center justify-center ${isActive ? 'bg-brand-primary border-brand-primary' : 'border-white/15'
                  }`}>
                  {isActive && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Save button */}
        <div className="p-3 pt-0">
          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-xl bg-brand-primary/15 text-brand-accent text-[13px] font-semibold hover:bg-brand-primary/25 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </>
  )
}
