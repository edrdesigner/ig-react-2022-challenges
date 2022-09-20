import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Clock, CurrencyDollar, MapPin } from 'phosphor-react'
import { useTheme } from 'styled-components'
import { Text, Title } from '@/components/Typo'
import { InfoIcon } from '@/components/InfoIcon'
import { PAYMENT_METHODS } from '../Order/components/CompleteOrderForm/PaymentMethodForm'
import { OrderData } from '../Order'
import confirmedOrderIllustration from '@/assets/confirmed-order.png'

import { OrderConfirmedContainer, OrderDetailsContainer } from './styles'
interface LocationType {
  state: OrderData
}

export function OrderConfirmed() {
  const { colors } = useTheme()
  const { state } = useLocation() as unknown as LocationType
  const navigate = useNavigate()

  useEffect(() => {
    if (!state) {
      navigate('/')
    }
  }, [])

  if (!state) return <></>

  return (
    <OrderConfirmedContainer className="container">
      <div>
        <Title size="lg">Uhu! Pedido confirmado</Title>
        <Text size="lg" color="subtitle">
          Agora é só aguardar que logo o café chegará até você
        </Text>
      </div>

      <section>
        <OrderDetailsContainer>
          <InfoIcon
            icon={<MapPin weight="fill" />}
            bg={colors['brand-purple']}
            text={
              <Text>
                Entrega em <strong>{state.street}</strong>, {state.number}
                <br />
                {state.district} - {state.city}, {state.uf}
              </Text>
            }
          />

          <InfoIcon
            icon={<Clock weight="fill" />}
            bg={colors['brand-yellow']}
            text={
              <Text>
                Previsão de entrega
                <br />
                <strong>20 min - 30 min</strong>
              </Text>
            }
          />

          <InfoIcon
            icon={<CurrencyDollar weight="fill" />}
            bg={colors['brand-yellow-dark']}
            text={
              <Text>
                Pagamento na entrega
                <br />
                <strong>{PAYMENT_METHODS[state.paymentMethod].label}</strong>
              </Text>
            }
          />
        </OrderDetailsContainer>
        <img src={confirmedOrderIllustration} alt="Pedido confirmado" />
      </section>
    </OrderConfirmedContainer>
  )
}
