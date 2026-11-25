
import { useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'

import heroVideo from '../../assets/finlytics-bg.mp4'

import Navbar from './sections/Navbar'
import HeroSection from './sections/HeroSection'
import FeaturesSection from './sections/FeaturesSection'
import HowItWorksSection from './sections/HowItWorksSection'
import FAQSection from './sections/FAQSection'
import CTASection from './sections/CTASection'
import FooterSection from './sections/FooterSection'

// ==================== SECTION BADGE ====================

function SectionBadge({ children }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" />
      {children}
    </motion.span>
  )
}

// ==================== MAIN LANDING PAGE ====================

export default function LandingPage2() {
  const [menuOpen, setMenuOpen] = useState(false)

  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll()

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
  })

  // ==================== REVEAL ANIMATION ====================

  const Reveal = ({
    children,
    delay = 0,
    y = 24,
    className = '',
  }) => (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )

  // ==================== HEADING ANIMATION ====================

  const RevealHeading = ({
    lines,
    className = '',
  }) => (
    <motion.h2
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {lines.map((line, index) => (
        <span key={line.text}>
          {index > 0 && <br />}
          <span className={line.className}>
            {line.text}
          </span>
        </span>
      ))}
    </motion.h2>
  )

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#07101f] text-slate-100 selection:bg-cyan-300/30">

      {/* ==================== VIDEO BACKGROUND ==================== */}

      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#050816]/70" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07101f]/40 via-[#07101f]/50 to-[#07101f]/90" />

        {/* Cyan glow */}
        <div className="absolute -left-48 -top-40 h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* Violet glow */}
        <div className="absolute -bottom-48 -right-40 h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[130px]" />
      </div>

      {/* ==================== SCROLL PROGRESS ==================== */}

      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[100] h-1 w-full origin-left bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-500"
        style={{
          scaleX: progressScale,
        }}
      />

      {/* ==================== PAGE CONTENT ==================== */}

      <div className="relative z-10 mx-auto max-w-[1440px]">

        {/* Navbar */}
        <Navbar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          activeSection="home"
          reducedMotion={reducedMotion}
        />

        {/* Hero */}
        <HeroSection />

        {/* Features */}
        <FeaturesSection />

        {/* How It Works */}
        <HowItWorksSection
          reducedMotion={reducedMotion}
          Reveal={Reveal}
          RevealHeading={RevealHeading}
          SectionBadge={SectionBadge}
        />


        {/* Call To Action */}
        <CTASection />
        
        {/* FAQs */}
        <FAQSection
          reducedMotion={reducedMotion}
          Reveal={Reveal}
          RevealHeading={RevealHeading}
          SectionBadge={SectionBadge}
        />

        {/* Footer */}
        <FooterSection />

      </div>
    </main>
  )
}
