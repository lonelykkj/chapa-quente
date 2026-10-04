# Chapa Quente Burgers

Landing page da Chapa Quente Burger Bar — React 19 + TypeScript + Tailwind CSS v4 (Vite).

## Scripts

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # type-check + build de produção
npm run lint     # oxlint
npm run preview  # serve o build
```

## Estrutura

```
src/
├── assets/burger/      # camadas do hambúrguer (webp recortados da foto)
├── components/
│   ├── burger/         # sprite SVG <defs> com as camadas
│   ├── layout/         # Header, Footer
│   ├── order/          # sacola: botões de quantidade, barra flutuante, gaveta de pedido
│   └── ui/             # Button, Badge, Price, SectionHead, Reveal, WhatsAppIcon
├── data/               # conteúdo: cardápio, horários, contatos
├── hooks/              # useReveal, useReducedMotion
├── lib/                # utils (cn, easing, formatBRL) e whatsapp (link + mensagem)
├── order/              # estado da sacola (useOrder) e OrderProvider
├── sections/           # Hero, Marquee, About, Menu, HowToOrder, Feed, Visit, Newsletter
├── App.tsx
├── index.css           # tokens do tema (@theme), base e utilitários
└── main.tsx
```

Imports usam o alias `@/` → `src/`. Cores, fontes, easings e animações ficam como tokens em `src/index.css`
(`bg-brass`, `font-display`, `animate-marquee`, …).

## Pedidos pelo WhatsApp

O cliente monta a sacola no cardápio e envia o pedido formatado para o WhatsApp da loja.
O número fica em `src/data/site.ts` → `WHATSAPP` (`number` só com dígitos, com 55 + DDD).
A sacola fica salva no navegador (localStorage) e a mensagem é montada em `src/lib/whatsapp.ts`.
