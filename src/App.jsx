import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Products from './components/Products'
import FilterBar from './components/FilterBar'
import ProductModal from './components/ProductModal'
import ShopTheLook from './components/ShopTheLook'
import UpsellSection from './components/UpsellSection'
import LoyaltyProgram from './components/LoyaltyProgram'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import Checkout from './components/Checkout'
import SmartSearch from './components/SmartSearch'
import CurrencySelector from './components/CurrencySelector'
import AbandonedCartRecovery from './components/AbandonedCartRecovery'
import SpeedIndicator from './components/SpeedIndicator'
import CursorFollower from './components/CursorFollower'
import ParticleBackground from './components/ParticleBackground'
import TextScrollAnimation from './components/TextScrollAnimation'
import { useCart } from './hooks/useCart'
import { priceRanges } from './utils/data'

const defaultFilters = {
  category: 'All',
  material: 'All',
  priceRange: priceRanges[0],
  colors: [],
  minRating: 0,
  sizes: [],
  sortBy: 'featured',
}

function App() {
  const [currency, setCurrency] = useState('USD')
  const [filters, setFilters] = useState(defaultFilters)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const cart = useCart()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleFilterChange = (e) => {
      setFilters(e.detail)
    }
    window.addEventListener('filterChange', handleFilterChange)
    return () => window.removeEventListener('filterChange', handleFilterChange)
  }, [])

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-[200]">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-20 h-20 mx-auto mb-6"
          >
            <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">S</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-white mb-2">STORE</h1>
            <p className="text-white/50 text-sm">Loading amazing products...</p>
          </motion.div>
          <motion.div
            className="mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent"
            />
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <CursorFollower />
      <ParticleBackground />

      <Header
        cartCount={cart.count}
        onCartClick={() => cart.setIsOpen(true)}
        onSearchClick={() => setShowSearch(true)}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      <main>
        <Hero />
        <Features />

        {/* Text Scroll Section */}
        <section className="py-20 bg-white overflow-hidden">
          <TextScrollAnimation
            text="Designed for Modern Living"
            className="max-w-7xl mx-auto px-4"
          />
        </section>

        <section id="products" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <FilterBar filters={filters} onFilterChange={setFilters} />
              <div className="flex-1">
                <Products
                  filters={filters}
                  currency={currency}
                  onProductSelect={handleProductSelect}
                  onAddToCart={cart.addItem}
                />
              </div>
            </div>
          </div>
        </section>

        <ShopTheLook currency={currency} />
        <UpsellSection currency={currency} onAddToCart={cart.addItem} />
        <LoyaltyProgram />
        <Newsletter />
      </main>

      <Footer />

      <CartSidebar
        items={cart.items}
        total={cart.total}
        currency={currency}
        onUpdateQuantity={cart.updateQuantity}
        onRemove={cart.removeItem}
        onCheckout={() => {
          cart.setIsOpen(false)
          setShowCheckout(true)
        }}
        onClose={() => cart.setIsOpen(false)}
        isOpen={cart.isOpen}
      />

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            currency={currency}
            onAddToCart={cart.addItem}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCheckout && (
          <Checkout
            total={cart.total}
            currency={currency}
            onClose={() => setShowCheckout(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSearch && (
          <SmartSearch
            onSelect={handleProductSelect}
            onClose={() => setShowSearch(false)}
          />
        )}
      </AnimatePresence>

      <AbandonedCartRecovery />
      <SpeedIndicator />
    </div>
  )
}

export default App
