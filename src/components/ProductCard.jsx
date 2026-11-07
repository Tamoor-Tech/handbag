import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { ShoppingBag, Star, Eye } from 'lucide-react'

export default function ProductCard({ product }) {
  const { getCurrentRegionConfig, addToCart } = useStore()
  const regionConfig = getCurrentRegionConfig()

  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const activeColor = product.colors[selectedColorIndex] || product.colors[0]
  const displayImage =
    isHovered && activeColor.secondaryImage
      ? activeColor.secondaryImage
      : activeColor.primaryImage

  const price = regionConfig.currency === 'GBP' ? product.priceGBP : product.priceUSD
  const compareAt =
    regionConfig.currency === 'GBP' ? product.compareAtPriceGBP : product.compareAtPriceUSD

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, activeColor.name, 1)
  }

  return (
    <div
      className="group relative flex flex-col bg-[#F6F1E9] border border-[#CBBBA6]/40 luxury-card rounded-xs overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <Link to={`/product/${product.handle}`} className="relative block aspect-[4/5] overflow-hidden bg-[#E8DFD0]">
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-[#121212] text-[#F6F1E9] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Origin Pill */}
        <span className="absolute top-3 right-3 z-10 bg-[#F6F1E9]/80 backdrop-blur-xs text-[#121212] text-[9px] uppercase tracking-[0.14em] px-2 py-0.5 border border-[#CBBBA6]/50">
          {product.origin}
        </span>

        {/* Primary / Secondary Image */}
        <img
          src={displayImage}
          alt={`${product.name} in ${activeColor.name}`}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Quick Add Slide-up Overlay on Desktop */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between gap-2 z-20">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex-1 bg-[#F6F1E9] hover:bg-[#B8924A] text-[#121212] hover:text-white py-2.5 px-3 text-[11px] uppercase font-semibold tracking-[0.15em] transition-colors flex items-center justify-center gap-1.5 shadow-lg"
          >
            <ShoppingBag size={14} />
            <span>Quick Add</span>
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Color Dots */}
          <div className="flex items-center gap-1.5 mb-2.5">
            {product.colors.map((col, idx) => (
              <button
                key={col.name}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedColorIndex(idx)
                }}
                className={`w-3.5 h-3.5 rounded-full transition-transform ${
                  selectedColorIndex === idx
                    ? 'ring-1 ring-offset-1 ring-[#B8924A] scale-110'
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
                aria-label={`Color ${col.name}`}
              />
            ))}
            <span className="text-[10px] text-[#777] ml-1 uppercase tracking-wider">
              {product.colors.length} {regionConfig.spelling.colour}s
            </span>
          </div>

          <Link to={`/product/${product.handle}`} className="block group-hover:text-[#B8924A] transition-colors">
            <h3 className="font-serif text-lg font-medium text-[#121212] leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#777] line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Price & Rating */}
        <div className="mt-4 pt-3 border-t border-[#E8DFD0] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-[#121212]">
              {regionConfig.symbol}{price}
            </span>
            {compareAt && (
              <span className="text-xs text-[#999] line-through">
                {regionConfig.symbol}{compareAt}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#8A5229]">
            <Star size={12} className="fill-[#B8924A] text-[#B8924A]" />
            <span className="font-mono font-medium">{product.rating}</span>
            <span className="text-[#999]">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  )
}
