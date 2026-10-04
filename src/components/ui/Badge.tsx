import { cn } from '@/lib/utils'

type Props = { size?: 'sm' | 'lg' }

/** The round "CQ" stamp used in the nav and footer. */
export function Badge({ size = 'sm' }: Props) {
  return (
    <span
      className={cn(
        'relative grid place-items-center rounded-full border-brass font-display leading-none font-black text-brass',
        'after:absolute after:inset-1 after:rounded-full after:border after:border-dashed after:border-brass/50',
        size === 'sm' ? 'size-[46px] border-2 text-[15px]' : 'size-[92px] border-3 text-[28px]',
      )}
    >
      CQ
    </span>
  )
}
