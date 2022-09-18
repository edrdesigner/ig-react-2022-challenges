import styled from 'styled-components'

interface TitleProps {
  size?: 'xl' | 'lg' | 'md' | 'sm'
  color?: 'title' | 'subtitle' | 'text'
  weight?: string | number
}

interface TextProps {
  size?: 'lg' | 'md' | 'sm'
  color?: 'text' | 'subtitle' | 'label'
  weight?: string | number
}

export const Title = styled.h1<TitleProps>`
  color: ${({ theme, color }) => theme.colors[`base-${color ?? 'title'}`]};
  font-size: ${({ theme, size }) =>
    theme.textSizes[`title-title-${size ?? 'md'}`]};
  font-family: ${({ theme }) => theme.fonts.title};
  font-weight: ${({ weight }) => weight ?? 800};
  line-height: 130%;
`

export const Text = styled.p<TextProps>`
  color: ${({ theme, color }) => theme.colors[`base-${color ?? 'text'}`]};
  font-size: ${({ theme, size }) =>
    theme.textSizes[`text-regular-${size ?? 'md'}`]};
  font-weight: ${({ weight }) => weight ?? 400};
  line-height: 130%;
`
