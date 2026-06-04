import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, X } from 'lucide-react'

const indianLanguages = [
  'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu', 'Gujarati', 'Kannada',
  'Odia', 'Malayalam', 'Punjabi', 'Assamese', 'Maithili', 'Sanskrit', 'Santali',
  'Kashmiri', 'Nepali', 'Sindhi', 'Konkani', 'Dogri', 'Manipuri', 'Bodo',
]

// Simulated translations for the first line — demonstrates functionality
const sampleTranslations = {
  Hindi: 'हे पियूष! इस अप्रिय अनुभव के लिए खेद है।',
  Bengali: 'হে পিয়ুষ! এই অপ্রীতিকর অভিজ্ঞতার জন্য দুঃখিত।',
  Telugu: 'హే పియూష్! ఈ అసహ్యకరమైన అనుభవానికి క్షమించండి.',
  Marathi: 'हे पियुष! या अप्रिय अनुभवाबद्दल क्षमस्व.',
  Tamil: 'ஹாய் பியூஷ்! இந்த விரும்பத்தகாத அனுபவத்திற்கு மன்னிக்கவும்.',
  Urdu: 'ارے پیوش! اس ناگوار تجربے کے لیے معذرت۔',
  Gujarati: 'હે પિયૂષ! આ અપ્રિય અનુભવ માટે માફ કરશો.',
  Kannada: 'ಹೇ ಪಿಯೂಷ್! ಈ ಅಹಿತಕರ ಅನುಭವಕ್ಕೆ ಕ್ಷಮಿಸಿ.',
  Malayalam: 'ഹായ് പിയൂഷ്! ഈ അസുഖകരമായ അനുഭവത്തിന് ക്ഷമിക്കണം.',
  Punjabi: 'ਹੇ ਪਿਯੂਸ਼! ਇਸ ਅਸੁਖਾਵੀਂ ਅਨੁਭਵ ਲਈ ਮੁਆਫ਼ੀ।',
}

export default function TranslateOverlay({ onClose, onTranslate }) {
  const [selectedLang, setSelectedLang] = useState(null)

  const handleConfirm = () => {
    if (!selectedLang) return
    // Get simulated translation or generate a placeholder
    const translated = sampleTranslations[selectedLang] ||
      `[Translated to ${selectedLang}]`
    onTranslate(translated, selectedLang)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-[100] flex items-center justify-center px-4"
      style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', backgroundColor: 'rgba(0,0,0,0.7)' }}
    >
      {/* Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-[340px] bg-navy-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <Globe className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h2 className="text-white text-[16px] font-bold">Translate to</h2>
              <p className="text-white/40 text-[11px]">Select a language for this line</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white/50" />
          </button>
        </div>

        {/* Language list — scrollable */}
        <div className="max-h-[340px] overflow-y-auto px-3 pb-2">
          {indianLanguages.map((lang) => {
            const isSelected = selectedLang === lang
            return (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl mb-0.5 transition-all ${
                  isSelected
                    ? 'bg-brand-primary/15 border border-brand-primary/30'
                    : 'bg-transparent hover:bg-white/5'
                }`}
              >
                <span className={`text-[13px] font-medium ${
                  isSelected ? 'text-white' : 'text-white/60'
                }`}>
                  {lang}
                </span>
                {/* Radio */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-brand-primary' : 'border-white/15'
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

        {/* Confirm button */}
        <div className="px-5 pb-5 pt-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleConfirm}
            disabled={!selectedLang}
            className={`w-full py-3.5 rounded-2xl text-[14px] font-semibold flex items-center justify-center gap-2 shadow-lg transition-all ${
              selectedLang
                ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-brand-primary/20'
                : 'bg-white/5 text-white/30 shadow-none cursor-not-allowed'
            }`}
          >
            <Globe className="w-4 h-4" />
            Translate
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
