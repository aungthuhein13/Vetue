// app/api/checkout/route.ts
// This route handles the Stripe checkout session creation.
// It expects a JSON body with an array of items, each containing title, price, and quantity.
// It creates a Stripe checkout session and returns the session URL for redirection.

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-07-30.basil' });

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json() as {
      items: { title: string; price: number; qty: number }[];
    };

    const line_items = items.map((i) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: i.title },
        unit_amount: Math.round(i.price * 100),
      },
      quantity: i.qty,
    }));

    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/cart`,
      submit_type: 'pay',
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('Stripe checkout error:', e.message);
    } else {
      console.error('Stripe checkout error:', e);
    }
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
