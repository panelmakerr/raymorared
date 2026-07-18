import { motion } from 'framer-motion'
import { convertPrice } from '../utils/currency'
import { products } from '../utils/data'

const sc = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }
const si = { hidden: { opacity: 0, y: 40, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }

export default function UpsellSection({ currency, onAddToCart }) {
  const recs = products.sort(() => Math.random() - 0.5).slice(0, 4)

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-50 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-sm font-medium text-gray-500 uppercase tracking-wider">You May Also Like</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-2">Complete Your Look</motion.h2>
        </motion.div>

        <motion.div variants={sc} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {recs.map((p, i) => (
            <motion.div key={p.id} variants={si} whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-square bg-gray-100 rounded-t-2xl overflow-hidden mb-3 relative">
                {/* Shimmer */}
                <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 + i }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10" />

                <div className="w-full h-full flex items-center justify-center">
                  <motion.div whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-20 h-20 rounded-2xl shadow-lg transition-transform" style={{ backgroundColor: p.colors[0].hex }} />
                </div>

                {/* Quick Add */}
                <motion.div initial={{ opacity: 0, y: 10 }} whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => onAddToCart(p)}
                    className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-xl shadow-lg hover:bg-gray-800 transition-all">
                    Quick Add
                  </motion.button>
                </motion.div>

                {/* Hover glow */}
                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none" />
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-gray-600 transition-colors">{p.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{p.category}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <motion.span whileHover={{ scale: 1.05 }} className="text-sm font-bold text-gray-900">{convertPrice(p.price, currency)}</motion.span>
                  {p.originalPrice && <span className="text-xs text-gray-400 line-through">{convertPrice(p.originalPrice, currency)}</span>}
                </div>
                <div className="flex gap-1 mt-2">
                  {p.colors.slice(0, 3).map((c) => (
                    <span key={c.name} className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
