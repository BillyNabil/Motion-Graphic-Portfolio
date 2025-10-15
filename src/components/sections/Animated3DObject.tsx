'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function Model() {
  const { scene, animations } = useGLTF('/hollow_knight_dream_world_down_sized.glb');
  const modelRef = useRef<THREE.Group>(null);
  const [mixer] = useState(() => new THREE.AnimationMixer(scene));

  // Play animations if they exist
  if (animations.length > 0 && modelRef.current) {
    animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  useFrame((state, delta) => {
    mixer.update(delta);

    // Gentle rotation for the entire model
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003;
      // Gentle floating motion relative to base position
      const baseY = -1.5; // Center position
      modelRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={1.6} // Adjust scale as needed
      position={[0, 0, 0]} // Center the model
    />
  );
}

const Animated3DObject = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full h-[600px] md:h-[700px] lg:h-[900px]"
    >
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        className="w-full h-full"
        gl={{
          alpha: true,
          preserveDrawingBuffer: true,
          premultipliedAlpha: false,
          antialias: true
        }}
      >
        {/* Completely transparent background */}
        {/* Remove color attachment to make it fully transparent */}

        {/* Enhanced lighting for the model with transparent background */}
        <ambientLight intensity={0.8} />

        {/* Main key light */}
        <directionalLight position={[5, 5, 5]} intensity={2.0} color="#ffffff" />

        {/* Fill lights for better visibility */}
        <directionalLight position={[-5, 3, 5]} intensity={1.5} color="#e0e7ff" />
        <directionalLight position={[0, -5, 5]} intensity={1.2} color="#fbbf24" />

        {/* Rim lights for depth */}
        <pointLight position={[10, 0, 0]} intensity={1.0} color="#60a5fa" />
        <pointLight position={[-10, 0, 0]} intensity={1.0} color="#a78bfa" />

        {/* Additional lighting from below for better definition */}
        <directionalLight position={[0, -10, 5]} intensity={0.8} color="#ffffff" />

        {/* Load the GLB model with Suspense for better loading experience */}
        <Suspense fallback={null}>
          <Model />
        </Suspense>

        {/* OrbitControls removed to prevent 3D interaction */}
      </Canvas>
    </motion.div>
  );
};

export default Animated3DObject;