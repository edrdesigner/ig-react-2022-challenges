import { Title } from '@/components/Typo'
import { coffees } from '@/mock/data'
import { ProductCard } from '../productCard'
import { ProductList, ProductsContainer } from './styles'

export function Products() {
  return (
    <ProductsContainer className="container">
      <Title size="lg" color="subtitle">
        Nossos cafés
      </Title>

      <ProductList>
        {coffees.map((coffee) => (
          <ProductCard key={coffee.id} product={coffee} />
        ))}
      </ProductList>
    </ProductsContainer>
  )
}
