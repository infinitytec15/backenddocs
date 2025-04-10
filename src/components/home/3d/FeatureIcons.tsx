import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  MeshWobbleMaterial,
  Float,
  MeshDistortMaterial,
  useGLTF,
  MeshReflectorMaterial,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { Mesh, Color, MathUtils } from "three";

type IconProps = {
  color: string;
  position?: [number, number, number];
  scale?: number;
};

export function DocumentIcon({
  color,
  position = [0, 0, 0],
  scale = 1,
}: IconProps) {
  const mainDoc = useRef<Mesh>(null!);
  const docCorner = useRef<Mesh>(null!);
  const line1 = useRef<Mesh>(null!);
  const line2 = useRef<Mesh>(null!);
  const line3 = useRef<Mesh>(null!);
  const signature = useRef<Mesh>(null!);

  // Convert color string to Three.js color
  const themeColor = new Color(color);
  const lighterColor = new Color(color).multiplyScalar(1.2);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Enhanced floating animation with easing
    if (mainDoc.current && mainDoc.current.parent) {
      mainDoc.current.parent.rotation.y = MathUtils.lerp(
        mainDoc.current.parent.rotation.y,
        Math.sin(t * 0.3) * 0.25,
        0.05,
      );
      mainDoc.current.parent.rotation.x = MathUtils.lerp(
        mainDoc.current.parent.rotation.x,
        Math.sin(t * 0.2) * 0.15,
        0.05,
      );
      // Add subtle position animation
      mainDoc.current.parent.position.y = Math.sin(t * 0.5) * 0.1;
    }

    // Improved pulsing for the text lines with staggered timing
    if (line1.current) {
      line1.current.scale.x = 1 + Math.sin(t * 1.2) * 0.08;
      line2.current.scale.x = 1 + Math.sin(t * 1.2 + 0.7) * 0.08;
      line3.current.scale.x = 1 + Math.sin(t * 1.2 + 1.4) * 0.08;

      // Add subtle color pulsing
      const pulseIntensity = 0.1 + Math.sin(t * 0.8) * 0.05;
      line1.current.material.emissiveIntensity = pulseIntensity;
      line2.current.material.emissiveIntensity = pulseIntensity;
      line3.current.material.emissiveIntensity = pulseIntensity;
    }

    // Enhanced corner fold animation
    if (docCorner.current) {
      docCorner.current.rotation.z = MathUtils.lerp(
        docCorner.current.rotation.z,
        -Math.PI / 4 + Math.sin(t * 1.5) * 0.08,
        0.1,
      );
    }

    // Signature animation
    if (signature.current) {
      signature.current.rotation.z = Math.PI / 16 + Math.sin(t * 1.2) * 0.05;
      signature.current.scale.x = 0.6 + Math.sin(t * 1.8) * 0.04;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.4}
      floatIntensity={0.4}
      position={position}
    >
      <group scale={scale}>
        {/* Main document body with improved materials */}
        <mesh ref={mainDoc} position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 1.8, 0.05]} />
          <MeshTransmissionMaterial
            color="#ffffff"
            backside={false}
            backsideThickness={0}
            thickness={0.05}
            chromaticAberration={0.02}
            anisotropy={0.1}
            envMapIntensity={0.3}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
            metalness={0.1}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.2}
            ior={1.5}
            transmission={0.95}
          />
        </mesh>

        {/* Folded corner with improved material */}
        <mesh
          ref={docCorner}
          position={[0.5, 0.7, 0.03]}
          rotation={[0, 0, -Math.PI / 4]}
          castShadow
        >
          <boxGeometry args={[0.4, 0.4, 0.05]} />
          <MeshWobbleMaterial
            color="#f0f0f0"
            factor={0.05}
            speed={1}
            metalness={0.3}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Text lines with improved materials and positioning */}
        <mesh
          ref={line1}
          position={[0, 0.5, 0.03]}
          scale={[0.8, 0.08, 0.01]}
          castShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1}
            metalness={0.6}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.95}
          />
        </mesh>

        <mesh
          ref={line2}
          position={[0, 0.2, 0.03]}
          scale={[1, 0.08, 0.01]}
          castShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1}
            metalness={0.6}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.95}
          />
        </mesh>

        <mesh
          ref={line3}
          position={[0, -0.1, 0.03]}
          scale={[0.9, 0.08, 0.01]}
          castShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1}
            metalness={0.6}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.95}
          />
        </mesh>

        {/* Signature line with improved animation */}
        <mesh
          ref={signature}
          position={[-0.2, -0.5, 0.03]}
          scale={[0.6, 0.1, 0.01]}
          rotation={[0, 0, Math.PI / 16]}
          castShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.2}
            speed={2}
            metalness={0.7}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.95}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function ShieldIcon({
  color,
  position = [0, 0, 0],
  scale = 1,
}: IconProps) {
  const shield = useRef<Mesh>(null!);
  const lock = useRef<Mesh>(null!);
  const lockShackle = useRef<Mesh>(null!);
  const glow = useRef<Mesh>(null!);
  const emblem = useRef<Mesh>(null!);

  // Convert color string to Three.js color
  const themeColor = new Color(color);
  const glowColor = new Color(color).multiplyScalar(1.3);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Enhanced shield pulsing and rotation with smoother animation
    if (shield.current && shield.current.parent) {
      shield.current.parent.rotation.y = MathUtils.lerp(
        shield.current.parent.rotation.y,
        Math.sin(t * 0.3) * 0.35,
        0.05,
      );

      // Add subtle vertical movement
      shield.current.parent.position.y = Math.sin(t * 0.5) * 0.1;

      // Smoother shield pulsing
      const pulseScale = 1 + Math.sin(t * 0.8) * 0.04;
      shield.current.scale.x = MathUtils.lerp(
        shield.current.scale.x,
        pulseScale,
        0.1,
      );
      shield.current.scale.y = MathUtils.lerp(
        shield.current.scale.y,
        pulseScale,
        0.1,
      );
    }

    // Enhanced lock movement with spring-like motion
    if (lock.current) {
      const lockY = -0.1 + Math.sin(t * 1.2) * 0.03;
      lock.current.position.y = MathUtils.lerp(
        lock.current.position.y,
        lockY,
        0.1,
      );

      const shackleY = 0.2 + Math.sin(t * 1.2) * 0.03;
      lockShackle.current.position.y = MathUtils.lerp(
        lockShackle.current.position.y,
        shackleY,
        0.1,
      );

      // Add subtle rotation to the lock
      lock.current.rotation.z = Math.sin(t * 0.8) * 0.05;
    }

    // Enhanced glow effect with better pulsing
    if (glow.current) {
      // Smoother opacity pulsing
      glow.current.material.opacity = 0.5 + Math.sin(t * 1.5) * 0.3;

      // Smoother scale pulsing
      const glowScale = 1.1 + Math.sin(t * 0.7) * 0.15;
      glow.current.scale.x = MathUtils.lerp(
        glow.current.scale.x,
        glowScale,
        0.05,
      );
      glow.current.scale.y = MathUtils.lerp(
        glow.current.scale.y,
        glowScale,
        0.05,
      );

      // Pulsing emissive intensity
      glow.current.material.emissiveIntensity = 0.5 + Math.sin(t * 1.2) * 0.3;
    }

    // Emblem rotation
    if (emblem.current) {
      emblem.current.rotation.z = t * 0.2;
    }
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.3}
      floatIntensity={0.3}
      position={position}
    >
      <group scale={scale}>
        {/* Shield base with improved material */}
        <mesh ref={shield} castShadow receiveShadow>
          <cylinderGeometry args={[1, 0.8, 1.6, 32, 1, false, 0, Math.PI]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.03}
            speed={1}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Shield emblem/symbol */}
        <mesh
          ref={emblem}
          position={[0, 0.2, 0.25]}
          scale={[0.5, 0.5, 0.05]}
          castShadow
        >
          <ringGeometry args={[0.3, 0.5, 16]} />
          <MeshWobbleMaterial
            color="#ffffff"
            factor={0.05}
            speed={1.5}
            metalness={1.0}
            roughness={0.1}
            emissive="#ffffff"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Lock body with improved material */}
        <mesh
          ref={lock}
          position={[0, -0.1, 0.3]}
          scale={[0.5, 0.4, 0.2]}
          castShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <MeshReflectorMaterial
            color="#dddddd"
            metalness={1.0}
            roughness={0.1}
            mirror={0.5}
            resolution={256}
            blur={[300, 100]}
            mixBlur={0.5}
          />
        </mesh>

        {/* Lock shackle with improved material */}
        <mesh
          ref={lockShackle}
          position={[0, 0.2, 0.3]}
          scale={[0.3, 0.3, 0.2]}
          castShadow
        >
          <torusGeometry args={[0.5, 0.15, 12, 24, Math.PI]} />
          <MeshReflectorMaterial
            color="#dddddd"
            metalness={1.0}
            roughness={0.1}
            mirror={0.5}
            resolution={256}
            blur={[300, 100]}
            mixBlur={0.5}
          />
        </mesh>

        {/* Enhanced glow effect */}
        <mesh ref={glow} position={[0, 0, 0.1]} rotation={[0, 0, 0]}>
          <cylinderGeometry
            args={[1.05, 0.85, 1.65, 32, 1, false, 0, Math.PI]}
          />
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={0.4}
            radius={1}
            transparent={true}
            opacity={0.6}
            emissive={color}
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function KeyIcon({ color, position = [0, 0, 0], scale = 1 }: IconProps) {
  const keyHead = useRef<Mesh>(null!);
  const keyShaft = useRef<Mesh>(null!);
  const keyTooth1 = useRef<Mesh>(null!);
  const keyTooth2 = useRef<Mesh>(null!);
  const keyTooth3 = useRef<Mesh>(null!);
  const glow = useRef<Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Key rotation and movement
    if (keyHead.current && keyHead.current.parent) {
      keyHead.current.parent.rotation.y = Math.sin(t * 0.5) * 0.4;
      keyHead.current.parent.rotation.z = Math.sin(t * 0.3) * 0.1;
      keyHead.current.parent.position.y = Math.sin(t * 0.7) * 0.1;
    }

    // Key teeth subtle movement
    if (keyTooth1.current) {
      keyTooth1.current.position.y = -0.3 + Math.sin(t * 2) * 0.02;
      keyTooth2.current.position.y = -0.5 + Math.sin(t * 2 + 0.5) * 0.02;
      keyTooth3.current.position.y = -0.7 + Math.sin(t * 2 + 1) * 0.02;
    }

    // Glow effect
    if (glow.current) {
      glow.current.material.opacity = 0.4 + Math.sin(t * 1.5) * 0.2;
    }
  });

  return (
    <Float
      speed={1.3}
      rotationIntensity={0.4}
      floatIntensity={0.4}
      position={position}
    >
      <group scale={scale}>
        {/* Key head */}
        <mesh ref={keyHead} position={[0, 0, 0]}>
          <torusGeometry args={[0.5, 0.15, 16, 32]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.05}
            speed={1}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Key shaft */}
        <mesh ref={keyShaft} position={[0, -0.8, 0]} scale={[0.2, 1, 0.1]}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.05}
            speed={1}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Key teeth */}
        <mesh ref={keyTooth1} position={[0.2, -0.3, 0]} scale={[0.3, 0.1, 0.1]}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1.5}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        <mesh ref={keyTooth2} position={[0.2, -0.5, 0]} scale={[0.4, 0.1, 0.1]}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1.5}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        <mesh
          ref={keyTooth3}
          position={[0.2, -0.7, 0]}
          scale={[0.25, 0.1, 0.1]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1.5}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Glow effect */}
        <mesh ref={glow} position={[0, 0, 0]} scale={[1.1, 1.1, 1.1]}>
          <torusGeometry args={[0.5, 0.15, 16, 32]} />
          <MeshDistortMaterial
            color={color}
            speed={3}
            distort={0.3}
            radius={1}
            transparent={true}
            opacity={0.4}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function GearIcon({
  color,
  position = [0, 0, 0],
  scale = 1,
}: IconProps) {
  const mainGear = useRef<Mesh>(null!);
  const smallGear1 = useRef<Mesh>(null!);
  const smallGear2 = useRef<Mesh>(null!);
  const centerRing = useRef<Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Main gear rotation
    if (mainGear.current) {
      mainGear.current.rotation.z = t * 0.2;
    }

    // Small gears counter-rotation
    if (smallGear1.current) {
      smallGear1.current.rotation.z = -t * 0.4;
      smallGear2.current.rotation.z = -t * 0.4;
    }

    // Center ring pulsing
    if (centerRing.current) {
      centerRing.current.scale.x = 1 + Math.sin(t * 2) * 0.1;
      centerRing.current.scale.y = 1 + Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0.3}
      floatIntensity={0.3}
      position={position}
    >
      <group scale={scale}>
        {/* Main gear */}
        <mesh ref={mainGear}>
          <torusGeometry args={[0.8, 0.2, 16, 12]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.05}
            speed={1}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Small gears */}
        <mesh ref={smallGear1} position={[1.2, 0, 0]} scale={0.6}>
          <torusGeometry args={[0.8, 0.2, 16, 8]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.05}
            speed={1}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>

        <mesh ref={smallGear2} position={[-1.2, 0, 0]} scale={0.6}>
          <torusGeometry args={[0.8, 0.2, 16, 8]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.05}
            speed={1}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Center ring */}
        <mesh ref={centerRing} position={[0, 0, 0.1]}>
          <ringGeometry args={[0.3, 0.5, 16]} />
          <MeshWobbleMaterial
            color="#ffffff"
            factor={0.1}
            speed={2}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.5}
            transparent={true}
            opacity={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
}
