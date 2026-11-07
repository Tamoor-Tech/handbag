import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, ContactShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'
import HandbagModel from './HandbagModel'

// Light Sweep effect that orbits around the bag
function LightSweep() {
  const lightRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.8
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t) * 3.5
      lightRef.current.position.z = Math.cos(t) * 3.5
      lightRef.current.position.y = 1.8 + Math.sin(t * 1.5) * 0.8
    }
  })

  return (
    <pointLight
      ref={lightRef}
      intensity={18}
      distance={8}
      color="#FFF4DE"
      decay={2}
    />
  )
}

// Scene Rig that handles slow auto-rotation and mouse cursor tilt
function SceneRig({ colorHex, isInteractive = true }) {
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Gentle auto-rotation
    groupRef.current.rotation.y += delta * 0.25

    // Smooth cursor parallax tilt
    const targetTiltX = -state.pointer.y * 0.2
    const targetTiltZ = state.pointer.x * 0.15

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetTiltX, delta * 3)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetTiltZ, delta * 3)
  })

  return (
    <group ref={groupRef}>
      <HandbagModel colorHex={colorHex} />
    </group>
  )
}

export default function HandbagScene({
  colorHex = '#8A5229',
  enableControls = true,
  className = 'w-full h-full',
}) {
  const [hasWebGl, setHasWebGl] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setHasWebGl(false)
    } catch (e) {
      setHasWebGl(false)
    }
  }, [])

  if (!hasWebGl) {
    // Luxury static image fallback
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <img
          src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80"
          alt="Evelora Handcrafted Luxury Handbag"
          className="max-h-[80%] max-w-[80%] object-contain drop-shadow-2xl"
          loading="eager"
        />
        <div className="absolute bottom-4 text-xs tracking-widest text-[#B8924A] uppercase font-mono">
          Studio Edition • WebGL Optimized
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
      >
        <ambientLight intensity={1.2} />
        
        {/* Key warm luxury light */}
        <directionalLight
          position={[4, 5, 4]}
          intensity={2.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={12}
        />
        
        {/* Soft fill cool light */}
        <directionalLight position={[-4, 3, -2]} intensity={0.9} color="#DFE6EB" />

        {/* Orbiting light sweep for leather luster */}
        {!prefersReducedMotion && <LightSweep />}

        {/* Studio environment for realistic reflections */}
        <Environment preset="studio" />

        {/* Suspense with float and interactive rig */}
        <Suspense fallback={null}>
          <Float
            speed={prefersReducedMotion ? 0 : 2}
            rotationIntensity={prefersReducedMotion ? 0 : 0.2}
            floatIntensity={prefersReducedMotion ? 0 : 0.4}
            floatingRange={[-0.05, 0.05]}
          >
            <SceneRig colorHex={colorHex} />
          </Float>

          {/* Contact shadow under handbag */}
          <ContactShadows
            position={[0, -1.25, 0]}
            opacity={0.65}
            scale={5}
            blur={2.4}
            far={3}
            color="#121212"
          />
        </Suspense>

        {/* Orbit Controls (Drag to rotate, zoom disabled for hero stability) */}
        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
            rotateSpeed={0.8}
          />
        )}
      </Canvas>
    </div>
  )
}
