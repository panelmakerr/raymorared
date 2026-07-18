import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { categories, materials, priceRanges } from '../utils/data'

const COLORS = [
  { name: 'Black', hex: '#000000' }, { name: 'White', hex: '#ffffff' },
  { name: 'Brown', hex: '#5c4033' }, { name: 'Gold', hex: '#c9a96e' },
  { name: 'Red', hex: '#c75b39' }, { name: 'Green', hex: '#87a878' },
]

const RATINGS = [4.5, 4.0, 3.5]

export default function FilterBar({ filters, onFilterChange }) {
  const [expanded, setExpanded] = useState(null)
  const [mobile, setMobile] = useState(false)
  const toggle = (s) => setExpanded((p) => (p === s ? null : s))
  const update = (k, v) => onFilterChange({ ...filters, [k]: v })
  const clear = () => onFilterChange({ category: 'All', material: 'All', priceRange: priceRanges[0], colors: [], minRating: 0, sortBy: 'featured' })
  const active = [filters.category !== 'All', filters.material !== 'All', filters.priceRange.label !== 'All', filters.colors.length > 0, filters.minRating > 0].filter(Boolean).length

  const Section = ({ title, sKey, count, children }) => (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => toggle(sKey)} className="w-full flex items-center justify-between py-3.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group">
        <span className="flex items-center gap-2">
          {title}
          {count > 0 && <span className="px-1.5 py-0.5 text-[10px] bg-gray-900 text-white rounded-full">{count}</span>}
        </span>
        <motion.svg animate={{ rotate: expanded === sKey ? 180 : 0 }} transition={{ duration: 0.2 }} className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></motion.svg>
      </button>
      <AnimatePresence>
        {expanded === sKey && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="overflow-hidden"><div className="pb-4">{children}</div></motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const FilterContent = () => (
    <div className="space-y-0">
      <Section title="Category" sKey="cat" count={filters.category !== 'All' ? 1 : 0}>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <motion.button key={c} whileTap={{ scale: 0.95 }} onClick={() => update('category', c)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${filters.category === c ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}>
              {c}
            </motion.button>
          ))}
        </div>
      </Section>
      <Section title="Price Range" sKey="price" count={filters.priceRange.label !== 'All' ? 1 : 0}>
        <div className="space-y-1">
          {priceRanges.map((r) => (
            <motion.button key={r.label} whileTap={{ scale: 0.98 }} onClick={() => update('priceRange', r)}
              className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${filters.priceRange.label === r.label ? 'bg-gray-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
              {r.label}
            </motion.button>
          ))}
        </div>
      </Section>
      <Section title="Color" sKey="color" count={filters.colors.length}>
        <div className="flex flex-wrap gap-2.5">
          {COLORS.map((c) => (
            <motion.button key={c.name} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
              onClick={() => update('colors', filters.colors.includes(c.name) ? filters.colors.filter((x) => x !== c.name) : [...filters.colors, c.name])}
              className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${filters.colors.includes(c.name) ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2 scale-110' : 'border-gray-200 hover:border-gray-400'}`}
              style={{ backgroundColor: c.hex }} title={c.name} />
          ))}
        </div>
      </Section>
      <Section title="Material" sKey="mat" count={filters.material !== 'All' ? 1 : 0}>
        <div className="flex flex-wrap gap-2">
          {materials.map((m) => (
            <motion.button key={m} whileTap={{ scale: 0.95 }} onClick={() => update('material', m)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${filters.material === m ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}>
              {m}
            </motion.button>
          ))}
        </div>
      </Section>
      <Section title="Rating" sKey="rating" count={filters.minRating > 0 ? 1 : 0}>
        <div className="space-y-1">
          {RATINGS.map((r) => (
            <motion.button key={r} whileTap={{ scale: 0.98 }}
              onClick={() => update('minRating', filters.minRating === r ? 0 : r)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${filters.minRating === r ? 'bg-gray-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span>{r}+</span>
              <span className="text-yellow-500 text-xs">★★★★★</span>
            </motion.button>
          ))}
        </div>
      </Section>
    </div>
  )

  return (
    <>
      {/* Mobile filter button */}
      <button onClick={() => setMobile(true)}
        className="lg:hidden fixed bottom-6 left-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium hover:bg-gray-800 active:scale-95 transition-all">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
        Filters {active > 0 && `(${active})`}
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-black/50 lg:hidden" onClick={() => setMobile(false)}>
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filters {active > 0 && `(${active})`}</h3>
                  <button onClick={() => setMobile(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                {active > 0 && <button onClick={clear} className="w-full mb-4 py-2 text-sm text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">Clear all filters</button>}
                <FilterContent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Filters</h3>
            {active > 0 && <button onClick={clear} className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">Clear all</button>}
          </div>
          <FilterContent />
        </div>
      </div>
    </>
  )
}
