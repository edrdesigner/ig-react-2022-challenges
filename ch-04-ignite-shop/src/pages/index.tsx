import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Stripe from 'stripe';
// import { useKeenSlider } from 'keen-slider/react';
import useEmblaCarousel from 'embla-carousel-react';
// import 'keen-slider/keen-slider.min.css';
import { stripe } from '../lib/stripe';

import { HomeContainer, Product, SliderContainer } from '../styles/pages/home';
import { CartButton } from '../components/CartButton';
import { MouseEvent, useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';
import { IProduct } from '../contexts/CartContext';
import { formatMoney } from '../lib/fomatMoney';
import { ProductSkeleton } from '../components/ProductSkeleton';

interface HomeProps {
  products: IProduct[];
}

export default function Home({ products }: HomeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, checkIfItemAlreadyExists } = useCart();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeOut);
  });

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  });

  function handleAddToCart(
    e: MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) {
    e.preventDefault();
    addToCart(product);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite shop</title>
      </Head>
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <HomeContainer>
          <div className="embla" ref={emblaRef}>
            <SliderContainer className="embla__container container">
              {isLoading ? (
                <>
                  <ProductSkeleton className="embla__slide" />
                  <ProductSkeleton className="embla__slide" />
                  <ProductSkeleton className="embla__slide" />
                </>
              ) : (
                <>
                  {products.map((product) => {
                    return (
                      <Product
                        key={product.id}
                        className="keen-slider__slide"
                        href={`/product/${product.id}`}
                        prefetch={false}
                      >
                        <Image
                          src={product.imageUrl}
                          alt="shirt"
                          width={520}
                          height={480}
                        />
                        <footer>
                          <div>
                            <strong>{product.name}</strong>
                            <span>{product.price}</span>
                          </div>
                          <CartButton
                            color="green"
                            size="large"
                            onClick={(e) => handleAddToCart(e, product)}
                            disabled={checkIfItemAlreadyExists(product.id)}
                          />
                        </footer>
                      </Product>
                    );
                  })}
                </>
              )}
            </SliderContainer>
          </div>
        </HomeContainer>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount ? formatMoney(price.unit_amount / 100) : '',
      numberPrice: price.unit_amount ? price.unit_amount / 100 : 0,
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 2 * 2, // 2 hours
  };
};
