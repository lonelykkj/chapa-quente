export const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#pedido', label: 'Como pedir' },
  { href: '#visite', label: 'Visite' },
]

export const BUILD_STEPS = [
  'Brioche base',
  'Alface e molho da casa',
  'Tomate e cebola roxa',
  'Blend 180g e cheddar',
  'Brioche com gergelim',
]

export const MARQUEE_WORDS = [
  'Smash burger',
  'Batata rústica',
  'Chopp gelado',
  'Molho da casa',
  'Brioche artesanal',
]

export const FACTS = [
  { value: 180, label: 'gramas de blend' },
  { value: 90, label: 'segundos por lado' },
  { value: 12, label: 'torneiras de chopp' },
]

/** `days` uses Date#getDay(): 0 = domingo … 6 = sábado. */
export const HOURS = [
  { days: [1, 2, 3], label: 'Seg a qua', time: '18h – 23h' },
  { days: [4], label: 'Quinta', time: '18h – 00h' },
  { days: [5, 6], label: 'Sex e sáb', time: '12h – 02h' },
  { days: [0], label: 'Domingo', time: '12h – 22h' },
]

export const ADDRESS = {
  street: 'Rua Augusta, 1450',
  area: 'Consolação · São Paulo',
  phone: '(11) 3000-0000',
}

/**
 * WhatsApp da loja — TROCAR pelo número real.
 * `number`: só dígitos, com DDI 55 + DDD (formato exigido pelo wa.me).
 */
export const WHATSAPP = {
  number: '5511900000000',
  display: '(11) 90000-0000',
}
