import { motion } from 'framer-motion'
import { Zap, Globe, X } from 'lucide-react'

const lineActions = [
  { id: 'enhance', label: 'Enhance', icon: Zap, color: 'text-amber-400' },
  { id: 'translate', label: 'Translate', icon: Globe, color: 'text-blue-400' },
]

export default function InlineEditTooltip({ position, onAction, onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="absolute z-50 left-0 right-0"
      style={{
        top: `${position.y + 32}px`,
      }}
    >
      <div className="mx-2 rounded-2xl bg-navy-800 border border-white/15 shadow-2xl shadow-black/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5">
          <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">
            Edit this line
          </span>
          <button
            onClick={onDismiss}
            className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-3 h-3 text-white/40" />
          </button>
        </div>

        {/* Vertical chip list — ONLY Enhance + Translate (Fix 4) */}
        <div className="px-2 pb-2 space-y-1">
          {lineActions.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.id}
                onClick={() => onAction(action.id)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-white/80 text-[12px] font-medium hover:bg-white/8 active:bg-white/12 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-3.5 h-3.5 ${action.color}`} />
                </div>
                <span className="flex-1 text-left">{action.label}</span>
                <span className="text-[9px] text-white/20 font-normal">line only</span>
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
