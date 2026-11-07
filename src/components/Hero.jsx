import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HandbagScene from './HandbagScene'
import ColorSwatches, { COLOR_OPTIONS } from './ColorSwatches'
import { useStore } from '../store/useStore'
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'

export default function Hero() {
  const [activeColorHex, setActiveColorHex] = useState(COLOR_OPTIONS[0].hex)
  const { getCurrentRegionConfig } = useStore()
  const regionConfig = getCurrentRegionConfig()

  return (
    <section className="relative min-h-[92vh] flex items-center bg-gradient-to-b from-[#F6F1E9] via-[#F2ECE1] to-[#E8DFD0] overflow-hidden border-b border-[#CBBBA6]/30">
      {/* Huge Faded Brand Outline Watermark Behind Bag */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <span className="font-serif text-[18vw] font-bold text-transparent leading-none tracking-widest whitespace-nowrap opacity-[0.045] uppercase"
          style={{ WebkitTextStroke: '2px #121212' }}
        >
          EVELORA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Copy & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
            {/* Supertitle badge */}
            <div className="inline-flex items-center gap-2 mx-auto lg:mx-0 px-3 py-1 bg-[#E8DFD0] border border-[#CBBBA6] rounded-full text-[10px] uppercase tracking-[0.25em] text-[#8A5229] font-medium mb-6 animate-in fade-in duration-500">
              <Sparkles size={12} className="text-[#B8924A]" />
              <span>Collezione Primavera • Artisanal Leather</span>
            </div>

            {/* Headline with italic accent word */}
            <h1 className="hero-headline font-serif text-[#121212] font-normal tracking-tight mb-6">
              Carry Your <span className="italic font-serif text-[#B8924A] font-semibold">Story</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#555] font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Sculpted in Florence from hand-selected full-grain calfskin and 24K gold-electroplated solid brass. Handbags engineered for an enduring legacy, effortlessly attuned to modern life in London and New York.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <Link
                to="/shop"
                className="w-full sm:w-auto bg-[#121212] hover:bg-[#B8924A] text-[#F6F1E9] px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl rounded-xs group"
              >
                <span>Shop the Collection</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/story"
                className="w-full sm:w-auto border border-[#121212] hover:border-[#B8924A] hover:text-[#B8924A] text-[#121212] px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-xs text-center"
              >
                View Lookbook
              </Link>
            </div>

            {/* Color Swatch Selector for the 3D Handbag */}
            <div className="pt-2 pb-6 flex flex-col items-center lg:items-start border-t border-[#CBBBA6]/40">
              <ColorSwatches
                activeColorHex={activeColorHex}
                onColorChange={(hex) => setActiveColorHex(hex)}
                showLabel={true}
              />
            </div>

            {/* Trust Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#777] font-sans">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8924A]" />
                Free delivery over {regionConfig.symbol}{regionConfig.freeShippingThreshold}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8924A]" />
                30-day returns
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8924A]" />
                Handcrafted in Florence & Porto
              </span>
            </div>
          </div>

          {/* Right Column: 3D Interactive Handbag Canvas */}
          <div className="lg:col-span-6 order-1 lg:order-2 h-[420px] sm:h-[500px] lg:h-[620px] w-full relative">
            <HandbagScene colorHex={activeColorHex} />

            {/* Interactive hint floating badge */}
            <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
              <span className="bg-[#F6F1E9]/80 backdrop-blur-xs text-[10px] uppercase tracking-[0.2em] text-[#777] px-4 py-1.5 border border-[#CBBBA6]/50 rounded-full shadow-xs">
                Drag to rotate 3D bag • Tilt mouse for parallax
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
