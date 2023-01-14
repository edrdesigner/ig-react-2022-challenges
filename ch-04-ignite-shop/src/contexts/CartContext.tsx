import { createContext, ReactNode, useState } from 'react';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  defaultPriceId: string;
}

interface CartContextData {
  cartItems: IProduct[];
  cartTotal: number;
  addToCart: (product: IProduct) => void;
  removeCartItem: (productId: string) => void;
  checkIfItemAlreadyExists: (productId: string) => boolean;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  const cartTotal = cartItems.reduce((total, product: IProduct) => {
    return total + product.numberPrice;
  }, 0);

  function addToCart(product: IProduct) {
    setCartItems((state) => [...state, product]);
  }

  function removeCartItem(productId: string) {
    setCartItems((state) =>
      state.filter((product) => product.id !== productId)
    );
  }

  function checkIfItemAlreadyExists(productId: string) {
    return cartItems.some((product) => product.id === productId);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        removeCartItem,
        checkIfItemAlreadyExists,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
