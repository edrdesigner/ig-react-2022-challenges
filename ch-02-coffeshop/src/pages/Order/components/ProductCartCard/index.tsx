import { Trash } from 'phosphor-react'
import { QuantityInput } from '@/components/QuantityInput'
import { Text } from '@/components/Typo'
import { CartItem } from '@/contexts/CartContext'
import { useCart } from '@/hooks/useCart'
import { formatMoney } from '@/utils/formatUtil'
import {
  ActionsContainer,
  ProductCartCardContainer,
  RemoveButton,
} from './styles'

interface ProductCartCardProps {
  product: CartItem
}

export function ProductCartCard({ product }: ProductCartCardProps) {
  const { changeCartItemQuantity, removeCartItem } = useCart()

  function handleIncrease() {
    changeCartItemQuantity(product.id, 'increase')
  }

  function handleDecrease() {
    changeCartItemQuantity(product.id, 'decrease')
  }

  function handleRemove() {
    removeCartItem(product.id)
  }

  const productTotal = product.price * product.quantity

  const formattedPrice = formatMoney(productTotal)

  return (
    <ProductCartCardContainer>
      <div>
        <img src={`/products/${product.photo}`} alt={product.name} />
        <div>
          <Text color="subtitle">{product.name}</Text>
          <ActionsContainer>
            <QuantityInput
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              quantity={product.quantity}
              size="small"
            />
            <RemoveButton type="button" onClick={handleRemove}>
              <Trash size={16} />
              REMOVER
            </RemoveButton>
          </ActionsContainer>
        </div>
      </div>

      <p>R$ {formattedPrice}</p>
    </ProductCartCardContainer>
  )
}
