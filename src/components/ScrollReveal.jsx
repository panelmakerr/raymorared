import { motion } from 'framer-motion'

export default function ScrollReveal({ children, variants, className = '', ...props }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
