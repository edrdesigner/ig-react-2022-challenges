import { useTheme } from 'styled-components'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'
import { InfoIcon } from '@/components/InfoIcon'
import { Text } from '@/components/Typo'

import introCoffee from '@/assets/intro-coffee.png'
import {
  BenefitsContainer,
  IntroContainer,
  IntroContent,
  IntroTitle,
} from './styles'

export function Intro() {
  const { colors } = useTheme()

  return (
    <IntroContainer>
      <IntroContent className="container">
        <div>
          <section>
            <IntroTitle size="xl">
              Encontre seu café perfeito para qualquer hora do dia
            </IntroTitle>
            <Text as="h3" size="lg" color="subtitle">
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </Text>
          </section>
          <BenefitsContainer>
            <InfoIcon
              bg={colors['brand-yellow-dark']}
              icon={<ShoppingCart weight="fill" />}
              text="Compras simples e segura"
            />
            <InfoIcon
              bg={colors['base-text']}
              icon={<Package weight="fill" />}
              text="Embalagem mantém o café intacto"
            />
            <InfoIcon
              bg={colors['brand-yellow']}
              icon={<Timer weight="fill" />}
              text="Entrega rápida e rastreada"
            />
            <InfoIcon
              bg={colors['brand-purple']}
              icon={<Coffee weight="fill" />}
              text="O café chega fresquinho até você"
            />
          </BenefitsContainer>
        </div>
        <img src={introCoffee} alt="Uma xícara de café" />
      </IntroContent>
    </IntroContainer>
  )
}
