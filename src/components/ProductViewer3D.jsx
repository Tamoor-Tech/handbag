import React, { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, ContactShadows, Environment } from '@react-three/drei'
import HandbagModel from './HandbagModel'
import { RotateCw, ZoomIn, Smartphone, Sparkles, Image as ImageIcon, Box } from 'lucide-react'

export default function ProductViewer3D({
  colorHex = '#8A5229',
  images = [],
  productName = 'Evelora Luxury Bag',
}) {
  const [viewMode, setViewMode] = useState('3d') // '3d' or 'gallery'
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [isArModalOpen, setIsArModalOpen] = useState(false)
  const controlsRef = useRef()

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-square bg-[#EAE2D5] rounded-xs overflow-hidden border border-[#CBBBA6]/60 flex flex-col justify-between">
      {/* Top Controls Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Toggle 3D vs Photos */}
        <div className="pointer-events-auto flex items-center bg-[#F6F1E9]/90 backdrop-blur-md p-1 border border-[#CBBBA6] rounded-xs shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium transition-colors rounded-xs ${
              viewMode === '3d'
                ? 'bg-[#121212] text-[#F6F1E9]'
                : 'text-[#666] hover:text-[#121212]'
            }`}
          >
            <Box size={14} />
            <span>3D Studio</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('gallery')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium transition-colors rounded-xs ${
              viewMode === 'gallery'
                ? 'bg-[#121212] text-[#F6F1E9]'
                : 'text-[#666] hover:text-[#121212]'
            }`}
          >
            <ImageIcon size={14} />
            <span>Lookbook</span>
          </button>
        </div>

        {/* AR View button */}
        <button
          type="button"
          onClick={() => setIsArModalOpen(true)}
          className="pointer-events-auto bg-[#F6F1E9]/95 backdrop-blur-md hover:bg-[#B8924A] hover:text-white text-[#121212] text-[10px] uppercase tracking-[0.16em] font-semibold px-3 py-2 border border-[#CBBBA6] flex items-center gap-1.5 shadow-sm transition-colors rounded-xs"
        >
          <Smartphone size={13} />
          <span>View in Room (AR)</span>
        </button>
      </div>

      {/* Main Viewport Content */}
      <div className="relative w-full h-full flex-1">
        {viewMode === '3d' ? (
          <div className="w-full h-full cursor-grab active:cursor-grabbing">
            <Canvas
              camera={{ position: [0, 0.4, 4.0], fov: 38 }}
              gl={{ antialias: true, alpha: true }}
              shadows
            >
              <ambientLight intensity={1.3} />
              <directionalLight position={[4, 5, 4]} intensity={2.2} castShadow />
              <directionalLight position={[-4, 2, -2]} intensity={0.8} />
              <Environment preset="studio" />

              <Suspense fallback={null}>
                <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                  <group position={[0, -0.1, 0]}>
                    <HandbagModel colorHex={colorHex} />
                  </group>
                </Float>
                <ContactShadows
                  position={[0, -1.25, 0]}
                  opacity={0.65}
                  scale={4.8}
                  blur={2.5}
                  far={3}
                />
              </Suspense>

              <OrbitControls
                ref={controlsRef}
                enablePan={false}
                minDistance={2.5}
                maxDistance={6.0}
                maxPolarAngle={Math.PI / 1.7}
                minPolarAngle={Math.PI / 3.4}
              />
            </Canvas>

            {/* 3D Hint Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-[#777] pointer-events-none">
              <span className="flex items-center gap-1.5 bg-[#F6F1E9]/80 backdrop-blur-xs px-2.5 py-1 rounded border border-[#CBBBA6]/40">
                <RotateCw size={12} className="animate-spin" style={{ animationDuration: '8s' }} />
                Drag to rotate 360° • Pinch to inspect stitching
              </span>
              <button
                type="button"
                onClick={handleResetCamera}
                className="pointer-events-auto bg-[#F6F1E9]/80 hover:bg-[#F6F1E9] text-[#121212] px-2 py-1 rounded text-[10px] uppercase tracking-wider border border-[#CBBBA6]/40 transition-colors"
              >
                Reset Angle
              </button>
            </div>
          </div>
        ) : (
          /* Photo Lookbook Mode */
          <div className="relative w-full h-full flex flex-col justify-between">
            <img
              src={images[activeImageIdx] || images[0]}
              alt={productName}
              className="w-full h-full object-cover object-center"
            />
            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 p-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-12 h-12 rounded-xs overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx
                        ? 'border-[#B8924A] scale-105 shadow-md'
                        : 'border-[#F6F1E9]/80 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* AR Modal */}
      {isArModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F6F1E9] max-w-sm w-full p-6 text-center border border-[#B8924A] shadow-2xl relative rounded-xs">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8924A] font-semibold">
              Augmented Reality
            </span>
            <h3 className="font-serif text-2xl my-2">View in Your Space</h3>
            <p className="text-xs text-[#555] leading-relaxed mb-6">
              Scan this QR code with your iPhone or Android camera to see {productName} projected at true 1:1 scale in your home.
            </p>

            <div className="bg-white p-4 inline-block border border-[#CBBBA6] mb-6 rounded-xs shadow-inner">
              {/* QR Code graphic */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  window.location.href
                )}`}
                alt="AR QR Code"
                className="w-36 h-36 mx-auto"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsArModalOpen(false)}
                className="w-full bg-[#121212] text-[#F6F1E9] py-2.5 text-xs uppercase tracking-[0.15em] font-medium"
              >
                Close AR Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
