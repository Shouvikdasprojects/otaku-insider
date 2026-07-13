'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, TorusKnot, Icosahedron, Octahedron } from '@react-three/drei'
import type { Group } from 'three'

function FloatingShapes() {
  const group = useRef<Group>(null)

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
    }
  })

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        <TorusKnot args={[1, 0.32, 160, 24]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#f5d77a" metalness={0.7} roughness={0.25} wireframe />
        </TorusKnot>
      </Float>
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <Icosahedron args={[0.45]} position={[2.4, 0.9, -0.5]}>
          <meshStandardMaterial color="#e8c25f" metalness={0.5} roughness={0.3} />
        </Icosahedron>
      </Float>
      <Float speed={2.4} rotationIntensity={1.6} floatIntensity={1.8}>
        <Octahedron args={[0.35]} position={[-2.5, -0.7, 0.4]}>
          <meshStandardMaterial color="#f5d77a" metalness={0.6} roughness={0.3} />
        </Octahedron>
      </Float>
      <Float speed={1.8} rotationIntensity={1.4} floatIntensity={1.6}>
        <Icosahedron args={[0.22]} position={[-1.8, 1.3, -0.8]}>
          <meshStandardMaterial color="#f5c542" metalness={0.5} roughness={0.4} />
        </Icosahedron>
      </Float>
      <Sparkles count={80} scale={7} size={2.2} speed={0.4} color="#f5d77a" />
      <Sparkles count={50} scale={8} size={1.4} speed={0.25} color="#e8c25f" />
    </group>
  )
}

export function Hero3D() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={40} color="#ffffff" />
        <pointLight position={[-5, -3, 2]} intensity={25} color="#f5d77a" />
        <FloatingShapes />
      </Canvas>
    </div>
  )
}
