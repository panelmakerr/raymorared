import { motion } from 'framer-motion'

const FEATURES = [
  { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', title: 'Free Shipping', desc: 'On all orders over $100' },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Secure Payment', desc: '100% secure checkout' },
  { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: 'Easy Returns', desc: '30 day return policy' },
  { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', title: '24/7 Support', desc: 'Dedicated customer service' },
]

const sc = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const si = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function Features() {
  return (
    <section className="relative">
      <div className="bg-gray-900 py-3 overflow-hidden">
        <div className="overflow-hidden whitespace-nowrap">
          <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="inline-flex text-white/80 text-xs font-medium tracking-widest uppercase">
            <span className="pr-4">FREE SHIPPING • NEW ARRIVALS • PREMIUM QUALITY • LIMITED EDITION • HANDCRAFTED • SUSTAINABLE • </span>
            <span className="pr-4">FREE SHIPPING • NEW ARRIVALS • PREMIUM QUALITY • LIMITED EDITION • HANDCRAFTED • SUSTAINABLE • </span>
          </motion.div>
        </div>
      </div>

      <div className="py-12 md:py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={sc} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {FEATURES.map(({ icon, title, desc }) => (
              <motion.div key={title} variants={si} className="flex flex-col items-center text-center group">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }} className="relative w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-gray-900/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} /></svg>
                </motion.div>
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                <p className="mt-1 text-xs text-gray-500">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
