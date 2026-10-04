import { useRef, type PointerEvent, type ReactNode } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHead } from '@/components/ui/SectionHead'
import { useReveal } from '@/hooks/useReveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type PostProps = { className: string; big?: boolean; children: ReactNode }

/** Feed tile with a subtle 3D tilt that follows the pointer. */
function Post({ className, big, children }: PostProps) {
  const reduce = useReducedMotion()
  const { ref, className: rv } = useReveal<HTMLElement>()
  const tiltRef = useRef<HTMLDivElement>(null)

  const onMove = (e: PointerEvent) => {
    const el = tiltRef.current
    if (reduce || !el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
  }
  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = ''
  }

  // reveal on the outer article, tilt on the inner box, so the two transforms don't fight
  return (
    <article ref={ref} className={cn(className, rv)}>
      <div
        ref={tiltRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={cn(
          'group relative flex size-full flex-col justify-end overflow-hidden border border-[inherit] bg-[inherit] p-[18px] text-[inherit] transition-[transform,border-color] duration-500 ease-out-soft hover:border-brass',
          '[&>svg]:absolute [&>svg]:inset-0 [&>svg]:size-full [&>svg]:transition-transform [&>svg]:duration-700 [&>svg]:ease-out-soft group-hover:[&>svg]:scale-108 group-hover:[&>svg]:-rotate-2',
          big && 'justify-between font-display text-[clamp(30px,4vw,56px)] leading-[0.9] font-black uppercase',
        )}
      >
        {children}
      </div>
    </article>
  )
}

function Caption({ title, sub, className }: { title: string; sub?: string; className?: string }) {
  return (
    <p className={cn('relative font-label text-sm/[1.2] font-bold tracking-[0.14em] uppercase', className)}>
      {title}
      {sub && <small className="block font-medium tracking-[0.1em] text-muted">{sub}</small>}
    </p>
  )
}

const cell = 'border border-line max-[760px]:col-auto max-[760px]:row-span-2'

export function Feed() {
  return (
    <section id="feed" className="sec relative">
      <div className="wrap">
        <SectionHead
          label="Feed"
          action={
            <ButtonLink href="#feed" variant="outline">
              @chapaquente
            </ButtonLink>
          }
        />
        <div className="grid auto-rows-[clamp(90px,11vw,150px)] grid-cols-6 gap-3 max-[760px]:auto-rows-[130px] max-[760px]:grid-cols-2">
          <Post className={cn(cell, 'col-[1/3] row-span-3 bg-[radial-gradient(circle_at_50%_40%,#4a2615,#160f0b)]')}>
            <svg viewBox="-80 -140 849 852" aria-hidden="true">
              <use href="#mini" />
            </svg>
            <Caption title="Chapa Clássico" sub="o mais pedido da semana" />
          </Post>

          <Post big className={cn(cell, 'col-[3/5] row-span-2 border-brass bg-brass text-bg max-[760px]:col-[1/-1] max-[760px]:row-span-1')}>
            <span>Terça do smash duplo</span>
            <Caption title="2 burgers + chopp · R$ 59" className="text-bg" />
          </Post>

          <Post className={cn(cell, 'col-[5/7] row-span-2 bg-[radial-gradient(circle_at_50%_50%,#2a2a14,#12100c)]')}>
            <svg viewBox="0 360 689 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <use href="#img-lettuce" />
              <use href="#img-tomato" />
            </svg>
            <Caption title="Horta do dia" sub="folhas de Ibiúna" />
          </Post>

          <Post className={cn(cell, 'col-[3/4] row-span-2 bg-[#1a0f0a]')}>
            <svg viewBox="200 210 300 190" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <use href="#img-patty" />
            </svg>
            <Caption title="Derrete" sub="cheddar inglês" />
          </Post>

          <Post big className={cn(cell, 'col-[4/6] row-span-2 bg-panel-2')}>
            <span>
              Happy hour
              <br />
              <span className="text-brass">17h às 20h</span>
            </span>
            <Caption title="Chopp Pilsen R$ 14" sub="de segunda a sexta" />
          </Post>

          <Post big className={cn(cell, 'col-[6/7] row-span-2 border-ember bg-ember text-bg')}>
            <span>Novo: Brasa BBQ</span>
            <Caption title="disponível até dezembro" className="text-bg" />
          </Post>
        </div>
      </div>
    </section>
  )
}
