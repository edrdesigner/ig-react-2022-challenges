/* eslint-disable react/display-name */
import { forwardRef, InputHTMLAttributes } from 'react'
import { Text } from '../Typo'
import {
  InputStyleContainer,
  InputStyled,
  InputWrapper,
  RightText,
} from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  rightText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, rightText, className, ...props }, ref) => {
    return (
      <InputWrapper className={className}>
        <InputStyleContainer hasError={!!error}>
          <InputStyled ref={ref} {...props} />
          {rightText && <RightText>{rightText}</RightText>}
        </InputStyleContainer>
        {error && <Text size="sm">{error}</Text>}
      </InputWrapper>
    )
  },
)
