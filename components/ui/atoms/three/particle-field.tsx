/* eslint-disable react-hooks/purity */
'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  accentColor?: string;
  size?: number;
  spread?: number;
}

export const ParticleField = ({
  count = 200, // Lower count for network performance
  color = '#e8e4dd',
  accentColor = '#c9913c',
  size = 2.0,
  spread = 40,
}: ParticleFieldProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Initialize network nodes
  const { positions, velocities, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const baseColor = new THREE.Color(color);
    const accentCol = new THREE.Color(accentColor);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Scatter in a wider, flatter space
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread * 0.8;
      positions[i3 + 2] = (Math.random() - 0.5) * spread * 0.4;

      // Random very slow drift
      velocities[i3] = (Math.random() - 0.5) * 0.015;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.015;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.015;

      const isAccent = Math.random() < 0.15;
      const col = isAccent ? accentCol : baseColor;
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      sizes[i] = (Math.random() * 0.5 + 0.5) * size;
    }
    return { positions, velocities, colors, sizes };
  }, [count, color, accentColor, size, spread]);

  // Track mouse
  useMemo(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current || !groupRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Max lines possible: count * (count - 1) / 2
    // We'll update a dynamic array for the line positions
    const linePositions = [];
    const maxDist = 6.0; // Connection distance threshold
    const maxDistSq = maxDist * maxDist;

    // Update node positions and build network connections
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Move node
      pos[i3] += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];

      // Soft boundaries (bounce back gently)
      const limitX = spread / 2;
      const limitY = (spread * 0.8) / 2;
      const limitZ = (spread * 0.4) / 2;
      
      if (Math.abs(pos[i3]) > limitX) velocities[i3] *= -1;
      if (Math.abs(pos[i3 + 1]) > limitY) velocities[i3 + 1] *= -1;
      if (Math.abs(pos[i3 + 2]) > limitZ) velocities[i3 + 2] *= -1;

      // Check distances to all OTHER nodes for line connections
      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3;
        const dx = pos[i3] - pos[j3];
        const dy = pos[i3 + 1] - pos[j3 + 1];
        const dz = pos[i3 + 2] - pos[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        // If close enough, draw a line between them
        if (distSq < maxDistSq) {
          linePositions.push(
            pos[i3], pos[i3 + 1], pos[i3 + 2],
            pos[j3], pos[j3 + 1], pos[j3 + 2]
          );
        }
      }
    }

    // Update Points geometry
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update Lines geometry
    linesRef.current.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );

    // Subtle group rotation and mouse parallax
    groupRef.current.rotation.y += delta * 0.008;
    groupRef.current.rotation.x += delta * 0.004;

    const targetRotX = mouseRef.current.y * 0.08;
    const targetRotY = mouseRef.current.x * 0.08;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.02;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          size={size}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color={accentColor}
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};
