import { motion } from 'framer-motion'

const LINKS = {
  Shop: ['New Arrivals', 'Best Sellers', 'Sale', 'All Products'],
  About: ['Our Story', 'Sustainability', 'Careers', 'Press'],
  Help: ['FAQ', 'Shipping', 'Returns', 'Contact'],
}

const SOCIALS = [
  { name: 'Instagram', icon: '📸' },
  { name: 'Twitter', icon: '🐦' },
  { name: 'GitHub', icon: '💻' },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <a href="#" className="inline-flex text-2xl font-bold tracking-tight text-gray-900 hover:opacity-80 transition-opacity">
              <span className="bg-gray-900 text-white px-2 py-0.5 rounded-lg mr-1">S</span>STORE
            </a>
            <p className="mt-4 text-sm text-gray-500 max-w-xs leading-relaxed">Thoughtfully designed products for modern living. Quality meets simplicity.</p>

            {/* Portfolio */}
            <motion.div whileHover={{ scale: 1.02 }} className="mt-6 p-4 bg-white rounded-2xl border border-gray-100 inline-block shadow-sm hover:shadow-md transition-all">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2 font-medium">Built by</p>
              <a href="https://raymora.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-sm font-bold text-gray-900 hover:text-gray-600 transition-colors group">
                <div className="w-9 h-9 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform shadow-lg shadow-gray-900/20">R</div>
                raymora.vercel.app
                <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </motion.div>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {SOCIALS.map(({ name, icon }) => (
                <motion.a key={name} href="#" whileHover={{ y: -3, scale: 1.1 }}
                  className="w-11 h-11 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-lg hover:border-gray-300 hover:shadow-md transition-all" aria-label={name}>
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-900 hover:translate-x-1 inline-block transition-all">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Store. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
