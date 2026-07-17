export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

export const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const slideDown = {
  hidden: { opacity: 0, y: -60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const slideLeft = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const slideRight = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export const magneticHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: 'easeOut' } },
  tap: { scale: 0.95 },
}

export const textReveal = {
  hidden: { opacity: 0, y: 100, skewY: 5 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export const blurFade = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8 } },
}

export const parallax = {
  hidden: { y: 100 },
  visible: { y: 0, transition: { duration: 1, ease: 'easeOut' } },
}

export const flipIn = {
  hidden: { opacity: 0, rotateX: -90 },
  visible: { opacity: 1, rotateX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const rotateScale = {
  hidden: { opacity: 0, rotate: -180, scale: 0 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export const bounceIn = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: [0.3, 1.1, 0.9, 1.05, 1],
    transition: { duration: 0.8, times: [0, 0.6, 0.8, 0.9, 1] },
  },
}

export const elasticHover = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.1, rotate: 2, transition: { type: 'spring', stiffness: 300, damping: 10 } },
}
