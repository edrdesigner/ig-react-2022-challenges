import { ReactNode } from 'react'
import { IconContainer, InfoIconContainer } from './styles'

interface InfoIconProps {
  icon: ReactNode
  text: string | ReactNode
  bg: string
}

export function InfoIcon({ icon, text, bg }: InfoIconProps) {
  return (
    <InfoIconContainer>
      <IconContainer bg={bg}>{icon}</IconContainer>
      {typeof text === 'string' ? <p>{text}</p> : text}
    </InfoIconContainer>
  )
}
