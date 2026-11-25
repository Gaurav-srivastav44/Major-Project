import { Link } from 'react-router-dom'

const Logo = () => (
  <span className="flex items-center gap-2 text-sm font-bold text-white">
    <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-300 text-[#07101f]">F</span>
    Finlytics
  </span>
)

export default function FooterSection() {
  return (
    <footer className="px-6 pb-8 pt-16 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
        <div><Logo /><p className="mt-5 max-w-xs text-sm leading-7 text-gray-500">Intelligent personal finance analytics for better budgeting, smarter investments and long-term planning.</p></div>
        <div>
          <h4 className="mb-5 text-sm font-semibold">Navigation</h4>
          <div className="space-y-3 text-sm text-gray-500"><a href="#home" className="block hover:text-white">Home</a><a href="#features" className="block hover:text-white">Features</a><a href="#pricing" className="block hover:text-white">Pricing</a><a href="#faq" className="block hover:text-white">FAQs</a></div>
        </div>
        <div>
          <h4 className="mb-5 text-sm font-semibold">Resources</h4>
          <div className="space-y-3 text-sm text-gray-500"><Link to="/login" className="block hover:text-white">Login</Link><Link to="/register" className="block hover:text-white">Sign Up</Link><a href="#how-it-works" className="block hover:text-white">How It Works</a></div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-6xl flex-col justify-between gap-4 border-t border-white/10 pt-7 text-xs text-gray-600 md:flex-row"><p>© {new Date().getFullYear()} Finlytics. All rights reserved.</p><p>Built with data, analytics and intelligence.</p></div>
    </footer>
  )
}
