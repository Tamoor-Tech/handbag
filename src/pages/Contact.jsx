import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react'

export default function Contact() {
  const { getCurrentRegionConfig } = useStore()
  const regionConfig = getCurrentRegionConfig()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#F6F1E9] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8924A] font-semibold">Get in Touch</span>
          <h1 className="section-title font-serif text-[#121212] mt-2 mb-4">
            Bespoke <span className="italic text-[#B8924A]">Concierge</span>
          </h1>
          <p className="text-xs text-[#666] font-light leading-relaxed">
            Our client concierge team is available across both Greenwich Mean Time and Eastern Standard Time to assist with orders, bespoke enquiries, and gifting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Contact Form */}
          <div className="lg:col-span-7">
            {sent ? (
              <div className="bg-[#E8DFD0] border border-[#B8924A] p-10 rounded-xs text-center">
                <div className="w-14 h-14 bg-[#B8924A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-[#B8924A]" size={22} />
                </div>
                <h3 className="font-serif text-2xl text-[#121212] mb-2">Message Received</h3>
                <p className="text-xs text-[#555] leading-relaxed">
                  Thank you, {form.name}. A member of our concierge team will respond within 24 hours during business hours ({regionConfig.customerServiceHours}).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-[#E8DFD0] rounded-xs p-8 space-y-5 shadow-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">Full Name</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs" />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">Email Address</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">Subject</label>
                  <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required
                    className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs">
                    <option value="">Select a topic</option>
                    <option>Order Enquiry</option>
                    <option>Bespoke & Personalisation</option>
                    <option>Returns & Exchanges</option>
                    <option>Gifting & Corporate</option>
                    <option>Press & Editorial Collaboration</option>
                    <option>General Enquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#555] mb-1.5">Your Message</label>
                  <textarea rows={5} required value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    placeholder="Tell us how we can assist you..."
                    className="w-full border border-[#CBBBA6] px-4 py-2.5 text-sm focus:outline-none focus:border-[#B8924A] rounded-xs resize-none" />
                </div>
                <button type="submit"
                  className="w-full bg-[#121212] hover:bg-[#B8924A] text-[#F6F1E9] py-4 text-xs uppercase tracking-[0.18em] font-semibold transition-colors rounded-xs flex items-center justify-center gap-2">
                  <Send size={14} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {[
              { icon: Mail, label: 'Email Concierge', value: 'atelier@evelora-luxury.com', note: 'Response within 24 hours' },
              { icon: Phone, label: 'Telephone', value: regionConfig.code === 'UK' ? '+44 (0)20 7946 0988' : '+1 (212) 555 0199', note: regionConfig.customerServiceHours },
              { icon: MapPin, label: 'Atelier Address', value: 'Via dei Servi 14, 50122 Firenze, Italy', note: 'Visits by appointment only' },
              { icon: Clock, label: 'Client Hours', value: regionConfig.customerServiceHours, note: regionConfig.code === 'UK' ? 'Also 04:00–13:00 EST' : 'Also 14:00–23:00 GMT' },
            ].map(({ icon: Icon, label, value, note }) => (
              <div key={label} className="bg-[#E8DFD0]/60 border border-[#CBBBA6]/50 rounded-xs p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F6F1E9] border border-[#B8924A]/40 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[#B8924A]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#888] font-semibold">{label}</p>
                  <p className="text-sm font-medium text-[#121212] mt-0.5">{value}</p>
                  <p className="text-xs text-[#777] mt-0.5 italic">{note}</p>
                </div>
              </div>
            ))}

            <div className="bg-[#121212] text-[#F6F1E9] p-6 rounded-xs border border-[#B8924A]/30">
              <MessageCircle className="text-[#B8924A] mb-3" size={22} />
              <h4 className="font-serif text-lg mb-2">Bespoke & Personalisation</h4>
              <p className="text-xs text-[#CBBBA6] leading-relaxed">
                We offer blind embossing of initials, custom leather colour mixing, and engraved hardware for corporate gifting, weddings, and milestone occasions.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
