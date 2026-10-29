export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

function verifyStripeSignature(rawBody: string, sigHeader: string, secret: string): boolean {
  const parts = sigHeader.split(',').reduce<Record<string, string>>((acc, item) => {
    const [k, v] = item.split('=');
    if (k && v) acc[k.trim()] = v.trim();
    return acc;
  }, {});
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;
  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac('sha256', secret).update(signedPayload, 'utf8').digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const sig = request.headers.get('stripe-signature') || '';
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (webhookSecret) {
      const valid = verifyStripeSignature(rawBody, sig, webhookSecret);
      if (!valid) {
        return NextResponse.json({ error: 'Invalid Stripe signature' }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody || '{}');
    if (event?.type === 'checkout.session.completed') {
      const sessionObj = event.data?.object;
      const referenceCode = sessionObj?.metadata?.referenceCode || sessionObj?.client_reference_id;
      if (referenceCode) {
        await prisma.reservation.updateMany({
          where: { referenceCode },
          data: { status: 'DEPOSIT_PAID', depositPaid: true, stripeSessionId: sessionObj?.id },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }
}
