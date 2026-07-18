import { useState, useEffect, useRef } from 'react'

export function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    if (!startOnView) { setCount(end); return }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * end))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration, startOnView])

  return { count, ref }
}

export function useTypewriter(text, speed = 60, delay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let timeout
    let i = 0
    const startTyping = () => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return interval
    }
    timeout = setTimeout(() => { const iv = startTyping(); return () => clearInterval(iv) }, delay)
    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return { displayed, done }
}

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])
  return pos
}
