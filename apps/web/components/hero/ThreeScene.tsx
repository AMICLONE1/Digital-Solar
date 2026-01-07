"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function SolarGrid() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const gridGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const size = 20;
    const divisions = 10;

    // Create grid lines
    for (let i = 0; i <= divisions; i++) {
      const x = (i / divisions) * size - size / 2;
      vertices.push(x, 0, -size / 2, x, 0, size / 2);
    }
    for (let i = 0; i <= divisions; i++) {
      const z = (i / divisions) * size - size / 2;
      vertices.push(-size / 2, 0, z, size / 2, 0, z);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  return (
    <group>
      <lineSegments geometry={gridGeometry}>
        <lineBasicMaterial color="#1B5E20" opacity={0.3} transparent />
      </lineSegments>
      <mesh ref={meshRef} position={[0, 2, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function MorphingIcons() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -3, 0]}>
      {/* Currency Icon */}
      <mesh position={[-3, 0, 0]}>
        <ringGeometry args={[0.5, 0.8, 32]} />
        <meshStandardMaterial color="#1B5E20" />
      </mesh>
      {/* Home Icon */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#2E7D32" />
      </mesh>
      {/* EV Icon */}
      <mesh position={[3, 0, 0]}>
        <boxGeometry args={[1.2, 0.6, 0.8]} />
        <meshStandardMaterial color="#1B5E20" />
      </mesh>
    </group>
  );
}

export default function ThreeScene() {
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setError(true);
    };

    const handleContextRestored = () => {
      setError(false);
    };

    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("webglcontextlost", handleContextLost);
      canvas.addEventListener("webglcontextrestored", handleContextRestored);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      }
    };
  }, []);

  if (error) {
    // Fallback: simple gradient background
    return (
      <div className="w-full h-full bg-gradient-to-br from-forest/10 via-gold/5 to-forest/10" />
    );
  }

  return (
    <Canvas 
      className="w-full h-full" 
      style={{ background: "transparent" }}
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 5, 15]} fov={50} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#D4AF37" />
      <SolarGrid />
      <MorphingIcons />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}

