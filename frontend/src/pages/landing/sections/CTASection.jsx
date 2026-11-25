import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  ChartNoAxesCombined,
  CheckCircle2,
  Zap,
  Compass,
  Coins,
  BrainCircuit,
} from 'lucide-react'

// ==================== CONFIG ====================

const benefits = [
  {
    emoji: '🚀',
    badgeIcon: ChartNoAxesCombined,
    title: 'Smarter Investments',
    description: 'Compare stocks, index funds, and high-conviction strategies.',
    gradient: 'from-cyan-400/15 via-sky-500/10 to-transparent',
    border: 'hover:border-cyan-300/45',
    accent: 'text-cyan-300',
  },
  {
    emoji: '🪙',
    badgeIcon: Coins,
    title: 'Gold & Silver Insights',
    description: 'Track bullion trends, sovereign gold shifts, and cycle history.',
    gradient: 'from-amber-300/15 via-orange-400/10 to-transparent',
    border: 'hover:border-amber-300/45',
    accent: 'text-amber-300',
  },
  {
    emoji: '🏦',
    badgeIcon: Compass,
    title: 'Better Money Management',
    description: 'Automate monthly budgets, curb leaks, and grow net savings.',
    gradient: 'from-emerald-400/15 via-teal-400/10 to-transparent',
    border: 'hover:border-emerald-300/45',
    accent: 'text-emerald-300',
  },
  {
    emoji: '🧾',
    badgeIcon: CheckCircle2,
    title: 'Your Financial Records',
    description: 'Keep cashflow, expenses, and milestones cleanly organized.',
    gradient: 'from-violet-400/15 via-purple-500/10 to-transparent',
    border: 'hover:border-violet-300/45',
    accent: 'text-violet-300',
  },
  {
    emoji: '🧭',
    badgeIcon: Sparkles,
    title: 'Plan Your Future',
    description: 'Model retirement, emergency buffers, and compounding scenarios.',
    gradient: 'from-fuchsia-400/15 via-pink-500/10 to-transparent',
    border: 'hover:border-fuchsia-300/45',
    accent: 'text-fuchsia-300',
  },
  {
    emoji: '🧠',
    badgeIcon: BrainCircuit,
    title: 'AI Financial Insights',
    description: 'Spot spending patterns early with intelligent clarity.',
    gradient: 'from-indigo-400/15 via-cyan-400/10 to-transparent',
    border: 'hover:border-indigo-300/45',
    accent: 'text-indigo-300',
  },
]

const marqueeHighlights = [
  '💎 Smart Wealth Compounding',
  '📊 Live Portfolio Comparison',
  '🪙 Gold & Bullion Cycles',
  '🛡️ Zero-Stress Budgeting',
  '⚡ Instant Scenario Forecasting',
  '🧠 Behavioral Cashflow Insights',
]

// ==================== TRANSPARENT AMBIENT LAYER ====================

function TransparentAmbientLayer({ reducedMotion }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Ultra-light glass tint so video stays vivid */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Left-to-right drifting glow orb */}
      {!reducedMotion && (
        <motion.div
          animate={{
            x: ['-22%', '22%', '-22%'],
            y: [-12, 16, -12],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-1/4 top-10 h-64 w-80 rounded-full bg-cyan-400/10 blur-[90px]"
        />
      )}

      {/* Right-to-left counter-drifting glow orb */}
      {!reducedMotion && (
        <motion.div
          animate={{
            x: ['20%', '-20%', '20%'],
            y: [15, -14, 15],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-12 right-1/4 h-72 w-80 rounded-full bg-violet-500/10 blur-[100px]"
        />
      )}

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center,black,transparent 85%)',
        }}
      />

      {/* Left-to-right floating emoji accents */}
      {[
        { emoji: '💎', top: '14%', fromLeft: '-6%', toRight: '18%', delay: 0 },
        { emoji: '🚀', top: '34%', fromLeft: '78%', toRight: '94%', delay: 1.2 },
        { emoji: '🪙', top: '66%', fromLeft: '-4%', toRight: '22%', delay: 0.7 },
        { emoji: '✨', top: '78%', fromLeft: '74%', toRight: '93%', delay: 1.8 },
      ].map((item, idx) => (
        <motion.span
          key={idx}
          style={{ top: item.top }}
          initial={reducedMotion ? false : { left: item.fromLeft }}
          animate={
            reducedMotion
              ? undefined
              : {
                  left: [item.fromLeft, item.toRight, item.fromLeft],
                  y: [0, -10, 0],
                  rotate: [-8, 10, -8],
                }
          }
          transition={{
            duration: 11 + idx * 2,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute select-none text-2xl opacity-55 drop-shadow-[0_4px_14px_rgba(0,0,0,0.8)] sm:text-3xl"
        >
          {item.emoji}
        </motion.span>
      ))}
    </div>
  )
}

// ==================== LEFT-TO-RIGHT MARQUEE RIBBON ====================

function LeftToRightStrip({ reducedMotion }) {
  const repeated = [...marqueeHighlights, ...marqueeHighlights]

  return (
    <div className="relative mx-auto mt-8 max-w-4xl overflow-hidden rounded-full border border-white/15 bg-white/[0.02] py-2.5 backdrop-blur-md">
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                x: ['-50%', '0%'],
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex w-max items-center gap-6 px-4 text-xs font-medium text-white/85"
      >
        {repeated.map((label, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 whitespace-nowrap drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]"
          >
            <span>{label}</span>
            <span className="text-cyan-300/60">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ==================== BENEFIT CARD ====================

function BenefitCard({ benefit, index, reducedMotion }) {
  const BadgeIcon = benefit.badgeIcon

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              x: -36,
              y: 20,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              x: 6,
              y: -6,
              scale: 1.02,
            }
      }
      className={`group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.025] p-5 text-left backdrop-blur-xl transition-all duration-300 ${benefit.border}`}
    >
      {/* Sheer gradient tint */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Left-to-right sheen sweep on hover */}
      {!reducedMotion && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-700 group-hover:left-[125%] group-hover:opacity-100"
        />
      )}

      {/* Top row: Emoji + Icon badge */}
      <div className="relative mb-5 flex items-center justify-between">
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [-3, 5, -3],
                  rotate: [-4, 6, -4],
                }
          }
          transition={{
            duration: 3.8 + index * 0.35,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] text-3xl shadow-lg backdrop-blur-md"
        >
          {benefit.emoji}
        </motion.div>

        <div className="flex items-center gap-2">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-black/25 ${benefit.accent}`}
          >
            <BadgeIcon size={15} />
          </span>
          <ArrowUpRight
            size={17}
            className="text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-cyan-300"
          />
        </div>
      </div>

      {/* Text content */}
      <div className="relative">
        <h3 className="text-base font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          {benefit.title}
        </h3>
        <p className="mt-2 text-xs leading-6 text-white/75 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
          {benefit.description}
        </p>
      </div>

      {/* Left-to-right progress accent bar */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 transition-transform duration-500 group-hover:scale-x-100" />
    </motion.div>
  )
}

// ==================== MAIN CTA SECTION ====================

export default function CTASection() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="relative bg-transparent px-6 py-20 md:px-12">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/15 bg-white/[0.02] shadow-[0_25px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <TransparentAmbientLayer reducedMotion={reducedMotion} />

        <div className="relative z-10 px-6 py-20 text-center md:px-12 md:py-24">
          {/* Badge with subtle left-to-right glide */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-cyan-200 backdrop-blur-md"
          >
            <Sparkles size={15} className="text-cyan-300" />
            <span>🚀 Your Financial Future Starts Here</span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={reducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="text-4xl font-black leading-tight tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] md:text-5xl lg:text-6xl"
          >
            Make Your Money
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-transparent">
              Work Smarter for You.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] md:text-base"
          >
            Discover better investment opportunities, explore gold and market
            trends, organize your financial records, and manage your money with
            intelligent insights — all in one place.
          </motion.p>

          {/* Smooth Left-to-Right Highlight Strip */}
          <LeftToRightStrip reducedMotion={reducedMotion} />

          {/* Section label */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mb-7 mt-14 flex items-center justify-center gap-2"
          >
            <Zap size={18} className="text-cyan-300" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
              Everything You Need
            </span>
          </motion.div>

          {/* Benefits grid */}
          <div className="grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.title}
                benefit={benefit}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-14 flex flex-col items-center"
          >
            <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] md:text-2xl">
              Ready to Take Control of Your Finances?
            </h3>

            <p className="mt-3 max-w-md text-sm leading-7 text-white/75 drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
              Start organizing, analyzing, and planning your financial future
              with Finlytics.
            </p>

            <motion.div
              whileHover={reducedMotion ? undefined : { scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.96 }}
              className="mt-8"
            >
              <Link
                to="/register"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 px-8 py-4 text-sm font-extrabold text-slate-950 shadow-[0_0_35px_rgba(56,189,248,0.3)]"
              >
                {!reducedMotion && (
                  <motion.span
                    animate={{ x: ['-150%', '350%'] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 2.5,
                    }}
                    className="pointer-events-none absolute inset-y-0 w-12 -skew-x-12 bg-white/45 blur-md"
                  />
                )}

                <span className="relative">Get Started for Free</span>
                <ArrowRight
                  size={18}
                  className="relative transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            </motion.div>

            {/* Trust strip */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/75 drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-400" />
                Financial Tracking
              </span>
              <span className="flex items-center gap-2">
                <ChartNoAxesCombined size={15} className="text-cyan-400" />
                Investment Comparison
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-violet-400" />
                Scenario-Based Planning
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}