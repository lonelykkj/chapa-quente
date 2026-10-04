import { Badge } from '@/components/ui/Badge'
import { ADDRESS } from '@/data/site'

export function Footer() {
  return (
    <footer className="wrap flex flex-col items-center gap-[18px] pt-[70px] pb-28 text-center text-[13px] text-muted">
      <Badge size="lg" />
      <span className="label">Chapa Quente Burger Bar</span>
      <p>{ADDRESS.street} · São Paulo · Conceito de design</p>
    </footer>
  )
}
