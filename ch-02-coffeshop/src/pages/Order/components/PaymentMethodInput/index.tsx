/* eslint-disable react/display-name */
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import { ContentContainer, PaymentMethodContainer } from './styles'

type PaymentMethodInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: ReactNode
  label: string
}

export const PaymentMethodInput = forwardRef<
  HTMLInputElement,
  PaymentMethodInputProps
>(({ id, icon, label, ...props }, ref) => {
  return (
    <PaymentMethodContainer>
      <input ref={ref} id={id} type="radio" {...props} name="paymentMethod" />
      <label htmlFor={id}>
        <ContentContainer>
          {icon}
          {label}
        </ContentContainer>
      </label>
    </PaymentMethodContainer>
  )
})
