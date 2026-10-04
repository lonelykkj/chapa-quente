/** Joins truthy class names. */
export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))

/** Overshoots then settles — gives each burger layer a little "drop" bounce. */
export const easeBack = (t: number) => 1 + 2.9 * Math.pow(t - 1, 3) + 1.9 * Math.pow(t - 1, 2)

export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export const formatBRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format
