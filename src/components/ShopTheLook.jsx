import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, magneticHover } from '../utils/animations'
import { convertPrice } from '../utils/currency'

const bundles = [
  {
    id: 1,
    name: 'Modern Living Room',
    description: 'Complete your space with this curated collection',
    items: [
      { name: 'Minimalist Chair', price: 299, color: '#5c4033' },
      { name: 'Coffee Table', price: 449, color: '#c4a35a' },
      { name: 'Floor Lamp', price: 149, color: '#1a1a1a' },
    ],
    discount: 15,
  },
  {
    id: 2,
    name: 'Bedroom Essentials',
    description: 'Transform your bedroom into a sanctuary',
    items: [
      { name: 'Duvet Cover', price: 199, color: '#f5f5dc' },
      { name: 'Floor Mirror', price: 329, color: '#c9a96e' },
      { name: 'Side Table', price: 189, color: '#c4a35a' },
    ],
    discount: 12,
  },
]

export default function ShopTheLook({ currency }) {
  const bundleTotal = (bundle) => bundle.items.reduce((sum, item) => sum + item.price, 0)

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Curated Collections</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-2">
            Shop the Look
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Complete your space with our expertly curated bundles and save
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 gap-8"
        >
          {bundles.map((bundle) => (
            <motion.div
              key={bundle.id}
              variants={staggerItem}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              <div className="grid grid-cols-3 gap-1 p-4">
                {bundle.items.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={magneticHover}
                    initial="rest"
                    whileHover="hover"
                    className="aspect-square rounded-2xl flex items-center justify-center cursor-pointer"
                    style={{ backgroundColor: item.color + '15' }}
                  >
                    <div
                      className="w-16 h-16 rounded-xl"
                      style={{ backgroundColor: item.color }}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{bundle.name}</h3>
                    <p className="text-sm text-gray-500">{bundle.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                    Save {bundle.discount}%
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  {bundle.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="text-gray-900">{convertPrice(item.price, currency)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500 line-through">{convertPrice(bundleTotal(bundle), currency)}</span>
                    <span className="ml-2 text-xl font-bold text-gray-900">
                      {convertPrice(bundleTotal(bundle) * (1 - bundle.discount / 100), currency)}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
                  >
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
