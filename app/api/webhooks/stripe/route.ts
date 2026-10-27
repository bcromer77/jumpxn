export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

// Stripe webhook handler - Sandbox mode
// In production, this would verify the Stripe signature and process events
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const sig = request.headers.get('stripe-signature');

    // In production, verify signature:
    // const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);

    console.log('[SANDBOX] Webhook received. Stripe signature verification would happen here.');
    console.log('[SANDBOX] In production, this would process checkout.session.completed events.');

    // Return 200 quickly
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }
}
