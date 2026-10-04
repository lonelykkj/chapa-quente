export type MenuIcon = 'burger' | 'fries' | 'drink' | 'sweet'

export type MenuItem = {
  name: string
  description: string
  price: number
  icon: MenuIcon
  tag?: string
}

type MenuCategory = {
  id: string
  label: string
  items: MenuItem[]
}

export const MENU: MenuCategory[] = [
  {
    id: 'burgers',
    label: 'Burgers',
    items: [
      { name: 'Chapa Clássico', description: 'Brioche, blend 180g, cheddar inglês, alface, tomate, cebola roxa e molho da casa.', price: 38, icon: 'burger', tag: 'Mais pedido' },
      { name: 'Smash Duplo', description: 'Dois smash de 90g, cheddar dobrado, cebola na chapa e picles.', price: 42, icon: 'burger' },
      { name: 'Brasa BBQ', description: 'Blend 180g, bacon de barriga, onion rings e barbecue de rapadura.', price: 46, icon: 'burger', tag: 'Novo' },
      { name: 'Gorgonzola & Mel', description: 'Blend 180g, gorgonzola, rúcula, mel de engenho e nozes.', price: 44, icon: 'burger' },
      { name: 'Chapa Veg', description: 'Burger de grão-de-bico e beterraba, queijo coalho, maionese de ervas.', price: 36, icon: 'burger' },
      { name: 'Chapinha Kids', description: 'Smash 90g, cheddar e ketchup. Acompanha batata pequena.', price: 26, icon: 'burger' },
    ],
  },
  {
    id: 'porcoes',
    label: 'Porções',
    items: [
      { name: 'Batata rústica', description: 'Com casca, alecrim e flor de sal. Maionese verde à parte.', price: 22, icon: 'fries' },
      { name: 'Batata da Chapa', description: 'Cheddar cremoso, bacon crocante e cebolinha.', price: 32, icon: 'fries' },
      { name: 'Onion rings', description: 'Empanados na cerveja da casa, molho barbecue.', price: 26, icon: 'fries' },
      { name: 'Mandioca frita', description: 'Com parmesão e páprica defumada.', price: 24, icon: 'fries' },
    ],
  },
  {
    id: 'bebidas',
    label: 'Bebidas',
    items: [
      { name: 'Chopp Pilsen 400ml', description: 'Cervejaria parceira da Vila Madalena.', price: 16, icon: 'drink' },
      { name: 'Chopp IPA 400ml', description: 'Lupulado, cítrico, amargor médio.', price: 19, icon: 'drink' },
      { name: 'Milkshake', description: 'Baunilha, Ovomaltine ou doce de leite. 500ml.', price: 24, icon: 'drink' },
      { name: 'Limonada da casa', description: 'Siciliana com hortelã, adoçada na hora.', price: 12, icon: 'drink' },
    ],
  },
  {
    id: 'doces',
    label: 'Sobremesas',
    items: [
      { name: 'Brownie na chapa', description: 'Servido quente com sorvete de creme.', price: 22, icon: 'sweet' },
      { name: 'Churros cup', description: 'Doce de leite e canela, seis unidades.', price: 18, icon: 'sweet' },
      { name: 'Pudim da vó', description: 'Pudim de leite com calda de caramelo queimado.', price: 16, icon: 'sweet' },
    ],
  },
]
