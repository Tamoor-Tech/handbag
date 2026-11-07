import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import ProductViewer3D from '../components/ProductViewer3D'
import ProductCard from '../components/ProductCard'
import productsData from '../data/products.json'
import { Star, Plus, Minus, ShoppingBag, ChevronDown, ArrowLeft, Shield, Truck, RotateCcw, Award } from 'lucide-react'

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-[#E8DFD0]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#121212]">{title}</span>
        <ChevronDown size={16} className={`text-[#B8924A] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-5 text-xs text-[#555] leading-relaxed space-y-2">{children}</div>}
    </div>
  )
}

export default function Product() {
  const { handle } = useParams()
  const navigate = useNavigate()
  const { addToCart, getCurrentRegionConfig } = useStore()

  const product = productsData.find((p) => p.handle === handle)
  const regionConfig = getCurrentRegionConfig()

  const [selectedColorIdx, setSelectedColorIdx] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6F1E9] text-center px-4 py-24">
        <span className="font-serif text-5xl text-[#121212] mb-4">404</span>
        <p className="text-sm text-[#777] mb-6">This handbag no longer exists in our atelier.</p>
        <Link to="/shop" className="bg-[#121212] text-[#F6F1E9] px-6 py-3 text-xs uppercase tracking-widest font-medium hover:bg-[#B8924A] transition-colors">
          Return to Collection
        </Link>
      </div>
    )
  }

  const activeColor = product.colors[selectedColorIdx]
  const price = regionConfig.currency === 'GBP' ? product.priceGBP : product.priceUSD
  const compareAt = regionConfig.currency === 'GBP' ? product.compareAtPriceGBP : product.compareAtPriceUSD
  const relatedProducts = productsData.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3)

  const allImages = product.colors.flatMap((c) =>
    [c.primaryImage, c.secondaryImage].filter(Boolean)
  )

  const handleAddToCart = () => {
    addToCart(product, activeColor.name, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="min-h-screen bg-[#F6F1E9] pb-24">
      {/* JSON-LD Product Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        brand: { '@type': 'Brand', name: 'Evelora' },
        offers: {
          '@type': 'Offer',
          priceCurrency: regionConfig.currency,
          price: price,
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        },
      })}} />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center gap-2 text-xs text-[#888]">
        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-[#B8924A] transition-colors">
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#B8924A] transition-colors">Collection</Link>
        <span>/</span>
        <span className="text-[#121212] font-medium truncate max-w-[150px]">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: 3D Viewer + Gallery */}
          <div className="lg:sticky lg:top-24">
            <ProductViewer3D
              colorHex={activeColor.hex}
              images={allImages}
              productName={product.name}
            />

            {/* Thumbnail Strip */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {product.colors.map((col, idx) => (
                <button
                  key={col.name}
                  type="button"
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`w-14 h-14 rounded-xs overflow-hidden border-2 transition-all ${
                    selectedColorIdx === idx ? 'border-[#B8924A] shadow-md' : 'border-[#CBBBA6]/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={col.primaryImage} alt={col.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="py-4">
            {/* Badge & Origin */}
            <div className="flex items-center gap-3 mb-3">
              {product.badge && (
                <span className="bg-[#5E1A24] text-[#F6F1E9] text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium">
                  {product.badge}
                </span>
              )}
              <span className="text-xs text-[#8A857E] uppercase tracking-[0.15em]">
                Atelier · {product.origin}
              </span>
            </div>

            {/* Name */}
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#121212] leading-tight mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-[#777] font-serif italic mb-4">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex text-[#B8924A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-[#B8924A]' : 'text-[#CBBBA6]'} />
                ))}
              </div>
              <span className="text-xs font-mono font-semibold">{product.rating}</span>
              <span className="text-xs text-[#999]">({product.reviewCount} reviews)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#E8DFD0]">
              <span className="font-serif text-3xl font-semibold text-[#121212]">
                {regionConfig.symbol}{price}
              </span>
              {compareAt && (
                <span className="text-base text-[#999] line-through">
                  {regionConfig.symbol}{compareAt}
                </span>
              )}
              <span className="text-[11px] text-[#777] italic">{regionConfig.taxNotice}</span>
            </div>

            {/* Colour Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#555] font-semibold">
                  Finish: <span className="text-[#121212]">{activeColor.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((col, idx) => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`relative p-1 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#B8924A] focus:ring-offset-2 ${
                      selectedColorIdx === idx ? 'scale-110' : 'hover:scale-105'
                    }`}
                    title={col.name}
                    aria-label={`Select ${col.name}`}
                  >
                    <div className={`absolute inset-0 rounded-full border-2 transition-all ${selectedColorIdx === idx ? 'border-[#B8924A]' : 'border-transparent'}`} />
                    <div
                      className="w-7 h-7 rounded-full shadow-inner"
                      style={{
                        backgroundColor: col.hex,
                        border: col.name.includes('Cream') ? '1px solid #D1C7B7' : '1px solid rgba(0,0,0,0.1)',
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Bag */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-[#CBBBA6] bg-white rounded-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-12 flex items-center justify-center hover:bg-[#E8DFD0] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-mono text-sm font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-12 flex items-center justify-center hover:bg-[#E8DFD0] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-4 text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 rounded-xs shadow-md ${
                  added
                    ? 'bg-[#5E1A24] text-[#F6F1E9]'
                    : 'bg-[#121212] hover:bg-[#B8924A] text-[#F6F1E9]'
                }`}
              >
                <ShoppingBag size={16} className={added ? 'animate-bounce' : ''} />
                <span>{added ? 'Added to Your Bag ✓' : 'Add to Bag'}</span>
              </button>
            </div>

            {/* Delivery Estimate */}
            <div className="bg-[#EFE9DF] p-4 rounded-xs border border-[#D8CEBF] mb-6 flex items-start gap-3">
              <Truck size={18} className="text-[#B8924A] shrink-0 mt-0.5" />
              <div className="text-xs text-[#555] leading-relaxed">
                <p><strong className="text-[#121212]">Free Delivery</strong> · {regionConfig.deliveryEstimate} with tracked courier</p>
                <p className="mt-0.5">Express: {regionConfig.expressDeliveryEstimate} available at checkout</p>
                <p className="mt-0.5 text-[#8A5229] font-medium">Free returns within 30 days</p>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-[#555] font-light leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mb-8 pb-6 border-b border-[#E8DFD0]">
              {[
                { icon: Shield, label: 'Secure\nCheckout' },
                { icon: RotateCcw, label: '30-Day\nReturns' },
                { icon: Award, label: 'Lifetime\nGuarantee' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1 text-[10px] uppercase tracking-wider text-[#777]">
                  <Icon size={18} className="text-[#B8924A]" />
                  <span className="whitespace-pre-line leading-tight">{label}</span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="space-y-0">
              <Accordion title="Details & Materials" defaultOpen>
                <p><strong>Material:</strong> {product.material}</p>
                <p><strong>Lining:</strong> {product.lining}</p>
                <p><strong>Hardware:</strong> {product.hardware}</p>
                <ul className="mt-2 space-y-1 pl-4 list-disc">
                  {product.details.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </Accordion>

              <Accordion title="Dimensions & Weight">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-[#121212] mb-1 uppercase tracking-wider text-[10px]">Metric (cm)</p>
                    <p>{product.dimensions.cm}</p>
                    <p className="mt-1">Weight: {product.weight.kg}</p>
                    <p className="mt-1">Strap drop: {product.strapDrop.cm}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#121212] mb-1 uppercase tracking-wider text-[10px]">Imperial (in)</p>
                    <p>{product.dimensions.inches}</p>
                    <p className="mt-1">Weight: {product.weight.lbs}</p>
                    <p className="mt-1">Strap drop: {product.strapDrop.inches}</p>
                  </div>
                </div>
              </Accordion>

              <Accordion title="Delivery & Returns">
                <p><strong>Standard ({regionConfig.name}):</strong> {regionConfig.deliveryEstimate}</p>
                <p><strong>Express:</strong> {regionConfig.expressDeliveryEstimate}</p>
                <p className="mt-2">Free returns within 30 days of receipt in original condition. Initiate via our concierge at atelier@evelora-luxury.com.</p>
                <p className="mt-1 text-[10px] text-[#888] italic">{regionConfig.taxNotice}</p>
              </Accordion>

              <Accordion title="Leather Care Guide">
                <p>{product.care}</p>
                <p className="mt-2">We recommend our <strong>Evelora Organic Leather Balm</strong> (sold separately) applied biannually to preserve suppleness and deepen the natural patina.</p>
              </Accordion>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E8DFD0]">
            <h2 className="font-serif text-3xl text-[#121212] mb-8">
              You May Also <span className="italic text-[#B8924A]">Adore</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
