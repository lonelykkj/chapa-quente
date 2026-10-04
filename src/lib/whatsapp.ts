import { WHATSAPP } from '@/data/site'
import { formatBRL } from './utils'

export const whatsappUrl = (text: string) => `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(text)}`

/** Plain chat link, opened with a greeting. */
export const CHAT_URL = whatsappUrl('Olá, Chapa Quente! Gostaria de fazer um pedido.')

export type OrderDetails = {
  name: string
  fulfillment: 'retirada' | 'entrega'
  address: string
  payment: 'Pix' | 'Cartão' | 'Dinheiro'
  notes: string
}

/** Builds the WhatsApp message (uses *bold* markup). */
export function buildOrderMessage(lines: Array<{ name: string; price: number; qty: number }>, d: OrderDetails) {
  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0)
  return [
    '*Novo pedido — Chapa Quente*',
    '',
    ...lines.map((l) => `${l.qty}x ${l.name} — ${formatBRL(l.price * l.qty)}`),
    '',
    `*Total: ${formatBRL(total)}*`,
    '',
    `*Nome:* ${d.name.trim()}`,
    d.fulfillment === 'entrega' ? `*Entrega:* ${d.address.trim()}` : '*Retirada no balcão*',
    `*Pagamento:* ${d.payment}`,
    ...(d.notes.trim() ? [`*Obs.:* ${d.notes.trim()}`] : []),
  ].join('\n')
}
