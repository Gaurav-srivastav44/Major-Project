import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Send } from 'lucide-react'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')
  return (
    <main className="grid min-h-screen place-items-center bg-[#07101f] px-5 text-white">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link to="/login" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft size={16}/> Back to sign in</Link>
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-7 shadow-[0_30px_100px_rgba(0,0,0,.25)] md:p-9">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300"><Mail size={22}/></div>
          <h1 className="mt-6 text-3xl font-bold">Reset your password</h1>
          {sent ? <div class="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] p-4 text-sm leading-6 text-emerald-300">Reset instructions have been sent to <strong>{email}</strong>. Please check your inbox.</div> : <>
            <p className="mt-3 text-sm leading-6 text-slate-400">Enter your email and we’ll send you a secure password reset link.</p>
            <form onSubmit={e => { e.preventDefault(); if (email.includes('@')) setSent(true) }} className="mt-7">
              <label className="block"><span className="mb-2 block text-xs text-slate-400">Email address</span><div className="relative"><Mail size={17} className="absolute left-4 top-3.5 text-slate-500"/><input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="you@example.com" className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-11 pr-4 outline-none focus:border-cyan-400/40"/></div></label>
              <button className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 font-bold">Send reset link <Send size={16}/></button>
            </form>
          </>}
        </div>
      </motion.div>
    </main>
  )
}
