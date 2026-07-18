import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { textReveal, blurFade, slideUp, bounceIn } from '../utils/animations'
import MagneticButton from './MagneticButton'

const floatingAnimation = {
  y: [0, -20, 0],
  rotate: [0, 5, -5, 0],
  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
}

const glitchText = {
  hidden: { opacity: 0, x: -100, skewX: -15 },
  visible: { 
    opacity: 1, 
    x: 0, 
    skewX: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1],
    }
  },
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative overflow-hidden min-h-screen flex items-center">
      {/* Animated Gradient Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      />

      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120,119,198,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(120,119,198,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(120,119,198,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(120,119,198,0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 80% 20%, rgba(255,119,198,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(255,119,198,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(255,119,198,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255,119,198,0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
          className="absolute rounded-full"
          style={{
            width: 100 + i * 50,
            height: 100 + i * 50,
            left: `${10 + i * 18}%`,
            top: `${20 + i * 12}%`,
            background: `radial-gradient(circle, rgba(255,255,255,${0.03 + i * 0.01}) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      ))}

      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div style={{ y: textY }} className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/80 mb-6 border border-white/10"
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              New Collection 2024
            </motion.div>

            {/* Main Title with Glitch Effect */}
            <div className="relative">
              <div className="overflow-hidden">
                <motion.h1
                  variants={glitchText}
                  initial="hidden"
                  animate="visible"
                  className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]"
                >
                  Minimalist
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  variants={glitchText}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.15 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white/20 leading-[0.9]"
                >
                  Essentials
                </motion.h1>
              </div>
              {/* Glitch Layers */}
              <motion.h1
                animate={{ x: [2, -2, 2], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="absolute top-0 left-0 text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-red-500/20 leading-[0.9] pointer-events-none"
              >
                Minimalist
              </motion.h1>
              <motion.h1
                animate={{ x: [-2, 2, -2], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }}
                className="absolute top-0 left-0 text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-blue-500/20 leading-[0.9] pointer-events-none"
              >
                Minimalist
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 text-lg text-white/60 max-w-lg mx-auto md:mx-0 leading-relaxed"
            >
              Discover our curated collection of thoughtfully designed products.
              Where form meets function in perfect harmony.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <MagneticButton className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-white rounded-full hover:bg-gray-100 transition-colors shadow-2xl shadow-white/20">
                <span>Shop Now</span>
                <motion.svg
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </MagneticButton>
              <MagneticButton className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm">
                View Lookbook
              </MagneticButton>
            </motion.div>

            {/* Stats with CountUp */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16 flex items-center gap-8 justify-center md:justify-start"
            >
              {[
                { value: '2.5K+', label: 'Happy Customers' },
                { value: '500+', label: 'Products' },
                { value: '4.9★', label: 'Average Rating' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative perspective-1000"
          >
            <motion.div
              animate={floatingAnimation}
              className="relative z-10"
            >
              {/* Main Product Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-square bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl"
              >
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* Rotating Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-64 h-64 border border-white/10 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-80 h-80 border border-white/5 rounded-full"
                  />

                  {/* Product */}
                  <motion.div
                    animate={{ rotateY: [0, 10, -10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-40 h-40 bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl shadow-2xl"
                  />

                  {/* Orbiting Elements */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10 + i * 5, repeat: Infinity, ease: 'linear' }}
                      className="absolute"
                      style={{ width: 200 + i * 40, height: 200 + i * 40 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className="absolute -top-2 left-1/2 w-4 h-4 bg-white/30 rounded-full"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Floating Badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center"
                  >
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <div>
                    <p className="text-sm font-bold text-white">Premium</p>
                    <p className="text-xs text-white/50">Quality</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0, x: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center"
                  >
                    <span className="text-xl">⭐</span>
                  </motion.div>
                  <div>
                    <p className="text-sm font-bold text-white">4.9 Rating</p>
                    <p className="text-xs text-white/50">1,200+ Reviews</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-[2rem] blur-3xl" />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], height: [6, 14, 6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
