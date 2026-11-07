import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, Tag } from 'lucide-react'

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    getCurrentRegionConfig,
    getCartSubtotal,
    promoCode,
    discountPercent,
    applyPromo,
    removePromo,
    addToCart,
  } = useStore()

  const [promoInput, setPromoInput] = useState('')
  const [promoMessage, setPromoMessage] = useState(null)

  const regionConfig = getCurrentRegionConfig()
  const subtotal = getCartSubtotal()
  const discountAmount = subtotal * discountPercent
  const finalSubtotal = Math.max(0, subtotal - discountAmount)

  // Free delivery calculation
  const threshold = regionConfig.freeShippingThreshold
  const amountToFreeShipping = Math.max(0, threshold - finalSubtotal)
  const shippingProgress = Math.min(100, Math.floor((finalSubtotal / threshold) * 100))

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (!promoInput) return
    const res = applyPromo(promoInput)
    setPromoMessage(res)
    if (res.success) setPromoInput('')
  }

  // Quick upsell accessory
  const careKitUpsell = {
    id: 'prod-care-kit',
    name: 'Organic Leather Care Balm & Brush',
    priceGBP: 28,
    priceUSD: 35,
    colors: [{ name: 'Neutral', hex: '#EDE5D8', primaryImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80' }],
  }

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#F6F1E9] shadow-2xl flex flex-col justify-between border-l border-[#CBBBA6] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#E8DFD0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl text-[#121212]">Your Shopping Bag</h2>
            <span className="text-xs bg-[#E8DFD0] px-2 py-0.5 rounded-full font-mono text-[#555]">
              {cart.reduce((n, i) => n + i.quantity, 0)}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-1.5 text-[#555] hover:text-[#121212] transition-colors"
            aria-label="Close Shopping Bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#EFE9DF] px-6 py-3 border-b border-[#E8DFD0]">
          <div className="flex items-center justify-between text-xs text-[#121212] mb-1.5 font-medium">
            {amountToFreeShipping > 0 ? (
              <span>
                Add{' '}
                <strong className="text-[#B8924A]">
                  {regionConfig.symbol}
                  {amountToFreeShipping.toFixed(0)}
                </strong>{' '}
                more for complimentary shipping
              </span>
            ) : (
              <span className="text-[#987637] font-semibold flex items-center gap-1">
                <Sparkles size={13} /> You have unlocked complimentary delivery!
              </span>
            )}
            <span className="font-mono text-[11px] text-[#777]">{shippingProgress}%</span>
          </div>
          <div className="w-full bg-[#D8CEBF] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#B8924A] h-full transition-all duration-300 ease-out"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <span className="font-serif text-3xl text-[#999] mb-3">Your bag is empty</span>
              <p className="text-xs text-[#777] max-w-xs mb-6">
                Explore our handcrafted Italian leather creations and carry your timeless story.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="bg-[#121212] text-[#F6F1E9] px-6 py-3 text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#B8924A] transition-colors"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const price =
                regionConfig.currency === 'GBP'
                  ? item.product.priceGBP
                  : item.product.priceUSD

              return (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 p-3 bg-white/70 border border-[#E8DFD0] rounded-xs shadow-xs"
                >
                  <img
                    src={item.color.primaryImage}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xs border border-[#CBBBA6]/40"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-base text-[#121212] font-medium leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[#999] hover:text-[#5E1A24] p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <p className="text-xs text-[#777] mt-0.5">
                        Finish: <span className="text-[#121212]">{item.color.name}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F2EDE4]">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#CBBBA6] rounded-xs bg-[#F6F1E9]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 hover:bg-[#E8DFD0] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 hover:bg-[#E8DFD0] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#121212]">
                        {regionConfig.symbol}
                        {price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          )}

          {/* Upsell Item */}
          {cart.length > 0 && (
            <div className="p-3 bg-[#EFE9DF] border border-[#D5C9B8] rounded-xs flex items-center justify-between gap-3 mt-4">
              <img
                src={careKitUpsell.colors[0].primaryImage}
                alt="Care Kit"
                className="w-12 h-12 object-cover rounded-xs"
              />
              <div className="flex-1">
                <p className="text-xs font-serif font-medium text-[#121212]">
                  {careKitUpsell.name}
                </p>
                <p className="text-[11px] text-[#777]">
                  {regionConfig.symbol}
                  {regionConfig.currency === 'GBP' ? careKitUpsell.priceGBP : careKitUpsell.priceUSD}
                </p>
              </div>
              <button
                type="button"
                onClick={() => addToCart(careKitUpsell, 'Neutral', 1)}
                className="text-[10px] uppercase tracking-wider font-semibold bg-[#121212] text-[#F6F1E9] px-2.5 py-1.5 hover:bg-[#B8924A] transition-colors"
              >
                + Add
              </button>
            </div>
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E8DFD0] bg-[#EFE9DF]/50 space-y-3">
            {/* Promo Code Input */}
            <div>
              {promoCode ? (
                <div className="flex items-center justify-between text-xs bg-[#B8924A]/15 text-[#987637] p-2 rounded-xs border border-[#B8924A]/40 font-mono">
                  <span>Code applied: {promoCode} (-{(discountPercent * 100)}%)</span>
                  <button type="button" onClick={removePromo} className="underline text-xs">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (try EVELORA10)"
                      className="w-full text-xs py-2 px-3 bg-white border border-[#CBBBA6] focus:outline-none focus:border-[#B8924A] uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#121212] hover:bg-[#B8924A] text-white text-[11px] uppercase tracking-wider px-3 py-2 font-medium transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoMessage && (
                <p
                  className={`text-[11px] mt-1 ${
                    promoMessage.success ? 'text-[#8A5229]' : 'text-red-700'
                  }`}
                >
                  {promoMessage.message}
                </p>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-1 text-xs text-[#555] pt-2 border-t border-[#E8DFD0]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {regionConfig.symbol}
                  {subtotal.toFixed(0)}
                </span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-[#5E1A24] font-medium">
                  <span>Welcome Privileges</span>
                  <span>
                    -{regionConfig.symbol}
                    {discountAmount.toFixed(0)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {amountToFreeShipping === 0
                    ? 'Complimentary'
                    : `${regionConfig.symbol}${regionConfig.standardShippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-semibold text-[#121212] pt-2 border-t border-[#D8CEBF]">
                <span>Estimated Total</span>
                <span>
                  {regionConfig.symbol}
                  {(
                    finalSubtotal +
                    (amountToFreeShipping === 0 ? 0 : regionConfig.standardShippingFee)
                  ).toFixed(0)}
                </span>
              </div>
              <p className="text-[10px] text-[#777] italic text-right">
                {regionConfig.taxNotice}
              </p>
            </div>

            {/* Checkout Link */}
            <Link
              to="/checkout"
              onClick={closeCart}
              className="w-full bg-[#121212] hover:bg-[#B8924A] text-[#F6F1E9] py-3.5 px-4 text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors rounded-xs shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={15} />
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#777] pt-1">
              <ShieldCheck size={13} className="text-[#B8924A]" />
              <span>Encrypted 256-Bit Checkout • 30-Day Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
