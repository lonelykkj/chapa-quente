import type { ReactNode } from 'react'
import { OrderContext, useOrderState } from './order'

export function OrderProvider({ children }: { children: ReactNode }) {
  return <OrderContext value={useOrderState()}>{children}</OrderContext>
}
