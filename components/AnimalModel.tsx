"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage } from '@react-three/drei';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

interface AnimalModelProps {
  name: string;
  className?: string;
  autoRotate?: boolean;
}

export default function AnimalModel({ name, className = "h-64 w-64", autoRotate = true }: AnimalModelProps) {
  // Path ke file .glb di folder public/asset/
  const url = `/asset/animal-${name}.glb`;

  return (
    <div className={className}>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
            <Model url={url} />
          </Stage>
          <OrbitControls 
            enableZoom={false} 
            autoRotate={autoRotate} 
            autoRotateSpeed={4}
            makeDefault 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
