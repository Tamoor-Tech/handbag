import React, { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Helper to generate a procedural leather bump texture
function createLeatherTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Base neutral grey
  ctx.fillStyle = '#808080'
  ctx.fillRect(0, 0, 512, 512)

  // Subtle cellular leather grain
  for (let i = 0; i < 24000; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const r = Math.random() * 1.6 + 0.4
    const shade = Math.floor(Math.random() * 50 + 105)
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = `rgb(${shade},${shade},${shade})`
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 4)
  return texture
}

export function ProceduralBag({ targetColorHex = '#8A5229' }) {
  const groupRef = useRef()
  const bagMeshRef = useRef()
  const flapMeshRef = useRef()
  const handleMeshRef = useRef()
  const tagMeshRef = useRef()

  const leatherBump = useMemo(() => createLeatherTexture(), [])
  const targetColor = useMemo(() => new THREE.Color(targetColorHex), [targetColorHex])
  const currentColor = useRef(new THREE.Color(targetColorHex))

  // Leather Material
  const leatherMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: currentColor.current,
      roughness: 0.42,
      metalness: 0.08,
      bumpMap: leatherBump,
      bumpScale: 0.015,
      envMapIntensity: 0.9,
    })
  }, [leatherBump])

  // Gold Hardware Material
  const goldHardwareMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4AF37'),
      roughness: 0.22,
      metalness: 0.96,
      envMapIntensity: 1.8,
    })
  }, [])

  // Stitching Material
  const stitchMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#CBBBA6'),
      wireframe: false,
    })
  }, [])

  // Smooth color transition on swatch change
  useFrame((_, delta) => {
    currentColor.current.lerp(targetColor, delta * 4)
    if (leatherMaterial) {
      leatherMaterial.color.copy(currentColor.current)
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* 1. Main Handbag Body */}
      <mesh ref={bagMeshRef} position={[0, 0, 0]} material={leatherMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.9, 1.45, 0.85, 12, 12, 12]} />
      </mesh>

      {/* 2. Front Folded Flap */}
      <mesh
        ref={flapMeshRef}
        position={[0, 0.12, 0.44]}
        material={leatherMaterial}
        castShadow
      >
        <boxGeometry args={[1.86, 0.9, 0.08, 8, 8, 4]} />
      </mesh>

      {/* 3. Flap Edge Stitch Accent Line */}
      <mesh position={[0, -0.31, 0.49]} material={stitchMaterial}>
        <boxGeometry args={[1.78, 0.02, 0.01]} />
      </mesh>

      {/* 4. Luxury 24K Turn-Lock Hardware Clasp */}
      <group position={[0, -0.15, 0.49]}>
        {/* Backplate */}
        <mesh material={goldHardwareMaterial} castShadow>
          <boxGeometry args={[0.34, 0.22, 0.04]} />
        </mesh>
        {/* Turn-lock twist lever */}
        <mesh position={[0, 0, 0.03]} rotation={[0, 0, Math.PI / 4]} material={goldHardwareMaterial}>
          <cylinderGeometry args={[0.045, 0.045, 0.22, 16]} />
        </mesh>
        {/* Center lock core */}
        <mesh position={[0, 0, 0.04]} material={goldHardwareMaterial}>
          <cylinderGeometry args={[0.065, 0.065, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
      </group>

      {/* 5. Top Handle Assembly */}
      <group position={[0, 0.72, 0]}>
        {/* Curved leather tubular handle */}
        <mesh ref={handleMeshRef} material={leatherMaterial} castShadow>
          <torusGeometry args={[0.62, 0.06, 16, 48, Math.PI]} />
        </mesh>

        {/* Left gold hinge ring */}
        <mesh position={[-0.62, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={goldHardwareMaterial}>
          <torusGeometry args={[0.08, 0.025, 16, 24]} />
        </mesh>
        {/* Right gold hinge ring */}
        <mesh position={[0.62, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={goldHardwareMaterial}>
          <torusGeometry args={[0.08, 0.025, 16, 24]} />
        </mesh>

        {/* Anchors on bag top */}
        <mesh position={[-0.62, -0.06, 0]} material={goldHardwareMaterial}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
        </mesh>
        <mesh position={[0.62, -0.06, 0]} material={goldHardwareMaterial}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
        </mesh>
      </group>

      {/* 6. Side Crossbody D-Rings */}
      <group position={[-0.96, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={goldHardwareMaterial}>
          <torusGeometry args={[0.09, 0.022, 16, 24, Math.PI]} />
        </mesh>
        <mesh position={[0, -0.05, 0]} material={leatherMaterial}>
          <boxGeometry args={[0.08, 0.12, 0.04]} />
        </mesh>
      </group>

      <group position={[0.96, 0.35, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh material={goldHardwareMaterial}>
          <torusGeometry args={[0.09, 0.022, 16, 24, Math.PI]} />
        </mesh>
        <mesh position={[0, -0.05, 0]} material={leatherMaterial}>
          <boxGeometry args={[0.08, 0.12, 0.04]} />
        </mesh>
      </group>

      {/* 7. Hanging Leather Clochette / Monogram Key Tag */}
      <group ref={tagMeshRef} position={[-0.55, 0.35, 0.35]} rotation={[0.1, -0.1, 0.2]}>
        {/* Leather strap connecting tag to handle */}
        <mesh position={[0, 0.16, 0]} material={leatherMaterial}>
          <cylinderGeometry args={[0.012, 0.012, 0.32, 8]} />
        </mesh>
        {/* Key bell / tag */}
        <mesh position={[0, -0.04, 0]} material={leatherMaterial} castShadow>
          <coneGeometry args={[0.12, 0.22, 16]} />
        </mesh>
        {/* Gold rivet */}
        <mesh position={[0, 0.03, 0.02]} material={goldHardwareMaterial}>
          <sphereGeometry args={[0.02, 12, 12]} />
        </mesh>
      </group>

      {/* 8. Four Base Protective Brass Feet (Stems) */}
      <group position={[0, -0.73, 0]}>
        <mesh position={[-0.72, 0, -0.28]} material={goldHardwareMaterial}>
          <cylinderGeometry args={[0.035, 0.045, 0.04, 16]} />
        </mesh>
        <mesh position={[0.72, 0, -0.28]} material={goldHardwareMaterial}>
          <cylinderGeometry args={[0.035, 0.045, 0.04, 16]} />
        </mesh>
        <mesh position={[-0.72, 0, 0.28]} material={goldHardwareMaterial}>
          <cylinderGeometry args={[0.035, 0.045, 0.04, 16]} />
        </mesh>
        <mesh position={[0.72, 0, 0.28]} material={goldHardwareMaterial}>
          <cylinderGeometry args={[0.035, 0.045, 0.04, 16]} />
        </mesh>
      </group>
    </group>
  )
}

// Fallback loader if external .glb is placed in public/models/bag.glb
export default function HandbagModel({ colorHex = '#8A5229', modelPath = '/models/bag.glb' }) {
  const [hasGlbError, setHasGlbError] = useState(false)

  // If user has not placed bag.glb or error occurs, seamlessly render ProceduralBag
  if (hasGlbError || !modelPath) {
    return <ProceduralBag targetColorHex={colorHex} />
  }

  return <GlbWithFallback colorHex={colorHex} modelPath={modelPath} onError={() => setHasGlbError(true)} />
}

function GlbWithFallback({ colorHex, modelPath, onError }) {
  try {
    const { scene } = useGLTF(modelPath)
    useEffect(() => {
      if (scene) {
        scene.traverse((child) => {
          if (child.isMesh && child.material) {
            // Apply swatch color to leather meshes
            if (
              child.name.toLowerCase().includes('leather') ||
              child.name.toLowerCase().includes('body') ||
              child.name.toLowerCase().includes('bag')
            ) {
              child.material.color = new THREE.Color(colorHex)
            }
          }
        })
      }
    }, [scene, colorHex])

    return <primitive object={scene} scale={[1.2, 1.2, 1.2]} />
  } catch (e) {
    onError()
    return <ProceduralBag targetColorHex={colorHex} />
  }
}
