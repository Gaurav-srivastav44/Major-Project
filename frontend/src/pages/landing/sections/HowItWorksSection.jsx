
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import {
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Zap,
  ChevronRight,
} from 'lucide-react'

// ==================== CONFIG ====================

const ease = [0.22, 1, 0.36, 1]

const steps = [
  {
    number: '01',
    title: 'Add Your Data',
    description:
      'Enter your income, expenses, savings and financial goals to build your financial profile.',
    image: '/images/add-data.png',
    tags: ['Income', 'Expenses', 'Savings'],
    color: 'cyan',
  },
  {
    number: '02',
    title: 'Discover Insights',
    description:
      'Explore intelligent budgets, spending patterns, financial forecasts and personalized analytics.',
    image: '/images/insights.png',
    tags: ['Analytics', 'Forecasting', 'AI'],
    color: 'violet',
  },
  {
    number: '03',
    title: 'Plan Ahead',
    description:
      'Compare financial scenarios, explore investments and plan confidently for your future.',
    image: '/images/planning.png',
    tags: ['Investments', 'Goals', 'Wealth'],
    color: 'cyan',
  },
]

const themes = {
  cyan: {
    glow: 'from-cyan-500/20 to-blue-500/10',
    border: 'group-hover:border-cyan-400/40',
    text: 'text-cyan-300',
    badge: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300',
  },
  violet: {
    glow: 'from-violet-500/20 to-fuchsia-500/10',
    border: 'group-hover:border-violet-400/40',
    text: 'text-violet-300',
    badge: 'border-violet-400/20 bg-violet-400/10 text-violet-300',
  },
}

// ==================== BACKGROUND ====================

function SectionBackground({ reducedMotion }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#050b18] via-[#080e20] to-[#050b18]" />

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                backgroundPosition: [
                  '0px 0px',
                  '60px 60px',
                ],
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(103,232,249,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(103,232,249,0.08) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse at center,black,transparent 80%)',
        }}
      />

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                x: [-40, 60, -40],
                y: [-30, 40, -30],
                scale: [1, 1.2, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-500/[0.08] blur-[110px]"
      />

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                x: [50, -50, 50],
                y: [30, -40, 30],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet-500/[0.10] blur-[110px]"
      />
    </div>
  )
}

// ==================== STEP CARD ====================

function StepCard({ step, index, reducedMotion }) {
  const theme = themes[step.color]

  return (
    <motion.article
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 55,
              scale: 0.94,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.75,
        delay: index * 0.18,
        ease,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -10, scale: 1.02 }
      }
      className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-colors duration-300 ${theme.border}`}
    >
      {/* Illustration area */}
      <div className="relative flex h-56 items-center justify-center overflow-hidden border-b border-white/5 bg-[#0c152b]">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${theme.glow}`}
        />

        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                  opacity: [0.35, 0.6, 0.35],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute h-40 w-40 rounded-full bg-cyan-400/10 blur-[50px]"
        />

        <motion.img
          src={step.image}
          alt={step.title}
          loading="lazy"
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -9, 0],
                }
          }
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={
            reducedMotion
              ? undefined
              : {
                  scale: 1.1,
                  rotate: 2,
                }
          }
          className="relative z-10 h-48 w-full object-contain p-4 drop-shadow-[0_20px_35px_rgba(56,189,248,0.15)]"
        />

        <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-[#081222]/70 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white backdrop-blur-lg">
          STEP {step.number}
        </span>

        <ArrowUpRight
          size={18}
          className="absolute right-5 top-5 text-white/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300"
        />
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-white">
          {step.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-400">
          {step.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {step.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-3 py-1.5 text-[10px] font-medium ${theme.badge}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-slate-400">
          <CheckCircle2
            size={15}
            className={theme.text}
          />
          Smarter financial decisions
        </div>
      </div>

      {/* Hover gradient line */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  )
}

// ==================== MAIN SECTION ====================

export default function HowItWorksSection({
  reducedMotion: reducedMotionProp,
}) {
  const prefersReducedMotion = useReducedMotion()
  const reducedMotion =
    reducedMotionProp ?? prefersReducedMotion

  const stepsRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ['start 75%', 'end 55%'],
  })

  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
  })

  return (
    <section
      id="how-it-works"
      className="relative isolate scroll-mt-24 overflow-hidden px-6 py-28 text-white md:px-12 md:py-36"
    >
      <SectionBackground reducedMotion={reducedMotion} />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 30 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-300">
            <Sparkles size={14} />
            Simple Process
          </span>

          <h2 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Your Financial Journey,
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
              Made Simple.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 md:text-base">
            Three simple steps to understand your money,
            discover powerful insights and plan a smarter
            financial future.
          </p>
        </motion.div>

        {/* Progress timeline */}
        <div
          ref={stepsRef}
          className="relative mt-20 grid gap-8 md:grid-cols-3"
        >
          <div className="absolute -top-5 left-[16%] right-[16%] hidden h-px bg-white/10 md:block" />

          <motion.div
            aria-hidden="true"
            style={{
              scaleX: reducedMotion ? 1 : lineProgress,
            }}
            className="absolute -top-5 left-[16%] right-[16%] hidden h-px origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_12px_rgba(56,189,248,0.6)] md:block"
          />

          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Bottom features */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 25 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 flex flex-col items-center gap-7"
        >
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-emerald-400" />
              Data-Driven Planning
            </span>

            <span className="flex items-center gap-2">
              <TrendingUp size={15} className="text-cyan-400" />
              Financial Analytics
            </span>

            <span className="flex items-center gap-2">
              <Zap size={15} className="text-violet-400" />
              AI-Powered Insights
            </span>
          </div>

          <motion.a
            href="#features"
            whileHover={
              reducedMotion
                ? undefined
                : { y: -4, scale: 1.04 }
            }
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 px-8 py-4 text-sm font-bold text-slate-950 shadow-[0_12px_35px_rgba(56,189,248,0.2)]"
          >
            Explore Finlytics Features
            <ChevronRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
