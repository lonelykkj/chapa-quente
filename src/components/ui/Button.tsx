import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'outline' | 'fill'

const base =
  'relative isolate inline-flex cursor-pointer items-center gap-2.5 overflow-hidden border-[1.5px] border-brass px-[22px] py-3.5 font-label text-sm/none font-bold tracking-[0.16em] uppercase no-underline transition-colors duration-300 ' +
  'before:absolute before:inset-0 before:-z-10 before:translate-y-[101%] before:transition-transform before:duration-350 before:ease-snap hover:text-bg hover:before:translate-y-0'

const variants: Record<Variant, string> = {
  outline: 'bg-transparent text-brass before:bg-brass',
  fill: 'bg-brass text-bg before:bg-fg',
}

const buttonClass = (variant: Variant = 'outline', className?: string) =>
  cn(base, variants[variant], className)

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }

export function ButtonLink({ variant, className, ...props }: LinkProps) {
  return <a className={buttonClass(variant, className)} {...props} />
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }

export function Button({ variant, className, type = 'button', ...props }: BtnProps) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />
}
