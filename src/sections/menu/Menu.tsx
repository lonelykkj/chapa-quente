import { useRef, useState, type KeyboardEvent } from 'react'
import { AddToOrder } from '@/components/order/OrderControls'
import { Price } from '@/components/ui/Price'
import { SectionHead } from '@/components/ui/SectionHead'
import { MENU } from '@/data/menu'
import { cn } from '@/lib/utils'
import { MenuIcon } from './MenuIcon'

const ARROW_DELTA: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }

export function Menu() {
  const [active, setActive] = useState(MENU[0].id)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const category = MENU.find((c) => c.id === active) ?? MENU[0]

  // arrow keys move between tabs (WAI-ARIA tabs pattern)
  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const delta = ARROW_DELTA[e.key]
    if (!delta) return
    e.preventDefault()
    const next = (index + delta + MENU.length) % MENU.length
    setActive(MENU[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section
      id="cardapio"
      className="sec relative bg-[linear-gradient(var(--color-bg),var(--color-panel)_30%,var(--color-bg))]"
    >
      <div className="wrap">
        <SectionHead label="Cardápio" />
        <p className="-mt-6 mb-12 max-w-[52ch] text-muted">
          Adicione os itens à sacola e envie o pedido pelo WhatsApp — delivery ou retirada no balcão.
        </p>
        <div className="grid grid-cols-[220px_1fr] gap-[clamp(24px,5vw,72px)] max-[760px]:grid-cols-1">
          <div
            role="tablist"
            aria-label="Categorias"
            className="sticky top-[110px] flex flex-col gap-1 self-start max-[760px]:static max-[760px]:flex-row max-[760px]:gap-5 max-[760px]:overflow-x-auto"
          >
            {MENU.map((c, i) => {
              const selected = c.id === active
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(c.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between border-b border-line py-3.5 font-label text-lg/none font-bold tracking-[0.14em] uppercase transition-[color,padding] duration-300',
                    "after:text-brass after:transition-all after:duration-300 after:content-['→']",
                    'max-[760px]:border-0 max-[760px]:whitespace-nowrap',
                    selected
                      ? 'pl-3 text-brass after:translate-x-0 after:opacity-100 max-[760px]:pl-0'
                      : 'text-muted after:-translate-x-2.5 after:opacity-0 hover:text-fg',
                  )}
                >
                  {c.label}
                </button>
              )
            })}
          </div>

          <div
            id="menu-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            aria-live="polite"
            className="flex flex-col"
          >
            {category.items.map((item, i) => (
              <div
                key={`${active}-${item.name}`}
                style={{ animationDelay: `${i * 55}ms` }}
                className={cn(
                  'group relative grid animate-item-in grid-cols-[56px_1fr_auto] items-start gap-[18px] border-b border-line py-[22px]',
                  'before:absolute before:-bottom-px before:left-0 before:h-px before:w-0 before:bg-brass before:transition-[width] before:duration-500 hover:before:w-full',
                  'max-[760px]:grid-cols-[44px_1fr_auto] max-[760px]:gap-3',
                )}
              >
                <span className="grid size-14 place-items-center border border-line transition-[rotate,scale,border-color] duration-400 ease-spring group-hover:scale-108 group-hover:-rotate-8 group-hover:border-brass max-[760px]:size-11 [&_svg]:size-[46px] max-[760px]:[&_svg]:size-8">
                  <MenuIcon icon={item.icon} />
                </span>
                <div className="min-w-0">
                  <h3 className="flex flex-wrap items-center gap-2.5 text-[clamp(24px,2.6vw,30px)]">
                    {item.name}
                    {item.tag && (
                      <span className="border border-ember px-2 py-[5px] font-label text-[11px]/none font-bold tracking-[0.16em] text-ember">
                        {item.tag}
                      </span>
                    )}
                  </h3>
                  <p className="mt-1.5 text-[15px] text-muted">{item.description}</p>
                </div>
                <div className="flex flex-col items-end gap-3 pt-0.5">
                  <Price value={item.price} />
                  <AddToOrder name={item.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
