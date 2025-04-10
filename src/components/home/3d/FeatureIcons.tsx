import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  MeshWobbleMaterial,
  Float,
  MeshDistortMaterial,
} from "@react-three/drei";
import { Mesh } from "three";

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

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Gentle floating animation
    if (mainDoc.current && mainDoc.current.parent) {
      mainDoc.current.parent.rotation.y = Math.sin(t * 0.3) * 0.2;
      mainDoc.current.parent.rotation.x = Math.sin(t * 0.2) * 0.1;
    }

    // Subtle pulsing for the text lines
    if (line1.current) {
      line1.current.scale.x = 1 + Math.sin(t * 1.5) * 0.05;
      line2.current.scale.x = 1 + Math.sin(t * 1.5 + 0.5) * 0.05;
      line3.current.scale.x = 1 + Math.sin(t * 1.5 + 1) * 0.05;
    }

    // Corner fold animation
    if (docCorner.current) {
      docCorner.current.rotation.z = -Math.PI / 4 + Math.sin(t * 2) * 0.05;
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
        {/* Main document body */}
        <mesh ref={mainDoc} position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 1.8, 0.05]} />
          <MeshWobbleMaterial
            color="#ffffff"
            factor={0.02}
            speed={1}
            metalness={0.2}
            roughness={0.1}
            emissive="#ffffff"
            emissiveIntensity={0.05}
          />
        </mesh>

        {/* Folded corner */}
        <mesh
          ref={docCorner}
          position={[0.5, 0.7, 0.03]}
          rotation={[0, 0, -Math.PI / 4]}
        >
          <boxGeometry args={[0.4, 0.4, 0.05]} />
          <MeshWobbleMaterial
            color="#f0f0f0"
            factor={0.05}
            speed={1}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>

        {/* Text lines */}
        <mesh ref={line1} position={[0, 0.5, 0.03]} scale={[0.8, 0.08, 0.01]}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1}
            metalness={0.5}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        <mesh ref={line2} position={[0, 0.2, 0.03]} scale={[1, 0.08, 0.01]}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1}
            metalness={0.5}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        <mesh ref={line3} position={[0, -0.1, 0.03]} scale={[0.9, 0.08, 0.01]}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1}
            metalness={0.5}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Signature line */}
        <mesh
          position={[-0.2, -0.5, 0.03]}
          scale={[0.6, 0.1, 0.01]}
          rotation={[0, 0, Math.PI / 16]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.2}
            speed={2}
            metalness={0.7}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.3}
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

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Shield pulsing and rotation
    if (shield.current && shield.current.parent) {
      shield.current.parent.rotation.y = Math.sin(t * 0.3) * 0.3;
      shield.current.scale.x = 1 + Math.sin(t * 1) * 0.03;
      shield.current.scale.y = 1 + Math.sin(t * 1) * 0.03;
    }

    // Lock subtle movement
    if (lock.current) {
      lock.current.position.y = -0.1 + Math.sin(t * 1.5) * 0.02;
      lockShackle.current.position.y = 0.2 + Math.sin(t * 1.5) * 0.02;
    }

    // Glow effect
    if (glow.current) {
      glow.current.material.opacity = 0.6 + Math.sin(t * 2) * 0.2;
      glow.current.scale.x = 1.1 + Math.sin(t * 0.5) * 0.1;
      glow.current.scale.y = 1.1 + Math.sin(t * 0.5) * 0.1;
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
        {/* Shield base */}
        <mesh ref={shield}>
          <cylinderGeometry args={[1, 0.8, 1.6, 32, 1, false, 0, Math.PI]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.05}
            speed={1}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Lock body */}
        <mesh ref={lock} position={[0, -0.1, 0.3]} scale={[0.5, 0.4, 0.2]}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial
            color="#dddddd"
            factor={0.02}
            speed={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#ffffff"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Lock shackle */}
        <mesh
          ref={lockShackle}
          position={[0, 0.2, 0.3]}
          scale={[0.3, 0.3, 0.2]}
        >
          <torusGeometry args={[0.5, 0.15, 8, 16, Math.PI]} />
          <MeshWobbleMaterial
            color="#dddddd"
            factor={0.02}
            speed={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#ffffff"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Glow effect */}
        <mesh ref={glow} position={[0, 0, 0.1]} rotation={[0, 0, 0]}>
          <cylinderGeometry
            args={[1.05, 0.85, 1.65, 32, 1, false, 0, Math.PI]}
          />
          <MeshDistortMaterial
            color={color}
            speed={3}
            distort={0.3}
            radius={1}
            transparent={true}
            opacity={0.6}
            emissive={color}
            emissiveIntensity={0.5}
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
