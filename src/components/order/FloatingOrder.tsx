import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { useOrder } from '@/order/order'
import { formatBRL } from '@/lib/utils'
import { CHAT_URL } from '@/lib/whatsapp'

/**
 * Bottom-right shortcut: a plain WhatsApp button while the bag is empty,
 * an order summary bar once something has been added.
 */
export function FloatingOrder() {
  const { count, total, open } = useOrder()

  if (count === 0) {
    return (
      <a
        href={CHAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Chapa Quente no WhatsApp"
        className="fixed right-4 bottom-[max(16px,env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-spring hover:scale-110"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={open}
      className="fixed right-4 bottom-[max(16px,env(safe-area-inset-bottom))] z-40 flex cursor-pointer items-center gap-4 border border-brass bg-panel py-2.5 pr-2.5 pl-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-0.5 max-[520px]:left-4"
    >
      <span className="text-left">
        <small className="block font-label text-[11px]/[1.3] font-semibold tracking-[0.18em] text-muted uppercase">
          {count} {count === 1 ? 'item' : 'itens'} no pedido
        </small>
        <b className="font-display text-2xl leading-none font-black text-brass">{formatBRL(total)}</b>
      </span>
      <span className="ml-auto inline-flex items-center gap-2 bg-brass px-4 py-3 font-label text-sm/none font-bold tracking-[0.16em] text-bg uppercase">
        Ver pedido
      </span>
    </button>
  )
}
