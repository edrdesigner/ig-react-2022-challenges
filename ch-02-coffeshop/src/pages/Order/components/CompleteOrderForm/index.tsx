import { Title } from '@/components/Typo'
import { CurrencyDollar, MapPinLine } from 'phosphor-react'
import { useTheme } from 'styled-components'
import { SectionTitle } from '../SectionTitle'
import { AddressForm } from './AddressForm'
import { PaymentMethodForm } from './PaymentMethodForm'
import { CompleteOrderFormContainer, FormSectionContainer } from './styles'

export function CompleteOrderForm() {
  const { colors } = useTheme()

  return (
    <CompleteOrderFormContainer>
      <Title size="md" color="subtitle">
        Complete seu pedido
      </Title>
      <FormSectionContainer>
        <SectionTitle
          title="Endereço de Entrega"
          subtitle="Informe o endereço onde deseja receber seu pedido"
          icon={<MapPinLine color={colors['brand-yellow-dark']} size={22} />}
        />
        <AddressForm />

        <SectionTitle
          title="Pagamento"
          subtitle="O pagamento é feito na entrega. Escolha a forma que deseja pagar"
          icon={<CurrencyDollar color={colors['brand-purple']} size={22} />}
        />
        <PaymentMethodForm />
      </FormSectionContainer>
    </CompleteOrderFormContainer>
  )
}
