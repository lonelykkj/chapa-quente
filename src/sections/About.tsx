import { useEffect, useState } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { FACTS } from '@/data/site'
import { useReveal } from '@/hooks/useReveal'
import { clamp, cn, easeInOutCubic } from '@/lib/utils'

const tile = 'absolute overflow-hidden border border-line bg-panel-2 [&_svg]:block [&_svg]:size-full'

function Fact({ value, label, active }: { value: number; label: string; active: boolean }) {
  const [n, setN] = useState(value)

  // count up from 0 once the block is on screen
  useEffect(() => {
    if (!active) return
    const t0 = performance.now()
    let raf = 0
    const step = (now: number) => {
      const k = clamp((now - t0) / 1200)
      setN(Math.round(value * easeInOutCubic(k)))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, active])

  return (
    <div className="pt-[18px] pr-3">
      <b className="block font-display text-[44px] leading-none font-black text-fg tabular-nums">{n}</b>
      <span className="font-label text-xs/[1.3] font-semibold tracking-[0.16em] text-muted uppercase">{label}</span>
    </div>
  )
}

export function About() {
  const { ref: copyRef, className: copyRv, visible: copyVisible } = useReveal<HTMLDivElement>()

  return (
    <section id="sobre" className="sec relative">
      <div className="wrap grid grid-cols-[1.05fr_1fr] items-center gap-[clamp(32px,6vw,90px)] max-[860px]:grid-cols-1">
        <Reveal className="relative isolate aspect-square max-w-full">
          <div className="absolute top-0 left-0 -z-10 h-[24%] w-[22%] bg-brass" />
          <div className={cn(tile, 'top-[6%] left-[8%] h-[62%] w-[56%] bg-[radial-gradient(circle_at_50%_70%,#3a1f12,var(--color-panel)_70%)]')}>
            <svg viewBox="-30 -40 749 652" role="img" aria-label="Chapa Clássico">
              <use href="#mini" />
            </svg>
          </div>
          <div className={cn(tile, 'top-[22%] right-0 h-[44%] w-[40%]')}>
            <svg viewBox="150 200 360 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Blend com cheddar derretido">
              <use href="#img-patty" />
            </svg>
          </div>
          <div className={cn(tile, 'bottom-0 left-[24%] h-[30%] w-[48%] bg-[#2a160d]')}>
            <svg viewBox="60 20 560 190" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Brioche com gergelim">
              <use href="#img-bun-top" />
            </svg>
          </div>
        </Reveal>

        <div ref={copyRef} className={cn('flex max-w-[520px] flex-col gap-[22px]', copyRv)}>
          <span className="label">Sobre a casa</span>
          <h2 className="text-[clamp(44px,6vw,80px)]">
            Fast food <em className="text-brass not-italic">sem pressa</em> no preparo
          </h2>
          <p className="text-muted">
            A Chapa Quente nasceu numa chapa de ferro de 90 cm e numa ideia simples: blend moído todo dia, brioche
            assado na casa e tempo certo na chapa para formar a crosta.
          </p>
          <p className="text-muted">
            Hoje somos um balcão de bairro na Consolação, com chopp de cervejaria local e música alta o suficiente
            para a conversa continuar.
          </p>
          <div className="mt-2 grid grid-cols-3 border-t border-line">
            {FACTS.map((fact) => (
              <Fact key={fact.label} {...fact} active={copyVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
