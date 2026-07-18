import { motion } from 'framer-motion'

export default function Marquee({ children, speed = 30, reverse = false, className = '' }) {
  const content = children || 'FREE SHIPPING • NEW ARRIVALS • PREMIUM QUALITY • LIMITED EDITION • '
  const repeatedContent = content.repeat(4)

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        <span className="pr-4">{repeatedContent}</span>
        <span className="pr-4">{repeatedContent}</span>
      </motion.div>
    </div>
  )
}
