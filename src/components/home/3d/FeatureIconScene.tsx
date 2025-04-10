import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { DocumentIcon, ShieldIcon, KeyIcon, GearIcon } from "./FeatureIcons";

type FeatureIconSceneProps = {
  iconType: "document" | "shield" | "key" | "gear";
  color: string;
  className?: string;
  interactive?: boolean;
};

export function FeatureIconScene({
  iconType,
  color,
  className = "",
  interactive = false,
}: FeatureIconSceneProps) {
  const getIcon = () => {
    switch (iconType) {
      case "document":
        return <DocumentIcon color={color} />;
      case "shield":
        return <ShieldIcon color={color} />;
      case "key":
        return <KeyIcon color={color} />;
      case "gear":
        return <GearIcon color={color} />;
      default:
        return <DocumentIcon color={color} />;
    }
  };

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.7}
          color="#f0f0ff"
        />
        <spotLight
          position={[0, 5, 5]}
          intensity={0.8}
          angle={0.3}
          penumbra={1}
          castShadow
        />
        {getIcon()}
        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        )}
      </Canvas>
    </div>
  );
}
