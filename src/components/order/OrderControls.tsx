import { useOrder } from '@/order/order'

const stepBtn =
  'grid size-8 cursor-pointer place-items-center text-lg leading-none text-brass transition-colors hover:bg-brass hover:text-bg'

export function QuantityStepper({ name }: { name: string }) {
  const { quantityOf, add, remove } = useOrder()
  return (
    <div className="inline-flex items-center border border-brass">
      <button type="button" className={stepBtn} onClick={() => remove(name)} aria-label={`Remover um ${name}`}>
        −
      </button>
      <span className="min-w-7 text-center font-label text-base font-bold tabular-nums" aria-live="polite">
        {quantityOf(name)}
      </span>
      <button type="button" className={stepBtn} onClick={() => add(name)} aria-label={`Adicionar mais um ${name}`}>
        +
      </button>
    </div>
  )
}

/** "Adicionar" button that turns into a quantity stepper once the item is in the bag. */
export function AddToOrder({ name }: { name: string }) {
  const { quantityOf, add } = useOrder()
  if (quantityOf(name) > 0) return <QuantityStepper name={name} />

  return (
    <button
      type="button"
      onClick={() => add(name)}
      aria-label={`Adicionar ${name} ao pedido`}
      className="inline-flex h-[34px] cursor-pointer items-center gap-1.5 border border-brass px-3 font-label text-xs/none font-bold tracking-[0.16em] text-brass uppercase transition-colors hover:bg-brass hover:text-bg"
    >
      <span className="text-base leading-none">+</span> Adicionar
    </button>
  )
}
