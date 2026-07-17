import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../utils/data'

function fuzzyMatch(str, query) {
  const lower = str.toLowerCase()
  const q = query.toLowerCase()
  if (lower.includes(q)) return true
  let qi = 0
  for (let i = 0; i < lower.length && qi < q.length; i++) {
    if (lower[i] === q[qi]) qi++
  }
  return qi === q.length
}

function getPreviewColor(product) {
  const colors = ['#1a1a1a', '#c75b39', '#87a878', '#5c4033', '#c9a96e']
  return colors[product.id % colors.length]
}

export default function SmartSearch({ onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(true)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const matches = products.filter(p =>
      fuzzyMatch(p.name, query) ||
      fuzzyMatch(p.category, query) ||
      fuzzyMatch(p.material, query) ||
      p.tags.some(t => fuzzyMatch(t, query))
    ).slice(0, 6)
    setResults(matches)
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      onSelect?.(results[selectedIndex])
      onClose?.()
    } else if (e.key === 'Escape') {
      onClose?.()
    }
  }, [results, selectedIndex, onSelect, onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[10vh]"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -40, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-6 py-4 border-b border-gray-100">
          <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products, categories, materials..."
            className="flex-1 text-lg outline-none text-gray-900 placeholder-gray-400"
          />
          <kbd className="px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded ml-2">ESC</kbd>
        </div>

        <AnimatePresence mode="wait">
          {query && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="py-2 max-h-96 overflow-y-auto">
                {results.map((product, index) => (
                  <motion.button
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-full flex items-center gap-4 px-6 py-3 text-left transition-colors ${
                      index === selectedIndex ? 'bg-gray-50' : 'hover:bg-gray-50'
                    }`}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => { onSelect?.(product); onClose?.() }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: getPreviewColor(product) }}
                    >
                      {product.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.category} · ${product.price}</div>
                    </div>
                    <div className="text-xs text-gray-400">{product.rating}★</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
          {query && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center text-gray-400"
            >
              <p className="text-lg">No results for "{query}"</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
