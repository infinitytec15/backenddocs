import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshWobbleMaterial, Float } from "@react-three/drei";
import { Mesh } from "three";

type IconProps = {
  color: string;
  position?: [number, number, number];
  scale?: number;
};

export function SparklesIcon({
  color,
  position = [0, 0, 0],
  scale = 1,
}: IconProps) {
  const mesh = useRef<Mesh>(null!);
  const mesh2 = useRef<Mesh>(null!);
  const mesh3 = useRef<Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    mesh.current.rotation.x = Math.cos(t * 0.5) * 0.3;

    mesh2.current.rotation.y = Math.sin(t * 0.7) * 0.4;
    mesh2.current.rotation.z = Math.cos(t * 0.3) * 0.2;

    mesh3.current.rotation.x = Math.sin(t * 0.4) * 0.5;
    mesh3.current.rotation.z = Math.cos(t * 0.6) * 0.3;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.6}
      floatIntensity={0.6}
      position={position}
    >
      <group scale={scale}>
        <mesh ref={mesh} position={[0, 0, 0]}>
          <octahedronGeometry args={[0.7, 0]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.2}
            speed={2}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh ref={mesh2} position={[0.6, 0.6, 0]}>
          <tetrahedronGeometry args={[0.4, 0]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.3}
            speed={1.5}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.15}
          />
        </mesh>
        <mesh ref={mesh3} position={[-0.6, 0.4, 0.2]}>
          <dodecahedronGeometry args={[0.3, 0]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.2}
            speed={2.5}
            metalness={0.7}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function RocketIcon({
  color,
  position = [0, 0, 0],
  scale = 1,
}: IconProps) {
  const rocketBody = useRef<Mesh>(null!);
  const rocketFin1 = useRef<Mesh>(null!);
  const rocketFin2 = useRef<Mesh>(null!);
  const rocketFin3 = useRef<Mesh>(null!);
  const rocketFin4 = useRef<Mesh>(null!);
  const flame = useRef<Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const group = rocketBody.current.parent;
    if (group) {
      group.rotation.y = Math.sin(t * 0.3) * 0.3;
      group.rotation.z = Math.sin(t * 0.2) * 0.1;
      group.position.y = Math.sin(t) * 0.15;
    }

    // Animate flame
    if (flame.current) {
      flame.current.scale.x = 0.8 + Math.sin(t * 10) * 0.2;
      flame.current.scale.z = 0.8 + Math.sin(t * 10) * 0.2;
      flame.current.position.y = -1.3 - Math.sin(t * 10) * 0.1;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.4}
      floatIntensity={0.5}
      position={position}
    >
      <group scale={scale}>
        {/* Rocket body */}
        <mesh ref={rocketBody} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 1.8, 16]} />
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

        {/* Rocket nose */}
        <mesh position={[0, 1, 0]}>
          <coneGeometry args={[0.4, 0.8, 16]} />
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

        {/* Rocket fins */}
        <mesh
          ref={rocketFin1}
          position={[0.4, -0.5, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <coneGeometry args={[0.3, 0.6, 3]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1.5}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <mesh
          ref={rocketFin2}
          position={[-0.4, -0.5, 0]}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <coneGeometry args={[0.3, 0.6, 3]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1.5}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <mesh
          ref={rocketFin3}
          position={[0, -0.5, 0.4]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <coneGeometry args={[0.3, 0.6, 3]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1.5}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <mesh
          ref={rocketFin4}
          position={[0, -0.5, -0.4]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <coneGeometry args={[0.3, 0.6, 3]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1.5}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Flame */}
        <mesh ref={flame} position={[0, -1.2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.3, 0.8, 16]} />
          <MeshWobbleMaterial
            color="#ff9500"
            factor={0.8}
            speed={5}
            emissive="#ff5500"
            emissiveIntensity={2}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function StarIcon({
  color,
  position = [0, 0, 0],
  scale = 1,
}: IconProps) {
  const centerStar = useRef<Mesh>(null!);
  const star1 = useRef<Mesh>(null!);
  const star2 = useRef<Mesh>(null!);
  const star3 = useRef<Mesh>(null!);
  const star4 = useRef<Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Center star rotation and pulsing
    centerStar.current.rotation.z += 0.01;
    centerStar.current.scale.x = (1 + Math.sin(t * 0.8) * 0.2) * scale;
    centerStar.current.scale.y = (1 + Math.sin(t * 0.8) * 0.2) * scale;

    // Orbit small stars around the center
    if (star1.current && star1.current.parent) {
      star1.current.parent.rotation.z = t * 0.5;
      star2.current.parent.rotation.z = -t * 0.7;
      star3.current.parent.rotation.z = t * 0.6;
      star4.current.parent.rotation.z = -t * 0.4;

      // Small stars self-rotation
      star1.current.rotation.z += 0.02;
      star2.current.rotation.z += 0.03;
      star3.current.rotation.z += 0.025;
      star4.current.rotation.z += 0.015;
    }
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.4}
      floatIntensity={0.4}
      position={position}
    >
      <group scale={scale}>
        {/* Main center star */}
        <mesh ref={centerStar}>
          <dodecahedronGeometry args={[0.7, 0]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1.5}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Orbiting small stars */}
        <group>
          <mesh ref={star1} position={[1.2, 0, 0]} scale={0.25}>
            <tetrahedronGeometry args={[1, 0]} />
            <MeshWobbleMaterial
              color={color}
              factor={0.2}
              speed={2}
              metalness={0.8}
              roughness={0.2}
              emissive={color}
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>

        <group>
          <mesh ref={star2} position={[-1.1, 0.3, 0]} scale={0.2}>
            <octahedronGeometry args={[1, 0]} />
            <MeshWobbleMaterial
              color={color}
              factor={0.2}
              speed={2}
              metalness={0.8}
              roughness={0.2}
              emissive={color}
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>

        <group>
          <mesh ref={star3} position={[0.2, 1.1, 0]} scale={0.15}>
            <icosahedronGeometry args={[1, 0]} />
            <MeshWobbleMaterial
              color={color}
              factor={0.2}
              speed={2}
              metalness={0.8}
              roughness={0.2}
              emissive={color}
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>

        <group>
          <mesh ref={star4} position={[0, -1.0, 0.3]} scale={0.18}>
            <tetrahedronGeometry args={[1, 0]} />
            <MeshWobbleMaterial
              color={color}
              factor={0.2}
              speed={2}
              metalness={0.8}
              roughness={0.2}
              emissive={color}
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export function CrownIcon({
  color,
  position = [0, 0, 0],
  scale = 1,
}: IconProps) {
  const crownBase = useRef<Mesh>(null!);
  const point1 = useRef<Mesh>(null!);
  const point2 = useRef<Mesh>(null!);
  const point3 = useRef<Mesh>(null!);
  const point4 = useRef<Mesh>(null!);
  const point5 = useRef<Mesh>(null!);
  const gem = useRef<Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Crown base gentle rotation
    if (crownBase.current && crownBase.current.parent) {
      crownBase.current.parent.rotation.y = Math.sin(t * 0.2) * 0.3;
      crownBase.current.parent.rotation.z = Math.cos(t * 0.2) * 0.1;
    }

    // Subtle movement for the points
    const pointsMovement = Math.sin(t * 1.5) * 0.03;
    if (point1.current) {
      point1.current.position.y = 0.6 + pointsMovement;
      point2.current.position.y = 0.6 + pointsMovement * 0.8;
      point3.current.position.y = 0.6 + pointsMovement * 1.2;
      point4.current.position.y = 0.6 + pointsMovement * 0.7;
      point5.current.position.y = 0.6 + pointsMovement * 0.9;
    }

    // Gem rotation and sparkle
    if (gem.current) {
      gem.current.rotation.y += 0.02;
      gem.current.rotation.x = Math.sin(t) * 0.2;
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
        {/* Crown base */}
        <mesh ref={crownBase} position={[0, 0, 0]}>
          <torusGeometry args={[0.7, 0.2, 16, 32]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.05}
            speed={1}
            metalness={1}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Crown points */}
        <mesh ref={point1} position={[0.7, 0.6, 0]}>
          <coneGeometry args={[0.15, 0.4, 4]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1.5}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.15}
          />
        </mesh>

        <mesh ref={point2} position={[0.22, 0.6, 0.67]}>
          <coneGeometry args={[0.15, 0.4, 4]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1.5}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.15}
          />
        </mesh>

        <mesh ref={point3} position={[-0.58, 0.6, 0.42]}>
          <coneGeometry args={[0.15, 0.4, 4]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1.5}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.15}
          />
        </mesh>

        <mesh ref={point4} position={[-0.58, 0.6, -0.42]}>
          <coneGeometry args={[0.15, 0.4, 4]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1.5}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.15}
          />
        </mesh>

        <mesh ref={point5} position={[0.22, 0.6, -0.67]}>
          <coneGeometry args={[0.15, 0.4, 4]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1.5}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Center gem */}
        <mesh ref={gem} position={[0, 0.3, 0]} scale={0.3}>
          <octahedronGeometry args={[1, 0]} />
          <MeshWobbleMaterial
            color="#ffffff"
            factor={0.05}
            speed={1}
            metalness={1}
            roughness={0}
            emissive={color}
            emissiveIntensity={0.8}
            transparent={true}
            opacity={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function MessageIcon({
  color,
  position = [0, 0, 0],
  scale = 1,
}: IconProps) {
  const messageBody = useRef<Mesh>(null!);
  const messageTail = useRef<Mesh>(null!);
  const bubble1 = useRef<Mesh>(null!);
  const bubble2 = useRef<Mesh>(null!);
  const bubble3 = useRef<Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Message body animation
    if (messageBody.current && messageBody.current.parent) {
      messageBody.current.parent.rotation.y = Math.sin(t * 0.3) * 0.3;
      messageBody.current.parent.rotation.x = Math.sin(t * 0.2) * 0.1;

      // Gentle pulsing
      messageBody.current.scale.x = 1 + Math.sin(t) * 0.05;
      messageBody.current.scale.y = 1 + Math.sin(t) * 0.05;
    }

    // Message tail wiggle
    if (messageTail.current) {
      messageTail.current.rotation.z = Math.sin(t * 1.5) * 0.2;
    }

    // Bubbles floating animation
    if (bubble1.current) {
      bubble1.current.position.y = 0.8 + Math.sin(t * 2) * 0.1;
      bubble1.current.position.x = 0.6 + Math.cos(t * 1.5) * 0.05;

      bubble2.current.position.y = 0.7 + Math.sin(t * 1.7 + 1) * 0.12;
      bubble2.current.position.x = 0.2 + Math.cos(t * 1.3 + 1) * 0.06;

      bubble3.current.position.y = 0.75 + Math.sin(t * 1.9 + 2) * 0.08;
      bubble3.current.position.x = -0.3 + Math.cos(t * 1.6 + 2) * 0.04;
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
        {/* Message body - rounded rectangle */}
        <mesh ref={messageBody} position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 1, 0.2]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.05}
            speed={1}
            metalness={0.7}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Message tail */}
        <mesh
          ref={messageTail}
          position={[-0.5, -0.6, 0]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <boxGeometry args={[0.6, 0.6, 0.2]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.1}
            speed={1.5}
            metalness={0.7}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Chat bubbles */}
        <mesh ref={bubble1} position={[0.6, 0.8, 0.15]} scale={0.2}>
          <sphereGeometry args={[1, 16, 16]} />
          <MeshWobbleMaterial
            color="#ffffff"
            factor={0.2}
            speed={2}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.2}
            transparent={true}
            opacity={0.9}
          />
        </mesh>

        <mesh ref={bubble2} position={[0.2, 0.7, 0.15]} scale={0.15}>
          <sphereGeometry args={[1, 16, 16]} />
          <MeshWobbleMaterial
            color="#ffffff"
            factor={0.2}
            speed={2}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.2}
            transparent={true}
            opacity={0.9}
          />
        </mesh>

        <mesh ref={bubble3} position={[-0.3, 0.75, 0.15]} scale={0.12}>
          <sphereGeometry args={[1, 16, 16]} />
          <MeshWobbleMaterial
            color="#ffffff"
            factor={0.2}
            speed={2}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.2}
            transparent={true}
            opacity={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
}
