import { Text } from '@/components/Typo'
import { ReactNode } from 'react'
import { SectionTitleContainer } from './styles'

interface SectionTitleProps {
  title: string
  subtitle: string
  icon: ReactNode
}

export function SectionTitle({ title, subtitle, icon }: SectionTitleProps) {
  return (
    <SectionTitleContainer>
      {icon}
      <div>
        <Text color="subtitle">{title}</Text>
        <Text size="sm">{subtitle}</Text>
      </div>
    </SectionTitleContainer>
  )
}
