'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, ReactNode } from 'react';

interface ThreeCanvasInnerProps {
  children: ReactNode;
  className?: string;
}

const ThreeCanvasInner = ({ children, className }: ThreeCanvasInnerProps) => (
  <div className={className}>
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 12], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  </div>
);

export default ThreeCanvasInner;
