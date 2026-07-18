import { motion } from 'framer-motion'
import { convertPrice } from '../utils/currency'
import { products } from '../utils/data'

const sc = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const si = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function UpsellSection({ currency, onAddToCart }) {
  const recs = products.sort(() => Math.random() - 0.5).slice(0, 4)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">You May Also Like</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-2">Complete Your Look</h2>
        </motion.div>
        <motion.div variants={sc} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {recs.map((p) => (
            <motion.div key={p.id} variants={si} className="group cursor-pointer">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-3 relative">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl transition-transform group-hover:scale-110" style={{ backgroundColor: p.colors[0].hex }} />
                </div>
                <button onClick={() => onAddToCart(p)} className="absolute bottom-3 left-3 right-3 bg-gray-900 text-white text-sm font-medium py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300">Quick Add</button>
              </div>
              <h3 className="text-sm font-medium text-gray-900 truncate">{p.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{p.category}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-bold text-gray-900">{convertPrice(p.price, currency)}</span>
                {p.originalPrice && <span className="text-xs text-gray-400 line-through">{convertPrice(p.originalPrice, currency)}</span>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
