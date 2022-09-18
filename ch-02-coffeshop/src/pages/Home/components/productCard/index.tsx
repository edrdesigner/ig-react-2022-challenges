import { ShoppingCart } from 'phosphor-react'
import { useState } from 'react'
import { QuantityInput } from '@/components/QuantityInput'
import { Text, Title } from '@/components/Typo'
import { formatMoney } from '@/utils/formatUtil'
import {
  AddCartWrapper,
  CardFooter,
  Description,
  Name,
  ProductCardContainer,
  Tags,
} from './styles'

export interface Product {
  id: number
  tags: string[]
  name: string
  description: string
  photo: string
  price: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)

  function handleIncrease() {
    setQuantity((state) => state + 1)
  }

  function handleDecrease() {
    setQuantity((state) => state - 1)
  }

  function handleAddCart() {
    const productToAdd = {
      ...product,
      quantity,
    }

    console.log('add cart: ', productToAdd)
  }

  const formattedPrice = formatMoney(product.price)

  return (
    <ProductCardContainer>
      <img src={`/products/${product.photo}`} alt={product.name} />
      <Tags>
        {product.tags.map((tag) => (
          <span key={`${product.id}-${tag}`}>{tag}</span>
        ))}
      </Tags>
      <Name>{product.name}</Name>
      <Description>{product.description}</Description>
      <CardFooter>
        <div>
          <Text size="sm">R$</Text>
          <Title size="sm" color="text" as="strong">
            {formattedPrice}
          </Title>
        </div>
        <AddCartWrapper>
          <QuantityInput
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            quantity={quantity}
          />
          <button type="button" onClick={handleAddCart}>
            <ShoppingCart weight="fill" size={22} />
          </button>
        </AddCartWrapper>
      </CardFooter>
    </ProductCardContainer>
  )
}
