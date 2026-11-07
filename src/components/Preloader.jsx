import React, { useEffect, useState } from 'react'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsFading(true)
            setTimeout(() => {
              if (onComplete) onComplete()
            }, 600)
          }, 300)
          return 100
        }
        // Rapid initial load then smooth finish
        const step = prev < 60 ? Math.random() * 20 + 10 : Math.random() * 12 + 4
        return Math.min(100, Math.floor(prev + step))
      })
    }, 80)

    return () => clearInterval(timer)
  }, [onComplete])

  if (progress >= 100 && isFading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#F6F1E9] flex flex-col items-center justify-center transition-opacity duration-700 opacity-0 pointer-events-none">
        <div className="text-center">
          <span className="font-serif text-3xl tracking-[0.25em] text-[#121212] uppercase">Evelora</span>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#B8924A] mt-2">Carry Your Story</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`fixed inset-0 z-50 bg-[#F6F1E9] flex flex-col items-center justify-center transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-xs w-full px-8 text-center flex flex-col items-center">
        {/* Brand Monogram */}
        <div className="w-16 h-16 border border-[#B8924A] flex items-center justify-center mb-6 relative">
          <div className="absolute inset-1 border border-[#B8924A]/40" />
          <span className="font-serif text-2xl font-semibold text-[#121212]">E</span>
        </div>

        <h1 className="font-serif text-3xl tracking-[0.25em] text-[#121212] uppercase mb-1">
          Evelora
        </h1>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#B8924A] mb-8">
          Atelier di Pelletteria
        </p>

        {/* Minimalist Progress Line */}
        <div className="w-full bg-[#E8DFD0] h-[2px] rounded-full overflow-hidden relative">
          <div
            className="bg-[#B8924A] h-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between w-full mt-3 text-[11px] font-mono text-[#8A857E]">
          <span>Loading Experience</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  )
}
