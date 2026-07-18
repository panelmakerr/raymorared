import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
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

function Loader() {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center animate-bounce">
          <span className="text-2xl font-bold text-gray-900">S</span>
        </div>
        <p className="text-white/50 text-sm">Loading...</p>
      </div>
    </div>
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
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handler = (e) => setFilters((prev) => ({ ...prev, ...e.detail }))
    window.addEventListener('filterChange', handler)
    return () => window.removeEventListener('filterChange', handler)
  }, [])

  const selectProduct = useCallback((p) => setSelectedProduct(p), [])
  const closeSearch = useCallback(() => setShowSearch(false), [])

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-white">
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

        <section id="products" className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <FilterBar filters={filters} onFilterChange={setFilters} />
              <div className="flex-1 min-w-0">
                <Products
                  filters={filters}
                  currency={currency}
                  onProductSelect={selectProduct}
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
        onCheckout={() => { cart.setIsOpen(false); setShowCheckout(true) }}
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
        {showCheckout && <Checkout total={cart.total} currency={currency} onClose={() => setShowCheckout(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showSearch && <SmartSearch onSelect={selectProduct} onClose={closeSearch} />}
      </AnimatePresence>

      <AbandonedCartRecovery />
    </div>
  )
}
