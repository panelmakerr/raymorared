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
const si = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

function ProductCard({ p, currency, onProductSelect, onAddToCart }) {
  const [hovered, setHovered] = useState(false)
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0

  return (
    <TiltCard>
      <motion.div variants={si} className="group cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => onProductSelect(p)}>
        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-3 relative">
          <motion.div className="w-full h-full flex items-center justify-center" animate={{ scale: hovered ? 1.05 : 1 }} transition={{ duration: 0.4 }}>
            <motion.div className="w-24 h-24 rounded-2xl" style={{ backgroundColor: p.colors[0].hex }}
              animate={{ rotate: hovered ? [0, 5, -5, 0] : 0, scale: hovered ? 1.1 : 1 }} transition={{ duration: 0.5 }} />
          </motion.div>

          {/* Tags */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {discount > 0 && <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white">-{discount}%</span>}
            {p.tags.includes('new') && <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500 text-white">New</span>}
            {p.tags.includes('bestseller') && !p.tags.includes('new') && <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gray-900 text-white">Best</span>}
          </div>

          {/* Quick Add */}
          <motion.div initial={false} animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }} transition={{ duration: 0.2 }}
            className="absolute bottom-3 inset-x-3">
            <button onClick={(e) => { e.stopPropagation(); onAddToCart(p) }}
              className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-xl shadow-lg hover:bg-gray-800 active:scale-[0.98] transition-all">
              Quick Add
            </button>
          </motion.div>

          {/* Hover glow */}
          <motion.div initial={false} animate={{ opacity: hovered ? 0.5 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent pointer-events-none" />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400 text-[10px]">{'★'.repeat(Math.floor(p.rating))}</div>
            <span className="text-[10px] text-gray-400">({p.reviews})</span>
          </div>
          <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-gray-600 transition-colors">{p.name}</h3>
          <p className="text-[11px] text-gray-500">{p.category}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900">{convertPrice(p.price, currency)}</span>
            {p.originalPrice && <span className="text-xs text-gray-400 line-through">{convertPrice(p.originalPrice, currency)}</span>}
          </div>
          <div className="flex gap-1.5 pt-0.5">
            {p.colors.slice(0, 4).map((c) => (
              <span key={c.name} className="w-3.5 h-3.5 rounded-full border border-gray-200 hover:scale-125 transition-transform cursor-pointer" style={{ backgroundColor: c.hex }} title={c.name} />
            ))}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  )
}

function ProductListItem({ p, currency, onProductSelect, onAddToCart }) {
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0
  return (
    <motion.div variants={si} whileHover={{ x: 4, scale: 1.005 }} className="flex gap-4 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100/80 hover:shadow-md transition-all" onClick={() => onProductSelect(p)}>
      <div className="w-28 h-28 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-14 h-14 rounded-xl" style={{ backgroundColor: p.colors[0].hex }} />
      </div>
      <div className="flex-1 min-w-0 grid grid-cols-[1fr_auto] gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-900 truncate">{p.name}</h3>
            {discount > 0 && <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-red-500 text-white">-{discount}%</span>}
          </div>
          <p className="text-xs text-gray-500">{p.category} · {p.material}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900">{convertPrice(p.price, currency)}</span>
            {p.originalPrice && <span className="text-xs text-gray-400 line-through">{convertPrice(p.originalPrice, currency)}</span>}
            <div className="flex text-amber-400 text-xs">{'★'.repeat(Math.floor(p.rating))}</div>
          </div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onAddToCart(p) }}
          className="self-center px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 active:scale-95 transition-all flex-shrink-0 whitespace-nowrap">
          Add to Cart
        </button>
      </div>
    </motion.div>
  )
}

export default function Products({ filters, currency, onProductSelect, onAddToCart }) {
  const [view, setView] = useState('grid')

  const items = useMemo(() => {
    let r = [...allProducts]
    if (filters.category !== 'All') r = r.filter((p) => p.category === filters.category)
    if (filters.material !== 'All') r = r.filter((p) => p.material === filters.material)
    if (filters.priceRange.label !== 'All') r = r.filter((p) => p.price >= filters.priceRange.min && p.price < filters.priceRange.max)
    if (filters.colors.length > 0) r = r.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)))
    if (filters.minRating > 0) r = r.filter((p) => p.rating >= filters.minRating)
    const sortFn = { 'price-low': (a, b) => a.price - b.price, 'price-high': (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating, newest: (a, b) => (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0) }
    r.sort(sortFn[filters.sortBy] || ((a, b) => (b.tags.includes('bestseller') ? 1 : 0) - (a.tags.includes('bestseller') ? 1 : 0)))
    return r
  }, [filters])

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">All Products</h2>
          <p className="text-xs text-gray-500 mt-0.5">{items.length} products found</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={filters.sortBy} onChange={(e) => window.dispatchEvent(new CustomEvent('filterChange', { detail: { sortBy: e.target.value } }))}
            className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer">
            {SORT.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
            {['grid', 'list'].map((m) => (
              <button key={m} onClick={() => setView(m)} className={`p-1.5 rounded-md transition-all ${view === m ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
                {m === 'grid'
                  ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" strokeWidth={2} /><rect x="14" y="3" width="7" height="7" rx="1" strokeWidth={2} /><rect x="3" y="14" width="7" height="7" rx="1" strokeWidth={2} /><rect x="14" y="14" width="7" height="7" rx="1" strokeWidth={2} /></svg>
                  : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <AnimatePresence mode="wait">
        {items.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
              className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </motion.div>
            <h3 className="text-base font-medium text-gray-900">No products found</h3>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
          </motion.div>
        ) : (
          <motion.div key={view} variants={sc} initial="hidden" animate="visible"
            className={view === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5' : 'flex flex-col gap-3'}>
            {items.map((p) => (
              view === 'grid'
                ? <ProductCard key={p.id} p={p} currency={currency} onProductSelect={onProductSelect} onAddToCart={onAddToCart} />
                : <ProductListItem key={p.id} p={p} currency={currency} onProductSelect={onProductSelect} onAddToCart={onAddToCart} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
