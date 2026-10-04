import { BurgerDefs } from '@/components/burger/BurgerDefs'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { FloatingOrder } from '@/components/order/FloatingOrder'
import { OrderDrawer } from '@/components/order/OrderDrawer'
import { OrderProvider } from '@/order/OrderProvider'
import { About } from '@/sections/About'
import { Feed } from '@/sections/Feed'
import { HowToOrder } from '@/sections/HowToOrder'
import { Hero } from '@/sections/hero/Hero'
import { Marquee } from '@/sections/Marquee'
import { Menu } from '@/sections/menu/Menu'
import { Newsletter } from '@/sections/Newsletter'
import { Visit } from '@/sections/Visit'

export default function App() {
  return (
    <OrderProvider>
      <BurgerDefs />
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <About />
        <Menu />
        <HowToOrder />
        <Feed />
        <Visit />
        <Newsletter />
      </main>
      <Footer />
      <FloatingOrder />
      <OrderDrawer />
    </OrderProvider>
  )
}
