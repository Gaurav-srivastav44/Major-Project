
import { useState } from 'react'
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  Wallet,
  TrendingUp,
  BrainCircuit,
  Search,
  ArrowUpRight,
  PieChart,
  ShieldCheck,
  Landmark,
  BarChart3,
  Sparkles,
  Activity,
  Zap,
} from 'lucide-react'

// ==================== CONFIG ====================

const ease = [0.22, 1, 0.36, 1]

const features = [
  {
    title: 'Smart Budget Planning',
    description:
      'Track your income, expenses and savings goals with intelligent budget insights.',
    icon: Wallet,
    span: 'md:col-span-1',
    color: 'cyan',
  },
  {
    title: 'Wealth Simulator',
    description:
      'Visualize how your savings and investments could grow over time.',
    icon: TrendingUp,
    span: 'md:col-span-2',
    color: 'violet',
  },
  {
    title: 'Investment Comparison',
    description:
      'Compare stocks, mutual funds, gold and fixed deposits using risk and return assumptions.',
    icon: Search,
    span: 'md:col-span-2',
    color: 'emerald',
  },
  {
    title: 'AI Expense Intelligence',
    description:
      'Identify spending patterns, forecast expenses and detect unusual transactions.',
    icon: BrainCircuit,
    span: 'md:col-span-1',
    color: 'violet',
  },
]

const investmentData = [
  { name: 'Stocks', width: '85%', color: 'bg-cyan-400' },
  { name: 'Mutual Funds', width: '70%', color: 'bg-violet-400' },
  { name: 'Gold', width: '55%', color: 'bg-amber-400' },
  { name: 'Fixed Deposit', width: '40%', color: 'bg-emerald-400' },
]

const chartHeights = [24, 36, 30, 45, 43, 58, 54, 70, 66, 83, 78, 96]

const themes = {
  cyan: {
    icon: 'text-cyan-300',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    glow: 'rgba(34,211,238,0.16)',
  },
  violet: {
    icon: 'text-violet-300',
    bg: 'bg-violet-400/10',
    border: 'border-violet-400/20',
    glow: 'rgba(167,139,250,0.16)',
  },
  emerald: {
    icon: 'text-emerald-300',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    glow: 'rgba(52,211,153,0.16)',
  },
}

// ==================== BACKGROUND GRID ====================

function AnimatedGrid({ reducedMotion }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                backgroundPosition: [
                  '0px 0px',
                  '64px 64px',
                ],
              }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(103,232,249,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(103,232,249,0.12) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at center,black 5%,transparent 75%)',
        }}
      />

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                x: [-50, 50, -50],
                y: [-25, 30, -25],
                scale: [1, 1.2, 1],
              }
        }
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-[5%] top-[20%] h-80 w-80 rounded-full bg-cyan-500/[0.08] blur-[110px]"
      />

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                x: [40, -50, 40],
                y: [35, -35, 35],
                scale: [1, 1.15, 1],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-[5%] bottom-[10%] h-96 w-96 rounded-full bg-violet-500/[0.10] blur-[120px]"
      />
    </div>
  )
}

// ==================== BUDGET VISUAL ====================

function BudgetVisual({ reducedMotion }) {
  const radius = 57
  const circumference = 2 * Math.PI * radius
  const progress = 0.467

  return (
    <div className="relative flex h-48 items-center justify-center">
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : { y: [0, -5, 0] }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex items-center justify-center"
      >
        <svg
          width="158"
          height="158"
          viewBox="0 0 158 158"
          className="-rotate-90"
          aria-label="Illustrative savings rate 46.7%"
          role="img"
        >
          <circle
            cx="79"
            cy="79"
            r={radius}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="13"
            fill="none"
          />

          <motion.circle
            cx="79"
            cy="79"
            r={radius}
            stroke="url(#budgetGradient)"
            strokeWidth="13"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            initial={
              reducedMotion
                ? false
                : { strokeDashoffset: circumference }
            }
            whileInView={{
              strokeDashoffset:
                circumference * (1 - progress),
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1.8,
              delay: 0.2,
              ease,
            }}
          />

          <defs>
            <linearGradient id="budgetGradient">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute text-center">
          <p className="text-3xl font-extrabold text-white">
            46.7%
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Savings Rate
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={
          reducedMotion
            ? false
            : { opacity: 0, x: 20, y: -10 }
        }
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6 }}
        animate={
          reducedMotion
            ? undefined
            : { y: [0, -6, 0] }
        }
        className="absolute right-0 top-2 rounded-xl border border-emerald-400/20 bg-[#0a1928]/65 px-3 py-2 text-xs font-semibold text-emerald-300 shadow-xl backdrop-blur-xl"
      >
        +₹28,000
      </motion.div>
    </div>
  )
}

// ==================== WEALTH VISUAL ====================

function WealthVisual({ reducedMotion }) {
  return (
    <div className="relative h-48 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Projected Growth
        </span>

        <span className="flex items-center gap-1.5 text-xs text-emerald-300">
          <TrendingUp size={14} />
          Simulation
        </span>
      </div>

      <div
        className="relative mt-5 h-28"
        style={{
          backgroundImage:
            'linear-gradient(to bottom,rgba(255,255,255,0.08) 1px,transparent 1px)',
          backgroundSize: '100% 25%',
        }}
      >
        <div className="absolute inset-0 flex items-end gap-2">
          {chartHeights.map((height, index) => (
            <motion.div
              key={index}
              initial={
                reducedMotion
                  ? false
                  : { height: 0 }
              }
              whileInView={{ height: `${height}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 0.85,
                delay: index * 0.075,
                ease,
              }}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      scaleX: 1.12,
                      filter: 'brightness(1.5)',
                    }
              }
              className="relative flex-1 overflow-hidden rounded-t-md bg-gradient-to-t from-indigo-600/35 via-violet-500/65 to-cyan-300/90"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-cyan-200/80" />

              {!reducedMotion && (
                <motion.div
                  animate={{ y: ['120%', '-120%'] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    delay: index * 0.1,
                  }}
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ==================== INVESTMENT VISUAL ====================

function InvestmentVisual({ reducedMotion }) {
  return (
    <div className="flex h-48 flex-col justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] px-5">
      {investmentData.map((item, index) => (
        <div key={item.name} className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-[11px] text-slate-400">
            {item.name}
          </span>

          <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { width: 0 }
              }
              whileInView={{ width: item.width }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: index * 0.15,
                ease,
              }}
              className={`relative h-full overflow-hidden rounded-full ${item.color}`}
            >
              {!reducedMotion && (
                <motion.div
                  animate={{ x: ['-100%', '250%'] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              )}
            </motion.div>
          </div>
        </div>
      ))}

      <p className="text-[10px] text-slate-500">
        Illustrative comparison, not actual market returns.
      </p>
    </div>
  )
}

// ==================== AI VISUAL ====================

function AIVisual({ reducedMotion }) {
  return (
    <div className="relative flex h-48 items-center justify-center overflow-hidden">
      {/* Orbit rings */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : { rotate: 360 }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute h-44 w-44 rounded-full border border-dashed border-violet-400/25"
      >
        <span className="absolute left-1/2 top-[-4px] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,0.8)]" />
      </motion.div>

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : { rotate: -360 }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute h-36 w-36 rounded-full border border-cyan-400/20"
      >
        <span className="absolute bottom-1 left-2 h-1.5 w-1.5 rounded-full bg-violet-300" />
      </motion.div>

      {/* Brain icon */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -7, 0],
                rotate: [0, 4, -4, 0],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-violet-400/30 bg-violet-500/10 shadow-[0_0_65px_rgba(139,92,246,0.2)] backdrop-blur-xl"
      >
        <BrainCircuit
          size={58}
          className="text-violet-300"
          strokeWidth={1.3}
        />
      </motion.div>

      {/* Floating icons */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : { y: [0, -10, 0] }
        }
        transition={{ duration: 3.5, repeat: Infinity }}
        className="absolute right-6 top-4 text-cyan-300"
      >
        <Sparkles size={20} />
      </motion.div>

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : { y: [0, 9, 0] }
        }
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-3 left-6 text-violet-300"
      >
        <BarChart3 size={21} />
      </motion.div>
    </div>
  )
}

// ==================== FEATURE VISUAL ====================

function FeatureVisual({ index, reducedMotion }) {
  if (index === 0) {
    return <BudgetVisual reducedMotion={reducedMotion} />
  }

  if (index === 1) {
    return <WealthVisual reducedMotion={reducedMotion} />
  }

  if (index === 2) {
    return <InvestmentVisual reducedMotion={reducedMotion} />
  }

  return <AIVisual reducedMotion={reducedMotion} />
}

// ==================== INTERACTIVE CARD ====================

function FeatureCard({ feature, index, reducedMotion }) {
  const Icon = feature.icon
  const theme = themes[feature.color]

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, {
    stiffness: 150,
    damping: 25,
  })

  const smoothY = useSpring(mouseY, {
    stiffness: 150,
    damping: 25,
  })

  const spotlight = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(380px circle at ${x}px ${y}px, ${theme.glow}, transparent 75%)`
  )

  const handleMouseMove = (event) => {
    if (reducedMotion) return

    const rect = event.currentTarget.getBoundingClientRect()

    mouseX.set(event.clientX - rect.left)
    mouseY.set(event.clientY - rect.top)
  }

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 50,
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
        delay: index * 0.12,
        ease,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -9,
              scale: 1.012,
            }
      }
      className={`${feature.span} group relative flex min-h-[390px] flex-col overflow-hidden rounded-3xl border border-white/[0.13] bg-[#0b1424]/35 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-colors hover:border-cyan-300/30 md:p-7`}
    >
      {/* Mouse spotlight */}
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}

      {/* Top glass highlight */}
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      {/* Fine internal grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10">
        <FeatureVisual
          index={index}
          reducedMotion={reducedMotion}
        />
      </div>

      <div className="relative z-10 mt-auto pt-8">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={
              reducedMotion
                ? undefined
                : {
                    rotate: 10,
                    scale: 1.12,
                  }
            }
            className={`flex h-12 w-12 items-center justify-center rounded-xl border ${theme.border} ${theme.bg}`}
          >
            <Icon size={22} className={theme.icon} />
          </motion.div>

          <ArrowUpRight
            size={20}
            className="text-slate-500 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300"
          />
        </div>

        <h3 className="mt-5 text-xl font-bold text-white">
          {feature.title}
        </h3>

        <p className="mt-3 max-w-lg text-sm leading-7 text-slate-400">
          {feature.description}
        </p>
      </div>
    </motion.article>
  )
}

// ==================== MAIN SECTION ====================

export default function FeaturesSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="features"
      className="relative isolate scroll-mt-24 overflow-hidden bg-transparent px-6 py-28 md:px-12"
    >
      <AnimatedGrid reducedMotion={reducedMotion} />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 35 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="max-w-3xl"
        >
          <motion.span
            animate={
              reducedMotion
                ? undefined
                : {
                    boxShadow: [
                      '0 0 0px rgba(103,232,249,0)',
                      '0 0 20px rgba(103,232,249,0.12)',
                      '0 0 0px rgba(103,232,249,0)',
                    ],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-4 py-2 text-xs font-semibold text-cyan-300 backdrop-blur-md"
          >
            <Sparkles size={14} />
            Powerful Features
          </motion.span>

          <h2 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Everything You Need.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-400 bg-clip-text text-transparent">
              One Intelligent Platform.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300">
            From daily expense tracking to long-term wealth planning,
            Finlytics transforms financial data into meaningful insights.
          </p>
        </motion.div>

        {/* Bento feature grid */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Bottom feature tags */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {[
            { icon: PieChart, label: 'Financial Analytics' },
            { icon: Landmark, label: 'Tax Planning' },
            { icon: ShieldCheck, label: 'Scenario Analysis' },
            { icon: Activity, label: 'Expense Forecasting' },
            { icon: Zap, label: 'AI Insights' },
          ].map((item) => {
            const Icon = item.icon

            return (
              <motion.span
                key={item.label}
                whileHover={
                  reducedMotion
                    ? undefined
                    : { y: -3, scale: 1.04 }
                }
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-xs text-slate-300 backdrop-blur-md transition-colors hover:border-cyan-300/25 hover:text-cyan-300"
              >
                <Icon size={15} />
                {item.label}
              </motion.span>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
