import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Globe, Heart } from 'lucide-react'

export default function Story() {
  return (
    <div className="min-h-screen bg-[#F6F1E9]">
      {/* Hero Banner */}
      <section className="relative bg-[#121212] text-[#F6F1E9] grain-overlay py-24 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1600&q=60"
            alt="Florence atelier"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8924A] font-semibold">Est. 2018 · Firenze</span>
          <h1 className="font-serif text-5xl sm:text-7xl font-medium mt-3 mb-5 leading-tight">
            The <span className="italic text-[#B8924A]">Evelora</span> Story
          </h1>
          <p className="text-sm sm:text-base text-[#CBBBA6] font-light leading-relaxed max-w-2xl mx-auto">
            Born from a belief that luxury should not require compromise — neither of quality, nor of conscience. We craft handbags that outlast trends and accumulate a patina of lived memories.
          </p>
        </div>
      </section>

      {/* Founder Letter */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8924A] font-semibold">A Letter From Our Founder</span>
        <h2 className="section-title font-serif text-[#121212] mt-2 mb-8">
          Why We <span className="italic text-[#B8924A]">Create</span>
        </h2>
        <div className="text-sm sm:text-base text-[#555] font-serif italic leading-[2] space-y-5 text-left">
          <p>"I founded Evelora after spending two decades in the fashion industry watching extraordinary leather work disappear behind designer logos and inflated price tags. Our Tuscan master craftsmen — some third-generation — deserved a brand as meticulous as their stitching.</p>
          <p>The name Evelora is a composite of Italian and Portuguese words for 'enduring light.' Every bag is a quiet statement: beautifully made, thoughtfully designed, and built to carry your story across decades — not just seasons.</p>
          <p>We keep our runs intentionally limited. We keep our prices honest. And we never, ever compromise on the leather."</p>
        </div>
        <div className="mt-8 text-right">
          <p className="font-serif text-lg text-[#121212]">— Isabella Marchetti, Founder & Creative Director</p>
          <p className="text-xs text-[#777]">Florence, Italy & London, United Kingdom</p>
        </div>
      </section>

      {/* Three Pillars */}
      <section id="sustainability" className="bg-[#E8DFD0] py-20 border-t border-b border-[#CBBBA6]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title font-serif text-[#121212]">
              Our Three <span className="italic text-[#B8924A]">Commitments</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Heart,
                title: 'Artisanal Heritage',
                body: 'Every Evelora silhouette is hand-assembled by a single artisan who signs the interior certificate. We maintain relationships with the same Florentine families across generations.',
              },
              {
                icon: Leaf,
                title: 'Responsible Sourcing',
                body: 'Our hides are a by-product of the food industry, tanned with organic mimosa and chestnut extracts over 40 days. Zero chrome, zero heavy metals, zero compromise.',
              },
              {
                icon: Globe,
                title: 'Transparent Pricing',
                body: 'We publish our cost breakdown openly. Our prices reflect the true cost of exceptional labour and materials — not a logo tax. Accessible luxury means exactly that.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="text-center p-8 bg-[#F6F1E9] rounded-xs border border-[#CBBBA6] shadow-xs">
                <div className="w-14 h-14 rounded-full bg-[#E8DFD0] border border-[#B8924A]/40 flex items-center justify-center mx-auto mb-5">
                  <Icon size={24} className="text-[#B8924A]" />
                </div>
                <h3 className="font-serif text-xl text-[#121212] mb-3">{title}</h3>
                <p className="text-xs text-[#555] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section id="press" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title font-serif text-[#121212]">
            Recognised by the <span className="italic text-[#B8924A]">Press</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { pub: 'British Vogue', quote: '"The new vanguard of accessible Tuscan luxury."', year: '2024' },
            { pub: 'Harper\'s Bazaar', quote: '"Impeccable silhouettes, timeless resonance."', year: '2024' },
            { pub: 'The FT How To Spend It', quote: '"A masterclass in vegetable-tanned excellence."', year: '2023' },
            { pub: 'WSJ Magazine', quote: '"Evelora represents the future of intelligent luxury."', year: '2024' },
          ].map(item => (
            <div key={item.pub} className="p-6 bg-[#E8DFD0]/50 border border-[#CBBBA6]/50 rounded-xs">
              <span className="font-serif text-lg font-semibold text-[#121212]">{item.pub}</span>
              <p className="text-[11px] italic text-[#777] mt-2 font-serif leading-relaxed">{item.quote}</p>
              <span className="text-[10px] text-[#B8924A] font-mono mt-2 block">{item.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA to Shop */}
      <div className="bg-[#121212] text-center py-16 px-4 grain-overlay">
        <h2 className="font-serif text-3xl text-[#F6F1E9] mb-4">
          Carry Your <span className="italic text-[#B8924A]">Story</span>
        </h2>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-[#B8924A] hover:bg-[#cfab63] text-[#121212] px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-colors rounded-xs shadow-xl">
          <span>Explore the Collection</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
