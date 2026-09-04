import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  try {
    const { siteTitle, slug } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Publicación Web Premium - ${siteTitle}`,
              description: `Hosting de alta velocidad, certificado SSL y dominio activo para ${siteTitle}.`,
            },
            unit_amount: 2900, // $29.00 USD
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/builder?status=success&slug=${slug}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/builder?status=cancelled`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error al procesar el pago con Stripe.' },
      { status: 500 }
    );
  }
}
