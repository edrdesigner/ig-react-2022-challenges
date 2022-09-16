import { MapPin, ShoppingCart } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { HeaderContainer, HeaderButtonsContainer, HeaderButton } from './styles'
import logoImg from '../../assets/logo.svg'

export function Header() {
  const cartAmount = 0

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
              {cartAmount >= 1 && <span>{cartAmount}</span>}
              <ShoppingCart size={20} weight="fill" />
            </HeaderButton>
          </NavLink>
        </HeaderButtonsContainer>
      </div>
    </HeaderContainer>
  )
}
