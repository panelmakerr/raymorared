import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../utils/animations'
import { convertPrice } from '../utils/currency'
import { products } from '../utils/data'

export default function UpsellSection({ currentProduct, currency, onAddToCart }) {
  const recommendations = products
    .filter(p => p.id !== currentProduct?.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">You May Also Like</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-2">
            Complete Your Look
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Customers who viewed this also loved these products
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {recommendations.map((product) => (
            <motion.div
              key={product.id}
              variants={staggerItem}
              className="group cursor-pointer"
            >
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 relative">
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className="w-20 h-20 rounded-2xl"
                    style={{ backgroundColor: product.colors[0].hex }}
                  />
                </div>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => onAddToCart(product)}
                  className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                >
                  Quick Add
                </motion.button>
              </div>
              <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{product.category}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-base font-semibold text-gray-900">{convertPrice(product.price, currency)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">{convertPrice(product.originalPrice, currency)}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
