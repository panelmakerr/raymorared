import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem } from '../utils/animations'
import { convertPrice } from '../utils/currency'
import { products as allProducts } from '../utils/data'

export default function Products({ filters, currency, onProductSelect, onAddToCart }) {
  const [viewMode, setViewMode] = useState('grid')

  const filteredProducts = useMemo(() => {
    let result = [...allProducts]

    if (filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category)
    }

    if (filters.material !== 'All') {
      result = result.filter(p => p.material === filters.material)
    }

    if (filters.priceRange.label !== 'All') {
      result = result.filter(p => p.price >= filters.priceRange.min && p.price < filters.priceRange.max)
    }

    if (filters.colors.length > 0) {
      result = result.filter(p =>
        p.colors.some(c => filters.colors.includes(c.name))
      )
    }

    if (filters.minRating > 0) {
      result = result.filter(p => p.rating >= filters.minRating)
    }

    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.sort((a, b) => (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0))
        break
      default:
        result.sort((a, b) => (b.tags.includes('bestseller') ? 1 : 0) - (a.tags.includes('bestseller') ? 1 : 0))
    }

    return result
  }, [filters])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
          <p className="text-sm text-gray-500 mt-1">{filteredProducts.length} products</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filters.sortBy}
            onChange={(e) => {
              const newFilters = { ...filters, sortBy: e.target.value }
              // Call parent update
              const event = new CustomEvent('filterChange', { detail: newFilters })
              window.dispatchEvent(event)
            }}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
          <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </motion.div>
        ) : (
          <motion.div
            key="products"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredProducts.map((product) => (
              viewMode === 'grid' ? (
                <motion.div
                  key={product.id}
                  variants={staggerItem}
                  className="group cursor-pointer"
                  onClick={() => onProductSelect(product)}
                >
                  <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 relative">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div
                          className="w-20 h-20 mx-auto rounded-2xl mb-2 transition-transform group-hover:scale-110 duration-500"
                          style={{ backgroundColor: product.colors[0].hex }}
                        />
                      </div>
                    </div>
                    {product.tags.length > 0 && (
                      <div className="absolute top-3 left-3 flex gap-1">
                        {product.tags.map(tag => (
                          <span
                            key={tag}
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              tag === 'sale' ? 'bg-red-500 text-white' :
                              tag === 'new' ? 'bg-blue-500 text-white' :
                              'bg-gray-900 text-white'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onAddToCart(product)
                      }}
                      className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                    >
                      Quick Add
                    </motion.button>
                  </div>
                  <div className="px-1">
                    <div className="flex items-center gap-1 mb-1">
                      <div className="flex text-yellow-400 text-xs">
                        {'★'.repeat(Math.floor(product.rating))}
                      </div>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{product.category}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-base font-semibold text-gray-900">
                        {convertPrice(product.price, currency)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {convertPrice(product.originalPrice, currency)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1 mt-2">
                      {product.colors.slice(0, 3).map(color => (
                        <div
                          key={color.name}
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={product.id}
                  variants={staggerItem}
                  className="flex gap-6 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onProductSelect(product)}
                >
                  <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div
                      className="w-16 h-16 rounded-xl"
                      style={{ backgroundColor: product.colors[0].hex }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.category} · {product.material}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">Premium quality {product.name.toLowerCase()} for your home</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-lg font-bold text-gray-900">{convertPrice(product.price, currency)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{convertPrice(product.originalPrice, currency)}</span>
                      )}
                      <div className="flex text-yellow-400 text-sm">
                        {'★'.repeat(Math.floor(product.rating))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddToCart(product)
                    }}
                    className="self-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
