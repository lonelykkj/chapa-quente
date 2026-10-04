import { BUILD_STEPS } from '@/data/site'
import { cn } from '@/lib/utils'

type Props = { built: number }

/** Checklist of layers; on mobile it collapses into a segmented progress bar. */
export function BuildSteps({ built }: Props) {
  return (
    <div className="relative z-2 w-[min(260px,100%)] justify-self-end max-[980px]:w-full max-[980px]:justify-self-stretch">
      <div className="mb-[18px] flex items-baseline gap-2 max-[980px]:hidden">
        <b className="font-display text-[64px] leading-none font-black text-brass tabular-nums">{built}</b>
        <span className="font-label text-sm/none font-semibold tracking-[0.2em] text-muted">
          / {BUILD_STEPS.length} camadas
        </span>
      </div>

      <ol className="m-0 flex list-none flex-col-reverse p-0 max-[980px]:flex-row-reverse max-[980px]:justify-between max-[980px]:gap-1.5">
        {BUILD_STEPS.map((step, i) => {
          const on = i < built
          return (
            <li
              key={step}
              className={cn(
                'flex items-center gap-3 border-t border-line py-2.5 font-label text-base/[1.2] font-semibold tracking-[0.06em] uppercase transition-colors duration-300 first:border-b',
                'before:size-2.5 before:rotate-45 before:border-[1.5px] before:border-current before:transition-[background-color,transform] before:duration-400',
                on ? 'text-fg before:rotate-[225deg] before:border-brass before:bg-brass' : 'text-muted',
                // mobile: thin progress segments
                'max-[980px]:h-1 max-[980px]:flex-1 max-[980px]:border-0! max-[980px]:p-0 max-[980px]:text-[0px] max-[980px]:before:hidden',
                on ? 'max-[980px]:bg-brass' : 'max-[980px]:bg-line',
              )}
            >
              {step}
              <em className="ml-auto text-xs not-italic tracking-[0.14em] opacity-60 max-[980px]:hidden">
                {String(i + 1).padStart(2, '0')}
              </em>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
