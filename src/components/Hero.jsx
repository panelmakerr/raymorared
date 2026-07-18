import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'

function MagneticBtn({ children, className, href }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const onMove = (e) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    x.set((e.clientX - left - width / 2) * 0.15)
    y.set((e.clientY - top - height / 2) * 0.15)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const Tag = href ? motion.a : motion.button
  return (
    <Tag ref={ref} href={href} style={{ x: springX, y: springY }} onMouseMove={onMove} onMouseLeave={onLeave}
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={className}>
      {children}
    </Tag>
  )
}

function FloatingOrb({ size, left, top, delay }) {
  return (
    <motion.div animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.2, 0.9, 1] }}
      transition={{ duration: 10 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay }}
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left, top, background: `radial-gradient(circle, rgba(255,255,255,${0.03 + delay * 0.008}) 0%, transparent 70%)` }} />
  )
}

export default function Hero() {
  const ref = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  useEffect(() => {
    const handler = (e) => setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 })
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <section ref={ref} className="relative overflow-hidden min-h-screen flex items-center">
      {/* Gradient BG */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

      {/* Animated Mesh */}
      <div className="absolute inset-0 opacity-30">
        <motion.div animate={{ background: ['radial-gradient(circle at 20% 80%, rgba(120,119,198,0.15) 0%, transparent 50%)', 'radial-gradient(circle at 80% 20%, rgba(120,119,198,0.15) 0%, transparent 50%)', 'radial-gradient(circle at 50% 50%, rgba(255,119,198,0.1) 0%, transparent 50%)', 'radial-gradient(circle at 20% 80%, rgba(120,119,198,0.15) 0%, transparent 50%)'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} className="absolute inset-0" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Mouse-follow glow */}
      <motion.div className="absolute w-96 h-96 rounded-full pointer-events-none" style={{ x: mouse.x * 2, y: mouse.y * 2, left: '50%', top: '50%', marginLeft: '-192px', marginTop: '-192px', background: 'radial-gradient(circle, rgba(120,119,198,0.08) 0%, transparent 70%)' }} />

      {/* Orbs */}
      <FloatingOrb size={120} left="10%" top="20%" delay={0} />
      <FloatingOrb size={200} left="60%" top="10%" delay={1} />
      <FloatingOrb size={80} left="80%" top="60%" delay={2} />
      <FloatingOrb size={150} left="30%" top="70%" delay={3} />
      <FloatingOrb size={100} left="70%" top="40%" delay={4} />

      <motion.div style={{ opacity, scale }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div style={{ y: textY }} className="text-center md:text-left">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 mb-8 border border-white/10">
              <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 bg-green-400 rounded-full" />
              New Collection 2024
            </motion.div>

            {/* Glitch Title */}
            <div className="relative mb-6">
              {['Minimalist'].map((text) => (
                <div key={text} className="overflow-hidden">
                  <motion.h1 initial={{ opacity: 0, x: -100, skewX: -15 }} animate={{ opacity: 1, x: 0, skewX: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]">
                    {text}
                  </motion.h1>
                </div>
              ))}
              <div className="overflow-hidden">
                <motion.h1 initial={{ opacity: 0, x: -100, skewX: -15 }} animate={{ opacity: 1, x: 0, skewX: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-white/15 leading-[0.9]">
                  Essentials
                </motion.h1>
              </div>
              {/* Glitch copies */}
              <motion.h1 animate={{ x: [3, -3, 3] }} transition={{ duration: 0.2, repeat: Infinity }}
                className="absolute inset-0 text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-red-500/10 leading-[0.9] pointer-events-none select-none" aria-hidden>Minimalist</motion.h1>
              <motion.h1 animate={{ x: [-3, 3, -3] }} transition={{ duration: 0.2, repeat: Infinity, delay: 0.07 }}
                className="absolute inset-0 text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-blue-500/10 leading-[0.9] pointer-events-none select-none" aria-hidden>Minimalist</motion.h1>
            </div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-white/50 max-w-md mx-auto md:mx-0 leading-relaxed mb-8">
              Curated products where form meets function in perfect harmony. Designed for modern living.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
              <MagneticBtn href="#products" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-black bg-white rounded-full shadow-xl shadow-white/10">
                Shop Now
                <motion.svg animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></motion.svg>
              </MagneticBtn>
              <MagneticBtn href="#about" className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white border border-white/20 rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors">
                View Lookbook
              </MagneticBtn>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="grid grid-cols-3 gap-6 max-w-sm mx-auto md:mx-0">
              {[{ v: '2.5K+', l: 'Customers' }, { v: '500+', l: 'Products' }, { v: '4.9★', l: 'Rating' }].map((s, i) => (
                <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.1 }} className="text-center md:text-left">
                  <span className="block text-xl font-bold text-white">{s.v}</span>
                  <span className="text-[11px] text-white/40">{s.l}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative hidden md:flex justify-center">
            <motion.div animate={{ y: [0, -20, 0], rotate: [0, 2, -2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative z-10">
              {/* Main Card */}
              <div className="w-80 h-80 lg:w-96 lg:h-96 bg-white/10 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl flex items-center justify-center relative">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="absolute w-60 h-60 border border-white/10 rounded-full" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }} className="absolute w-80 h-80 border border-white/5 rounded-full" />
                <motion.div animate={{ rotateY: [0, 10, -10, 0] }} transition={{ duration: 8, repeat: Infinity }} className="w-36 h-36 bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl shadow-2xl relative z-10" />
                {/* Orbiting dots */}
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} animate={{ rotate: 360 }} transition={{ duration: 14 + i * 5, repeat: Infinity, ease: 'linear' }} className="absolute" style={{ width: 200 + i * 40, height: 200 + i * 40 }}>
                    <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} className="absolute -top-2 left-1/2 w-4 h-4 bg-white/30 rounded-full" />
                  </motion.div>
                ))}
              </div>

              {/* Floating Badges */}
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, type: 'spring' }}
                className="absolute -top-5 -right-5 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl">
                <div className="flex items-center gap-3">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                    className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </motion.div>
                  <div><p className="text-sm font-bold text-white">Premium</p><p className="text-[10px] text-white/50">Quality</p></div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, type: 'spring' }}
                className="absolute -bottom-5 -left-5 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl">
                <div className="flex items-center gap-3">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-lg">⭐</span>
                  </motion.div>
                  <div><p className="text-sm font-bold text-white">4.9 Rating</p><p className="text-[10px] text-white/50">1,200+ Reviews</p></div>
                </div>
              </motion.div>
            </motion.div>

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-[2rem] blur-3xl" />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
            <motion.div animate={{ opacity: [0.3, 1, 0.3], height: [4, 10, 4] }} transition={{ duration: 2, repeat: Infinity }} className="w-0.5 bg-white rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
