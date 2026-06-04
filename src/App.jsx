import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PhrasesOnboarding from './screens/PhrasesOnboarding'
import OnboardingSlide from './screens/OnboardingSlide'
import VideoWalkthroughScreen from './screens/VideoWalkthroughScreen'
import LoadingScreen from './screens/LoadingScreen'
import ReviewSetup from './screens/ReviewSetup'
import ReviewConfirm from './screens/ReviewConfirm'
import ReplySent from './screens/ReplySent'
import FinalScreen from './screens/FinalScreen'
import StarsBackground from './components/StarsBackground'

/*
  9-screen flow (Fix 1: Library of Phrases moved after onboarding):
  0 — "Your customers post reviews everywhere" (OnboardingSlide 0)
  1 — "Olly will respond within 30 mins" (OnboardingSlide 1)
  2 — "Customers feel heard and engaged" (OnboardingSlide 2)
  3 — NEW: Product Walkthrough Video Screen
  4 — Library of Phrases (PhrasesOnboarding)
  5 — Loading / Generating response (LoadingScreen)
  6 — Core Review Setup with AI Draft (ReviewSetup)
  7 — "Looks good to you?" (ReviewConfirm)
  8 — "Reply sent / Olly has learnt your style" (ReplySent)
  9 — "Take that break you deserve!" (FinalScreen)
*/

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [direction, setDirection] = useState(1)
  // Global savedPhrases state — populated by PhrasesOnboarding, consumed by EnhanceSheet
  const [savedPhrases, setSavedPhrases] = useState([])

  const goTo = (screen) => {
    setDirection(screen > currentScreen ? 1 : -1)
    setCurrentScreen(screen)
  }

  const screens = [
    /* 0 */ <OnboardingSlide key="onboard-0" slideIndex={0} onContinue={() => goTo(1)} onClose={() => goTo(4)} />,
    /* 1 */ <OnboardingSlide key="onboard-1" slideIndex={1} onContinue={() => goTo(2)} onClose={() => goTo(4)} />,
    /* 2 */ <OnboardingSlide key="onboard-2" slideIndex={2} onContinue={() => goTo(3)} onClose={() => goTo(4)} />,
    /* 3 */ <VideoWalkthroughScreen key="video" onContinue={() => goTo(4)} />,
    /* 4 */ <PhrasesOnboarding key="phrases" onContinue={() => goTo(5)} onSkip={() => goTo(5)} onSavePhrases={setSavedPhrases} />,
    /* 5 */ <LoadingScreen key="loading" onComplete={() => goTo(6)} onClose={() => goTo(4)} />,
    /* 6 */ <ReviewSetup key="review" onClose={() => goTo(4)} onSendReply={() => goTo(7)} savedPhrases={savedPhrases} />,
    /* 7 */ <ReviewConfirm key="confirm" onClose={() => goTo(6)} onSendReply={() => goTo(8)} />,
    /* 8 */ <ReplySent key="sent" onContinue={() => goTo(9)} />,
    /* 9 */ <FinalScreen key="final" onDone={() => goTo(0)} />,
  ]

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#050a18] p-4">
      {/* Mobile device container */}
      <div className="relative w-full max-w-[400px] h-[800px] bg-navy-950 rounded-[40px] overflow-hidden shadow-2xl shadow-brand-primary/10 border border-white/5">
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-7 pt-3 pb-1">
          <span className="text-white/80 text-xs font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-[2px]">
              <div className="w-[3px] h-[4px] bg-white/70 rounded-sm" />
              <div className="w-[3px] h-[6px] bg-white/70 rounded-sm" />
              <div className="w-[3px] h-[8px] bg-white/70 rounded-sm" />
              <div className="w-[3px] h-[10px] bg-white/40 rounded-sm" />
            </div>
            <span className="text-white/70 text-[9px] font-medium ml-1">5G</span>
            <svg width="18" height="10" viewBox="0 0 18 10" className="ml-1">
              <rect x="0" y="0" width="15" height="10" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <rect x="1.5" y="1.5" width="9" height="7" rx="1" fill="rgba(255,255,255,0.7)" />
              <rect x="16" y="3" width="2" height="4" rx="1" fill="rgba(255,255,255,0.4)" />
            </svg>
          </div>
        </div>
        
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-b-2xl z-50" />
        
        {/* Stars background */}
        <StarsBackground />

        {/* Screen content */}
        <div className="relative w-full h-full z-10">
          <AnimatePresence mode="wait" custom={direction}>
            {screens[currentScreen]}
          </AnimatePresence>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full z-50" />
      </div>
    </div>
  )
}
