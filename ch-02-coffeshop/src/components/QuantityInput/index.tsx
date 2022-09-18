import { Minus, Plus } from 'phosphor-react'
import { QuantityInputContainer, IconWrapper } from './styles'

interface QuantityInputProps {
  size?: 'medium' | 'small'
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export function QuantityInput({
  size = 'medium',
  quantity,
  onIncrease,
  onDecrease,
}: QuantityInputProps) {
  return (
    <QuantityInputContainer size={size}>
      <IconWrapper onClick={onDecrease} disabled={quantity <= 1}>
        <Minus size={14} weight="fill" />
      </IconWrapper>
      <input type="number" value={quantity} readOnly />
      <IconWrapper onClick={onIncrease}>
        <Plus size={14} weight="fill" />
      </IconWrapper>
    </QuantityInputContainer>
  )
}
