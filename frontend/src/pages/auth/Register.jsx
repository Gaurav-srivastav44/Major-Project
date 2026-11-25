import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = (event) => {
    event.preventEvent?.()
    event.preventDefault()
    if (name.length < 2 || !email.includes('@') || password.length < 6) return setError('Complete all fields with a valid email and 6-character password.')
    login({ name, email })
    navigate('/app/dashboard')
  }

  return (
    <main className="grid min-h-screen place-items-center overflow-hidden bg-[#07101f] px-5 py-10 text-white">
      <div className="pointer-events-none absolute h-[620px] w-[620px] rounded-full bg-violet-600/10 blur-[130px]" />
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-violet-500 font-black text-[#07101f]">F</span><span className="font-bold">Finlytics</span></Link>
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 shadow-[0_30px_100px_rgba(0,0,0,.28)] backdrop-blur-xl md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Start your journey</p><h1 className="mt-3 text-3xl font-bold">Create your account</h1><p class="mt-2 text-sm text-slate-400">No credit card required. Your first 30 days are free.</p>
          <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="block"><span className="mb-2 block text-xs text-slate-400">Full name</span><div className="relative"><User size={17} className="absolute left-4 top-3.5 text-slate-500"/><input value={name} onChange={e => setName(e.target.value)} placeholder="Gaurav Srivastava" className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-11 pr-4 outline-none focus:border-cyan-400/40"/></div></label>
            <label className="block"><span className="mb-2 block text-xs text-slate-400">Email address</span><div className="relative"><Mail size={17} className="absolute left-4 top-3.5 text-slate-500"/><input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-11 pr-4 outline-none focus:border-cyan-400/40"/></div></label>
            <label className="block"><span className="mb-2 block text-xs text-slate-400">Password</span><div className="relative"><LockKeyhole size={17} className="absolute left-4 top-3.5 text-slate-500"/><input value={password} onChange={e => setPassword(e.target.value)} type={show ? 'text' : 'password'} placeholder="Minimum 6 characters" className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-11 pr-11 outline-none focus:border-cyan-400/40"/><button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-3.5 text-slate-500">{show ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></label>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <label className="flex items-start gap-2 text-xs leading-5 text-slate-400"><input type="checkbox" required className="mt-1 accent-cyan-400"/>I agree to the Terms and Privacy Policy.</label>
            <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 font-bold">Create account <ArrowRight size={17}/></button>
          </form>
          <p class="mt-6 text-center text-sm text-slate-400">Already have an account? <Link to="/login" className="font-semibold text-cyan-300">Sign in</Link></p>
        </div>
      </motion.div>
    </main>
  )
}
