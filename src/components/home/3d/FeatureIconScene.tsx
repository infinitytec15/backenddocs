import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { DocumentIcon, ShieldIcon, KeyIcon, GearIcon } from "./FeatureIcons";

type FeatureIconSceneProps = {
  iconType: "document" | "shield" | "key" | "gear";
  color: string;
  className?: string;
  interactive?: boolean;
  scale?: number;
};

export function FeatureIconScene({
  iconType,
  color,
  className = "",
  interactive = false,
  scale = 1,
}: FeatureIconSceneProps) {
  const getIcon = () => {
    switch (iconType) {
      case "document":
        return <DocumentIcon color={color} scale={scale} />;
      case "shield":
        return <ShieldIcon color={color} scale={scale} />;
      case "key":
        return <KeyIcon color={color} scale={scale} />;
      case "gear":
        return <GearIcon color={color} scale={scale} />;
      default:
        return <DocumentIcon color={color} scale={scale} />;
    }
  };

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]} // Responsive pixel ratio for better performance
        shadows
      >
        {/* Improved lighting setup */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.0} color="#ffffff" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#f0f0ff"
        />
        <spotLight
          position={[0, 5, 5]}
          intensity={0.7}
          angle={0.3}
          penumbra={1}
          castShadow
        />

        {/* Add subtle contact shadows for better grounding */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={5}
          blur={2.5}
          far={4}
        />

        {/* Environment helps with reflections */}
        <Environment preset="city" />

        {getIcon()}

        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate
            autoRotateSpeed={1}
          />
        )}
      </Canvas>
    </div>
  );
}
