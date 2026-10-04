import type { ReactNode } from 'react'

type Props = { label: string; action?: ReactNode }

/** Brass rule + label + hairline, used at the top of each section. */
export function SectionHead({ label, action }: Props) {
  return (
    <div className="mb-12 flex items-center gap-5 before:h-0.5 before:w-[60px] before:bg-brass">
      <span className="label">{label}</span>
      <span className="h-px flex-1 bg-line" />
      {action}
    </div>
  )
}
