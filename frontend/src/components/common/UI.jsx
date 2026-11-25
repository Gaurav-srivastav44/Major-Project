import { motion } from 'framer-motion'

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p><h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>}</div>
      {action}
    </div>
  )
}

export function Card({ children, className = '', delay = 0 }) {
  return <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.45 }} className={`rounded-2xl border border-white/[0.08] bg-white/[0.035] shadow-[0_16px_50px_rgba(0,0,0,.12)] backdrop-blur-xl ${className}`}>{children}</motion.section>
}

export function StatCard({ icon: Icon, label, value, change, tone = 'cyan' }) {
  const tones = { cyan: 'bg-cyan-400/10 text-cyan-300', violet: 'bg-violet-400/10 text-violet-300', emerald: 'bg-emerald-400/10 text-emerald-300', amber: 'bg-amber-400/10 text-amber-300', rose: 'bg-rose-400/10 text-rose-300' }
  return <Card className="p-5"><div className="flex items-start justify-between"><div className={`grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}>{Icon && <Icon size={20}/>}</div>{change && <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">{change}</span>}</div><p className="mt-5 text-sm text-slate-400">{label}</p><p className="mt-1 text-2xl font-bold text-white">{value}</p></Card>
}

export function Input({ label, className = '', ...props }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-xs font-medium text-slate-400">{label}</span><input {...props} className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"/></label>
}

export function Select({ label, children, className = '', ...props }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-xs font-medium text-slate-400">{label}</span><select {...props} className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101827] px-4 text-sm text-white outline-none focus:border-cyan-400/40">{children}</select></label>
}

export function PrimaryButton({ children, className = '', ...props }) {
  return <button {...props} className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(99,102,241,.18)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>{children}</button>
}
