import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useStore } from '../store/useStore'

const FAQ_DATA = [
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'UK orders typically arrive within 1–3 working days via our tracked DHL and Royal Mail premium service. US orders arrive within 3–7 business days with UPS or FedEx. International orders to other destinations take 5–10 business days.',
      },
      {
        q: 'Do you offer free delivery?',
        a: 'Yes. Orders over £150 (UK) or $200 (US) qualify for complimentary standard tracked delivery. Express and next-day options are available at checkout at an additional fee.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to over 60 countries worldwide. International duties and taxes may apply and are the responsibility of the recipient. We recommend checking your local customs thresholds before ordering.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your returns policy?',
        a: 'We offer a 30-day no-quibble returns policy for items in original, unworn condition with the dust bag and all original packaging. Simply email concierge@evelora-luxury.com with your order number to initiate a return.',
      },
      {
        q: 'How do I exchange for a different colour or size?',
        a: 'Contact our concierge team within 30 days. We will arrange a complimentary collection and despatch your preferred alternative, subject to availability.',
      },
      {
        q: 'Are returns free?',
        a: 'Return postage is complimentary for UK and US customers. International customers are responsible for return shipping costs. We recommend using tracked postage for your protection.',
      },
    ],
  },
  {
    category: 'Product & Authenticity',
    questions: [
      {
        q: 'How do I know my bag is authentic Evelora?',
        a: 'Every Evelora bag is supplied with a numbered authenticity certificate signed by the artisan, a hand-stamped interior serial code, and a QR code that links to the production record on our secure registry.',
      },
      {
        q: 'What is full-grain leather and why does it matter?',
        a: 'Full-grain leather retains the outermost and strongest layer of the hide. Unlike corrected or bonded leather, it breathes, develops a unique patina, and becomes more beautiful with age. We use only hides rated in the top 3% of European production.',
      },
      {
        q: 'Can I personalise my bag with initials?',
        a: 'Yes. We offer blind embossing of up to three initials in a choice of positions on selected styles. Personalisation orders take an additional 7–10 days. Contact our concierge to arrange.',
      },
    ],
  },
  {
    category: 'Care & Maintenance',
    questions: [
      {
        q: 'How do I care for my Evelora leather bag?',
        a: 'Store in the provided dust bag away from direct sunlight and heat. Wipe with a soft microfibre cloth. Apply our Organic Leather Balm every six months to maintain suppleness. Do not use chemical cleaners or alcohol-based products.',
      },
      {
        q: 'What happens if my bag gets wet?',
        a: 'Vegetable-tanned leather can absorb water and develop tide marks. Blot dry immediately with a clean cloth and allow to dry naturally away from direct heat. Once dry, apply leather conditioner to restore moisture.',
      },
    ],
  },
]

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#E8DFD0] last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 focus:outline-none focus:text-[#B8924A]"
      >
        <span className="font-serif text-base text-[#121212] leading-snug">{question}</span>
        <ChevronDown size={16} className={`text-[#B8924A] shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-5 text-xs text-[#555] leading-relaxed max-w-2xl">{answer}</div>
      )}
    </div>
  )
}

export default function FAQ() {
  const { getCurrentRegionConfig } = useStore()
  const regionConfig = getCurrentRegionConfig()

  return (
    <div className="min-h-screen bg-[#F6F1E9] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8924A] font-semibold">Client Support</span>
          <h1 className="section-title font-serif text-[#121212] mt-2 mb-4">
            Frequently Asked <span className="italic text-[#B8924A]">Questions</span>
          </h1>
          <p className="text-xs text-[#666] font-light">
            Concierge team available {regionConfig.customerServiceHours}
          </p>
        </div>

        <div className="space-y-10">
          {FAQ_DATA.map((section) => (
            <div key={section.category}>
              <h2 className="font-serif text-2xl text-[#121212] mb-4 pb-3 border-b-2 border-[#B8924A]/30">
                {section.category}
              </h2>
              <div className="space-y-0">
                {section.questions.map((item) => (
                  <FAQItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#121212] text-[#F6F1E9] p-8 rounded-xs text-center grain-overlay">
          <h3 className="font-serif text-2xl mb-2">Still Have Questions?</h3>
          <p className="text-xs text-[#CBBBA6] mb-5 leading-relaxed">
            Our concierge team is available {regionConfig.customerServiceHours}. We are happy to help with bespoke personalisation, sizing guidance, and order enquiries.
          </p>
          <a href="mailto:atelier@evelora-luxury.com"
            className="inline-flex items-center gap-2 bg-[#B8924A] hover:bg-[#cfab63] text-[#121212] px-6 py-3 text-xs uppercase tracking-[0.18em] font-semibold transition-colors rounded-xs">
            Contact Concierge
          </a>
        </div>
      </div>
    </div>
  )
}
