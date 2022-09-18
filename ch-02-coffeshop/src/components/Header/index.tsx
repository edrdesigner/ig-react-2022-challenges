import { MapPin, ShoppingCart } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { HeaderContainer, HeaderButtonsContainer, HeaderButton } from './styles'
import logoImg from '../../assets/logo.svg'
import { useCart } from '@/hooks/useCart'

export function Header() {
  const { cartQuantity } = useCart()

  return (
    <HeaderContainer>
      <div className="container">
        <NavLink to="/">
          <img src={logoImg} alt="Logo" />
        </NavLink>
        <HeaderButtonsContainer>
          <HeaderButton variant="purple">
            <MapPin size={20} weight="fill" />
            Cascavel, PR
          </HeaderButton>
          <NavLink to="/order">
            <HeaderButton variant="yellow">
              {cartQuantity >= 1 && <span>{cartQuantity}</span>}
              <ShoppingCart size={20} weight="fill" />
            </HeaderButton>
          </NavLink>
        </HeaderButtonsContainer>
      </div>
    </HeaderContainer>
  )
}
