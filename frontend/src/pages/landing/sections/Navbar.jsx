import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X, ChartNoAxesCombined, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Features', href: '#features', id: 'features' },
  { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
]

export default function Navbar({ menuOpen, setMenuOpen, reducedMotion: rmProp }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const rm = rmProp ?? useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      for (const { id } of navItems) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 180) setActive(id)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, setMenuOpen])

  return (
    <motion.header
      initial={rm ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 w-full"
    >
      <nav
        className={`w-full transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/10 bg-black/35 py-3.5 backdrop-blur-xl'
            : 'bg-gradient-to-b from-black/45 via-black/15 to-transparent py-5'
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 sm:px-10 lg:px-14">
          {/* Brand Mark */}
          <motion.a
            href="#home"
            whileHover={rm ? undefined : { scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/[0.06] text-white backdrop-blur-md transition-all duration-300 group-hover:border-cyan-300/70 group-hover:bg-cyan-400/15">
              <ChartNoAxesCombined size={18} strokeWidth={2.4} />
            </span>
            <div className="leading-none">
              <span className="block text-sm font-black tracking-[0.14em] text-white uppercase">
                Finlytics
              </span>
              <span className="block text-[9px] font-semibold tracking-[0.26em] text-white/55 uppercase">
                Finance OS
              </span>
            </div>
          </motion.a>

          {/* Right-aligned Nav + Pill CTA (Reference Style) */}
          <div className="hidden items-center gap-7 lg:flex">
            <div className="flex items-center gap-7">
              {navItems.map((item) => {
                const isActive = active === item.id
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`group relative py-1 text-[11px] font-bold tracking-[0.18em] uppercase transition-colors ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-[11px] font-bold tracking-[0.16em] text-white/80 uppercase transition hover:bg-white/10 hover:text-white"
              >
                Log In
              </Link>

              <motion.div whileHover={rm ? undefined : { scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/register"
                  className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-5 py-2 text-[11px] font-extrabold tracking-[0.16em] text-white uppercase shadow-[0_0_24px_rgba(99,102,241,0.45)] transition-shadow hover:shadow-[0_0_32px_rgba(34,211,238,0.5)]"
                >
                  {!rm && (
                    <motion.span
                      animate={{ x: ['-160%', '320%'] }}
                      transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
                      className="pointer-events-none absolute inset-y-0 w-10 -skew-x-12 bg-white/30 blur-sm"
                    />
                  )}
                  <span className="relative">Get Started</span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'x' : 'menu'}
                initial={rm ? false : { opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.16 }}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Transparent Glass Mobile Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={rm ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-white/10 bg-black/65 backdrop-blur-2xl lg:hidden"
            >
              <div className="mx-auto max-w-md space-y-1 px-6 py-5">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    initial={rm ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold tracking-[0.16em] uppercase transition ${
                      active === item.id
                        ? 'bg-white/10 text-cyan-300'
                        : 'text-white/75 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={14} className="opacity-60" />
                  </motion.a>
                ))}

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full border border-white/20 bg-white/5 py-2.5 text-center text-xs font-bold tracking-[0.14em] text-white uppercase"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 py-2.5 text-center text-xs font-extrabold tracking-[0.14em] text-white uppercase"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}