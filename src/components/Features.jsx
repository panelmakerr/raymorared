import { motion } from 'framer-motion'

const FEATURES = [
  { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', title: 'Free Shipping', desc: 'On all orders over $100', color: 'from-blue-500 to-indigo-600' },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Secure Payment', desc: '100% secure checkout', color: 'from-green-500 to-emerald-600' },
  { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: 'Easy Returns', desc: '30 day return policy', color: 'from-purple-500 to-violet-600' },
  { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', title: '24/7 Support', desc: 'Dedicated customer service', color: 'from-amber-500 to-orange-600' },
]

const sc = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const si = { hidden: { opacity: 0, y: 40, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

export default function Features() {
  return (
    <section className="relative">
      {/* Marquee */}
      <div className="bg-gray-900 py-4 overflow-hidden">
        <div className="overflow-hidden whitespace-nowrap">
          <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="inline-flex gap-8 text-white/70 text-xs font-medium tracking-[0.15em] uppercase">
            {Array(2).fill(null).map((_, i) => (
              <span key={i} className="flex gap-8">
                <span>★ Free Shipping</span><span>★ New Arrivals</span><span>★ Premium Quality</span><span>★ Limited Edition</span><span>★ Handcrafted</span><span>★ Sustainable</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="py-16 md:py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={sc} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon, title, desc, color }) => (
              <motion.div key={title} variants={si}
                whileHover={{ y: -8, scale: 1.02 }} className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-default overflow-hidden">
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />

                <div className={`relative w-14 h-14 bg-gradient-to-br ${color} text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} /></svg>
                </div>
                <h3 className="relative text-base font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="relative text-sm text-gray-500">{desc}</p>

                {/* Decorative corner */}
                <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br ${color} opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-white py-3 border-b border-gray-100 overflow-hidden">
        <div className="overflow-hidden whitespace-nowrap">
          <motion.div animate={{ x: ['-50%', '0%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="inline-flex gap-6 text-gray-300 text-[10px] font-medium tracking-[0.15em] uppercase">
            {Array(2).fill(null).map((_, i) => (
              <span key={i} className="flex gap-6">
                <span>★★★★★ Trusted by 2500+ customers</span><span>•</span>
                <span>Award winning design</span><span>•</span>
                <span>Eco-friendly materials</span><span>•</span>
                <span>★★★★★ Trusted by 2500+ customers</span><span>•</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
