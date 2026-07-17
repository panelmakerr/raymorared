import { useState, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
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
  const cart = useCart()

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
  }

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
