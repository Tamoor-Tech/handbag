import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, ContactShadows, Environment } from '@react-three/drei'
import HandbagModel from './HandbagModel'
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react'

const CRAFT_STAGES = [
  {
    step: '01',
    title: 'Full-Grain Tuscan Calfskin',
    italicWord: 'Calfskin',
    subtitle: 'Slow Vegetable-Tanning Method',
    description:
      'We source only the upper 3% of European hides, tanned organically in Tuscany with chestnut and mimosa barks over forty days. It retains its organic grain, soft temper, and develops a magnificent golden patina with age.',
    callout: 'Tanned in Tuscany, Italy',
    cameraPos: [0, 0.2, 3.8],
    bagRotation: [0, 0.4, 0],
    focusBadge: '100% Organic Extracts',
  },
  {
    step: '02',
    title: 'Solid Brass 24K Hardware',
    italicWord: 'Hardware',
    subtitle: 'Jewellery-Grade Precision Turn-Locks',
    description:
      'Every clasp, ring, and protective foot is cold-cast from solid brass before receiving a 24-karat gold electroplating bath. Corrosion-proof, tactile, and designed to click shut with a satisfying acoustic snap.',
    callout: '24K Gold Electroplated',
    cameraPos: [0, -0.15, 2.7],
    bagRotation: [0.1, 0, 0],
    focusBadge: 'Solid Brass Core',
  },
  {
    step: '03',
    title: 'Hand-Stitched Saddle Seams',
    italicWord: 'Seams',
    subtitle: 'The Heritage Parisian Saddle Stitch',
    description:
      'Two needles and continuous double-waxed linen thread pass through every hand-punched hole in opposing directions. If any single stitch were ever cut, the remaining seam stays completely intact.',
    callout: 'Guaranteed for a Lifetime',
    cameraPos: [0.3, 0.1, 2.9],
    bagRotation: [-0.05, 0.8, 0.05],
    focusBadge: 'Double-Waxed Linen',
  },
]

export default function CraftsmanshipStorytelling() {
  const [activeStage, setActiveStage] = useState(0)
  const current = CRAFT_STAGES[activeStage]

  return (
    <section className="bg-[#121212] text-[#F6F1E9] grain-overlay py-20 lg:py-28 relative overflow-hidden border-t border-b border-[#282828]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8924A] font-semibold">
            Atelier Mastery
          </span>
          <h2 className="section-title font-serif mt-2 mb-4">
            Anatomy of a <span className="italic font-serif text-[#B8924A]">Masterpiece</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#CBBBA6] font-light leading-relaxed">
            Every Evelora silhouette represents over eighteen hours of focused artisanal hand-assembly in our Italian workshop. Discover the micro-details that distinguish our leathercraft.
          </p>
        </div>

        {/* Interactive Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* 3D Inspecting Stage Viewport */}
          <div className="lg:col-span-7 h-[380px] sm:h-[480px] lg:h-[550px] relative bg-[#181818] rounded-xs border border-[#333] shadow-2xl overflow-hidden">
            
            {/* Live Focus Callout Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#121212]/90 backdrop-blur-md px-3 py-1.5 border border-[#B8924A] rounded-xs shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#B8924A] animate-ping" />
              <span className="text-[11px] font-mono tracking-wider text-[#F6F1E9]">
                {current.focusBadge}
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20 text-[10px] uppercase tracking-widest text-[#B8924A] bg-[#121212]/80 px-2.5 py-1 border border-[#333]">
              Stage {current.step} / 03
            </div>

            {/* 3D Model with Stage Perspective */}
            <Canvas
              camera={{ position: current.cameraPos, fov: 38 }}
              gl={{ antialias: true, alpha: true }}
              shadows
            >
              <ambientLight intensity={1.5} />
              <directionalLight position={[4, 5, 4]} intensity={2.8} />
              <directionalLight position={[-3, -2, -2]} intensity={0.7} color="#B8924A" />
              <Environment preset="studio" />

              <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.15}>
                <group rotation={current.bagRotation} position={[0, -0.15, 0]}>
                  <HandbagModel colorHex="#8A5229" />
                </group>
              </Float>

              <ContactShadows
                position={[0, -1.2, 0]}
                opacity={0.7}
                scale={5}
                blur={2.4}
                far={3}
                color="#000000"
              />
            </Canvas>

            {/* Micro Callout floating at bottom */}
            <div className="absolute bottom-4 inset-x-4 flex justify-between items-center text-[11px] text-[#CBBBA6] bg-[#121212]/80 backdrop-blur-xs px-4 py-2 border border-[#2a2a2a]">
              <span>Feature: <strong className="text-white">{current.callout}</strong></span>
              <span className="text-[10px] text-[#B8924A] tracking-wider uppercase">Hand-Inspected</span>
            </div>
          </div>

          {/* Right Column: Stage Controls & Deep Story */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Stage Selector Tabs */}
            <div className="space-y-3">
              {CRAFT_STAGES.map((stg, idx) => {
                const isActive = activeStage === idx
                return (
                  <button
                    key={stg.step}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className={`w-full text-left p-4 rounded-xs border transition-all duration-300 flex items-start justify-between ${
                      isActive
                        ? 'bg-[#1e1e1e] border-[#B8924A] shadow-lg translate-x-1'
                        : 'bg-[#151515] border-[#262626] hover:border-[#444] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#B8924A] font-bold">
                          {stg.step}
                        </span>
                        <h4 className="font-serif text-lg text-[#F6F1E9]">
                          {stg.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#CBBBA6] mt-1 pl-7">
                        {stg.subtitle}
                      </p>
                    </div>

                    <ChevronRight
                      size={18}
                      className={`mt-1 transition-transform ${
                        isActive ? 'text-[#B8924A] translate-x-1' : 'text-[#555]'
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            {/* Active Stage Detail Description Box */}
            <div className="p-6 bg-[#1a1a1a] border border-[#B8924A]/40 rounded-xs shadow-inner">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8924A] font-semibold">
                Artisan Specifications
              </span>
              <h3 className="font-serif text-2xl text-[#F6F1E9] mt-1 mb-3">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#CBBBA6] font-light leading-relaxed mb-4">
                {current.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-[#F6F1E9] pt-3 border-t border-[#333]">
                <CheckCircle2 size={16} className="text-[#B8924A]" />
                <span>Individually inspected and signed by master craftsman</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
