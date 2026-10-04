import type { HTMLAttributes } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils'

/** Wrapper that slides its content up when it scrolls into view. */
export function Reveal({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { ref, className: rv } = useReveal<HTMLDivElement>()
  return <div ref={ref} className={cn(className, rv)} {...props} />
}
