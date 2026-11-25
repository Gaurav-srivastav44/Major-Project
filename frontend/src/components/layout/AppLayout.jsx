import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, WalletCards, Target, LineChart, Landmark, Calculator, PiggyBank, BrainCircuit, AlertTriangle, Bot, FileText, Settings, LogOut, Menu, X, Search, Bell, ChevronDown } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { label: 'Overview', to: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Income & Expenses', to: '/app/transactions', icon: WalletCards },
  { label: 'Smart Budget', to: '/app/budget', icon: Target },
  { label: 'Investments', to: '/app/investments', icon: LineChart },
  { label: 'Market Prices', to: '/app/market', icon: Landmark },
  { label: 'Tax Calculator', to: '/app/tax', icon: Calculator },
  { label: 'Rent vs Buy', to: '/app/rent-vs-buy', icon: Landmark },
  { label: 'Wealth & Goals', to: '/app/wealth', icon: PiggyBank },
  { label: 'Expense Forecast', to: '/app/forecast', icon: BrainCircuit },
  { label: 'Anomaly Detection', to: '/app/anomalies', icon: AlertTriangle },
  { label: 'AI Assistant', to: '/app/assistant', icon: Bot },
  { label: 'Reports', to: '/app/reports', icon: FileText },
  { label: 'Profile & Settings', to: '/app/settings', icon: Settings },
]

export default function AppLayout() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  const sidebar = (
    <aside className="flex h-full w-[270px] flex-col border-r border-white/[0.07] bg-[#08111f]/95 px-4 py-5 backdrop-blur-xl">
      <NavLink to="/app/dashboard" className="mb-7 flex items-center gap-3 px-2">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-violet-500 text-lg font-black text-[#07101f] shadow-[0_0_30px_rgba(103,232,249,.18)]">F</span>
        <div><p className="font-bold text-white">Finlytics</p><p className="text-[10px] uppercase tracking-[0.18em] text-cyan-300">Personal OS</p></div>
      </NavLink>
      <nav className="-mr-2 flex-1 space-y-1 overflow-y-auto pr-2">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${isActive ? 'bg-gradient-to-r from-violet-500/20 to-cyan-400/10 text-white shadow-[inset_3px_0_0_#67e8f9]' : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'}`}>
            <Icon size={18} className="shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <button onClick={handleLogout} className="mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-red-400/10 hover:text-red-300"><LogOut size={18}/> Sign out</button>
    </aside>
  )

  return (
    <div className="min-h-screen bg-[#07101f] text-slate-100">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{sidebar}</div>
      <AnimatePresence>{open && <><motion.button aria-label="Close sidebar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" /><motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: 'spring', damping: 28 }} className="fixed inset-y-0 left-0 z-50 lg:hidden">{sidebar}</motion.div></>}</AnimatePresence>
      <div className="lg:pl-[270px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/[0.07] bg-[#07101f]/80 px-4 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-3"><button onClick={() => setOpen(true)} className="rounded-lg border border-white/10 p-2 lg:hidden"><Menu size={20}/></button><div className="hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-slate-500 md:flex"><Search size={16}/><span>Search anything</span><kbd className="ml-16 rounded border border-white/10 px-1.5 text-[10px]">⌘ K</kbd></div></div>
          <div className="flex items-center gap-3"><button className="relative rounded-xl border border-white/[0.08] p-2.5 text-slate-400 hover:text-white"><Bell size={18}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-300"/></button><div className="h-9 w-px bg-white/[0.08]"/><button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-white/[0.04]"><span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-bold">GS</span><span className="hidden text-left md:block"><span className="block text-sm font-semibold">{user?.name || 'Gaurav'}</span><span className="block text-[10px] text-slate-500">Premium</span></span><ChevronDown size={14}/></button></div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 md:p-7 lg:p-8"><Outlet/></main>
      </div>
    </div>
  )
}
