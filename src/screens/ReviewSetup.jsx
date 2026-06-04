import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Mic, RefreshCw, Zap, Smile, Briefcase, Plus,
  ChevronDown, Send, AlertTriangle, Shield, Clock,
  MessageSquare, Minus, Pencil
} from 'lucide-react'
import VoiceOverlay from '../components/VoiceOverlay'
import EnhanceSheet from '../components/EnhanceSheet'
import InlineEditTooltip from '../components/InlineEditTooltip'
import TranslateOverlay from '../components/TranslateOverlay'
import ChipManager from '../components/ChipManager'
import SelectionMenu from '../components/SelectionMenu'

const screenVariants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, x: -60, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
}

const reviewText = "Bad food taste and poor service, chokadevi was rude. I ordered Biryani gravy, masala dosa and Bhature! Taste was very mediocre."

const initialDraftLines = [
  "Hey Piyush! Sorry you had this unpleasant experience.",
  "I've heard the feedback – the taste and service can't be mediocre.",
  "We want to make it right, I'll talk to our chef directly.",
  "Would love to provide a tastier experience next time!",
  "Please reach out to us at +91 87133 15179.",
]

const defaultChips = [
  { id: 'regenerate', label: 'Regenerate', icon: RefreshCw, active: true },
  { id: 'enhance', label: 'Enhance', icon: Zap, active: true },
  { id: 'friendlier', label: 'Make it friendlier', icon: Smile, active: true },
  { id: 'professional', label: 'Make it professional', icon: Briefcase, active: true },
]

export default function ReviewSetup({ onClose, onSendReply, savedPhrases = [] }) {
  const [draftLines, setDraftLines] = useState(initialDraftLines)
  const [chips, setChips] = useState(defaultChips)
  const [showVoice, setShowVoice] = useState(false)
  const [showEnhance, setShowEnhance] = useState(false)
  const [showTranslate, setShowTranslate] = useState(false)
  const [showChipManager, setShowChipManager] = useState(false)
  const [selection, setSelection] = useState(null)
  const [tappedLocation, setTappedLocation] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [isRegenerating, setIsRegenerating] = useState(false)
  const responseRef = useRef(null)

  // Full-response chip handlers (these apply to the ENTIRE response)
  const handleChipClick = (chipId) => {
    if (chipId === 'enhance') {
      // Full-response Enhance → opens popup (Fix 4, Step C: separate code path)
      setShowEnhance(true)
    } else if (chipId === 'regenerate') {
      handleRegenerate()
    } else if (chipId === 'friendlier') {
      handleStyleChange('friendlier')
    } else if (chipId === 'professional') {
      handleStyleChange('professional')
    }
  }

  const handleRegenerate = () => {
    setIsRegenerating(true)
    setTimeout(() => {
      setDraftLines([
        "Hi Piyush, thank you for sharing your honest feedback.",
        "We sincerely apologize for the subpar food quality and service you experienced.",
        "I'm personally looking into this with our kitchen team and Chokadevi's manager.",
        "We'd love to offer you a complimentary meal to make things right.",
        "Please call us at +91 87133 15179 so we can arrange this for you.",
      ])
      setIsRegenerating(false)
    }, 1200)
  }

  const handleStyleChange = (style) => {
    setIsRegenerating(true)
    setTimeout(() => {
      if (style === 'friendlier') {
        setDraftLines([
          "Hey Piyush! 😊 We're so sorry about your experience!",
          "That's definitely not the quality we aim for — you deserve much better!",
          "I'm personally chatting with our chef and team to fix this ASAP.",
          "We'd love to win you back with a special treat on your next visit! 🎉",
          "Drop us a message at +91 87133 15179 — we've got your back!",
        ])
      } else {
        setDraftLines([
          "Dear Piyush, thank you for bringing this to our attention.",
          "We acknowledge the shortcomings in both food quality and service delivery.",
          "Immediate corrective measures have been initiated with our culinary and service teams.",
          "We would like to extend a complimentary dining experience as a gesture of our commitment to excellence.",
          "Please contact our guest relations team at +91 87133 15179 at your earliest convenience.",
        ])
      }
      setIsRegenerating(false)
    }, 1200)
  }

  const handleWordClick = useCallback((lineIndex, wordIndex, event) => {
    event.stopPropagation()
    const rect = event.currentTarget.getBoundingClientRect()
    const containerRect = responseRef.current?.getBoundingClientRect()
    if (containerRect) {
      setTappedLocation({
        lineIndex,
        wordIndex,
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top,
      })
    }
    setSelection(null) // Clear active selection when tapping to open menu
  }, [])

  // Fix 4, Step C: Inline Enhance — fires directly, NO popup
  const handleInlineAction = (action) => {
    if (selection === null) return

    if (action === 'enhance') {
      // Direct inline enhance — separate code path from full-response enhance
      setIsRegenerating(true)
      setTimeout(() => {
        const newLines = [...draftLines]
        if (selection.type === 'line') {
          const enhanced = {
            0: "We sincerely appreciate you taking the time to share this feedback, Piyush.",
            1: "We hold ourselves to the highest standards and clearly fell short here.",
            2: "This has been escalated to our senior kitchen staff for immediate review.",
            3: "We would be honoured to offer you a complimentary dining experience.",
            4: "Kindly contact our guest relations team at +91 87133 15179.",
          }
          newLines[selection.lineIndex] = enhanced[selection.lineIndex] || newLines[selection.lineIndex]
        } else {
          const words = newLines[selection.lineIndex].split(' ')
          const word = words[selection.wordIndex]
          words[selection.wordIndex] = `✨${word}✨`
          newLines[selection.lineIndex] = words.join(' ')
        }
        setDraftLines(newLines)
        setSelection(null)
        setIsRegenerating(false)
      }, 800)
    } else if (action === 'translate') {
      // Fix 4, Step D: Open translate overlay
      setShowTranslate(true)
    }
  }

  // Fix 4, Step D: Handle translate confirm
  const handleTranslateConfirm = (translatedText, language) => {
    if (selection === null) return
    setShowTranslate(false)
    setIsRegenerating(true)
    setTimeout(() => {
      const newLines = [...draftLines]
      if (selection.type === 'line') {
        newLines[selection.lineIndex] = translatedText
      } else {
        const words = newLines[selection.lineIndex].split(' ')
        words[selection.wordIndex] = translatedText
        newLines[selection.lineIndex] = words.join(' ')
      }
      setDraftLines(newLines)
      setSelection(null)
      setIsRegenerating(false)
    }, 600)
  }

  // Voice complete handler (global mode — no text selected)
  const handleVoiceComplete = (text) => {
    setShowVoice(false)
    if (text) {
      setIsRegenerating(true)
      setTimeout(() => {
        if (selection !== null) {
          const newLines = [...draftLines]
          if (selection.type === 'line') {
            newLines[selection.lineIndex] = text
          } else {
            const words = newLines[selection.lineIndex].split(' ')
            words[selection.wordIndex] = text
            newLines[selection.lineIndex] = words.join(' ')
          }
          setDraftLines(newLines)
          setSelection(null)
        } else {
          setDraftLines(prev => [...prev, text])
        }
        setIsRegenerating(false)
      }, 1000)
    }
  }

  // Full-response Enhance popup handler
  const handleEnhanceApply = (settings) => {
    setShowEnhance(false)
    setIsRegenerating(true)
    
    setTimeout(() => {
      let newLines = [...initialDraftLines]
      
      if (settings.severity === 'high') {
        newLines[0] = "Piyush, I'm deeply concerned about your experience."
        newLines[1] = "This is completely unacceptable and has been escalated to our management team."
        newLines[2] = "We take food safety and quality issues extremely seriously."
      } else if (settings.severity === 'urgent') {
        newLines[0] = "Piyush, this has been immediately escalated to our owner."
        newLines[1] = "We are treating this as an urgent matter requiring immediate resolution."
        newLines[2] = "Our quality assurance team will be contacting you directly."
      }
      
      // If a smart snippet was selected, inject it
      if (settings.selectedSnippet) {
        newLines.splice(2, 0, settings.selectedSnippet)
      }
      
      setDraftLines(newLines)
      setIsRegenerating(false)
    }, 1500)
  }

  // Fix 5: Mic click handler — opens global voice overlay
  const handleMicClick = () => {
    setShowVoice(true)
  }

  const getSelectedText = () => {
    if (!selection) return null
    if (selection.type === 'line') return draftLines[selection.lineIndex]
    return draftLines[selection.lineIndex].split(' ')[selection.wordIndex]
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
      <div className="flex items-center justify-between px-5 py-3">
        <h1 className="text-white text-[15px] font-semibold">Setting up auto-response</h1>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/15 transition-colors"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {/* Customer review card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              P
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-900 text-[13px] font-semibold">Piyush C.</span>
                <span className="text-[10px] text-gray-400">•</span>
                <span className="text-[10px] text-gray-400">2h ago</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <PlatformBadge name="Zomato" color="bg-zomato-red" />
                <PlatformBadge name="Koramangala" color="bg-emerald-500" />
              </div>
            </div>
            {/* Star rating */}
            <div className="flex items-center gap-0.5">
              {[1].map(s => (
                <svg key={s} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              {[2, 3, 4, 5].map(s => (
                <svg key={s} className="w-3.5 h-3.5 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-gray-700 text-[13px] leading-relaxed">{reviewText}</p>
        </motion.div>

        {/* AI Response card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 shadow-lg relative"
          ref={responseRef}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center shadow-sm">
              <SparklesIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-gray-900 text-[13px] font-semibold">Olly's Draft Response</span>
            <div className="ml-auto flex items-center gap-1 text-[10px] text-gray-400">
              <Pencil className="w-3 h-3" />
              <span>Tap to edit lines</span>
            </div>
          </div>

          {/* Draft text with clickable lines */}
          <div className={`flex flex-col gap-2 transition-opacity duration-300 ${isRegenerating ? 'opacity-40' : 'opacity-100'}`}>
            {draftLines.map((line, i) => {
              const isLineSelected = selection?.type === 'line' && selection.lineIndex === i
              return (
                <p
                  key={`${i}-${line.slice(0, 20)}`}
                  className={`text-[13.5px] leading-[1.6] rounded-lg px-1.5 py-0.5 -mx-1.5 transition-all duration-200 ${
                    isLineSelected
                      ? 'bg-yellow-100 text-gray-900 ring-1 ring-yellow-300'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {line.split(' ').map((word, wIdx) => {
                    const isWordSelected = selection?.type === 'word' && selection.lineIndex === i && selection.wordIndex === wIdx
                    const isWordTapped = tappedLocation?.lineIndex === i && tappedLocation?.wordIndex === wIdx
                    
                    const highlightClass = (isWordSelected || isWordTapped) && !isLineSelected 
                      ? 'bg-yellow-100 text-gray-900 ring-1 ring-yellow-300' 
                      : ''

                    let prefix = null;
                    if (word === '+91' || word.includes('@') || word.match(/^[0-9]{10}$/)) {
                      prefix = <br />;
                    }

                    return (
                      <span key={wIdx}>
                        {prefix}
                        <span
                          onClick={(e) => handleWordClick(i, wIdx, e)}
                          className={`cursor-pointer inline-block rounded-sm transition-colors ${highlightClass}`}
                        >
                          {word}
                        </span>
                        {' '}
                      </span>
                    )
                  })}
                </p>
              )
            })}
            
            {/* Sign-off section */}
            <div className="mt-1 text-[13.5px] leading-[1.6] text-gray-700 px-1.5 pointer-events-none">
              <p>Thanks,</p>
              <p className="font-semibold">Team Olly Restaurant</p>
            </div>
          </div>

          {/* Loading shimmer during regeneration */}
          {isRegenerating && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <RefreshCw className="w-5 h-5 text-brand-primary" />
                </motion.div>
                <span className="text-sm text-brand-primary font-medium">Regenerating...</span>
              </div>
            </div>
          )}

          {/* Contextual Selection Menu for Select Word / Select Line */}
          <AnimatePresence>
            {tappedLocation !== null && !isRegenerating && (
              <SelectionMenu
                position={{ x: tappedLocation.x, y: tappedLocation.y }}
                onSelect={(type) => {
                  setSelection({ type, lineIndex: tappedLocation.lineIndex, wordIndex: tappedLocation.wordIndex })
                  setTooltipPos({ x: tappedLocation.x, y: tappedLocation.y })
                  setTappedLocation(null)
                }}
                onDismiss={() => setTappedLocation(null)}
              />
            )}
          </AnimatePresence>

          {/* Inline edit tooltip — Enhance + Translate only (Fix 4) */}
          <AnimatePresence>
            {selection !== null && !isRegenerating && !showTranslate && (
              <InlineEditTooltip
                position={tooltipPos}
                onAction={handleInlineAction}
                onDismiss={() => setSelection(null)}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Action chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="relative"
        >
          <div className="flex items-center gap-2 overflow-x-auto chip-scroll pb-1 pr-10">
            {chips.filter(c => c.active).map((chip) => {
              const Icon = chip.icon
              return (
                <button
                  key={chip.id}
                  onClick={() => handleChipClick(chip.id)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-navy-800 border border-white/10 text-white/80 text-[12px] font-medium hover:bg-navy-700 hover:border-brand-primary/30 hover:text-white transition-all chip-glow"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {chip.label}
                </button>
              )
            })}
            
            {/* Add chip button */}
            <button
              onClick={() => setShowChipManager(true)}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-dashed border-white/15 flex items-center justify-center hover:bg-white/10 hover:border-brand-primary/30 transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-white/40" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom area with mic and send */}
      <div className="px-4 pb-10 pt-3 bg-gradient-to-t from-navy-950 via-navy-950/95 to-transparent">
        <div className="flex items-center gap-3">
          {/* Fix 5: Context-aware Mic button */}
          <div className="relative">
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMicClick}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center shadow-lg shadow-brand-primary/30 mic-pulse"
            >
              <Mic className="w-5 h-5 text-white" />
            </motion.button>
          </div>
          
          {/* Send Reply button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileTap={{ scale: 0.97 }}
            onClick={onSendReply}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-[14px] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20"
          >
            <Send className="w-4 h-4" />
            Send Reply
          </motion.button>
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {showVoice && (
          <VoiceOverlay
            onClose={() => setShowVoice(false)}
            onComplete={handleVoiceComplete}
            quotedText={getSelectedText()}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEnhance && (
          <EnhanceSheet
            onClose={() => setShowEnhance(false)}
            onApply={handleEnhanceApply}
            savedPhrases={savedPhrases}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTranslate && (
          <TranslateOverlay
            onClose={() => { setShowTranslate(false) }}
            onTranslate={handleTranslateConfirm}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChipManager && (
          <ChipManager
            chips={chips}
            onUpdateChips={setChips}
            onClose={() => setShowChipManager(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function PlatformBadge({ name, color }) {
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-white text-[9px] font-semibold ${color}`}>
      <span className="w-1 h-1 bg-white rounded-full" />
      {name}
    </span>
  )
}

function SparklesIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  )
}
