import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import CookieBanner from './components/CookieBanner'
import Preloader from './components/Preloader'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Story from './pages/Story'
import Journal from './pages/Journal'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import NotFound from './pages/NotFound'

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
}

function AnimatedRoute({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

// Pages that don't show Navbar / Footer (e.g. Checkout)
const MINIMAL_LAYOUT = ['/checkout']

export default function App() {
  const location = useLocation()
  const isMinimal = MINIMAL_LAYOUT.some(p => location.pathname.startsWith(p))
  const [preloaderDone, setPreloaderDone] = useState(false)

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <>
      {/* Luxury Preloader (first load only) */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Cart Slide-out Drawer */}
      <CartDrawer />

      {/* Cookie / GDPR / CCPA Banner */}
      <CookieBanner />

      {/* Global Layout Shell */}
      <div className={`min-h-screen flex flex-col ${preloaderDone ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
        {!isMinimal && <Navbar />}

        <main className="flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<AnimatedRoute><Home /></AnimatedRoute>} />
              <Route path="/shop" element={<AnimatedRoute><Shop /></AnimatedRoute>} />
              <Route path="/product/:handle" element={<AnimatedRoute><Product /></AnimatedRoute>} />
              <Route path="/checkout" element={<AnimatedRoute><Checkout /></AnimatedRoute>} />
              <Route path="/story" element={<AnimatedRoute><Story /></AnimatedRoute>} />
              <Route path="/journal" element={<AnimatedRoute><Journal /></AnimatedRoute>} />
              <Route path="/journal/:slug" element={<AnimatedRoute><Journal /></AnimatedRoute>} />
              <Route path="/contact" element={<AnimatedRoute><Contact /></AnimatedRoute>} />
              <Route path="/faq" element={<AnimatedRoute><FAQ /></AnimatedRoute>} />
              <Route path="*" element={<AnimatedRoute><NotFound /></AnimatedRoute>} />
            </Routes>
          </AnimatePresence>
        </main>

        {!isMinimal && <Footer />}
      </div>
    </>
  )
}
