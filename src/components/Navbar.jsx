import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'
import RegionSelector from './RegionSelector'
import { ShoppingBag, Search, User, Menu, X, ArrowRight } from 'lucide-react'
import productsData from '../data/products.json'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()

  const {
    openCart,
    getCartTotalCount,
    getCurrentRegionConfig,
    isSearchOpen,
    setSearchOpen,
  } = useStore()

  const regionConfig = getCurrentRegionConfig()
  const cartCount = getCartTotalCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname, setSearchOpen])

  // Filter products for search modal
  const searchResults = searchQuery.trim()
    ? productsData.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.material.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  return (
    <>
      {/* 1. Announcement Bar */}
      <div className="bg-[#121212] text-[#F6F1E9] text-[11px] uppercase tracking-[0.2em] py-2 px-4 border-b border-[#282828] text-center relative z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden md:inline-block text-[10px] text-[#CBBBA6] tracking-[0.25em]">
            Italian Leather Handcrafted Atelier
          </span>

          <div className="mx-auto flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8924A] animate-pulse" />
            <span>
              Complimentary Delivery on orders over{' '}
              <strong className="text-[#B8924A] font-medium">
                {regionConfig.symbol}
                {regionConfig.freeShippingThreshold}
              </strong>{' '}
              • 30-Day Returns
            </span>
          </div>

          <div className="hidden md:block">
            <RegionSelector compact={true} />
          </div>
        </div>
      </div>

      {/* 2. Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F6F1E9]/95 backdrop-blur-md shadow-sm border-b border-[#CBBBA6]/30 py-3.5'
            : 'bg-[#F6F1E9] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 text-[#121212] hover:text-[#B8924A] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-1 text-[#121212] hover:text-[#B8924A] transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-medium uppercase tracking-[0.16em]">
            <Link
              to="/shop"
              className={`animated-underline transition-colors ${
                location.pathname === '/shop' ? 'text-[#B8924A]' : 'text-[#121212] hover:text-[#B8924A]'
              }`}
            >
              Shop All
            </Link>
            <Link
              to="/shop?category=Crossbody"
              className="animated-underline text-[#121212] hover:text-[#B8924A] transition-colors"
            >
              Crossbody
            </Link>
            <Link
              to="/shop?category=Tote"
              className="animated-underline text-[#121212] hover:text-[#B8924A] transition-colors"
            >
              Totes
            </Link>
            <Link
              to="/story"
              className={`animated-underline transition-colors ${
                location.pathname === '/story' ? 'text-[#B8924A]' : 'text-[#121212] hover:text-[#B8924A]'
              }`}
            >
              Our Story
            </Link>
            <Link
              to="/journal"
              className={`animated-underline transition-colors ${
                location.pathname === '/journal' ? 'text-[#B8924A]' : 'text-[#121212] hover:text-[#B8924A]'
              }`}
            >
              Journal
            </Link>
          </nav>

          {/* Center Brand Logo */}
          <Link
            to="/"
            className="flex flex-col items-center group text-center select-none"
            aria-label="Evelora Home"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-[#121212] uppercase font-medium transition-colors group-hover:text-[#B8924A]">
              Evelora
            </span>
            <span className="text-[8px] uppercase tracking-[0.38em] text-[#8A857E] mt-0.5">
              Firenze • London • New York
            </span>
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#121212] hover:text-[#B8924A] transition-colors"
              aria-label="Search Collection"
            >
              <Search size={18} />
              <span className="text-[11px]">Search</span>
            </button>

            <Link
              to="/contact"
              className="hidden sm:inline-block text-xs uppercase tracking-[0.14em] text-[#121212] hover:text-[#B8924A] transition-colors"
            >
              Concierge
            </Link>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={openCart}
              className="relative p-1.5 text-[#121212] hover:text-[#B8924A] transition-colors group flex items-center gap-1.5"
              aria-label="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag size={21} className="transition-transform group-hover:scale-105" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#5E1A24] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline-block text-[11px] font-medium tracking-[0.12em] uppercase">
                Bag
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden">
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#F6F1E9] p-6 shadow-2xl flex flex-col justify-between border-r border-[#CBBBA6]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DFD0]">
                <span className="font-serif text-2xl tracking-[0.2em] uppercase">Evelora</span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-[#121212]"
                  aria-label="Close Menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="py-4">
                <RegionSelector />
              </div>

              <nav className="flex flex-col space-y-4 py-4 text-sm uppercase tracking-[0.16em]">
                <Link to="/shop" className="hover:text-[#B8924A]">Shop All Handbags</Link>
                <Link to="/shop?category=Tote" className="hover:text-[#B8924A]">Structured Totes</Link>
                <Link to="/shop?category=Crossbody" className="hover:text-[#B8924A]">Crossbody Bags</Link>
                <Link to="/shop?category=Shoulder" className="hover:text-[#B8924A]">Shoulder Bags</Link>
                <Link to="/shop?category=Clutch" className="hover:text-[#B8924A]">Evening Clutches</Link>
                <Link to="/shop?category=Travel" className="hover:text-[#B8924A]">Travel & Weekenders</Link>
                <div className="h-px bg-[#E8DFD0] my-2" />
                <Link to="/story" className="hover:text-[#B8924A]">Our Story & Artisans</Link>
                <Link to="/journal" className="hover:text-[#B8924A]">The Journal</Link>
                <Link to="/contact" className="hover:text-[#B8924A]">Bespoke Concierge</Link>
                <Link to="/faq" className="hover:text-[#B8924A]">FAQs & Care</Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E8DFD0] text-xs text-[#777]">
              <p className="font-serif text-sm text-[#121212] mb-1">Evelora Concierge</p>
              <p>Email: atelier@evelora-luxury.com</p>
              <p className="mt-1">Hours: {regionConfig.customerServiceHours}</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Instant Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#121212]/80 backdrop-blur-md flex flex-col items-center justify-start pt-20 px-4">
          <div className="max-w-2xl w-full bg-[#F6F1E9] p-6 sm:p-8 rounded-sm shadow-2xl border border-[#B8924A] relative">
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-[#777] hover:text-[#121212]"
              aria-label="Close search"
            >
              <X size={22} />
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8924A] font-semibold">
              Search Collection
            </span>

            <div className="relative mt-2 mb-6">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by handbag name, category (e.g. Tote), or leather..."
                className="w-full bg-transparent border-b-2 border-[#121212] py-3 text-lg font-serif placeholder:font-sans placeholder:text-sm placeholder:text-[#999] focus:outline-none focus:border-[#B8924A]"
              />
              <Search className="absolute right-2 top-3 text-[#B8924A]" size={20} />
            </div>

            {/* Quick Suggestions / Results */}
            <div>
              {searchQuery.trim() === '' ? (
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#888] mb-3">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Verona Crossbody', 'Structured Tote', 'Italian Nappa', 'Royal Burgundy', 'Florence Weekender'].map(
                      (item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setSearchQuery(item)}
                          className="text-xs bg-[#E8DFD0] hover:bg-[#B8924A] hover:text-white px-3 py-1.5 rounded-full transition-colors"
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="max-h-72 overflow-y-auto space-y-3">
                  {searchResults.length === 0 ? (
                    <p className="text-sm text-[#777] py-4 text-center">
                      No handbags found matching "{searchQuery}".
                    </p>
                  ) : (
                    searchResults.map((prod) => {
                      const price =
                        regionConfig.currency === 'GBP' ? prod.priceGBP : prod.priceUSD
                      return (
                        <Link
                          key={prod.id}
                          to={`/product/${prod.handle}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-4 p-2 hover:bg-[#E8DFD0] rounded-sm transition-colors group"
                        >
                          <img
                            src={prod.colors[0].primaryImage}
                            alt={prod.name}
                            className="w-14 h-14 object-cover rounded-xs border border-[#CBBBA6]"
                          />
                          <div className="flex-1">
                            <h4 className="font-serif text-base text-[#121212] group-hover:text-[#B8924A] transition-colors">
                              {prod.name}
                            </h4>
                            <p className="text-xs text-[#777]">{prod.category} • {prod.material}</p>
                          </div>
                          <span className="text-sm font-semibold text-[#121212]">
                            {regionConfig.symbol}{price}
                          </span>
                        </Link>
                      )
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
