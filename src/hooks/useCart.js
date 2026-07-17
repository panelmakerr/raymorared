import { useState, useCallback } from 'react'

const STORAGE_KEY = 'store_cart'

function loadCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
}

export function useCart() {
  const [items, setItems] = useState(loadCart)
  const [isOpen, setIsOpen] = useState(false)

  const addItem = useCallback((product, quantity = 1, selectedColor = null, selectedSize = null) => {
    setItems(prev => {
      const key = `${product.id}-${selectedColor}-${selectedSize}`
      const existing = prev.find(i => i.key === key)
      let newItems
      if (existing) {
        newItems = prev.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i)
      } else {
        newItems = [...prev, {
          key,
          product,
          quantity,
          selectedColor,
          selectedSize,
          addedAt: Date.now(),
        }]
      }
      saveCart(newItems)
      return newItems
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((key) => {
    setItems(prev => {
      const newItems = prev.filter(i => i.key !== key)
      saveCart(newItems)
      return newItems
    })
  }, [])

  const updateQuantity = useCallback((key, quantity) => {
    if (quantity < 1) return removeItem(key)
    setItems(prev => {
      const newItems = prev.map(i => i.key === key ? { ...i, quantity } : i)
      saveCart(newItems)
      return newItems
    })
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
    saveCart([])
  }, [])

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return { items, addItem, removeItem, updateQuantity, clearCart, total, count, isOpen, setIsOpen }
}
