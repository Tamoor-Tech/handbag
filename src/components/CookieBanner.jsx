import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { ShieldCheck, X } from 'lucide-react'

export default function CookieBanner() {
  const { cookieConsent, setCookieConsent, region, isCcpaOpen, setCcpaOpen } = useStore()
  const [showPreferences, setShowPreferences] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)
  const [marketingEnabled, setMarketingEnabled] = useState(true)

  if (cookieConsent && !isCcpaOpen) return null

  const handleAcceptAll = () => {
    setCookieConsent('all')
  }

  const handleRejectNonEssential = () => {
    setCookieConsent('essential-only')
  }

  const handleSavePreferences = () => {
    setCookieConsent(`custom:analytics=${analyticsEnabled},marketing=${marketingEnabled}`)
    setShowPreferences(false)
  }

  return (
    <>
      {/* Cookie Banner (GDPR / PECR compliant) */}
      {!cookieConsent && (
        <div
          role="dialog"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md bg-[#121212] text-[#F6F1E9] p-6 border border-[#B8924A]/40 shadow-2xl z-50 rounded-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={18} className="text-[#B8924A]" />
            <span className="font-serif text-lg tracking-wide">Privacy & Bespoke Experience</span>
          </div>

          <p className="text-xs text-[#CBBBA6] leading-relaxed mb-4">
            At Evelora, we respect your privacy. We use essential cookies to maintain our storefront, and optional cookies to tailor your luxury shopping experience and analyze our traffic in accordance with{' '}
            {region === 'UK' ? 'UK GDPR & PECR' : 'US privacy regulations'}.
          </p>

          {showPreferences && (
            <div className="mb-4 pt-3 border-t border-[#333] space-y-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <span>Strictly Necessary (Required)</span>
                <input type="checkbox" checked disabled className="accent-[#B8924A]" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Performance & Analytics</span>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="accent-[#B8924A]"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Personalised Curation</span>
                <input
                  type="checkbox"
                  checked={marketingEnabled}
                  onChange={(e) => setMarketingEnabled(e.target.checked)}
                  className="accent-[#B8924A]"
                />
              </label>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {!showPreferences ? (
              <>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 bg-[#B8924A] hover:bg-[#cfab63] text-[#121212] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors rounded-sm"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="border border-[#CBBBA6]/40 hover:border-[#F6F1E9] text-[#F6F1E9] px-3 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors rounded-sm"
                >
                  Reject Optional
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreferences(true)}
                  className="text-[11px] text-[#CBBBA6] hover:text-[#B8924A] underline py-1 px-1 transition-colors"
                >
                  Manage
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="flex-1 bg-[#B8924A] text-[#121212] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors rounded-sm"
                >
                  Save Choices
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  className="text-[11px] text-[#CBBBA6] hover:text-white px-2 py-1"
                >
                  Back
                </button>
              </>
            )}
          </div>

          {region === 'US' && (
            <div className="mt-3 pt-2 text-[11px] border-t border-[#262626]">
              <button
                type="button"
                onClick={() => setCcpaOpen(true)}
                className="text-[#CBBBA6] hover:text-[#B8924A] underline text-left"
              >
                Do Not Sell or Share My Personal Information (CCPA)
              </button>
            </div>
          )}
        </div>
      )}

      {/* CCPA Modal for US Visitors */}
      {isCcpaOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F6F1E9] text-[#121212] max-w-lg w-full p-8 border border-[#B8924A] rounded-sm relative shadow-2xl">
            <button
              type="button"
              onClick={() => setCcpaOpen(false)}
              className="absolute top-4 right-4 text-[#777] hover:text-[#121212]"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8924A] font-semibold">
              California Consumer Privacy Act (CCPA)
            </span>
            <h3 className="font-serif text-2xl mt-1 mb-3">Do Not Sell or Share My Information</h3>

            <p className="text-xs text-[#555] leading-relaxed mb-4">
              Under the California Consumer Privacy Act and California Privacy Rights Act (CPRA), you have the right to direct Evelora to not sell or share your personal information for targeted advertising.
            </p>

            <div className="bg-[#E8DFD0] p-4 rounded-sm mb-6 text-xs text-[#333] space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="accent-[#B8924A] w-4 h-4 rounded"
                />
                <span>Opt-out of cross-contextual behavioral advertising</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="accent-[#B8924A] w-4 h-4 rounded"
                />
                <span>Limit use of sensitive personal information</span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setCookieConsent('ccpa-opt-out')
                  setCcpaOpen(false)
                }}
                className="flex-1 bg-[#121212] hover:bg-[#2a2a2a] text-[#F6F1E9] py-3 text-xs uppercase tracking-[0.18em] transition-colors font-medium rounded-sm"
              >
                Confirm Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
