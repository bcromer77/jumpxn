'use client';
import { useState } from 'react';
import { ChevronDown, Send, AlertCircle, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

const faqs = [
  { q: 'How do I cancel my reservation?', a: 'You can cancel your reservation at any time from your dashboard. Your $150 deposit will be marked for refund. Contact us if you need assistance.' },
  { q: 'What is the refund policy?', a: 'Your $150 reservation deposit is fully refundable if production is delayed, cancelled, or if you choose to cancel before your unit ships.' },
  { q: 'Is the JumpPack 2.0 safe?', a: 'Safety is a core design priority. Always wear appropriate protective equipment. Ride within your ability. Supervise younger riders at all times.' },
  { q: 'When will my JumpPack 2.0 ship?', a: 'Production timelines are being finalised. Founding Riders will receive priority shipping and regular updates on progress.' },
  { q: 'How do I contact JumpXN?', a: 'Use the contact form below to send us a message. We aim to respond within 48 hours.' },
  { q: 'What disciplines does the JumpPack 2.0 support?', a: 'BMX, Mountain Bike, Skateboarding, and Scooter. The ramp geometry is designed for multiple wheel sizes and ride styles.' },
];

export function SupportClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.subject || !formData.message) { toast.error('Please fill in all fields.'); return; }
    setSubmitting(true);
    try {
      const res = await fetch('/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (res.ok) { toast.success('Message sent! We will get back to you soon.'); setFormData({ email: '', subject: '', message: '' }); }
      else { const data = await res.json().catch(() => ({})); toast.error(data?.error ?? 'Failed to send. Please try again.'); }
    } catch { toast.error('Network error. Please try again.'); }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <section className="py-32 sm:py-40 bg-obsidian text-center">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <p className="text-copper text-xs font-bold uppercase tracking-[0.3em] mb-4">SUPPORT</p>
          <h1 className="hero-headline text-[clamp(2rem,6vw,4rem)] text-alabaster mb-4" style={{ fontFamily: 'var(--font-display)' }}>HOW CAN WE HELP?</h1>
          <p className="text-titanium text-lg max-w-xl mx-auto">Find answers to common questions or get in touch with the JumpXN team.</p>
        </div>
      </section>

      <section className="py-16 bg-carbon">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          {/* FAQ */}
          <h2 className="text-alabaster text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>FREQUENTLY ASKED QUESTIONS</h2>
          <div className="flex flex-col gap-2 mb-16">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-obsidian border border-white/5" style={{ borderRadius: '12px' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                  <span className="text-sm font-medium text-alabaster flex items-center gap-2"><HelpCircle size={16} className="text-copper flex-shrink-0" />{faq.q}</span>
                  <ChevronDown size={18} className={`text-titanium transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <div className="px-6 pb-4 text-sm text-titanium leading-relaxed ml-7">{faq.a}</div>}
              </div>
            ))}
          </div>

          {/* Returns */}
          <div className="bg-obsidian border border-white/5 p-6 mb-16" style={{ borderRadius: '12px' }}>
            <h3 className="text-alabaster font-bold mb-3">Returns & Cancellation</h3>
            <p className="text-titanium text-sm leading-relaxed">Your $150 reservation deposit is fully refundable at any time before your unit ships. If production is delayed or cancelled by JumpXN, your deposit is automatically refunded. To cancel, use the cancellation button in your dashboard or contact us below.</p>
          </div>

          {/* Safety */}
          <div className="bg-obsidian border border-gold/20 p-6 mb-16" style={{ borderRadius: '12px' }}>
            <h3 className="text-gold font-bold mb-3">Safety Information</h3>
            <p className="text-titanium text-sm leading-relaxed">Always wear appropriate protective equipment including helmet, gloves and pads. Ride within your ability. Supervise younger riders at all times. Inspect the ramp before each use. JumpXN does not accept liability for injuries sustained during use.</p>
          </div>

          {/* Contact Form */}
          <div id="contact">
            <h2 className="text-alabaster text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>CONTACT US</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="email" placeholder="Your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-obsidian border border-white/10 px-4 py-3 text-sm text-alabaster placeholder-titanium/50 focus:border-copper focus:outline-none transition-colors" style={{ borderRadius: '12px' }} required />
              <input type="text" placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="bg-obsidian border border-white/10 px-4 py-3 text-sm text-alabaster placeholder-titanium/50 focus:border-copper focus:outline-none transition-colors" style={{ borderRadius: '12px' }} required />
              <textarea placeholder="Your message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} className="bg-obsidian border border-white/10 px-4 py-3 text-sm text-alabaster placeholder-titanium/50 focus:border-copper focus:outline-none transition-colors resize-none" style={{ borderRadius: '12px' }} required />
              <p className="text-xs text-titanium">Your data will be stored securely and used only to respond to your enquiry.</p>
              <button type="submit" disabled={submitting} className="bg-copper text-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors disabled:opacity-50 flex items-center justify-center gap-2" style={{ borderRadius: '12px' }}><Send size={16} />{submitting ? 'SENDING...' : 'SEND MESSAGE'}</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
