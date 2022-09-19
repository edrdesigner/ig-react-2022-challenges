import { Title } from '@/components/Typo'
import { useCart } from '@/hooks/useCart'
import { ProductCartCard } from '../ProductCartCard'
import { ConfirmationSection } from './ConfirmationSection'
import { DetailsContainer, SelectedProductsContainer } from './styles'

export function SelectedProducts() {
  const { cartItems } = useCart()

  return (
    <SelectedProductsContainer>
      <Title size="sm" color="subtitle">
        Cafés selecionados
      </Title>
      <DetailsContainer>
        {cartItems.map((item) => {
          return <ProductCartCard key={item.id} product={item} />
        })}
      </DetailsContainer>
      <ConfirmationSection />
    </SelectedProductsContainer>
  )
}
