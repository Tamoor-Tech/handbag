import React, { useState, useRef, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { Globe, Check, ChevronDown } from 'lucide-react'

export default function RegionSelector({ compact = false }) {
  const { region, setRegion, regions } = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const current = regions[region] || regions.UK

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs tracking-wider uppercase font-sans text-[#121212] hover:text-[#B8924A] transition-colors py-1 px-2 rounded focus:outline-none focus:ring-1 focus:ring-[#B8924A]"
        aria-label="Select Region and Currency"
        aria-expanded={isOpen}
      >
        <Globe size={14} className="text-[#B8924A]" />
        <span className="font-medium">
          {compact ? `${current.code} (${current.symbol})` : `${current.name} • ${current.currency}`}
        </span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-[#F6F1E9] border border-[#CBBBA6] shadow-xl p-3 z-50 rounded-sm text-left animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] uppercase tracking-widest text-[#8A857E] pb-2 mb-2 border-b border-[#E8DFD0]">
            Regional Storefront
          </div>

          <div className="space-y-1.5">
            {Object.values(regions).map((item) => {
              const isSelected = item.code === region
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setRegion(item.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-start justify-between p-2.5 rounded-sm transition-colors text-left ${
                    isSelected
                      ? 'bg-[#E8DFD0] text-[#121212] border border-[#B8924A]/40'
                      : 'hover:bg-[#EFE9DF] text-[#444]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-serif font-semibold text-[#121212]">
                        {item.name}
                      </span>
                      <span className="text-xs bg-[#B8924A]/15 text-[#987637] px-1.5 py-0.5 rounded font-mono font-bold">
                        {item.currency} ({item.symbol})
                      </span>
                    </div>
                    <div className="text-[11px] text-[#777] mt-0.5">
                      Free delivery over {item.symbol}{item.freeShippingThreshold} • {item.deliveryEstimate}
                    </div>
                    <div className="text-[10px] text-[#8A5229] mt-0.5 italic">
                      {item.taxNotice}
                    </div>
                  </div>
                  {isSelected && <Check size={16} className="text-[#B8924A] shrink-0 mt-0.5" />}
                </button>
              )
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E8DFD0] text-[10px] text-[#777] flex justify-between items-center">
            <span>Support: {current.customerServiceHours}</span>
          </div>
        </div>
      )}
    </div>
  )
}
