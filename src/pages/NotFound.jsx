import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F6F1E9] flex flex-col items-center justify-center text-center px-4 py-24">
      {/* Decorative outline number */}
      <div className="relative mb-6 select-none" aria-hidden="true">
        <span
          className="font-serif text-[20vw] font-bold text-transparent leading-none"
          style={{ WebkitTextStroke: '1.5px #CBBBA6' }}
        >
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-2xl tracking-[0.3em] text-[#B8924A] uppercase">Evelora</span>
        </div>
      </div>

      <h1 className="font-serif text-4xl text-[#121212] mb-3">
        This Page Has <span className="italic text-[#B8924A]">Departed</span>
      </h1>
      <p className="text-sm text-[#777] font-light max-w-sm leading-relaxed mb-8">
        The page you were looking for could not be found. It may have moved, been retired, or perhaps it never existed in our atelier.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/"
          className="bg-[#121212] hover:bg-[#B8924A] text-[#F6F1E9] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-colors rounded-xs"
        >
          Return Home
        </Link>
        <Link
          to="/shop"
          className="border border-[#121212] hover:border-[#B8924A] hover:text-[#B8924A] text-[#121212] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-all rounded-xs"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  )
}
