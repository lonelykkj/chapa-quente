import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Price } from '@/components/ui/Price'
import { useOrder } from '@/order/order'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { clamp, cn, easeBack, easeInOutCubic } from '@/lib/utils'
import { BuildSteps } from './BuildSteps'
import { Embers } from './Embers'

/* Bottom bun → top bun: where each layer floats before landing, and its rotation pivot. */
const LAYERS = [
  { id: 'img-bun-bottom', x: 0, y: -40, rotate: 0, pivot: '343 516' },
  { id: 'img-lettuce', x: -46, y: -110, rotate: -6, pivot: '344 432' },
  { id: 'img-tomato', x: 40, y: -185, rotate: 7, pivot: '355 397' },
  { id: 'img-patty', x: -34, y: -265, rotate: -5, pivot: '341 297' },
  { id: 'img-bun-top', x: 26, y: -360, rotate: 4, pivot: '341 109' },
]

/* Scroll timeline (fractions of hero scroll). */
const layerStart = (i: number) => 0.04 + i * 0.15
const LAYER_DUR = 0.14
const ZOOM_START = 0.8
const ZOOM_DUR = 0.14
const READY_AT = 0.9

export function Hero() {
  const reduce = useReducedMotion()
  const order = useOrder()
  const heroRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const shadowRef = useRef<SVGEllipseElement>(null)
  const layerRefs = useRef<Array<SVGGElement | null>>([])
  const barRef = useRef<HTMLDivElement>(null)
  const progress = useRef(0)

  const [built, setBuilt] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const hero = heroRef.current
    const svg = svgRef.current
    const shadow = shadowRef.current
    const bar = barRef.current
    if (!hero || !svg || !shadow || !bar) return

    let target = 0
    let landed = 0
    let visible = true

    const readTarget = () => {
      const r = hero.getBoundingClientRect()
      target = clamp(-r.top / (r.height - window.innerHeight))
    }
    readTarget()
    progress.current = target

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(hero)
    window.addEventListener('scroll', readTarget, { passive: true })
    window.addEventListener('resize', readTarget)

    let raf = 0
    const render = (time: number) => {
      raf = requestAnimationFrame(render)
      if (!visible) return

      progress.current += (target - progress.current) * (reduce ? 1 : 0.14)
      const p = progress.current
      let n = 0

      layerRefs.current.forEach((g, i) => {
        if (!g) return
        const t = clamp((p - layerStart(i)) / LAYER_DUR)
        const e = easeBack(t)
        if (t >= 1) n++
        const { x, y, rotate, pivot } = LAYERS[i]
        const bob = t < 1 && !reduce ? Math.sin(time / 700 + i * 1.3) * 9 * (1 - t) : 0
        const k = 1 - e
        g.setAttribute(
          'transform',
          `translate(${(x * k).toFixed(2)} ${(y * k + bob).toFixed(2)}) rotate(${(rotate * k).toFixed(2)} ${pivot})`,
        )
        g.style.opacity = t > 0 ? '1' : '0.92'
      })

      // zoom into the finished burger
      const z = easeInOutCubic(clamp((p - ZOOM_START) / ZOOM_DUR))
      const s = 1 + 0.26 * z
      const bt = `translateY(${(-(17.3 * s + 5) * z).toFixed(2)}%) scale(${s.toFixed(3)})`
      svg.style.setProperty('--bt', bt)
      svg.style.transform = bt

      shadow.setAttribute('rx', String(200 + n * 26))
      shadow.setAttribute('opacity', String(0.5 + n * 0.1))

      if (n > landed && !reduce) {
        // restart the squash animation each time a layer lands
        svg.classList.remove('animate-thud')
        void svg.getBBox()
        svg.classList.add('animate-thud')
      }
      if (n !== landed) setBuilt(n)
      landed = n

      setReady(p > READY_AT)
      bar.style.width = `${(p * 100).toFixed(1)}%`
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('scroll', readTarget)
      window.removeEventListener('resize', readTarget)
    }
  }, [reduce])

  return (
    <section ref={heroRef} aria-label="Monte seu burger" className="relative h-[430vh]">
      <div
        className={cn(
          'sticky top-0 grid h-svh items-center gap-6 overflow-hidden px-[clamp(16px,4vw,48px)] pt-[90px] pb-10',
          'grid-cols-[minmax(0,1fr)_minmax(0,520px)_minmax(0,1fr)]',
          'max-[980px]:grid-cols-1 max-[980px]:grid-rows-[auto_minmax(0,1fr)_auto] max-[980px]:gap-2 max-[980px]:pt-[84px]',
        )}
      >
        {!reduce && <Embers progress={progress} />}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[58%] left-1/2 size-[70vmin] -translate-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-ember)_32%,transparent),transparent_65%)] blur-[20px]"
        />

        {/* Headline */}
        <div className="relative z-2 flex flex-col gap-[22px] self-center max-[980px]:gap-2.5">
          <span className="label">Smash na chapa desde 2016</span>
          <h1 className="text-[clamp(48px,6vw,100px)] max-[980px]:text-[clamp(40px,11vw,72px)]">
            <span className="text-outline block max-[980px]:inline">Smash.</span>{' '}
            <span className="block text-brass max-[980px]:inline">Empilha.</span> Devora.
          </h1>
          <p className="max-w-[32ch] text-muted max-[980px]:hidden">
            Role a página e veja o Chapa Clássico ser montado, camada por camada, do jeito que sai da nossa cozinha.
          </p>
          <div className="flex items-center gap-3 font-label text-xs/none font-semibold tracking-[0.24em] text-muted uppercase max-[980px]:hidden">
            <i className="relative h-9 w-[22px] rounded-xl border-[1.5px] border-muted after:absolute after:top-[7px] after:left-1/2 after:-ml-[1.5px] after:h-[7px] after:w-[3px] after:animate-cue after:rounded-xs after:bg-brass" />
            Role para montar
          </div>
        </div>

        {/* Burger */}
        <div className="relative z-1 grid h-[calc(100svh-150px)] max-h-[820px] min-h-0 place-items-center max-[980px]:h-auto max-[980px]:self-stretch">
          <svg
            ref={svgRef}
            onAnimationEnd={(e) => e.currentTarget.classList.remove('animate-thud')}
            viewBox="0 -400 689 1030"
            role="img"
            aria-label="Hambúrguer sendo montado camada por camada"
            className="aspect-[689/1030] h-[calc(100svh-150px)] max-h-[820px] w-auto max-w-full overflow-visible drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)] will-change-transform max-[980px]:h-full max-[980px]:max-h-[calc(100svh-260px)]"
          >
            <defs>
              <radialGradient id="shd">
                <stop offset="0" stopColor="#000" stopOpacity=".75" />
                <stop offset="1" stopColor="#000" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse ref={shadowRef} cx="344" cy="572" rx="330" ry="30" fill="url(#shd)" />
            {LAYERS.map((layer, i) => (
              <g
                key={layer.id}
                ref={(el) => {
                  layerRefs.current[i] = el
                }}
                className="will-change-transform"
              >
                <use href={`#${layer.id}`} />
              </g>
            ))}
          </svg>
        </div>

        <BuildSteps built={built} />

        {/* "Ready" card */}
        <div
          className={cn(
            'absolute bottom-[5%] left-1/2 z-3 flex -translate-x-1/2 items-center gap-[18px] border border-brass bg-panel py-3.5 pr-4 pl-6 whitespace-nowrap transition-[opacity,translate,scale] duration-500 ease-pop max-[980px]:bottom-16',
            ready ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-[30px] scale-90 opacity-0',
          )}
        >
          <div>
            <small className="block font-label text-xs/[1.3] font-semibold tracking-[0.18em] text-muted uppercase">
              Pronto pra você
            </small>
            <h3 className="text-[28px] text-nowrap">Chapa Clássico</h3>
          </div>
          <Price value={38} />
          <Button
            variant="fill"
            tabIndex={ready ? 0 : -1}
            onClick={() => {
              if (order.quantityOf('Chapa Clássico') === 0) order.add('Chapa Clássico')
              order.open()
            }}
          >
            Pedir
          </Button>
        </div>

        <div ref={barRef} className="absolute bottom-0 left-0 z-4 h-[3px] w-0 bg-brass" />
      </div>
    </section>
  )
}
