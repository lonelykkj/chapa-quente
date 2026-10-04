import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setMessage(
      EMAIL_RE.test(email.trim())
        ? 'Anotado. O próximo burger do mês chega no seu e-mail.'
        : 'Digite um e-mail válido, como nome@email.com.',
    )
  }

  return (
    <section className="sec relative pt-0!">
      <div className="wrap">
        <Reveal className="relative flex flex-col items-center gap-[18px] overflow-hidden border border-line bg-panel px-[clamp(20px,5vw,70px)] py-[clamp(40px,6vw,70px)] text-center before:pointer-events-none before:absolute before:inset-x-[-10%] before:-bottom-[60%] before:h-[120%] before:bg-[radial-gradient(ellipse_at_50%_100%,color-mix(in_srgb,var(--color-ember)_22%,transparent),transparent_60%)]">
          <div className="flex gap-3 text-brass" aria-hidden="true">
            ★ ★ ★
          </div>
          <h2 className="text-[clamp(38px,5vw,64px)]">Entre na lista da chapa</h2>
          <p className="max-w-[46ch] text-muted">
            Um e-mail por mês com o burger do mês, eventos da casa e cupom de aniversário.
          </p>

          <form noValidate onSubmit={onSubmit} className="relative mt-1.5 flex w-[min(480px,100%)] max-[480px]:flex-col max-[480px]:gap-2.5">
            <label htmlFor="email" className="sr-only">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-1 border-[1.5px] border-r-0 border-line bg-transparent px-4 py-3.5 font-body text-[15px] font-medium text-fg focus:border-brass focus:outline-none max-[480px]:border-r-[1.5px]"
            />
            <Button type="submit" variant="fill">
              Assinar
            </Button>
          </form>

          <p role="status" className="relative min-h-5 font-label text-sm font-semibold tracking-[0.14em] text-brass uppercase">
            {message}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
