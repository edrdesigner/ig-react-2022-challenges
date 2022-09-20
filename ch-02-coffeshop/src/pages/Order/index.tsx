/* eslint-disable no-unused-vars */
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import errorMap from 'zod/lib/locales/en'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'
import { OrderContainerForm } from './styles'
import { SelectedProducts } from './components/SelectedProducts'
import { CompleteOrderForm } from './components/CompleteOrderForm'

enum PaymentMethods {
  credit = 'credit',
  debit = 'debit',
  money = 'money',
}

const confirmOrderSchema = zod.object({
  cep: zod.string().min(1, 'Informe o CEP'),
  street: zod.string().min(1, 'Informe a Rua'),
  number: zod.string().min(1, 'Informe o Número'),
  complement: zod.string().min(1, 'Informe o Complemento'),
  district: zod.string().min(1, 'Informe o Bairro'),
  city: zod.string().min(1, 'Informe a Cidade'),
  uf: zod.string().min(1, 'Informe o Estado'),
  paymentMethod: zod.nativeEnum(PaymentMethods, {
    errorMap: () => {
      return { message: 'Informe o método de pagamento' }
    },
  }),
})

export type OrderData = zod.infer<typeof confirmOrderSchema>

type ConfirmOrderFormData = OrderData

export function Order() {
  const navigate = useNavigate()
  const { cleanCart } = useCart()
  const confirmOrderForm = useForm<ConfirmOrderFormData>({
    resolver: zodResolver(confirmOrderSchema),
    defaultValues: {
      paymentMethod: undefined,
    },
  })

  const { handleSubmit } = confirmOrderForm

  function handleConfirmOrder(data: ConfirmOrderFormData) {
    navigate('/order-confirmed', { state: data })
    cleanCart()
  }

  return (
    <FormProvider {...confirmOrderForm}>
      <OrderContainerForm
        className="container"
        onSubmit={handleSubmit(handleConfirmOrder)}
      >
        <CompleteOrderForm />
        <SelectedProducts />
      </OrderContainerForm>
    </FormProvider>
  )
}
