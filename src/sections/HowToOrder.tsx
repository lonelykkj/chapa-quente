import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { WHATSAPP } from '@/data/site'
import { CHAT_URL } from '@/lib/whatsapp'

const STEPS = [
  { title: 'Monte no cardápio', text: 'Toque em “Adicionar” nos itens que quiser. A sacola guarda tudo, com o total.' },
  { title: 'Envie pelo WhatsApp', text: 'Informe nome, entrega ou retirada e pagamento. A mensagem já sai pronta.' },
  { title: 'Saiu da chapa', text: 'A gente confirma o pedido e o tempo de preparo direto na conversa.' },
]

export function HowToOrder() {
  return (
    <section id="pedido" className="sec relative pt-0!">
      <div className="wrap">
        <SectionHead label="Como pedir" />
        <Reveal className="grid grid-cols-[1.1fr_1fr] gap-[clamp(32px,6vw,90px)] max-[860px]:grid-cols-1">
          <div className="flex flex-col gap-6">
            <h2 className="text-[clamp(44px,6vw,80px)]">
              Pediu, <em className="text-brass not-italic">chapou</em>, chegou
            </h2>
            <p className="max-w-[46ch] text-muted">
              Os pedidos são feitos pelo WhatsApp, para delivery ou retirada no balcão. Monte a sacola pelo cardápio
              ou chame a gente direto na conversa.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-whatsapp px-[22px] py-3.5 font-label text-sm/none font-bold tracking-[0.16em] text-[#06301a] uppercase transition-[filter] hover:brightness-110"
              >
                <WhatsAppIcon className="size-5" />
                Chamar no WhatsApp
              </a>
              <ButtonLink href="#cardapio">Ver cardápio</ButtonLink>
            </div>
            <p className="font-label text-sm tracking-[0.14em] text-muted uppercase">
              WhatsApp <b className="text-fg">{WHATSAPP.display}</b>
            </p>
          </div>

          <ol className="flex flex-col border-t border-line">
            {STEPS.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[64px_1fr] gap-4 border-b border-line py-6">
                <span className="font-display text-5xl leading-none font-black text-brass tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-[28px]">{step.title}</h3>
                  <p className="mt-1.5 text-[15px] text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
