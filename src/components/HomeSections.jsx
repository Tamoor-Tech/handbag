import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { Star, ArrowRight, Check, Quote, Instagram, Mail, Sparkles, Award } from 'lucide-react'

// 1. Marquee Strip
export function MarqueeBanner() {
  return (
    <div className="bg-[#121212] text-[#F6F1E9] py-3.5 border-y border-[#262626] overflow-hidden select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center text-xs uppercase tracking-[0.25em] font-sans text-[#CBBBA6]">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="flex items-center gap-6 mx-4">
            <span className="text-[#B8924A]">✦</span>
            <span>Handcrafted in Florence & Porto</span>
            <span className="text-[#B8924A]">✦</span>
            <span>100% Certified Full-Grain Tuscan Calfskin</span>
            <span className="text-[#B8924A]">✦</span>
            <span>Solid 24K Gold-Electroplated Hardware</span>
            <span className="text-[#B8924A]">✦</span>
            <span>Complimentary Global Delivery</span>
            <span className="text-[#B8924A]">✦</span>
            <span>Lifetime Atelier Guarantee</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// 2. Shop By Category
export function CategoriesSection() {
  const categories = [
    {
      name: 'Structured Totes',
      slug: 'Tote',
      tagline: 'Refined workwear & daily carrying',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80',
    },
    {
      name: 'Crossbody Bags',
      slug: 'Crossbody',
      tagline: 'Hands-free effortless poise',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80',
    },
    {
      name: 'Shoulder Baguettes',
      slug: 'Shoulder',
      tagline: 'Classic 90s fluid curvature',
      image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=700&q=80',
    },
    {
      name: 'Evening Clutches',
      slug: 'Clutch',
      tagline: 'Jewellery-chain statement pieces',
      image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=700&q=80',
    },
    {
      name: 'City Backpacks',
      slug: 'Backpack',
      tagline: 'Ergonomic urban commuting',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80',
    },
    {
      name: 'Weekenders & Travel',
      slug: 'Travel',
      tagline: 'TSA-ready getaway luxury',
      image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=700&q=80',
    },
  ]

  return (
    <section className="py-20 bg-[#F6F1E9] border-b border-[#CBBBA6]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8924A] font-semibold">
              The Silhouettes
            </span>
            <h2 className="section-title font-serif text-[#121212] mt-1">
              Curated by <span className="italic font-serif text-[#B8924A]">Occasion</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#121212] hover:text-[#B8924A] font-semibold transition-colors animated-underline"
          >
            <span>Explore All Silhouettes</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className="group flex flex-col luxury-card bg-[#E8DFD0] rounded-xs overflow-hidden border border-[#CBBBA6]/40"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#D8CEBF] relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>
              <div className="p-3 text-center bg-[#F6F1E9]">
                <h4 className="font-serif text-sm font-medium text-[#121212] group-hover:text-[#B8924A] transition-colors">
                  {cat.name}
                </h4>
                <p className="text-[10px] text-[#777] mt-0.5 line-clamp-1">
                  {cat.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// 3. Craftsmanship & Sustainability Pillar
export function SustainabilitySection() {
  const { getCurrentRegionConfig } = useStore()
  const regionConfig = getCurrentRegionConfig()

  return (
    <section className="py-20 lg:py-28 bg-[#E8DFD0] border-b border-[#CBBBA6]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-xs overflow-hidden border border-[#CBBBA6] shadow-xl relative">
              <img
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80"
                alt="Artisan hands cutting leather"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Floating Atelier Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#121212] text-[#F6F1E9] p-5 shadow-2xl border border-[#B8924A] rounded-xs max-w-xs">
              <span className="font-serif text-2xl text-[#B8924A]">100% Traceable</span>
              <p className="text-xs text-[#CBBBA6] mt-1 leading-relaxed">
                Vegetable-tanned with plant tannins. Certified by the Italian Leather Consortium.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8924A] font-semibold">
              Conscious Luxury
            </span>
            <h2 className="section-title font-serif text-[#121212] mt-2 mb-6">
              Respect for <span className="italic font-serif text-[#B8924A]">Material</span> & Maker
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#555] font-light leading-relaxed mb-8">
              <p>
                In an era of fleeting trends and synthetic substitutes, Evelora chooses the deliberate path. Our hides are an agricultural byproduct from regulated European farms, tanned without heavy metals, chromium, or harsh chemicals.
              </p>
              <p>
                Our craftspeople work in sunlit ateliers in Tuscany and northern Portugal under exemplary labour conditions, earning dignified, fair wages that honour decades of technical mastery.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#CBBBA6]/60">
              <div>
                <span className="font-serif text-3xl font-semibold text-[#121212]">0%</span>
                <p className="text-xs text-[#777] mt-0.5">Heavy metals or chrome tanning</p>
              </div>
              <div>
                <span className="font-serif text-3xl font-semibold text-[#121212]">100%</span>
                <p className="text-xs text-[#777] mt-0.5">Plastic-free organic cotton dustbags</p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/story"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold bg-[#121212] hover:bg-[#B8924A] text-[#F6F1E9] px-6 py-3.5 transition-colors rounded-xs shadow-md"
              >
                <span>Read Our Atelier Manifesto</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// 4. Testimonials & Editorial Press
export function TestimonialsSection() {
  const reviews = [
    {
      quote:
        'The leather smells intoxicating—rich, earthy and refined. My Verona Crossbody has accompanied me from London Boardrooms to weekend breaks in the Cotswolds. The turn-lock is engineering poetry.',
      author: 'Lady Victoria C.',
      location: 'Kensington, London, UK',
      rating: 5,
      product: 'The Verona Crossbody in Saddle Tan',
    },
    {
      quote:
        'I own bags from the major Parisian fashion houses, and Evelora’s leather quality and stitching precision matches or exceeds them at a fraction of the cost. The customer concierge in New York was extraordinary.',
      author: 'Eleanor Vance',
      location: 'Manhattan, New York, USA',
      rating: 5,
      product: 'The Céleste Structured Tote',
    },
    {
      quote:
        'The delivery to Edinburgh arrived in two days inside an exquisite embossed box with a signed atelier certificate. The brass hardware has substantial weight. You can instantly feel the dedication.',
      author: 'Charlotte Sterling',
      location: 'Edinburgh, UK',
      rating: 5,
      product: 'The Seraphina Baguette in Burgundy',
    },
  ]

  const press = [
    { name: 'British Vogue', note: '“The new vanguard of accessible Tuscan luxury.”' },
    { name: 'Harper’s Bazaar', note: '“Impeccable silhouettes engineered for modern living.”' },
    { name: 'Elle UK', note: '“Timeless leathercraft designed to outlast fast fashion.”' },
    { name: 'The Financial Times', note: '“A masterclass in vegetable-tanned leather excellence.”' },
  ]

  return (
    <section className="py-20 lg:py-28 bg-[#F6F1E9] border-b border-[#CBBBA6]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Press Badges Strip */}
        <div className="mb-20 pb-12 border-b border-[#E8DFD0]">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[#8A857E] mb-8 font-medium">
            Recognised by the International Press
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {press.map((item) => (
              <div key={item.name} className="p-4 bg-[#E8DFD0]/40 rounded-xs border border-[#CBBBA6]/30">
                <h4 className="font-serif text-lg text-[#121212] tracking-wider font-semibold">
                  {item.name}
                </h4>
                <p className="text-[11px] text-[#777] italic mt-1 font-serif">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8924A] font-semibold">
            Client Testimonials
          </span>
          <h2 className="section-title font-serif text-[#121212] mt-1 mb-3">
            Voices of Our <span className="italic font-serif text-[#B8924A]">Patrons</span>
          </h2>
          <div className="flex items-center justify-center gap-1 text-[#B8924A]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} className="fill-[#B8924A]" />
            ))}
            <span className="text-xs font-mono font-medium text-[#121212] ml-2">
              4.9 / 5.0 (over 450+ verified UK & US reviews)
            </span>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#E8DFD0]/60 p-8 rounded-xs border border-[#CBBBA6]/60 flex flex-col justify-between shadow-xs relative"
            >
              <Quote className="text-[#B8924A]/30 mb-4" size={32} />
              <p className="text-xs sm:text-sm text-[#444] font-serif italic leading-relaxed mb-6">
                "{rev.quote}"
              </p>

              <div className="pt-4 border-t border-[#CBBBA6]/50">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-serif text-base font-semibold text-[#121212]">
                    {rev.author}
                  </h5>
                  <div className="flex text-[#B8924A]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-[#B8924A]" />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-[#777]">{rev.location}</p>
                <p className="text-[10px] text-[#8A5229] font-medium mt-1">Verified Purchase: {rev.product}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// 5. Instagram / UGC Gallery Grid
export function InstagramGrid() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80',
      handle: '@eleanor.style',
      likes: '1,420',
    },
    {
      url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
      handle: '@clara_voyage',
      likes: '984',
    },
    {
      url: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=600&q=80',
      handle: '@london_chic',
      likes: '2,110',
    },
    {
      url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&q=80',
      handle: '@sophia_atelier',
      likes: '830',
    },
  ]

  return (
    <section className="py-20 bg-[#F6F1E9] border-b border-[#CBBBA6]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8924A] font-semibold">
            #CarryYourStory
          </span>
          <h2 className="section-title font-serif text-[#121212] mt-1 mb-2">
            The Living <span className="italic font-serif text-[#B8924A]">Gallery</span>
          </h2>
          <p className="text-xs text-[#777]">
            Tag @evelora.leather on Instagram to be featured in our seasonal curation.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-xs bg-[#E8DFD0] border border-[#CBBBA6]/50 shadow-xs"
            >
              <img
                src={img.url}
                alt="Instagram patron look"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                <Instagram size={24} className="mb-2 text-[#B8924A]" />
                <span className="text-xs font-medium tracking-wider">{img.handle}</span>
                <span className="text-[10px] text-[#CBBBA6] mt-1">{img.likes} likes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 6. Newsletter Signup
export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
  }

  return (
    <section className="py-20 bg-[#121212] text-[#F6F1E9] grain-overlay relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8924A] font-semibold">
          Privileged Access
        </span>
        <h2 className="section-title font-serif mt-2 mb-4">
          Join the <span className="italic font-serif text-[#B8924A]">Atelier List</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#CBBBA6] font-light max-w-md mx-auto mb-8 leading-relaxed">
          Receive 10% off your inaugural handbag order, private invitations to limited batch leather drops, and editorial insights from our Tuscan workshop.
        </p>

        {subscribed ? (
          <div className="p-4 bg-[#1a1a1a] border border-[#B8924A] rounded-xs inline-flex items-center gap-3 text-xs text-[#F6F1E9]">
            <Sparkles className="text-[#B8924A]" size={18} />
            <span>Welcome to Evelora. Use code <strong>EVELORA10</strong> at checkout for 10% off.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-[#1c1c1c] border border-[#333] px-4 py-3.5 text-xs text-[#F6F1E9] placeholder:text-[#777] focus:outline-none focus:border-[#B8924A] rounded-xs"
            />
            <button
              type="submit"
              className="bg-[#B8924A] hover:bg-[#cfab63] text-[#121212] px-6 py-3.5 text-xs uppercase tracking-[0.16em] font-semibold transition-colors rounded-xs shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[10px] text-[#777] mt-4">
          We respect your inbox. Unsubscribe at any time with one click.
        </p>
      </div>
    </section>
  )
}
