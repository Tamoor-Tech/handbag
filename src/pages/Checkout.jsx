import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { ShieldCheck, CreditCard, Lock, ArrowRight, ChevronDown } from 'lucide-react'

export default function Checkout() {
  const { cart, getCurrentRegionConfig, getCartSubtotal, discountPercent, clearCart } = useStore()
  const regionConfig = getCurrentRegionConfig()
  const subtotal = getCartSubtotal()
  const discountAmount = subtotal * discountPercent
  const finalSubtotal = subtotal - discountAmount
  const shippingFee = finalSubtotal >= regionConfig.freeShippingThreshold ? 0 : regionConfig.standardShippingFee
  const total = finalSubtotal + shippingFee

  const [step, setStep] = useState(1) // 1=Contact, 2=Shipping, 3=Payment
  const [placed, setPlaced] = useState(false)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '',
    address1: '', address2: '', city: '',
    postcode: '', state: '', country: regionConfig.code === 'UK' ? 'United Kingdom' : 'United States',
    phone: '', shippingOption: 'standard', cardName: '', cardNumber: '', expiry: '', cvv: '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-[#F6F1E9] flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-[#E8DFD0] border-2 border-[#B8924A] flex items-center justify-center mb-6">
          <span className="text-3xl font-serif text-[#B8924A]">✓</span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8924A] font-semibold mb-2">
          Order Confirmed
        </span>
        <h1 className="font-serif text-4xl text-[#121212] mb-4">
          Thank You, <span className="italic text-[#B8924A]">{form.firstName || 'Valued Patron'}</span>
        </h1>
        <p className="text-sm text-[#555] max-w-md leading-relaxed mb-3">
          Your Evelora creation is being lovingly packaged in our Florentine atelier. You will receive a confirmation email and tracking details shortly.
        </p>
        <p className="text-xs text-[#999] mb-8">
          Estimated delivery: <strong className="text-[#121212]">{regionConfig.deliveryEstimate}</strong>
        </p>
        <Link to="/shop" className="bg-[#121212] hover:bg-[#B8924A] text-[#F6F1E9] px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold transition-colors rounded-xs">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F6F1E9] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="font-serif text-2xl tracking-[0.22em] text-[#121212] uppercase">Evelora</Link>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs">
            {['Contact', 'Shipping', 'Payment'].map((s, i) => (
              <React.Fragment key={s}>
                <span className={`uppercase tracking-wider font-medium px-2 py-0.5 rounded-full text-[11px] ${step === i + 1 ? 'bg-[#121212] text-[#F6F1E9]' : step > i + 1 ? 'text-[#B8924A]' : 'text-[#999]'}`}>
                  {s}
                </span>
                {i < 2 && <span className="text-[#CBBBA6] text-[10px]">›</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Left: Form Steps */}
            <div className="lg:col-span-7 space-y-6">

              {/* Step 1: Contact Info */}
              <div className="bg-white border border-[#E8DFD0] rounded-xs p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-serif text-xl text-[#121212]">Contact Information</h2>
                  {step > 1 && (
                    <button type="button" onClick={() => setStep(1)} className="text-xs text-[#B8924A] underline">Edit</button>
                  )}
                </div>

                {step === 1 ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">Email Address</label>
                      <input type="email" name="email" required value={form.email} onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs bg-[#FDFAF6]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">First Name</label>
                        <input type="text" name="firstName" required value={form.firstName} onChange={handleChange}
                          className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs bg-[#FDFAF6]" />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">Last Name</label>
                        <input type="text" name="lastName" required value={form.lastName} onChange={handleChange}
                          className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs bg-[#FDFAF6]" />
                      </div>
                    </div>
                    <button type="button" onClick={() => setStep(2)}
                      className="w-full bg-[#121212] hover:bg-[#B8924A] text-[#F6F1E9] py-3.5 text-xs uppercase tracking-[0.18em] font-semibold transition-colors rounded-xs mt-2">
                      Continue to Shipping
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-[#555]">{form.email} · {form.firstName} {form.lastName}</p>
                )}
              </div>

              {/* Step 2: Shipping Address */}
              {step >= 2 && (
                <div className="bg-white border border-[#E8DFD0] rounded-xs p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-serif text-xl text-[#121212]">Delivery Address</h2>
                    {step > 2 && <button type="button" onClick={() => setStep(2)} className="text-xs text-[#B8924A] underline">Edit</button>}
                  </div>

                  {step === 2 ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">Street Address</label>
                        <input type="text" name="address1" required value={form.address1} onChange={handleChange}
                          className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs bg-[#FDFAF6]" />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">Flat / Suite (optional)</label>
                        <input type="text" name="address2" value={form.address2} onChange={handleChange}
                          className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs bg-[#FDFAF6]" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">City</label>
                          <input type="text" name="city" required value={form.city} onChange={handleChange}
                            className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs bg-[#FDFAF6]" />
                        </div>
                        <div>
                          {/* Adapts label to UK postcode vs US ZIP */}
                          <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">
                            {regionConfig.code === 'UK' ? 'Postcode' : 'ZIP Code'}
                          </label>
                          <input type="text" name="postcode" required value={form.postcode} onChange={handleChange}
                            className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs bg-[#FDFAF6]" />
                        </div>
                      </div>
                      {regionConfig.code === 'US' && (
                        <div>
                          <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">State</label>
                          <select name="state" value={form.state} onChange={handleChange}
                            className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs bg-[#FDFAF6]">
                            <option value="">Select State</option>
                            {['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'].map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      )}

                      {/* Shipping Speed Options */}
                      <div className="pt-4 border-t border-[#E8DFD0] space-y-3">
                        <label className="block text-[11px] uppercase tracking-widest text-[#555]">Shipping Option</label>
                        {[
                          { id: 'standard', label: `Standard · ${regionConfig.deliveryEstimate}`, fee: shippingFee === 0 ? 'Complimentary' : `${regionConfig.symbol}${regionConfig.standardShippingFee}` },
                          { id: 'express', label: `Express · ${regionConfig.expressDeliveryEstimate}`, fee: `${regionConfig.symbol}${regionConfig.expressShippingFee}` },
                        ].map(opt => (
                          <label key={opt.id} className={`flex items-center justify-between p-3 rounded-xs border cursor-pointer transition-all ${form.shippingOption === opt.id ? 'border-[#B8924A] bg-[#EFE9DF]' : 'border-[#CBBBA6] hover:border-[#999]'}`}>
                            <div className="flex items-center gap-3">
                              <input type="radio" name="shippingOption" value={opt.id} checked={form.shippingOption === opt.id} onChange={handleChange} className="accent-[#B8924A]" />
                              <span className="text-sm text-[#121212]">{opt.label}</span>
                            </div>
                            <span className="text-sm font-semibold text-[#121212]">{opt.fee}</span>
                          </label>
                        ))}
                      </div>

                      <button type="button" onClick={() => setStep(3)}
                        className="w-full bg-[#121212] hover:bg-[#B8924A] text-[#F6F1E9] py-3.5 text-xs uppercase tracking-[0.18em] font-semibold transition-colors rounded-xs mt-2">
                        Continue to Payment
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-[#555]">{form.address1}, {form.city}, {form.postcode}</p>
                  )}
                </div>
              )}

              {/* Step 3: Payment */}
              {step >= 3 && (
                <div className="bg-white border border-[#E8DFD0] rounded-xs p-6">
                  <h2 className="font-serif text-xl text-[#121212] mb-2">Secure Payment</h2>
                  <p className="text-xs text-[#777] mb-5 flex items-center gap-1.5">
                    <Lock size={12} className="text-[#B8924A]" />
                    256-bit SSL Encrypted · Powered by Stripe (placeholder)
                  </p>

                  {/* Payment Method Icons */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay', 'PayPal', 'Klarna', regionConfig.code === 'US' ? 'Afterpay' : 'Clearpay'].map(pm => (
                      <span key={pm} className="text-[10px] font-mono uppercase bg-[#F0EBE2] px-2 py-1 border border-[#CBBBA6] rounded-xs text-[#555]">
                        {pm}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">Name on Card</label>
                      <input type="text" name="cardName" required value={form.cardName} onChange={handleChange}
                        className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs bg-[#FDFAF6]" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">Card Number</label>
                      <input type="text" name="cardNumber" required placeholder="•••• •••• •••• ••••" maxLength={19} value={form.cardNumber} onChange={handleChange}
                        className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs bg-[#FDFAF6] font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">Expiry (MM/YY)</label>
                        <input type="text" name="expiry" required placeholder="MM / YY" maxLength={7} value={form.expiry} onChange={handleChange}
                          className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs bg-[#FDFAF6] font-mono" />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">CVV</label>
                        <input type="password" name="cvv" required placeholder="•••" maxLength={4} value={form.cvv} onChange={handleChange}
                          className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs bg-[#FDFAF6] font-mono" />
                      </div>
                    </div>

                    <button type="submit"
                      className="w-full bg-[#B8924A] hover:bg-[#987637] text-[#121212] py-4 text-sm uppercase tracking-[0.2em] font-bold transition-colors rounded-xs mt-2 flex items-center justify-center gap-2 shadow-md">
                      <Lock size={15} />
                      <span>Place Order · {regionConfig.symbol}{total.toFixed(0)}</span>
                    </button>

                    <p className="text-[10px] text-[#888] text-center leading-relaxed">
                      This is a demonstration storefront. No real payment is processed.<br />
                      Connect Stripe or Shopify Storefront API to enable live transactions.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-[#EFE9DF] border border-[#CBBBA6]/60 rounded-xs p-6 sticky top-24">
                <h3 className="font-serif text-xl text-[#121212] mb-5 pb-4 border-b border-[#D8CEBF]">Order Summary</h3>

                <div className="space-y-4 mb-5">
                  {cart.map((item) => {
                    const itemPrice = regionConfig.currency === 'GBP' ? item.product.priceGBP : item.product.priceUSD
                    return (
                      <div key={item.cartItemId} className="flex items-center gap-3">
                        <div className="relative">
                          <img src={item.color.primaryImage} alt={item.product.name}
                            className="w-14 h-14 object-cover rounded-xs border border-[#CBBBA6]" />
                          <span className="absolute -top-1 -right-1 bg-[#121212] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-serif font-medium text-[#121212] truncate">{item.product.name}</p>
                          <p className="text-xs text-[#777]">{item.color.name}</p>
                        </div>
                        <span className="text-sm font-semibold shrink-0">{regionConfig.symbol}{itemPrice * item.quantity}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="space-y-2 text-xs text-[#555] pt-4 border-t border-[#D8CEBF]">
                  <div className="flex justify-between"><span>Subtotal</span><span>{regionConfig.symbol}{subtotal.toFixed(0)}</span></div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-[#5E1A24] font-medium">
                      <span>Discount</span>
                      <span>-{regionConfig.symbol}{discountAmount.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>{shippingFee === 0 ? 'Complimentary' : `${regionConfig.symbol}${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-semibold text-[#121212] pt-3 border-t border-[#D8CEBF]">
                    <span>Total</span>
                    <span>{regionConfig.symbol}{total.toFixed(0)}</span>
                  </div>
                  <p className="text-[10px] text-[#888] italic">{regionConfig.taxNotice}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#D8CEBF] flex items-center gap-2 text-[11px] text-[#777]">
                  <ShieldCheck size={15} className="text-[#B8924A]" />
                  <span>30-Day Returns · Secure 256-bit Encryption · Lifetime Atelier Guarantee</span>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
