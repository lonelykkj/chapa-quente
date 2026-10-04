import { useState, type ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { ADDRESS, HOURS, WHATSAPP } from '@/data/site'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils'
import { CHAT_URL } from '@/lib/whatsapp'

const iconClass = 'mt-[3px] size-5 flex-none text-brass'

function LineIcon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass} aria-hidden="true">
      {children}
    </svg>
  )
}

const CONTACTS = [
  {
    icon: (
      <LineIcon>
        <path d="M12 22s7-7.2 7-13a7 7 0 1 0-14 0c0 5.8 7 13 7 13z" />
        <circle cx="12" cy="9" r="2.5" />
      </LineIcon>
    ),
    title: ADDRESS.street,
    text: ADDRESS.area,
  },
  {
    icon: <WhatsAppIcon className={iconClass} />,
    title: WHATSAPP.display,
    text: 'pedidos pelo WhatsApp',
    href: CHAT_URL,
  },
  {
    icon: (
      <LineIcon>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
      </LineIcon>
    ),
    title: ADDRESS.phone,
    text: 'reservas',
  },
]

/** Current time in São Paulo, wherever the visitor is. */
const nowInSaoPaulo = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }))

function isOpen(now: Date) {
  const day = now.getDay()
  const yesterday = (day + 6) % 7
  const h = now.getHours() + now.getMinutes() / 60
  return HOURS.some(
    (row) =>
      (row.days.includes(day) && h >= row.open && h < row.close) ||
      (row.days.includes(yesterday) && h < row.close - 24),
  )
}

/** Stylised street map; the route draws itself when scrolled into view. */
function MapArt() {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="relative min-h-[420px] overflow-hidden bg-[#14110e] max-[860px]:min-h-[320px]">
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 size-full">
        <g stroke="#2a241e" strokeWidth="10" fill="none">
          <path d="M-20 80L820 140M-20 260L820 300M-20 420L820 440M120 -20L80 520M300 -20L320 520M640 -20L600 520" />
        </g>
        <g stroke="#221d18" strokeWidth="4" fill="none">
          <path d="M-20 170L820 220M-20 350L820 370M200 -20L200 520M440 -20L470 520M740 -20L720 520" />
        </g>
        <path d="M0 500L380 -20" stroke="#3b3128" strokeWidth="22" />
        <rect x="500" y="320" width="90" height="70" fill="#1d2a17" />
        <path
          d="M90 470L110 300L320 300L330 222L470 222L496 220"
          stroke="var(--color-brass)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1400"
          strokeDashoffset={visible ? 0 : 1400}
          className="transition-[stroke-dashoffset] duration-[2.4s] ease-snap"
        />
        <text x="660" y="290" fill="#5d5144" fontFamily="Barlow Condensed, sans-serif" fontSize="16" letterSpacing="3">
          R. AUGUSTA
        </text>
        <text x="20" y="410" fill="#5d5144" fontFamily="Barlow Condensed, sans-serif" fontSize="16" letterSpacing="3" transform="rotate(4 20 410)">
          R. DA CONSOLAÇÃO
        </text>
      </svg>

      <div className="absolute top-[44%] left-[62%] -translate-x-1/2 -translate-y-full">
        <div className="relative bg-fg px-3.5 py-2.5 font-label text-[13px]/[1.2] font-bold tracking-[0.12em] whitespace-nowrap text-bg uppercase after:absolute after:-bottom-2 after:left-1/2 after:-ml-2 after:border-8 after:border-b-0 after:border-transparent after:border-t-fg">
          Chapa Quente
        </div>
        <div className="relative mx-auto mt-3 size-4 rounded-full bg-ember after:absolute after:-inset-2.5 after:animate-ping-ring after:rounded-full after:border-2 after:border-ember" />
      </div>
    </div>
  )
}

export function Visit() {
  const [now] = useState(nowInSaoPaulo)
  const today = now.getDay()
  const open = isOpen(now)

  return (
    <section id="visite" className="sec relative pt-0!">
      <div className="wrap">
        <Reveal className="grid grid-cols-[380px_1fr] border border-line max-[860px]:grid-cols-1">
          <div className="flex flex-col gap-[22px] bg-panel p-[clamp(24px,4vw,44px)]">
            <span className="label">Visite</span>
            <h2 className="text-5xl">Balcão aberto</h2>
            <span
              className={cn(
                'flex items-center gap-2 font-label text-sm/none font-bold tracking-[0.16em] uppercase',
                open ? 'text-whatsapp' : 'text-muted',
              )}
            >
              <i className="size-2 rounded-full bg-current" />
              {open ? 'Aberto agora' : 'Fechado agora'}
            </span>

            {CONTACTS.map(({ icon, title, text, href }) => {
              const Row = href ? 'a' : 'div'
              const link = href && { href, target: '_blank', rel: 'noopener noreferrer' }
              return (
                <Row key={title} {...link} className="group flex items-start gap-3.5 text-muted no-underline">
                  {icon}
                  <div>
                    <b className={cn('block font-semibold text-fg', href && 'group-hover:text-brass')}>{title}</b>
                    {text}
                  </div>
                </Row>
              )
            })}

            <table className="w-full border-collapse text-[15px] tabular-nums">
              <tbody>
                {HOURS.map((row) => {
                  const isToday = row.days.includes(today)
                  return (
                    <tr key={row.label} className={cn(isToday && 'text-brass')} aria-current={isToday ? 'date' : undefined}>
                      <td className="border-b border-dashed border-line py-1.5">{row.label}</td>
                      <td className={cn('border-b border-dashed border-line py-1.5 text-right', !isToday && 'text-fg')}>
                        {row.time}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <MapArt />
        </Reveal>
      </div>
    </section>
  )
}
