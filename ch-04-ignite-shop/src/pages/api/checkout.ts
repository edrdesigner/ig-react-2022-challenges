import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../lib/stripe';

interface IProduct {
  defaultPriceId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products } = req.body as { products: IProduct[] };

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!products) {
    return res.status(400).json({ error: 'Missing priceId' });
  }

  const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url,
    cancel_url,
    mode: 'payment',
    line_items: products.map((product) => ({
      price: product.defaultPriceId,
      quantity: 1,
    })),
  });

  return res.status(200).json({ checkoutUrl: checkoutSession.url });
}
