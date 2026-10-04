import { useEffect, useRef, type RefObject } from 'react'
import { clamp } from '@/lib/utils'

type Particle = { x: number; y: number; r: number; vx: number; vy: number; life: number; ph: number }

type Props = {
  /** 0–1 build progress; embers rise faster as the burger gets built. */
  progress: RefObject<number>
}

const COUNT = 60

/** Floating ember particles drawn on a canvas behind the burger. */
export function Embers({ progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvasRef.current
    const ctx = cv?.getContext('2d')
    if (!cv || !ctx) return

    let W = 0
    let H = 0
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      W = cv.clientWidth
      H = cv.clientHeight
      cv.width = W * dpr
      cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = (anywhere: boolean): Particle => ({
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : H + 10,
      r: Math.random() * 2.2 + 0.6,
      vy: -(Math.random() * 0.6 + 0.25),
      vx: (Math.random() - 0.5) * 0.3,
      life: Math.random() * 0.5 + 0.5,
      ph: Math.random() * 6,
    })
    const parts = Array.from({ length: COUNT }, () => spawn(true))

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(cv)

    let raf = 0
    const draw = (time: number) => {
      raf = requestAnimationFrame(draw)
      if (!visible) return
      ctx.clearRect(0, 0, W, H)
      const boost = 1 + progress.current * 2.2
      ctx.shadowBlur = 8
      ctx.shadowColor = 'rgba(226,85,43,.8)'
      for (const p of parts) {
        p.y += p.vy * boost
        p.x += p.vx + Math.sin(time / 900 + p.ph) * 0.25
        if (p.y < -10) Object.assign(p, spawn(false))
        const alpha = clamp(p.y / H) * p.life
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${226 + Math.round(p.r * 10)},${90 + Math.round(p.r * 30)},40,${alpha})`
        ctx.fill()
      }
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [progress])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full"
    />
  )
}
