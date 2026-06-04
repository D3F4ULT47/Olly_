import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const screenVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
}

const reviewText = "Bad food taste and poor service, chokadevi was rude. I ordered Biryani gravy, masala dosa and Bhature! Taste was very mediocre."

const responseLines = [
  "Hey Piyush! Sorry you had this unpleasant experience.",
  "I've heard the feedback – the taste and service can't be mediocre.",
  "We want to make it right, I'll talk to our chef directly.",
  "Would love to provide a tastier experience next time!",
  "Please reach out to us at +91 87133 15179.",
]

export default function ReplySent({ onContinue }) {
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
        <div className="w-8 h-8" />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Success checkmark */}
        <div className="flex flex-col items-center py-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="relative mb-4"
          >
            {/* Glow ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ delay: 0.5, duration: 1.5, repeat: Infinity }}
              className="absolute -inset-3 rounded-full bg-success-green/20"
            />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-success-green to-emerald-400 flex items-center justify-center shadow-xl shadow-success-green/25">
              <Check className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white text-[20px] font-bold mb-1"
          >
            Reply sent
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/40 text-[12px] mb-4"
          >
            Olly has learnt your style
          </motion.p>
        </div>

        {/* Review card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-4 shadow-lg mb-3"
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
              P
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-900 text-[13px] font-semibold">Piyush C.</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-white text-[9px] font-semibold bg-zomato-red">
                  <span className="w-1 h-1 bg-white rounded-full" />
                  Zomato
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-white text-[9px] font-semibold bg-emerald-500">
                  <span className="w-1 h-1 bg-white rounded-full" />
                  Koramangala
                </span>
              </div>
            </div>
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

        {/* Response card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
              <OllyIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-gray-900 text-[13px] font-semibold">Your Reply</span>
            <span className="ml-auto text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              Sent
            </span>
          </div>
          <div className="space-y-0.5">
            {responseLines.map((line, i) => (
              <p key={i} className="text-gray-700 text-[13px] leading-relaxed">{line}</p>
            ))}
          </div>
          {/* The Beer Cafe label */}
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 text-[10px] font-bold">🍺</div>
            <span className="text-gray-500 text-[11px]">Replied as <span className="font-semibold text-gray-700">The Beer Cafe</span></span>
          </div>
        </motion.div>
      </div>

      {/* Bottom button */}
      <div className="px-4 pb-10 pt-3 bg-gradient-to-t from-navy-950 via-navy-950/95 to-transparent">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="w-full py-3.5 rounded-full bg-white/10 border border-white/15 text-white text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
        >
          Activate auto response
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

function OllyIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 1 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  )
}
