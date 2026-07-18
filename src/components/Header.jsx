import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import CurrencySelector from './CurrencySelector'

const LINKS = [
  { name: 'Home', href: '#' },
  { name: 'Shop', href: '#products' },
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#contact' },
]

export default function Header({ cartCount, onCartClick, onSearchClick, currency, onCurrencyChange }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const headerBg = useTransform(scrollY, [0, 100], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)'])
  const headerBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(12px)'])
  const headerShadow = useTransform(scrollY, [0, 100], ['0 0 0 rgba(0,0,0,0)', '0 4px 30px rgba(0,0,0,0.05)'])

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <motion.header style={{ backgroundColor: headerBg, boxShadow: headerShadow }}
      className="sticky top-0 z-50 border-b border-gray-100/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with hover effect */}
          <motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold text-gray-900 flex items-center">
            <motion.span animate={{ rotate: scrolled ? [0, -5, 5, 0] : 0 }}
              className="bg-gray-900 text-white px-2 py-0.5 rounded-lg mr-1">S</motion.span>
            STORE
          </motion.a>

          {/* Nav with animated underline */}
          <ul className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.name}>
                <motion.a href={l.href} whileHover={{ y: -1 }}
                  className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group block">
                  {l.name}
                  <motion.span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gray-900 rounded-full group-hover:w-6 w-0 transition-all duration-300" />
                </motion.a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <CurrencySelector currency={currency} onCurrencyChange={onCurrencyChange} />
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onSearchClick}
              className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onCartClick}
              className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors" aria-label="Cart">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="absolute -top-0.5 -right-0.5 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-1">
            <motion.button whileTap={{ scale: 0.9 }} onClick={onSearchClick} className="p-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={onCartClick} className="relative p-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {cartCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute top-0.5 right-0.5 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{cartCount}</motion.span>
              )}
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setOpen(!open)} className="p-2 text-gray-600">
              <AnimatePresence mode="wait">
                {open
                  ? <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                      className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></motion.svg>
                  : <motion.svg key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}
                      className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></motion.svg>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t border-gray-100">
              <div className="py-4 space-y-1">
                {LINKS.map((l, i) => (
                  <motion.a key={l.name} href={l.href} onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="block px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium">
                    {l.name}
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
