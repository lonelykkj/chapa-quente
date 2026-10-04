import type { MenuIcon as Icon } from '@/data/menu'

const stroke = { fill: 'none', stroke: 'var(--color-brass)', strokeWidth: 2, strokeLinejoin: 'round' } as const

export function MenuIcon({ icon }: { icon: Icon }) {
  switch (icon) {
    case 'burger':
      return (
        <svg viewBox="-20 -40 729 652" aria-hidden="true">
          <use href="#mini" />
        </svg>
      )
    case 'fries':
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true" {...stroke}>
          <path d="M10 18h20l-3 17H13z" />
          <path d="M14 18l-2-11M19 18V5M24 18l2-12M29 18l3-8" />
        </svg>
      )
    case 'drink':
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true" {...stroke}>
          <path d="M10 10h17v25H10z" />
          <path d="M27 15h4a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-4" />
          <path d="M10 16h17" />
        </svg>
      )
    case 'sweet':
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true" {...stroke}>
          <path d="M12 19l8 17 8-17" />
          <path d="M11 19a9 9 0 0 1 18 0z" />
          <circle cx="20" cy="7" r="2.5" />
        </svg>
      )
  }
}
