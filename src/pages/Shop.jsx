import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import productsData from '../data/products.json'
import { useStore } from '../store/useStore'
import { Filter, SlidersHorizontal, X, RotateCcw } from 'lucide-react'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { getCurrentRegionConfig } = useStore()
  const regionConfig = getCurrentRegionConfig()

  // Extract initial query from URL
  const initialCategory = searchParams.get('category') || 'All'

  const [category, setCategory] = useState(initialCategory)
  const [selectedColor, setSelectedColor] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(1000)
  const [isFilterOpenMobile, setIsFilterOpenMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Sync state if URL query param changes
  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) {
      setCategory(cat)
    }
  }, [searchParams])

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((item) => {
        // Category filter
        if (category !== 'All' && item.category !== category) return false

        // Color filter
        if (selectedColor !== 'All') {
          const hasColor = item.colors.some((c) =>
            c.name.toLowerCase().includes(selectedColor.toLowerCase())
          )
          if (!hasColor) return false
        }

        // Price filter
        const price = regionConfig.currency === 'GBP' ? item.priceGBP : item.priceUSD
        if (price > maxPrice) return false

        return true
      })
      .sort((a, b) => {
        const priceA = regionConfig.currency === 'GBP' ? a.priceGBP : a.priceUSD
        const priceB = regionConfig.currency === 'GBP' ? b.priceGBP : b.priceUSD

        if (sortBy === 'price-asc') return priceA - priceB
        if (sortBy === 'price-desc') return priceB - priceA
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
      })
  }, [category, selectedColor, maxPrice, sortBy, regionConfig.currency])

  const handleCategoryChange = (newCat) => {
    setCategory(newCat)
    if (newCat === 'All') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', newCat)
    }
    setSearchParams(searchParams)
  }

  const handleResetFilters = () => {
    setCategory('All')
    setSelectedColor('All')
    setMaxPrice(1000)
    setSortBy('featured')
    searchParams.delete('category')
    setSearchParams(searchParams)
  }

  return (
    <div className="min-h-screen bg-[#F6F1E9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8924A] font-semibold">
            The Complete Atelier Collection
          </span>
          <h1 className="hero-headline font-serif text-[#121212] mt-2 mb-4">
            Curated <span className="italic font-serif text-[#B8924A]">Silhouettes</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#666] font-light leading-relaxed">
            Handcrafted with Italian vegetable-tanned leathers, solid brass hardware, and hand-stitched details. Each bag represents a harmonious dialogue between modern elegance and heritage artisanship.
          </p>
        </div>

        {/* Filter and Sort Bar */}
        <div className="bg-[#E8DFD0]/70 p-4 rounded-xs border border-[#CBBBA6]/60 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Horizontal Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {['All', 'Tote', 'Crossbody', 'Shoulder', 'Clutch', 'Backpack', 'Travel'].map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-xs uppercase tracking-[0.12em] px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                    category === cat
                      ? 'bg-[#121212] text-[#F6F1E9] font-medium'
                      : 'bg-white/60 text-[#555] hover:bg-white hover:text-[#121212]'
                  }`}
                >
                  {cat === 'All' ? 'All Handbags' : cat}
                </button>
              )
            )}
          </div>

          {/* Right Controls: Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3 justify-between md:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#777] uppercase tracking-wider hidden sm:inline">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#CBBBA6] text-xs py-1.5 px-3 rounded-xs text-[#121212] focus:outline-none focus:border-[#B8924A] uppercase tracking-wider"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              type="button"
              onClick={() => setIsFilterOpenMobile(!isFilterOpenMobile)}
              className="lg:hidden flex items-center gap-1.5 text-xs uppercase tracking-wider bg-[#121212] text-[#F6F1E9] px-3 py-1.5 rounded-xs"
            >
              <Filter size={13} />
              <span>Filters</span>
            </button>
          </div>

        </div>

        {/* Main Layout: Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Sidebar Filters */}
          <aside
            className={`lg:block ${
              isFilterOpenMobile ? 'block' : 'hidden'
            } bg-[#EFE9DF] p-6 rounded-xs border border-[#CBBBA6]/50 space-y-6 h-fit`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#D8CEBF]">
              <span className="font-serif text-lg text-[#121212]">Filter By</span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-[11px] text-[#8A5229] hover:underline"
              >
                <RotateCcw size={11} />
                <span>Reset</span>
              </button>
            </div>

            {/* Color Swatch Filter */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#555] font-semibold block mb-3">
                {regionConfig.spelling.colour} Finish
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'All', hex: 'transparent' },
                  { name: 'Tan', hex: '#8A5229' },
                  { name: 'Black', hex: '#141414' },
                  { name: 'Burgundy', hex: '#5E1A24' },
                  { name: 'Cream', hex: '#EDE5D8' },
                ].map((col) => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setSelectedColor(col.name)}
                    className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-all ${
                      selectedColor === col.name
                        ? 'border-[#B8924A] bg-[#B8924A]/15 font-semibold text-[#121212]'
                        : 'border-[#CBBBA6] bg-white text-[#555] hover:border-[#121212]'
                    }`}
                  >
                    {col.name !== 'All' && (
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20"
                        style={{ backgroundColor: col.hex }}
                      />
                    )}
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Maximum Price Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-[#555] font-semibold">
                  Max Price
                </span>
                <span className="text-xs font-mono font-bold text-[#121212]">
                  {regionConfig.symbol}{maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="1000"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#B8924A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#888] font-mono mt-1">
                <span>{regionConfig.symbol}200</span>
                <span>{regionConfig.symbol}1000</span>
              </div>
            </div>

            {/* Atelier Craftsmanship Note */}
            <div className="pt-4 border-t border-[#D8CEBF] text-xs text-[#777] leading-relaxed">
              <p className="font-serif italic text-sm text-[#121212] mb-1">
                The Evelora Standard
              </p>
              All bags include bespoke dustbags, numbered atelier authenticity certificates, and a lifetime stitching warranty.
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {/* Results count & status */}
            <div className="flex items-center justify-between mb-6 text-xs text-[#777]">
              <span>
                Showing <strong>{filteredProducts.length}</strong> creations
              </span>
              <span>
                Region: <strong className="text-[#121212]">{regionConfig.name}</strong> ({regionConfig.currency})
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-[#E8DFD0]/40 p-12 text-center rounded-xs border border-[#CBBBA6] my-8">
                <h3 className="font-serif text-2xl text-[#121212] mb-2">
                  No creations match your filters
                </h3>
                <p className="text-xs text-[#777] max-w-sm mx-auto mb-6">
                  Try adjusting the color, category, or maximum price threshold to see more handcrafted pieces.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="bg-[#121212] text-[#F6F1E9] px-6 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-[#B8924A] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
