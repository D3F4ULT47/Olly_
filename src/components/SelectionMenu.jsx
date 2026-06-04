import { motion } from 'framer-motion'

export default function SelectionMenu({ position, onSelect, onDismiss }) {
  return (
    <>
      {/* Invisible backdrop to dismiss the menu when clicking outside */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onDismiss}
      />
      <motion.div
        initial={{ opacity: 0, y: 5, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 5, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="absolute z-50 left-0 right-0"
        style={{ top: `${position.y - 45}px` }}
      >
        <div className="mx-auto w-fit rounded-lg bg-navy-800 border border-white/15 shadow-2xl shadow-black/50 overflow-hidden flex divide-x divide-white/10 relative z-50">
          <button 
            onClick={(e) => { e.stopPropagation(); onSelect('word'); }} 
            className="px-3 py-2 text-[11px] font-medium text-white/80 hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            Select Word
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onSelect('line'); }} 
            className="px-3 py-2 text-[11px] font-medium text-white/80 hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            Select Entire Line
          </button>
        </div>
      </motion.div>
    </>
  )
}
