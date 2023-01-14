import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Stripe from 'stripe';
import { IProduct } from '../../contexts/CartContext';
import { useCart } from '../../hooks/useCart';
import { formatMoney } from '../../lib/fomatMoney';
import { stripe } from '../../lib/stripe';
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product';

interface ProductProps {
  product: IProduct;
}

export default function ProductDetail({ product }: ProductProps) {
  const { isFallback } = useRouter();
  const { addToCart, checkIfItemAlreadyExists } = useCart();
  const isItemAlreadyInCart = checkIfItemAlreadyExists(product.id);

  if (isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt={product.name}
          />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={isItemAlreadyInCart}
          >
            {isItemAlreadyInCart
              ? 'Produto já está no carrinho'
              : 'Colocar na sacola'}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{ params: { id: 'prod_MnkIjyW60wgvFT' } }];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = String(params?.id ?? '');

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        defaultPriceId: price.id,
        price: price.unit_amount ? formatMoney(price.unit_amount / 100) : 0,
        numberPrice: price.unit_amount ? price.unit_amount / 100 : 0,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
