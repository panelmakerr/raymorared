import { motion } from 'framer-motion'
import { textReveal, blurFade, slideUp, bounceIn } from '../utils/animations'

const floatingAnimation = {
  y: [0, -20, 0],
  transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-[90vh] flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/2 -right-1/2 w-full h-full"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-200/30 to-transparent rounded-full blur-3xl" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full"
        >
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-gray-300/20 to-transparent rounded-full blur-3xl" />
        </motion.div>

        {/* Floating Shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              rotate: [0, i % 2 === 0 ? 180 : -180, 0],
            }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute"
            style={{
              top: `${20 + i * 12}%`,
              left: `${10 + i * 15}%`,
            }}
          >
            <div className={`w-${4 + i} h-${4 + i} bg-gray-900/${5 + i * 2} rounded${i % 2 === 0 ? 'full' : '-lg'}`} />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <motion.div
              variants={blurFade}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/5 rounded-full text-sm font-medium text-gray-700 mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              New Collection 2024
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                variants={textReveal}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]"
              >
                Minimalist
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={textReveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.15 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-400 leading-[1.1]"
              >
                Essentials
              </motion.h1>
            </div>

            <motion.p
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="mt-8 text-lg text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed"
            >
              Discover our curated collection of thoughtfully designed products.
              Where form meets function in perfect harmony.
            </motion.p>

            <motion.div
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors shadow-xl shadow-gray-900/25"
              >
                Shop Now
                <motion.svg
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-900 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                View Lookbook
              </motion.a>
            </motion.div>

            <motion.div
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
              className="mt-12 flex items-center gap-8 justify-center md:justify-start"
            >
              <div>
                <span className="text-3xl font-bold text-gray-900">2.5K+</span>
                <p className="text-sm text-gray-500">Happy Customers</p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <span className="text-3xl font-bold text-gray-900">500+</span>
                <p className="text-sm text-gray-500">Products</p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <span className="text-3xl font-bold text-gray-900">4.9</span>
                <p className="text-sm text-gray-500">Average Rating</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative z-10">
              <motion.div
                animate={floatingAnimation}
                className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-[2rem] overflow-hidden shadow-2xl"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl mb-4"
                    />
                    <p className="text-gray-400 text-sm font-medium">Featured Product</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Premium</p>
                    <p className="text-xs text-gray-500">Quality</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">⭐</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">4.9 Rating</p>
                    <p className="text-xs text-gray-500">1,200+ Reviews</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gray-900 rounded-full opacity-10" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-gray-900 rounded-full opacity-5" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], height: [6, 12, 6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 bg-gray-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
