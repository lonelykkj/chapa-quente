export function Price({ value }: { value: number }) {
  return (
    <span className="font-display text-[30px] leading-none font-black text-brass">
      <sup className="align-[0.7em] text-[0.5em]">R$</sup>
      {value}
    </span>
  )
}
