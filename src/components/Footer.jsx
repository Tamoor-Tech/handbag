import React from 'react'
import { Link } from 'react-router-dom'
import RegionSelector from './RegionSelector'
import { useStore } from '../store/useStore'
import { Instagram, ArrowUpRight, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react'

export default function Footer() {
  const { getCurrentRegionConfig, setCcpaOpen } = useStore()
  const regionConfig = getCurrentRegionConfig()

  return (
    <footer className="bg-[#121212] text-[#F6F1E9] grain-overlay relative pt-16 pb-12 border-t border-[#262626]">
      {/* 1. Value Pillars Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#262626]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <Award className="text-[#B8924A] shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-serif text-lg text-[#F6F1E9]">Tuscan Heritage</h4>
              <p className="text-xs text-[#CBBBA6] mt-1 leading-relaxed">
                Hand-cut and stitched by master leather artisans in Florence & Porto.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Truck className="text-[#B8924A] shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-serif text-lg text-[#F6F1E9]">Complimentary Delivery</h4>
              <p className="text-xs text-[#CBBBA6] mt-1 leading-relaxed">
                On all UK orders over £150 and US orders over $200 with tracked courier.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <RefreshCw className="text-[#B8924A] shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-serif text-lg text-[#F6F1E9]">30-Day Returns</h4>
              <p className="text-xs text-[#CBBBA6] mt-1 leading-relaxed">
                Seamless returns and exchanges in original bespoke dust packaging.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ShieldCheck className="text-[#B8924A] shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-serif text-lg text-[#F6F1E9]">Lifetime Guarantee</h4>
              <p className="text-xs text-[#CBBBA6] mt-1 leading-relaxed">
                Every stitch and solid brass turn-lock backed by our atelier promise.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <span className="font-serif text-3xl tracking-[0.24em] uppercase text-[#F6F1E9]">
              Evelora
            </span>
            <p className="text-xs uppercase tracking-[0.25em] text-[#B8924A] mt-1 mb-4">
              Carry Your Story
            </p>
            <p className="text-xs text-[#CBBBA6] leading-relaxed max-w-sm mb-6">
              Accessible luxury rooted in timeless design, sculptural proportions, and hand-finished full-grain leather. Crafted for discerning tastemakers across the United Kingdom and North America.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-[#CBBBA6]">Atelier Hours:</span>
              <span className="text-[#F6F1E9] font-mono">{regionConfig.customerServiceHours}</span>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-[#B8924A] font-semibold mb-4">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-[#CBBBA6]">
              <li><Link to="/shop" className="hover:text-[#F6F1E9] transition-colors">All Handbags</Link></li>
              <li><Link to="/shop?category=Tote" className="hover:text-[#F6F1E9] transition-colors">Structured Totes</Link></li>
              <li><Link to="/shop?category=Crossbody" className="hover:text-[#F6F1E9] transition-colors">Crossbody Bags</Link></li>
              <li><Link to="/shop?category=Shoulder" className="hover:text-[#F6F1E9] transition-colors">Shoulder Baguettes</Link></li>
              <li><Link to="/shop?category=Clutch" className="hover:text-[#F6F1E9] transition-colors">Evening Clutches</Link></li>
              <li><Link to="/shop?category=Travel" className="hover:text-[#F6F1E9] transition-colors">Weekenders & Travel</Link></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-[#B8924A] font-semibold mb-4">
              Client Concierge
            </h5>
            <ul className="space-y-2.5 text-xs text-[#CBBBA6]">
              <li><Link to="/contact" className="hover:text-[#F6F1E9] transition-colors">Bespoke Concierge</Link></li>
              <li><Link to="/shipping-returns" className="hover:text-[#F6F1E9] transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="hover:text-[#F6F1E9] transition-colors">Leather Care Guide</Link></li>
              <li><Link to="/faq" className="hover:text-[#F6F1E9] transition-colors">FAQ & Authenticity</Link></li>
              <li><a href="mailto:concierge@evelora-luxury.com" className="hover:text-[#F6F1E9] transition-colors">atelier@evelora.com</a></li>
            </ul>
          </div>

          {/* Atelier & Story */}
          <div>
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-[#B8924A] font-semibold mb-4">
              The Maison
            </h5>
            <ul className="space-y-2.5 text-xs text-[#CBBBA6]">
              <li><Link to="/story" className="hover:text-[#F6F1E9] transition-colors">Our Story & Heritage</Link></li>
              <li><Link to="/journal" className="hover:text-[#F6F1E9] transition-colors">The Journal</Link></li>
              <li><Link to="/story#sustainability" className="hover:text-[#F6F1E9] transition-colors">Traceable Tanning</Link></li>
              <li><Link to="/story#press" className="hover:text-[#F6F1E9] transition-colors">Press & Editorial</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal, Payment & Region Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#262626]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-[#8A857E]">
          {/* Copyright & Legal Links */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-center lg:text-left">
            <span>© {new Date().getFullYear()} Evelora Luxury Leather Ltd. All rights reserved.</span>
            <Link to="/privacy" className="hover:text-[#F6F1E9] underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#F6F1E9] underline">Terms & Conditions</Link>
            {regionConfig.code === 'US' && (
              <button
                type="button"
                onClick={() => setCcpaOpen(true)}
                className="hover:text-[#B8924A] underline"
              >
                Do Not Sell or Share My Personal Info
              </button>
            )}
          </div>

          {/* Payment Badges */}
          <div className="flex items-center flex-wrap gap-2 text-[10px] uppercase font-mono tracking-wider">
            <span className="px-2 py-1 bg-[#1c1c1c] rounded-xs border border-[#333]">Visa</span>
            <span className="px-2 py-1 bg-[#1c1c1c] rounded-xs border border-[#333]">Mastercard</span>
            <span className="px-2 py-1 bg-[#1c1c1c] rounded-xs border border-[#333]">Amex</span>
            <span className="px-2 py-1 bg-[#1c1c1c] rounded-xs border border-[#333]">Apple Pay</span>
            <span className="px-2 py-1 bg-[#1c1c1c] rounded-xs border border-[#333]">Google Pay</span>
            <span className="px-2 py-1 bg-[#1c1c1c] rounded-xs border border-[#333]">Klarna</span>
            <span className="px-2 py-1 bg-[#1c1c1c] rounded-xs border border-[#333]">PayPal</span>
          </div>

          {/* Region Switcher */}
          <div>
            <RegionSelector />
          </div>
        </div>
      </div>
    </footer>
  )
}
