/* eslint-disable react-hooks/purity */
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeroGeometryProps {
  color?: string;
  wireframeColor?: string;
}

export const HeroGeometry = ({
  wireframeColor = '#c9913c',
}: HeroGeometryProps) => {
  const innerRingRef = useRef<THREE.Points>(null);
  const outerRingRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Track mouse for interactive rotation
  useMemo(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const innerParticles = useMemo(() => {
    const count = 250;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.8 + Math.random() * 0.8;
      const y = (Math.random() - 0.5) * 0.3;
      positions[i * 3] = radius * Math.cos(theta);
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = radius * Math.sin(theta);
    }
    return positions;
  }, []);

  const outerParticles = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 4.0 + Math.random() * 1.5;
      const y = (Math.random() - 0.5) * 0.6;
      positions[i * 3] = radius * Math.cos(theta);
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = radius * Math.sin(theta);
    }
    return positions;
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y += delta * 0.08;
      innerRingRef.current.rotation.z -= delta * 0.02;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y -= delta * 0.05;
      outerRingRef.current.rotation.x += delta * 0.01;
    }

    if (groupRef.current) {
      const targetRotX = mouseRef.current.y * 0.2;
      const targetRotY = mouseRef.current.x * 0.2;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.02;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Tilted base rotation to look like rings */}
      <group rotation={[0.5, 0.2, 0.1]}>
        <points ref={innerRingRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[innerParticles, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={2}
            color={wireframeColor}
            transparent
            opacity={0.8}
            sizeAttenuation={false}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        
        <points ref={outerRingRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[outerParticles, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={1.5}
            color={wireframeColor}
            transparent
            opacity={0.4}
            sizeAttenuation={false}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
};
