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

  useFrame((state) => {
    mesh.current.rotation.y =
      Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    mesh.current.rotation.x =
      Math.cos(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      position={position}
    >
      <mesh ref={mesh} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.3}
          speed={2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export function RocketIcon({
  color,
  position = [0, 0, 0],
  scale = 1,
}: IconProps) {
  const mesh = useRef<Mesh>(null!);

  useFrame((state) => {
    mesh.current.rotation.y =
      Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    mesh.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.4}
      floatIntensity={0.4}
      position={position}
    >
      <mesh ref={mesh} scale={scale}>
        <coneGeometry args={[0.8, 2, 4]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.2}
          speed={1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export function StarIcon({
  color,
  position = [0, 0, 0],
  scale = 1,
}: IconProps) {
  const mesh = useRef<Mesh>(null!);

  useFrame((state) => {
    mesh.current.rotation.z += 0.005;
    mesh.current.scale.x =
      Math.abs(Math.sin(state.clock.getElapsedTime() * 0.5)) * scale * 1.2;
    mesh.current.scale.y =
      Math.abs(Math.sin(state.clock.getElapsedTime() * 0.5)) * scale * 1.2;
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0.3}
      floatIntensity={0.3}
      position={position}
    >
      <mesh ref={mesh} scale={scale}>
        <tetrahedronGeometry args={[1, 0]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.1}
          speed={1.5}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

export function CrownIcon({
  color,
  position = [0, 0, 0],
  scale = 1,
}: IconProps) {
  const mesh = useRef<Mesh>(null!);

  useFrame((state) => {
    mesh.current.rotation.y =
      Math.sin(state.clock.getElapsedTime() * 0.2) * 0.3;
    mesh.current.rotation.z =
      Math.cos(state.clock.getElapsedTime() * 0.2) * 0.1;
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0.2}
      floatIntensity={0.2}
      position={position}
    >
      <mesh ref={mesh} scale={scale}>
        <torusGeometry args={[0.7, 0.3, 16, 32]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.05}
          speed={1}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </Float>
  );
}

export function MessageIcon({
  color,
  position = [0, 0, 0],
  scale = 1,
}: IconProps) {
  const mesh = useRef<Mesh>(null!);

  useFrame((state) => {
    mesh.current.rotation.y =
      Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    mesh.current.scale.x =
      (1 + Math.sin(state.clock.getElapsedTime()) * 0.1) * scale;
    mesh.current.scale.y =
      (1 + Math.sin(state.clock.getElapsedTime()) * 0.1) * scale;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.3}
      position={position}
    >
      <mesh ref={mesh} scale={scale}>
        <boxGeometry args={[1.5, 1, 0.2]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.1}
          speed={1}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
}
