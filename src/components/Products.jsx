import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { convertPrice } from '../utils/currency'
import { products as allProducts } from '../utils/data'
import TiltCard from './TiltCard'

const SORT = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low → High' },
  { value: 'price-high', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
]

const sc = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const si = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function Products({ filters, currency, onProductSelect, onAddToCart }) {
  const [view, setView] = useState('grid')
  const [hovered, setHovered] = useState(null)

  const items = useMemo(() => {
    let r = [...allProducts]
    if (filters.category !== 'All') r = r.filter((p) => p.category === filters.category)
    if (filters.material !== 'All') r = r.filter((p) => p.material === filters.material)
    if (filters.priceRange.label !== 'All') r = r.filter((p) => p.price >= filters.priceRange.min && p.price < filters.priceRange.max)
    if (filters.colors.length > 0) r = r.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)))
    if (filters.minRating > 0) r = r.filter((p) => p.rating >= filters.minRating)

    const sortFn = {
      'price-low': (a, b) => a.price - b.price,
      'price-high': (a, b) => b.price - a.price,
      'rating': (a, b) => b.rating - a.rating,
      'newest': (a, b) => (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0),
    }
    r.sort(sortFn[filters.sortBy] || ((a, b) => (b.tags.includes('bestseller') ? 1 : 0) - (a.tags.includes('bestseller') ? 1 : 0)))
    return r
  }, [filters])

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900">All Products</h2>
          <p className="text-xs text-gray-500 mt-0.5">{items.length} products</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filters.sortBy}
            onChange={(e) => window.dispatchEvent(new CustomEvent('filterChange', { detail: { sortBy: e.target.value } }))}
            className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            {SORT.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-0.5">
            {['grid', 'list'].map((m) => (
              <button key={m} onClick={() => setView(m)} className={`p-1.5 rounded ${view === m ? 'bg-white shadow-sm' : ''}`} aria-label={`${m} view`}>
                {m === 'grid'
                  ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                  : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                }
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {items.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h3 className="text-base font-medium text-gray-900">No products found</h3>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
          </motion.div>
        ) : (
          <motion.div key={view} variants={sc} initial="hidden" animate="visible"
            className={view === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6' : 'flex flex-col gap-3'}>
            {items.map((p) => (
              view === 'grid' ? (
                <TiltCard key={p.id}>
                  <motion.div variants={si} className="group cursor-pointer" onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)} onClick={() => onProductSelect(p)}>
                    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-3 relative">
                      <motion.div className="w-full h-full flex items-center justify-center" animate={{ scale: hovered === p.id ? 1.05 : 1 }} transition={{ duration: 0.3 }}>
                        <div className="w-20 h-20 rounded-2xl" style={{ backgroundColor: p.colors[0].hex }} />
                      </motion.div>
                      {p.tags.length > 0 && (
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {p.tags.map((t) => (
                            <span key={t} className={`px-2 py-0.5 text-[10px] font-semibold rounded-full uppercase ${t === 'sale' ? 'bg-red-500 text-white' : t === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-900 text-white'}`}>{t}</span>
                          ))}
                        </div>
                      )}
                      <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: hovered === p.id ? 1 : 0, y: hovered === p.id ? 0 : 10 }}
                        onClick={(e) => { e.stopPropagation(); onAddToCart(p) }}
                        className="absolute bottom-3 inset-x-3 bg-gray-900 text-white text-sm font-medium py-2.5 rounded-xl shadow-lg">Quick Add</motion.button>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <div className="flex text-yellow-400 text-[10px]">{'★'.repeat(Math.floor(p.rating))}</div>
                        <span className="text-[10px] text-gray-400">({p.reviews})</span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-gray-600 transition-colors">{p.name}</h3>
                      <p className="text-[11px] text-gray-500">{p.category}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{convertPrice(p.price, currency)}</span>
                        {p.originalPrice && <span className="text-xs text-gray-400 line-through">{convertPrice(p.originalPrice, currency)}</span>}
                      </div>
                      <div className="flex gap-1 pt-1">
                        {p.colors.slice(0, 3).map((c) => <span key={c.name} className="w-3.5 h-3.5 rounded-full border border-gray-200" style={{ backgroundColor: c.hex }} title={c.name} />)}
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              ) : (
                <motion.div key={p.id} variants={si} whileHover={{ x: 4 }} className="flex gap-4 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => onProductSelect(p)}>
                  <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl" style={{ backgroundColor: p.colors[0].hex }} />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{p.name}</h3>
                    <p className="text-xs text-gray-500">{p.category} · {p.material}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-900">{convertPrice(p.price, currency)}</span>
                      {p.originalPrice && <span className="text-xs text-gray-400 line-through">{convertPrice(p.originalPrice, currency)}</span>}
                      <div className="flex text-yellow-400 text-xs">{'★'.repeat(Math.floor(p.rating))}</div>
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); onAddToCart(p) }} className="self-center px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0">Add</button>
                </motion.div>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
