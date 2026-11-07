import React from 'react'

export const COLOR_OPTIONS = [
  { id: 'tan', name: 'Saddle Tan', hex: '#8A5229', label: 'Tuscan Tan' },
  { id: 'black', name: 'Onyx Black', hex: '#141414', label: 'Onyx Black' },
  { id: 'burgundy', name: 'Royal Burgundy', hex: '#5E1A24', label: 'Royal Burgundy' },
  { id: 'cream', name: 'Tuscan Cream', hex: '#EDE5D8', label: 'Tuscan Cream' },
]

export default function ColorSwatches({
  activeColorHex,
  onColorChange,
  className = '',
  showLabel = true,
}) {
  const activeColor =
    COLOR_OPTIONS.find((c) => c.hex.toLowerCase() === activeColorHex.toLowerCase()) ||
    COLOR_OPTIONS[0]

  return (
    <div className={`flex flex-col items-center md:items-start ${className}`}>
      {showLabel && (
        <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-[0.18em] text-[#555] font-sans">
          <span>Finish:</span>
          <span className="text-[#121212] font-semibold">{activeColor.name}</span>
        </div>
      )}

      <div className="flex items-center gap-3">
        {COLOR_OPTIONS.map((color) => {
          const isActive = color.hex.toLowerCase() === activeColorHex.toLowerCase()
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onColorChange(color.hex, color.name)}
              className={`group relative p-1 rounded-full transition-all duration-300 focus:outline-none ${
                isActive ? 'scale-110' : 'hover:scale-105'
              }`}
              title={color.name}
              aria-label={`Select ${color.name}`}
            >
              {/* Outer gold ring for active state */}
              <div
                className={`absolute inset-0 rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'border-[#B8924A] scale-100 opacity-100'
                    : 'border-transparent opacity-0 group-hover:border-[#CBBBA6] group-hover:opacity-60'
                }`}
              />

              {/* Swatch circle */}
              <div
                className="w-6 h-6 rounded-full shadow-inner relative transition-transform duration-200"
                style={{
                  backgroundColor: color.hex,
                  border: color.id === 'cream' ? '1px solid #D1C7B7' : '1px solid rgba(0,0,0,0.1)',
                }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
