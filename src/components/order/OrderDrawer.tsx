import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { cn, formatBRL } from '@/lib/utils'
import { buildOrderMessage, whatsappUrl, type OrderDetails } from '@/lib/whatsapp'
import { useOrder } from '@/order/order'
import { QuantityStepper } from './OrderControls'

const caption = 'font-label text-xs/none font-semibold tracking-[0.18em] text-muted uppercase'
const field =
  'w-full border-[1.5px] border-line bg-transparent px-3.5 py-3 font-body text-[15px] text-fg placeholder:text-muted/60 focus:border-brass focus:outline-none'

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className={caption}>{label}</span>
      {children}
      {error && <span className="text-sm text-ember">{error}</span>}
    </label>
  )
}

/** Radio group styled as toggle chips. `options` maps value → label. */
function Choice<T extends string>({ legend, options, value, onChange }: {
  legend: string
  options: Record<T, string>
  value: T
  onChange: (v: T) => void
}) {
  return (
    <fieldset className="flex flex-wrap gap-2">
      <legend className={cn(caption, 'mb-2')}>{legend}</legend>
      {(Object.entries(options) as Array<[T, string]>).map(([id, label]) => (
        <label
          key={id}
          className={cn(
            'cursor-pointer border-[1.5px] px-3.5 py-2.5 font-label text-sm/none font-semibold tracking-[0.12em] uppercase transition-colors has-focus-visible:outline-2 has-focus-visible:outline-brass-hi',
            value === id ? 'border-brass bg-brass text-bg' : 'border-line text-muted hover:text-fg',
          )}
        >
          <input type="radio" checked={value === id} onChange={() => onChange(id)} className="sr-only" />
          {label}
        </label>
      ))}
    </fieldset>
  )
}

/** Side drawer to review the bag and send the order to WhatsApp. */
export function OrderDrawer() {
  const { lines, total, isOpen, close, clear } = useOrder()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [details, setDetails] = useState<OrderDetails>({
    name: '',
    fulfillment: 'retirada',
    address: '',
    payment: 'Pix',
    notes: '',
  })
  const delivery = details.fulfillment === 'entrega'

  // errors only show after the first send attempt, and clear as fields get filled
  const errors = {
    name: submitted && !details.name.trim() ? 'Informe seu nome.' : undefined,
    address: submitted && delivery && !details.address.trim() ? 'Informe o endereço de entrega.' : undefined,
  }

  // keep the native <dialog> in sync with context state
  useEffect(() => {
    const dlg = dialogRef.current
    if (isOpen && !dlg?.open) dlg?.showModal()
    if (!isOpen && dlg?.open) dlg.close()
  }, [isOpen])

  const set = <K extends keyof OrderDetails>(key: K) => (value: OrderDetails[K]) =>
    setDetails((d) => ({ ...d, [key]: value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (!details.name.trim() || (delivery && !details.address.trim())) return
    window.open(whatsappUrl(buildOrderMessage(lines, details)), '_blank', 'noopener,noreferrer')
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={close}
      onClick={(e) => e.target === e.currentTarget && close()}
      aria-labelledby="order-title"
      className="m-0 ml-auto h-dvh max-h-none w-[min(460px,100vw)] max-w-none bg-bg p-0 text-fg backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <form onSubmit={onSubmit} noValidate className="flex h-full flex-col border-l border-line">
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <span className="label">Seu pedido</span>
            <h2 id="order-title" className="mt-1.5 text-4xl">
              Sacola
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Fechar pedido"
            className="grid size-10 cursor-pointer place-items-center border border-line text-2xl leading-none text-muted transition-colors hover:border-brass hover:text-fg"
          >
            ×
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <ul>
            {lines.map((line) => (
              <li key={line.name} className="flex items-center gap-4 border-b border-line py-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-2xl">{line.name}</h3>
                  <p className="text-sm text-muted">{formatBRL(line.price)} cada</p>
                </div>
                <QuantityStepper name={line.name} />
                <span className="w-20 text-right font-display text-xl font-black text-brass tabular-nums">
                  {formatBRL(line.price * line.qty)}
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={clear}
            className="mt-3 cursor-pointer font-label text-xs font-semibold tracking-[0.16em] text-muted uppercase underline-offset-4 hover:text-ember hover:underline"
          >
            Esvaziar sacola
          </button>

          <div className="mt-8 flex flex-col gap-5">
            <Field label="Seu nome" error={errors.name}>
              <input
                className={field}
                value={details.name}
                onChange={(e) => set('name')(e.target.value)}
                autoComplete="name"
                placeholder="Como devemos te chamar?"
                aria-invalid={!!errors.name}
              />
            </Field>

            <Choice
              legend="Como prefere receber?"
              options={{ retirada: 'Retirar no balcão', entrega: 'Entrega' }}
              value={details.fulfillment}
              onChange={set('fulfillment')}
            />

            {delivery && (
              <Field label="Endereço de entrega" error={errors.address}>
                <textarea
                  className={cn(field, 'min-h-20 resize-y')}
                  value={details.address}
                  onChange={(e) => set('address')(e.target.value)}
                  autoComplete="street-address"
                  placeholder="Rua, número, complemento e bairro"
                  aria-invalid={!!errors.address}
                />
              </Field>
            )}

            <Choice
              legend="Pagamento"
              options={{ Pix: 'Pix', Cartão: 'Cartão', Dinheiro: 'Dinheiro' }}
              value={details.payment}
              onChange={set('payment')}
            />

            <Field label="Observações (opcional)">
              <textarea
                className={cn(field, 'min-h-20 resize-y')}
                value={details.notes}
                onChange={(e) => set('notes')(e.target.value)}
                placeholder="Ex.: sem cebola, ponto da carne, troco para R$ 100…"
              />
            </Field>
          </div>
        </div>

        <footer className="border-t border-line bg-panel px-6 pt-5 pb-[max(20px,env(safe-area-inset-bottom))]">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="font-label text-sm font-semibold tracking-[0.18em] text-muted uppercase">Total</span>
            <b className="font-display text-4xl leading-none font-black text-brass">{formatBRL(total)}</b>
          </div>
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-3 bg-whatsapp px-5 py-4 font-label text-base/none font-bold tracking-[0.14em] text-[#06301a] uppercase transition-[filter] hover:brightness-110"
          >
            <WhatsAppIcon className="size-5" />
            Enviar pedido pelo WhatsApp
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            O WhatsApp abre com a mensagem pronta — é só tocar em enviar.
            {delivery && ' A taxa de entrega é confirmada pela loja.'}
          </p>
        </footer>
      </form>
    </dialog>
  )
}
