import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/data/site'
import { cn } from '@/lib/utils'

export function Header() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300',
        solid && 'border-b border-line bg-bg/88 backdrop-blur-sm',
      )}
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-5">
        <a href="#top" className="flex items-center gap-2.5 no-underline">
          <Badge />
          <span>
            <b className="font-display text-[22px] leading-[0.9] font-black tracking-[0.04em] uppercase">
              Chapa Quente
            </b>
            <small className="block font-label text-[10px]/[1.4] font-semibold tracking-[0.3em] text-muted">
              Burger Bar · SP
            </small>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden gap-7 min-[821px]:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1.5 font-label text-sm/none font-semibold tracking-[0.16em] text-muted uppercase no-underline after:absolute after:right-full after:bottom-0 after:left-0 after:h-0.5 after:bg-brass after:transition-[right] after:duration-300 hover:text-fg hover:after:right-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <ButtonLink variant="fill" href="#cardapio">
          Peça agora
        </ButtonLink>
      </div>
    </header>
  )
}
