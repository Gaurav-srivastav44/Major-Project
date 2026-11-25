import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  { q: 'What is Finlytics?', a: 'Finlytics is a personal finance analytics platform designed to help you budget, compare investments and plan your financial future.' },
  { q: 'Can I compare investment options?', a: 'Finlytics is designed to compare investments using return and risk assumptions. Projections are illustrative, not guaranteed.' },
  { q: 'Does Finlytics support Indian tax planning?', a: 'The planned tax tools estimate liabilities and help compare old and new income tax regimes.' },
  { q: 'How does the wealth simulator work?', a: 'It estimates potential growth based on starting capital, recurring contributions, expected returns and duration.' },
  { q: 'Is my financial data secure?', a: 'Security depends on your deployed application and backend configuration. Review your privacy and security policies before entering sensitive data.' }
]

export default function FAQSection({ reducedMotion, Reveal, RevealHeading, SectionBadge }) {
  const [activeFaq, setActiveFaq] = useState(null)
  const transition = reducedMotion ? { duration: 0 } : { height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.25 } }

  return (
    <section id="faq" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <SectionBadge>FAQs</SectionBadge>
        <RevealHeading className="mt-5 text-4xl font-bold md:text-5xl" lines={[{ text: 'Everything You Need to Know' }, { text: 'Before Getting Started.', className: 'text-gray-400' }]} />
        <Reveal delay={0.2}><p className="mt-5 text-sm text-gray-400">Find answers to commonly asked questions about Finlytics.</p></Reveal>
        <div className="mt-12 space-y-3 text-left">
          {faqs.map((faq, i) => {
            const open = activeFaq === i
            return (
              <Reveal key={faq.q} delay={i * 0.06} y={16}>
                <div className={`overflow-hidden rounded-xl border bg-[#111115] transition-[border-color,box-shadow] duration-300 ${open ? 'border-violet-500/30 shadow-[0_0_30px_rgba(110,70,255,0.12)]' : 'border-white/[0.08] hover:border-white/20'}`}>
                  <button type="button" onClick={() => setActiveFaq(open ? null : i)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-medium">
                    {faq.q}
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }} className="shrink-0 text-violet-400"><ChevronDown size={18} /></motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={transition} className="overflow-hidden">
                        <motion.div initial={{ y: reducedMotion ? 0 : -6 }} animate={{ y: 0 }} transition={{ duration: 0.3 }} className="px-5 pb-5 text-sm leading-7 text-gray-400">{faq.a}</motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
