import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../utils/data'

function fuzzyMatch(s, q) {
  const l = s.toLowerCase(), ql = q.toLowerCase()
  if (l.includes(ql)) return true
  let i = 0
  for (let j = 0; j < l.length && i < ql.length; j++) { if (l[j] === ql[i]) i++ }
  return i === ql.length
}

export default function SmartSearch({ onSelect, onClose }) {
  const [q, setQ] = useState('')
  const [results, setResults] = useState([])
  const [sel, setSel] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    if (!q.trim()) { setResults([]); return }
    const m = products.filter((p) => fuzzyMatch(p.name, q) || fuzzyMatch(p.category, q) || fuzzyMatch(p.material, q)).slice(0, 6)
    setResults(m); setSel(0)
  }, [q])

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((i) => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((i) => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter' && results[sel]) { onSelect(results[sel]); onClose() }
    else if (e.key === 'Escape') onClose()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[10vh]" onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: -40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -40, scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center px-6 py-4 border-b border-gray-100">
          <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input ref={inputRef} type="text" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder="Search products, categories..." className="flex-1 text-lg outline-none text-gray-900 placeholder-gray-400" />
          <kbd className="px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded ml-2">ESC</kbd>
        </div>
        <AnimatePresence mode="wait">
          {q && results.length > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="py-2 max-h-96 overflow-y-auto">
                {results.map((p, i) => (
                  <button key={p.id} onMouseEnter={() => setSel(i)} onClick={() => { onSelect(p); onClose() }}
                    className={`w-full flex items-center gap-4 px-6 py-3 text-left transition-colors ${i === sel ? 'bg-gray-50' : 'hover:bg-gray-50'}`}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: p.colors[0].hex }}>{p.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.category} · ${p.price}</div>
                    </div>
                    <div className="text-xs text-gray-400">{p.rating}★</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          {q && results.length === 0 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center text-gray-400"><p className="text-lg">No results for "{q}"</p></motion.div>}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
