import { Button } from '@/components/Button'
import { Text } from '@/components/Typo'
import { useCart } from '@/hooks/useCart'
import { formatMoney } from '@/utils/formatUtil'
import { ConfirmationSectionContainer } from './styles'

const DELIVERY_PRICE = 2.5

export function ConfirmationSection() {
  const { cartItemsTotal, cartQuantity } = useCart()
  const cartTotal = DELIVERY_PRICE + cartItemsTotal

  const formattedItemsTotal = formatMoney(cartItemsTotal)
  const formattedCartTotal = formatMoney(cartTotal)
  const formattedDeliveryPrice = formatMoney(DELIVERY_PRICE)

  return (
    <ConfirmationSectionContainer>
      <div>
        <Text size="sm">Total de itens</Text>
        <Text>R$ {formattedItemsTotal}</Text>
      </div>
      <div>
        <Text size="sm">Entrega</Text>
        <Text>R$ {formattedDeliveryPrice}</Text>
      </div>
      <div>
        <Text size="lg" weight={700} color="subtitle">
          Total
        </Text>
        <Text size="lg" weight={700} color="subtitle">
          R$ {formattedCartTotal}
        </Text>
      </div>
      <Button
        text="Confirmar Pedido"
        disabled={cartQuantity <= 0}
        type="submit"
      />
    </ConfirmationSectionContainer>
  )
}
