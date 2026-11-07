import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import CraftsmanshipStorytelling from '../components/CraftsmanshipStorytelling'
import ProductCard from '../components/ProductCard'
import {
  MarqueeBanner,
  CategoriesSection,
  SustainabilitySection,
  TestimonialsSection,
  InstagramGrid,
  NewsletterSection,
} from '../components/HomeSections'
import productsData from '../data/products.json'
import { ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react'

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState('All')

  // Filter products for the featured section
  const filteredProducts =
    selectedFilter === 'All'
      ? productsData
      : productsData.filter((p) => p.category === selectedFilter)

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E9]">
      {/* 1. Full Viewport 3D Animated Hero */}
      <Hero />

      {/* 2. Marquee Strip */}
      <MarqueeBanner />

      {/* 3. Featured Collection Section */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E8DFD0]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8924A] font-semibold">
              The Permanent Edition
            </span>
            <h2 className="section-title font-serif text-[#121212] mt-1">
              Featured <span className="italic font-serif text-[#B8924A]">Creations</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
            {['All', 'Crossbody', 'Tote', 'Shoulder', 'Clutch'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`text-xs uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  selectedFilter === cat
                    ? 'bg-[#121212] text-[#F6F1E9] font-medium shadow-xs'
                    : 'bg-[#E8DFD0]/80 text-[#555] hover:bg-[#E8DFD0] hover:text-[#121212]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold border-b-2 border-[#121212] pb-1 hover:border-[#B8924A] hover:text-[#B8924A] transition-colors"
          >
            <span>View All Handbags & Accessories</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 4. Scroll-Pinned / Interactive 3D Craftsmanship Storytelling */}
      <CraftsmanshipStorytelling />

      {/* 5. Shop by Silhouette / Category */}
      <CategoriesSection />

      {/* 6. Conscious Luxury & Sustainability */}
      <SustainabilitySection />

      {/* 7. Client Testimonials & Editorial Press */}
      <TestimonialsSection />

      {/* 8. Instagram / Living Gallery */}
      <InstagramGrid />

      {/* 9. Newsletter Atelier List */}
      <NewsletterSection />
    </div>
  )
}
