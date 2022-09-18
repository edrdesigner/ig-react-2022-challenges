import { createContext, ReactNode } from 'react'
import produce from 'immer'
import { Product } from '@/pages/Home/components/productCard'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export interface CartItem extends Product {
  quantity: number
}

interface CartContextData {
  cartItems: CartItem[]
  cartQuantity: number
  cartItemsTotal: number
  addProductToCart: (product: CartItem) => void
  changeCartItemQuantity: (
    cartItemId: number,
    type: 'increase' | 'decrease',
  ) => void
  removeCartItem: (cartItemId: number) => void
  cleanCart: () => void
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    '@coffeeDelivery:cartItems',
    [],
  )

  const cartQuantity = cartItems.length

  const cartItemsTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  function addProductToCart(product: CartItem) {
    const productAlreadyInCart = cartItems.findIndex(
      (cartItem) => cartItem.id === product.id,
    )

    const newCart = produce(cartItems, (draft) => {
      if (productAlreadyInCart < 0) {
        draft.push(product)
      } else {
        draft[productAlreadyInCart].quantity += product.quantity
      }
    })

    setCartItems(newCart)
  }

  function changeCartItemQuantity(
    cartItemId: number,
    type: 'increase' | 'decrease',
  ) {
    const newCart = produce(cartItems, (draft) => {
      const productAlreadyInCart = cartItems.findIndex(
        (cartItem) => cartItem.id === cartItemId,
      )

      if (productAlreadyInCart >= 0) {
        const item = draft[productAlreadyInCart]
        draft[productAlreadyInCart].quantity =
          type === 'increase' ? item.quantity + 1 : item.quantity - 1
      }
    })

    setCartItems(newCart)
  }

  function removeCartItem(cartItemId: number) {
    const newCart = produce(cartItems, (draft) => {
      const productAlreadyInCart = cartItems.findIndex(
        (cartItem) => cartItem.id === cartItemId,
      )

      if (productAlreadyInCart >= 0) {
        draft.splice(productAlreadyInCart, 1)
      }
    })

    setCartItems(newCart)
  }

  function cleanCart() {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addProductToCart,
        cartQuantity,
        changeCartItemQuantity,
        cartItemsTotal,
        removeCartItem,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
