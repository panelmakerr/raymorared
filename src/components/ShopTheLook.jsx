import { motion } from 'framer-motion'
import { convertPrice } from '../utils/currency'

const BUNDLES = [
  { id: 1, name: 'Modern Living Room', desc: 'Curated collection for your space', items: [{ name: 'Minimalist Chair', price: 299, color: '#5c4033' }, { name: 'Coffee Table', price: 449, color: '#c4a35a' }, { name: 'Floor Lamp', price: 149, color: '#1a1a1a' }], discount: 15 },
  { id: 2, name: 'Bedroom Essentials', desc: 'Transform your sanctuary', items: [{ name: 'Duvet Cover', price: 199, color: '#f5f5dc' }, { name: 'Floor Mirror', price: 329, color: '#c9a96e' }, { name: 'Side Table', price: 189, color: '#c4a35a' }], discount: 12 },
]

const sc = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }
const si = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }

export default function ShopTheLook({ currency }) {
  const total = (b) => b.items.reduce((s, i) => s + i.price, 0)

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Curated Collections</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-2">Shop the Look</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">Complete your space with expertly curated bundles and save big</p>
        </motion.div>

        <motion.div variants={sc} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {BUNDLES.map((b) => (
            <motion.div key={b.id} variants={si} whileHover={{ y: -4 }} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="grid grid-cols-3 gap-1.5 p-5">
                {b.items.map((item, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.08, rotate: 2 }} className="aspect-square rounded-2xl flex items-center justify-center cursor-pointer transition-shadow hover:shadow-lg" style={{ backgroundColor: item.color + '12' }}>
                    <motion.div className="w-16 h-16 rounded-xl" style={{ backgroundColor: item.color }} whileHover={{ scale: 1.1 }} />
                  </motion.div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">{b.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{b.desc}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full flex-shrink-0">Save {b.discount}%</span>
                </div>
                <div className="space-y-2 mb-4">
                  {b.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="font-medium text-gray-900">{convertPrice(item.price, currency)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-400 line-through">{convertPrice(total(b), currency)}</span>
                    <span className="text-xl font-bold text-gray-900">{convertPrice(total(b) * (1 - b.discount / 100), currency)}</span>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/15">
                    Add Bundle
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
