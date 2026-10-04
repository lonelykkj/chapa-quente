import bunBottom from '@/assets/burger/bun-bottom.webp'
import bunTop from '@/assets/burger/bun-top.webp'
import lettuce from '@/assets/burger/lettuce.webp'
import patty from '@/assets/burger/patty.webp'
import tomato from '@/assets/burger/tomato.webp'

/**
 * Layers cut from a single transparent burger photo (Pixabay, free licence).
 * Each one sits where it is in the original 689×572 photo, so stacking them rebuilds the burger.
 */
const LAYERS = [
  { id: 'img-bun-bottom', href: bunBottom, x: 24, y: 461, width: 638, height: 111 },
  { id: 'img-lettuce', href: lettuce, x: 0, y: 366, width: 689, height: 133 },
  { id: 'img-tomato', href: tomato, x: 52, y: 348, width: 607, height: 98 },
  { id: 'img-patty', href: patty, x: 56, y: 196, width: 571, height: 202 },
  { id: 'img-bun-top', href: bunTop, x: 54, y: 0, width: 575, height: 219 },
]

/** Renders once at the app root; anything can then `<use href="#mini" />` or `#img-*`. */
export function BurgerDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        {LAYERS.map((img) => (
          <image key={img.id} {...img} />
        ))}
        <g id="mini">
          {LAYERS.map(({ id }) => (
            <use key={id} href={`#${id}`} />
          ))}
        </g>
      </defs>
    </svg>
  )
}
