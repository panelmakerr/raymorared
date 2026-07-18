import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import FilterBar from './components/FilterBar'
import Products from './components/Products'
import ShopTheLook from './components/ShopTheLook'
import UpsellSection from './components/UpsellSection'
import LoyaltyProgram from './components/LoyaltyProgram'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import ProductModal from './components/ProductModal'
import SmartSearch from './components/SmartSearch'
import Checkout from './components/Checkout'
import AbandonedCartRecovery from './components/AbandonedCartRecovery'
import { useCart } from './hooks/useCart'
import { priceRanges } from './utils/data'

const INITIAL_FILTERS = {
  category: 'All',
  material: 'All',
  priceRange: priceRanges[0],
  colors: [],
  minRating: 0,
  sortBy: 'featured',
}

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
}

const sectionReveal = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function Loader() {
  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo */}
        <motion.div className="relative w-20 h-20">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-4 border-white/10 rounded-full" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-4 border-transparent border-t-white rounded-full" />
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              className="text-2xl font-black text-gray-900">S</motion.span>
          </motion.div>
        </motion.div>
        {/* Loading bar */}
        <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-gray-500 to-white rounded-full" />
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-white/40 text-sm tracking-widest uppercase">Loading</motion.p>
      </div>
    </motion.div>
  )
}

export default function App() {
  const [currency, setCurrency] = useState('USD')
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [loading, setLoading] = useState(true)
  const cart = useCart()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handler = (e) => setFilters((prev) => ({ ...prev, ...e.detail }))
    window.addEventListener('filterChange', handler)
    return () => window.removeEventListener('filterChange', handler)
  }, [])

  const selectProduct = useCallback((p) => setSelectedProduct(p), [])
  const closeSearch = useCallback(() => setShowSearch(false), [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <motion.div {...pageTransition}
          className="min-h-screen bg-white selection:bg-gray-900 selection:text-white">
          <Header
            cartCount={cart.count}
            onCartClick={() => cart.setIsOpen(true)}
            onSearchClick={() => setShowSearch(true)}
            currency={currency}
            onCurrencyChange={setCurrency}
          />

          <main>
            <Hero />

            <motion.div {...sectionReveal}><Features /></motion.div>

            <motion.section id="products" {...sectionReveal} className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
                  <FilterBar filters={filters} onFilterChange={setFilters} />
                  <div className="min-w-0">
                    <Products filters={filters} currency={currency} onProductSelect={selectProduct} onAddToCart={cart.addItem} />
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.div {...sectionReveal}><ShopTheLook currency={currency} /></motion.div>
            <motion.div {...sectionReveal}><UpsellSection currency={currency} onAddToCart={cart.addItem} /></motion.div>
            <motion.div {...sectionReveal}><LoyaltyProgram /></motion.div>
            <motion.div {...sectionReveal}><Newsletter /></motion.div>
          </main>

          <Footer />

          <CartSidebar items={cart.items} total={cart.total} currency={currency} onUpdateQuantity={cart.updateQuantity} onRemove={cart.removeItem}
            onCheckout={() => { cart.setIsOpen(false); setShowCheckout(true) }} onClose={() => cart.setIsOpen(false)} isOpen={cart.isOpen} />

          <AnimatePresence>
            {selectedProduct && <ProductModal product={selectedProduct} currency={currency} onAddToCart={cart.addItem} onClose={() => setSelectedProduct(null)} />}
          </AnimatePresence>
          <AnimatePresence>
            {showCheckout && <Checkout total={cart.total} currency={currency} onClose={() => setShowCheckout(false)} />}
          </AnimatePresence>
          <AnimatePresence>
            {showSearch && <SmartSearch onSelect={selectProduct} onClose={closeSearch} />}
          </AnimatePresence>

          <AbandonedCartRecovery />
        </motion.div>
      )}
    </>
  )
}
