import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('gaurav@finlytics.app')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = (event) => {
    event.preventDefault()
    if (!email.includes('@') || password.length < 6) return setError('Enter a valid email and at least 6 characters.')
    login({ name: email.split('@')[0].replace(/(^\w|\.\w)/g, m => m.replace('.', ' ').toUpperCase()), email })
    navigate('/app/dashboard')
  }

  return (
    <main className="grid min-h-screen bg-[#07101f] text-white lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.16),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(124,58,237,.22),transparent_32%)]" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-violet-500 text-xl font-black text-[#07101f]">F</span><span className="text-xl font-bold">Finlytics</span></Link>
          <div className="max-w-xl"><p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Your financial command centre</p><h1 className="text-6xl font-bold leading-[1.05]">Make every rupee<br/><span className="text-slate-400">work smarter.</span></h1><p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">Plan, track and forecast your financial life with intelligent personal insights.</p></div>
          <p class="text-sm text-slate-500">© 2026 Finlytics. Built for India.</p>
        </div>
      </section>

      <section className="grid place-items-center px-5 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="mb-8 lg:hidden"><Link to="/" className="flex items-center gap-3"><span class="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-violet-500 font-black text-[#07101f]">F</span><span className="font-bold">Finlytics</span></Link></div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Welcome back</p><h2 className="mt-3 text-4xl font-bold">Sign in to Finlytics</h2><p className="mt-3 text-sm text-slate-400">Continue to your personal finance dashboard.</p>
          <button onClick={() => { login({ name: 'Gaurav Srivastava', email: 'gaurav@gmail.com' }); navigate('/app/dashboard') }} className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-semibold transition hover:bg-white/[0.07]"><span className="grid h-5 w-5 place-items-center rounded-full bg-white text-xs font-black text-blue-600">G</span>Continue with Google</button>
          <div className="my-6 flex items-center gap-4 text-xs text-slate-600"><div className="h-px flex-1 bg-white/[0.08]"/>or continue with email<div className="h-px flex-1 bg-white/[0.08]"/></div>
          <form onSubmit={submit} className="space-y-4">
            <label className="block"><span className="mb-2 block text-xs text-slate-400">Email address</span><div className="relative"><Mail size={17} className="absolute left-4 top-3.5 text-slate-500"/><input value={email} onChange={e => setEmail(e.target.value)} type="email" className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-11 pr-4 outline-none focus:border-cyan-400/40"/></div></label>
            <label className="block"><span className="mb-2 block text-xs text-slate-400">Password</span><div className="relative"><LockKeyhole size={17} className="absolute left-4 top-3.5 text-slate-500"/><input value={password} onChange={e => setPassword(e.target.value)} type={show ? 'text' : 'password'} className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-11 pr-11 outline-none focus:border-cyan-400/40"/><button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-3.5 text-slate-500">{show ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></label>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <div className="flex items-center justify-between text-sm"><label className="flex items-center gap-2 text-slate-400"><input type="checkbox" defaultChecked className="accent-cyan-400"/> Remember me</label><Link to="/forgot-password" className="text-cyan-300">Forgot password?</Link></div>
            <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 font-bold shadow-[0_12px_35px_rgba(34,211,238,.12)]">Sign in <ArrowRight size={17}/></button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">New to Finlytics? <Link to="/register" className="font-semibold text-cyan-300">Create account</Link></p>
        </motion.div>
      </section>
    </main>
  )
}
