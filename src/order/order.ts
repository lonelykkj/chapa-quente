import { createContext, useContext, useEffect, useState } from 'react'
import { MENU } from '@/data/menu'

const STORAGE_KEY = 'chapa-quente:pedido'
const ITEMS = new Map(MENU.flatMap((c) => c.items).map((i) => [i.name, i]))

type Quantities = Record<string, number>

function load(): Quantities {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Quantities
    // drop anything no longer on the menu
    return Object.fromEntries(Object.entries(saved).filter(([name, qty]) => ITEMS.has(name) && qty > 0))
  } catch {
    return {}
  }
}

/** Order bag state; lives in <OrderProvider> and is read with useOrder(). */
export function useOrderState() {
  const [quantities, setQuantities] = useState(load)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities))
    } catch {
      /* storage unavailable — the bag just won't persist */
    }
  }, [quantities])

  const change = (name: string, delta: number) =>
    setQuantities((q) => {
      const next = { ...q, [name]: (q[name] ?? 0) + delta }
      if (next[name] <= 0) delete next[name]
      return next
    })

  const lines = Object.entries(quantities).map(([name, qty]) => ({ ...ITEMS.get(name)!, qty }))

  return {
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    total: lines.reduce((sum, l) => sum + l.price * l.qty, 0),
    quantityOf: (name: string) => quantities[name] ?? 0,
    add: (name: string) => change(name, 1),
    remove: (name: string) => change(name, -1),
    clear: () => setQuantities({}),
    // an emptied bag closes the drawer
    isOpen: isOpen && lines.length > 0,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }
}

export const OrderContext = createContext<ReturnType<typeof useOrderState> | null>(null)

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder must be used inside <OrderProvider>')
  return ctx
}
