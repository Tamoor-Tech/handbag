import { create } from 'zustand'

const REGIONS = {
  UK: {
    code: 'UK',
    name: 'United Kingdom',
    currency: 'GBP',
    symbol: '£',
    freeShippingThreshold: 150,
    standardShippingFee: 10,
    expressShippingFee: 18,
    deliveryEstimate: '1–3 working days',
    expressDeliveryEstimate: 'Next working day',
    taxNotice: 'Includes 20% UK VAT',
    customerServiceHours: '09:00 – 18:00 GMT (Mon – Fri)',
    spelling: {
      colour: 'colour',
      jewellery: 'jewellery',
      handcrafted: 'handcrafted',
      customised: 'customised',
      favourite: 'favourite',
      artisanal: 'artisanal',
    },
  },
  US: {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    symbol: '$',
    freeShippingThreshold: 200,
    standardShippingFee: 15,
    expressShippingFee: 28,
    deliveryEstimate: '3–7 business days',
    expressDeliveryEstimate: '2 business days',
    taxNotice: 'Sales tax calculated at checkout',
    customerServiceHours: '09:00 – 18:00 EST (Mon – Fri)',
    spelling: {
      colour: 'color',
      jewellery: 'jewelry',
      handcrafted: 'handcrafted',
      customised: 'customized',
      favourite: 'favorite',
      artisanal: 'artisanal',
    },
  },
}

// Initial state from localStorage if available
const getStoredRegion = () => {
  try {
    const saved = localStorage.getItem('evelora_region')
    if (saved && REGIONS[saved]) return saved
  } catch (e) {
    // ignore
  }
  return 'UK'
}

const getStoredCart = () => {
  try {
    const saved = localStorage.getItem('evelora_cart')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    // ignore
  }
  return []
}

const getStoredCookieConsent = () => {
  try {
    return localStorage.getItem('evelora_cookie_consent') || null
  } catch (e) {
    return null
  }
}

export const useStore = create((set, get) => ({
  // Region & Localisation State
  region: getStoredRegion(),
  regions: REGIONS,
  setRegion: (regionCode) => {
    if (!REGIONS[regionCode]) return
    try {
      localStorage.setItem('evelora_region', regionCode)
    } catch (e) {}
    set({ region: regionCode })
  },
  getCurrentRegionConfig: () => REGIONS[get().region] || REGIONS.UK,

  // Cart State
  cart: getStoredCart(),
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  addToCart: (product, colorName, quantity = 1) => {
    const state = get()
    const colorObj = product.colors.find((c) => c.name === colorName) || product.colors[0]
    const cartItemId = `${product.id}-${colorObj.name}`

    const existingIndex = state.cart.findIndex((item) => item.cartItemId === cartItemId)
    let updatedCart

    if (existingIndex > -1) {
      updatedCart = state.cart.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
      )
    } else {
      updatedCart = [
        ...state.cart,
        {
          cartItemId,
          product,
          color: colorObj,
          quantity,
        },
      ]
    }

    try {
      localStorage.setItem('evelora_cart', JSON.stringify(updatedCart))
    } catch (e) {}

    set({ cart: updatedCart, isCartOpen: true })
  },

  updateQuantity: (cartItemId, newQty) => {
    const state = get()
    let updatedCart
    if (newQty <= 0) {
      updatedCart = state.cart.filter((item) => item.cartItemId !== cartItemId)
    } else {
      updatedCart = state.cart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    }
    try {
      localStorage.setItem('evelora_cart', JSON.stringify(updatedCart))
    } catch (e) {}
    set({ cart: updatedCart })
  },

  removeFromCart: (cartItemId) => {
    const state = get()
    const updatedCart = state.cart.filter((item) => item.cartItemId !== cartItemId)
    try {
      localStorage.setItem('evelora_cart', JSON.stringify(updatedCart))
    } catch (e) {}
    set({ cart: updatedCart })
  },

  clearCart: () => {
    try {
      localStorage.removeItem('evelora_cart')
    } catch (e) {}
    set({ cart: [] })
  },

  // Discount / Promo
  promoCode: '',
  discountPercent: 0,
  applyPromo: (code) => {
    const normalized = (code || '').trim().toUpperCase()
    if (normalized === 'EVELORA10' || normalized === 'WELCOME10') {
      set({ promoCode: normalized, discountPercent: 0.1 })
      return { success: true, message: '10% welcome discount applied!' }
    }
    if (normalized === 'VIP20') {
      set({ promoCode: normalized, discountPercent: 0.2 })
      return { success: true, message: '20% VIP collector discount applied!' }
    }
    return { success: false, message: 'Invalid promo code. Try EVELORA10' }
  },
  removePromo: () => set({ promoCode: '', discountPercent: 0 }),

  // Cart Calculations
  getCartSubtotal: () => {
    const state = get()
    const region = state.getCurrentRegionConfig()
    return state.cart.reduce((total, item) => {
      const price = region.currency === 'GBP' ? item.product.priceGBP : item.product.priceUSD
      return total + price * item.quantity
    }, 0)
  },

  getCartTotalCount: () => {
    const state = get()
    return state.cart.reduce((sum, item) => sum + item.quantity, 0)
  },

  // Search Modal
  isSearchOpen: false,
  setSearchOpen: (val) => set({ isSearchOpen: val }),

  // Cookie Consent (GDPR / CCPA)
  cookieConsent: getStoredCookieConsent(),
  setCookieConsent: (val) => {
    try {
      localStorage.setItem('evelora_cookie_consent', val)
    } catch (e) {}
    set({ cookieConsent: val })
  },

  // CCPA Modal
  isCcpaOpen: false,
  setCcpaOpen: (val) => set({ isCcpaOpen: val }),
}))
