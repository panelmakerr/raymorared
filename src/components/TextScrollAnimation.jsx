import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function TextScrollAnimation({ text, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const words = text.split(' ')

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
        {words.map((word, i) => (
          <Word key={i} word={word} progress={scrollYProgress} index={i} />
        ))}
      </div>
    </div>
  )
}

function Word({ word, progress, index }) {
  const start = index * 0.1
  const end = start + 0.3

  const opacity = useTransform(progress, [start, end], [0.2, 1])
  const y = useTransform(progress, [start, end], [50, 0])

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block text-4xl md:text-6xl font-bold text-gray-900"
    >
      {word}
    </motion.span>
  )
}
