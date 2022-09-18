import styled from 'styled-components'

export const InfoIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`
interface IconContainerProps {
  bg: string
}

export const IconContainer = styled.div<IconContainerProps>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ bg }) => bg};
  color: ${({ theme }) => theme.colors['base-white']};

  p {
    margin: 0;
    padding: 0;
  }
`
