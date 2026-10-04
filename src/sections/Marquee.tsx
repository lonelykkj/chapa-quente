import { MARQUEE_WORDS } from '@/data/site'

export function Marquee() {
  // duplicated so the -50% loop is seamless
  const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS]

  return (
    <div
      aria-hidden="true"
      className="relative z-5 -mt-2.5 -rotate-[1.5deg] scale-[1.03] overflow-hidden border-y border-line bg-brass py-4 text-bg"
    >
      <div className="flex w-max animate-marquee gap-10 font-display text-[34px] leading-none font-black whitespace-nowrap uppercase">
        {words.map((word, i) => (
          <span key={i} className="flex items-center gap-10 after:size-3 after:rotate-45 after:bg-bg">
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}
