
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  Activity,
  ChartNoAxesCombined,
  CircleCheck,
  Zap,
  Search,
  Mouse,
  BrainCircuit,
} from 'lucide-react'

// ==================== CONFIG ====================

const ease = [0.22, 1, 0.36, 1]

const stats = [
  {
    label: 'Monthly Income',
    value: 60000,
    icon: Wallet,
    color: 'cyan',
    detail: 'Income overview',
  },
  {
    label: 'Total Expenses',
    value: 32000,
    icon: Activity,
    color: 'indigo',
    detail: 'Expense tracking',
  },
  {
    label: 'Monthly Savings',
    value: 28000,
    icon: PiggyBank,
    color: 'emerald',
    detail: '46.7% of income',
  },
]

const chartData = [
  28, 36, 33, 45, 42, 56,
  53, 66, 62, 75, 72, 88,
]

const particles = [
  [8, 18],
  [20, 45],
  [36, 12],
  [55, 28],
  [73, 14],
  [88, 42],
  [12, 75],
  [68, 78],
  [92, 70],
  [44, 90],
  [30, 65],
  [80, 92],
]

const colors = {
  cyan: {
    icon: 'text-cyan-600',
    background: 'bg-cyan-50',
    border: 'border-cyan-100',
    glow: 'bg-cyan-300/20',
  },
  indigo: {
    icon: 'text-indigo-600',
    background: 'bg-indigo-50',
    border: 'border-indigo-100',
    glow: 'bg-indigo-300/20',
  },
  emerald: {
    icon: 'text-emerald-600',
    background: 'bg-emerald-50',
    border: 'border-emerald-100',
    glow: 'bg-emerald-300/20',
  },
}

// ==================== HERO BACKGROUND ====================

function AnimatedBackground({ reducedMotion }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Transparent overlay keeps parent video visible */}
      <div className="absolute inset-0 bg-[#030712]/20" />

      {/* Animated grid */}
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
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(103,232,249,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(103,232,249,0.12) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse at center,black,transparent 75%)',
        }}
      />

      {/* Cyan glow */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                x: [-50, 70, -50],
                y: [-30, 45, -30],
                scale: [1, 1.15, 1],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-[10%] top-[15%] h-80 w-80 rounded-full bg-cyan-500/[0.08] blur-[100px]"
      />

      {/* Violet glow */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                x: [50, -60, 50],
                y: [40, -40, 40],
                scale: [1, 1.2, 1],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-[5%] top-[35%] h-96 w-96 rounded-full bg-violet-500/[0.10] blur-[110px]"
      />

      {/* Floating particles */}
      {!reducedMotion &&
        particles.map(([x, y], index) => (
          <motion.span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-cyan-200/70 shadow-[0_0_10px_rgba(103,232,249,0.7)]"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.15, 0.8, 0.15],
              scale: [0.7, 1.5, 0.7],
            }}
            transition={{
              duration: 3 + (index % 4),
              delay: index * 0.35,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07101f]/60 to-transparent" />
    </div>
  )
}

// ==================== ANIMATED HEADING ====================

function AnimatedWords({
  text,
  className = '',
  delay = 0,
  reducedMotion,
}) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split(' ').map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={
              reducedMotion
                ? false
                : {
                    y: '110%',
                    opacity: 0,
                    rotateX: -40,
                  }
            }
            animate={{
              y: 0,
              opacity: 1,
              rotateX: 0,
            }}
            transition={{
              duration: 0.7,
              delay: delay + index * 0.11,
              ease,
            }}
          >
            {word}
          </motion.span>
          {'\u00A0'}
        </span>
      ))}
    </span>
  )
}

// ==================== ANIMATED COUNTER ====================

function AnimatedNumber({ value, reducedMotion }) {
  const progress = useMotionValue(
    reducedMotion ? value : 0
  )

  const spring = useSpring(progress, {
    stiffness: 65,
    damping: 24,
  })

  const [display, setDisplay] = useState(
    reducedMotion ? value : 0
  )

  useMotionValueEvent(spring, 'change', (latest) => {
    setDisplay(Math.round(latest))
  })

  useEffect(() => {
    if (reducedMotion) {
      progress.set(value)
      setDisplay(value)
    }
  }, [reducedMotion, value, progress])

  return (
    <motion.span
      onViewportEnter={() => progress.set(value)}
      viewport={{ once: true }}
    >
      ₹{display.toLocaleString('en-IN')}
    </motion.span>
  )
}

// ==================== DASHBOARD STAT CARD ====================

function StatCard({ stat, index, reducedMotion }) {
  const Icon = stat.icon
  const theme = colors[stat.color]

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 35,
              scale: 0.94,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -7,
              scale: 1.025,
            }
      }
      className="group relative overflow-hidden rounded-2xl border border-white/90 bg-white/70 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)]"
    >
      {/* Hover glow */}
      <div
        className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full ${theme.glow} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="relative flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-slate-500">
          {stat.label}
        </span>

        <motion.div
          whileHover={
            reducedMotion
              ? undefined
              : {
                  rotate: 12,
                  scale: 1.12,
                }
          }
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${theme.border} ${theme.background}`}
        >
          <Icon size={20} className={theme.icon} />
        </motion.div>
      </div>

      <p className="relative mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        <AnimatedNumber
          value={stat.value}
          reducedMotion={reducedMotion}
        />
      </p>

      <div className="relative mt-3 flex items-center gap-1.5 text-xs text-slate-500">
        <CircleCheck
          size={13}
          className="text-emerald-500"
        />
        {stat.detail}
      </div>

      {/* Bottom hover line */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-cyan-400 to-indigo-500 transition-transform duration-500 group-hover:scale-x-100" />
    </motion.div>
  )
}

// ==================== WEALTH CHART ====================

function WealthChart({ reducedMotion }) {
  const [activeBar, setActiveBar] = useState(null)

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 35,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: 0.2,
        ease,
      }}
      className="relative overflow-hidden rounded-2xl border border-white/90 bg-white/70 p-5 shadow-sm backdrop-blur-xl lg:col-span-2"
    >
      {/* Chart header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Wealth Growth Projection
          </h4>

          <p className="mt-1 text-xs text-slate-500">
            Illustrative 12-month financial simulation
          </p>
        </div>

        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  boxShadow: [
                    '0 0 0px rgba(6,182,212,0)',
                    '0 0 20px rgba(6,182,212,0.15)',
                    '0 0 0px rgba(6,182,212,0)',
                  ],
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="rounded-xl border border-cyan-100 bg-cyan-50 p-2.5 text-cyan-600"
        >
          <ChartNoAxesCombined size={19} />
        </motion.div>
      </div>

      {/* Chart */}
      <div
        className="relative mt-8 h-44"
        style={{
          backgroundImage:
            'linear-gradient(to bottom,rgba(148,163,184,0.17) 1px,transparent 1px)',
          backgroundSize: '100% 25%',
        }}
      >
        <div className="absolute inset-0 flex items-end gap-2 sm:gap-3">
          {chartData.map((height, index) => (
            <div
              key={index}
              className="relative flex h-full flex-1 items-end"
              onMouseEnter={() => setActiveBar(index)}
              onMouseLeave={() => setActiveBar(null)}
            >
              <motion.div
                initial={
                  reducedMotion
                    ? false
                    : { height: 0 }
                }
                whileInView={{
                  height: `${height}%`,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.065,
                  ease,
                }}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        scaleX: 1.1,
                        filter: 'brightness(1.12)',
                      }
                }
                className="relative w-full overflow-hidden rounded-t-md bg-gradient-to-t from-indigo-400/50 via-sky-400/75 to-cyan-400"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-cyan-100/90" />

                {!reducedMotion && (
                  <motion.div
                    animate={{
                      y: ['120%', '-120%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      delay: index * 0.1,
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-transparent via-white/35 to-transparent"
                  />
                )}
              </motion.div>

              {/* Hover tooltip */}
              {activeBar === index && (
                <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-lg">
                  Month {index + 1}: {height}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Month labels */}
      <div className="mt-3 flex justify-between text-[10px] font-medium text-slate-400">
        <span>Jan</span>
        <span>Mar</span>
        <span>Jun</span>
        <span>Sep</span>
        <span>Dec</span>
      </div>

      <p className="mt-4 text-[10px] text-slate-400">
        Chart values are illustrative, not guaranteed returns.
      </p>
    </motion.div>
  )
}

// ==================== AI INSIGHT CARD ====================

function AIInsightCard({ reducedMotion }) {
  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              x: 35,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: 0.3,
        ease,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -6,
              scale: 1.015,
            }
      }
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-white/85 via-indigo-50/75 to-cyan-50/70 p-5 shadow-sm backdrop-blur-xl"
    >
      {/* Rotating orbit */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                rotate: 360,
            }
        }
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full border border-dashed border-indigo-300/40"
      />

      <div className="relative">
        {/* Floating brain icon */}
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -6, 0],
                  rotate: [0, 6, -6, 0],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-100 bg-white/80 text-indigo-600 shadow-[0_8px_25px_rgba(99,102,241,0.12)]"
        >
          <BrainCircuit size={25} />
        </motion.div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-white/70 px-3 py-1 text-[10px] font-semibold text-indigo-600">
          <Sparkles size={12} />
          Intelligent Analytics
        </span>

        <h4 className="mt-4 text-lg font-bold text-slate-900">
          AI-Powered Insights
        </h4>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Understand spending patterns, explore financial
          scenarios and discover personalized opportunities
          for smarter financial planning.
        </p>
      </div>

      <div className="relative mt-7 flex items-center justify-between border-t border-indigo-100 pt-4">
        <span className="flex items-center gap-2 text-xs font-medium text-indigo-600">
          <ShieldCheck size={15} />
          Scenario-based insights
        </span>

        <ArrowUpRight
          size={17}
          className="text-indigo-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>
    </motion.div>
  )
}

// ==================== LIGHT DASHBOARD PREVIEW ====================

function DashboardPreview() {
  const reducedMotion = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, {
    stiffness: 100,
    damping: 25,
  })

  const smoothY = useSpring(mouseY, {
    stiffness: 100,
    damping: 25,
  })

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [3, -3]
  )

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-4, 4]
  )

  const glowX = useTransform(
    smoothX,
    [-0.5, 0.5],
    ['0%', '100%']
  )

  const glowY = useTransform(
    smoothY,
    [-0.5, 0.5],
    ['0%', '100%']
  )

  const spotlight = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(450px circle at ${x} ${y},rgba(56,189,248,0.15),transparent 70%)`
  )

  const handleMouseMove = (event) => {
    if (reducedMotion) return

    const rect = event.currentTarget.getBoundingClientRect()

    mouseX.set(
      (event.clientX - rect.left) / rect.width - 0.5
    )

    mouseY.set(
      (event.clientY - rect.top) / rect.height - 0.5
    )
  }

  const resetMouse = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      id="dashboard-preview"
      className="relative mx-auto mt-24 max-w-6xl scroll-mt-28 [perspective:1400px]"
    >
      {/* Outer animated glow */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                scale: [1, 1.08, 1],
                opacity: [0.5, 0.9, 0.5],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-r from-cyan-200/40 via-indigo-200/50 to-violet-200/40 blur-[90px]"
      />

      {/* Dashboard entrance */}
      <motion.div
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                y: 80,
                rotateX: 8,
                scale: 0.94,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.12,
        }}
        transition={{
          duration: 1,
          ease,
        }}
      >
        {/* Interactive dashboard */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={resetMouse}
          style={
            reducedMotion
              ? undefined
              : { rotateX, rotateY }
          }
          className="relative overflow-hidden rounded-[28px] border border-white/80 bg-[#f8fbff]/85 text-left text-slate-900 shadow-[0_30px_100px_rgba(15,23,42,0.14)] backdrop-blur-2xl"
        >
          {/* Cursor spotlight */}
          {!reducedMotion && (
            <motion.div
              aria-hidden="true"
              style={{ background: spotlight }}
              className="pointer-events-none absolute inset-0 z-0"
            />
          )}

          {/* Fine technical grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(59,130,246,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.07) 1px,transparent 1px)',
              backgroundSize: '38px 38px',
            }}
          />

          {/* Top highlight */}
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

          {/* Dashboard header */}
          <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 bg-white/55 px-5 py-4 md:px-7">
            <div className="flex items-center gap-3">
              {/* Window controls */}
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>

              <span className="text-xs font-medium text-slate-500">
                Finlytics / Dashboard
              </span>
            </div>

            {/* Demo indicator */}
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-700">
              <motion.span
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: [1, 0.3, 1],
                        scale: [1, 1.4, 1],
                      }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="h-1.5 w-1.5 rounded-full bg-cyan-500"
              />
              Interactive Demo
            </span>
          </div>

          {/* Dashboard body */}
          <div className="relative p-5 md:p-8">
            {/* Financial overview */}
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Financial Overview
                </p>

                <h3 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">
                  Your Money at a Glance
                </h3>
              </div>

              <motion.div
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        scale: 1.05,
                        y: -2,
                      }
                }
                className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-2 text-xs font-semibold text-emerald-700"
              >
                <TrendingUp size={15} />
                46.7% Savings Rate
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>

            {/* Chart and AI card */}
            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              <WealthChart reducedMotion={reducedMotion} />
              <AIInsightCard reducedMotion={reducedMotion} />
            </div>

            {/* Footer */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-2">
                <CircleCheck
                  size={14}
                  className="text-emerald-500"
                />
                All figures are illustrative
              </span>

              <span className="flex items-center gap-2">
                <Zap
                  size={14}
                  className="text-cyan-600"
                />
                Built for smarter financial planning
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ==================== MAIN HERO SECTION ====================

export default function HeroSection() {
  const reducedMotion = useReducedMotion()

  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -90]
  )

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.55]
  )

  const handleSearch = (event) => {
    event.preventDefault()

    const term = query.toLowerCase().trim()

    const targetId =
      /faq|question|help/.test(term)
        ? 'faq'
        : /how|process|start|setup/.test(term)
          ? 'how-it-works'
          : 'features'

    document.getElementById(targetId)?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative isolate w-full overflow-hidden bg-transparent px-6 pb-24 pt-24 text-white sm:px-10 md:pt-32 lg:px-14"
    >
      {/* Animated video-compatible background */}
      <AnimatedBackground reducedMotion={reducedMotion} />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Hero content */}
        <motion.div
          style={
            reducedMotion
              ? undefined
              : {
                  y: heroY,
                  opacity: heroOpacity,
                }
          }
          className="grid min-h-[68vh] grid-cols-1 items-center gap-12 lg:grid-cols-12"
        >
          <div className="space-y-7 text-left lg:col-span-8">
            {/* Hero badge */}
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: -15,
                      scale: 0.9,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.15,
              }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/[0.04] px-4 py-2 text-xs font-medium text-cyan-200 backdrop-blur-lg"
            >
              <motion.span
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        rotate: [0, 20, -20, 0],
                      }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                <Sparkles size={14} />
              </motion.span>

              Introducing Intelligent Personal Finance
            </motion.div>

            {/* Hero heading */}
            <h1 className="text-5xl font-black leading-[1.08] tracking-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.65)] sm:text-6xl lg:text-[76px]">
              <AnimatedWords
                text="Your Money."
                delay={0.25}
                reducedMotion={reducedMotion}
              />

              <br />

              <AnimatedWords
                text="Your Decisions."
                delay={0.48}
                reducedMotion={reducedMotion}
              />

              <br />

              <AnimatedWords
                text="Your Future."
                delay={0.72}
                reducedMotion={reducedMotion}
                className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-transparent"
              />
            </h1>

            {/* Hero description */}
            <motion.p
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 22,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 1.05,
              }}
              className="max-w-xl text-sm leading-8 text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] sm:text-base"
            >
              Finlytics brings budgeting, investments,
              forecasting and financial analytics into one
              intelligent platform. Understand your money
              and plan your future with confidence.
            </motion.p>

            {/* Search bar */}
            <motion.form
              onSubmit={handleSearch}
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.2,
                duration: 0.6,
              }}
              className="relative flex max-w-md items-center rounded-full border border-white/25 bg-white/[0.04] py-2 pl-5 pr-2 backdrop-blur-xl transition-colors focus-within:border-cyan-300/60"
            >
              <AnimatePresence>
                {focused && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pointer-events-none absolute -inset-px rounded-full border border-cyan-300/40 shadow-[0_0_25px_rgba(103,232,249,0.15)]"
                  />
                )}
              </AnimatePresence>

              <input
                type="search"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Explore budgets, SIPs, analytics..."
                aria-label="Explore Finlytics sections"
                className="relative w-full bg-transparent text-sm text-white placeholder-white/55 outline-none"
              />

              <motion.button
                type="submit"
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        scale: 1.1,
                        rotate: 8,
                      }
                }
                whileTap={{ scale: 0.9 }}
                aria-label="Explore matching section"
                className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950"
              >
                <Search size={17} />
              </motion.button>
            </motion.form>

            {/* CTA buttons */}
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.35,
                duration: 0.6,
              }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Primary CTA */}
              <motion.div
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.04,
                      }
                }
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to="/register"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-950 shadow-[0_0_30px_rgba(56,189,248,0.3)]"
                >
                  {!reducedMotion && (
                    <motion.span
                      animate={{
                        x: ['-150%', '350%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      className="pointer-events-none absolute inset-y-0 w-12 -skew-x-12 bg-white/30 blur-md"
                    />
                  )}

                  <span className="relative">
                    Get Started Free
                  </span>

                  <ArrowRight
                    size={16}
                    className="relative transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              {/* Secondary CTA */}
              <motion.a
                href="#features"
                whileHover={
                  reducedMotion
                    ? undefined
                    : { y: -4 }
                }
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.04] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white/10"
              >
                Explore Features
                <ArrowUpRight size={16} />
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0 }
              }
              animate={{ opacity: 1 }}
              transition={{ delay: 1.55 }}
              className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/75"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck
                  size={15}
                  className="text-emerald-300"
                />
                Data-Driven Planning
              </span>

              <span className="flex items-center gap-2">
                <TrendingUp
                  size={15}
                  className="text-cyan-300"
                />
                Investment Analytics
              </span>

              <span className="flex items-center gap-2">
                <Sparkles
                  size={15}
                  className="text-violet-300"
                />
                AI-Powered Insights
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#dashboard-preview"
          aria-label="Scroll to dashboard preview"
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, 9, 0],
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mx-auto mt-6 flex w-fit flex-col items-center gap-2 text-white/70 hover:text-cyan-300"
        >
          <Mouse size={23} />

          <span className="text-[10px] uppercase tracking-[0.2em]">
            Scroll to Explore
          </span>
        </motion.a>

        {/* Light dashboard preview */}
        <DashboardPreview />
      </div>
    </section>
  )
}
