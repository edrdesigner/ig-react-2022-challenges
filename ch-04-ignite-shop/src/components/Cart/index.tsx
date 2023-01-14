import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import Image from 'next/image';
import { X } from 'phosphor-react';
import { useCart } from '../../hooks/useCart';
import { formatMoney } from '../../lib/fomatMoney';
import { CartButton } from '../CartButton';
import {
  CartClose,
  CartContent,
  CartFinalization,
  CartProduct,
  CartProductDetails,
  CartProductImage,
  FinalizationDetails,
} from './styles';

export function Cart() {
  const { cartItems, removeCartItem, cartTotal } = useCart();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const cartQuantity = cartItems.length;

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);
      const responseCheckout = await axios.post('/api/checkout', {
        products: cartItems,
      });

      const { checkoutUrl } = responseCheckout.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      alert('Falha ao realizar checkout');
      console.log(error);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>
      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>
          <h2>Sacola de compras</h2>
          <section>
            {cartQuantity <= 0 && <p>Parece que seu carrinho esta vazio =(</p>}
            {cartItems.map((cartItem) => (
              <CartProduct key={cartItem.id}>
                <CartProductImage>
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={cartItem.imageUrl}
                  />
                </CartProductImage>
                <CartProductDetails>
                  <p>{cartItem.name}</p>
                  <strong>{cartItem.price}</strong>
                  <button onClick={() => removeCartItem(cartItem.id)}>
                    Remover
                  </button>
                </CartProductDetails>
              </CartProduct>
            ))}
          </section>
          <CartFinalization>
            <FinalizationDetails>
              <div>
                <span>Quantidade</span>
                <p>
                  {cartQuantity} {cartQuantity > 1 ? 'itens' : 'item'}{' '}
                </p>
              </div>
              <div>
                <span>Valor total</span>
                <p>{formatMoney(cartTotal)}</p>
              </div>
            </FinalizationDetails>
            <button
              onClick={handleCheckout}
              disabled={isCreatingCheckoutSession || cartQuantity <= 0}
            >
              Finalizar compra
            </button>
          </CartFinalization>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
