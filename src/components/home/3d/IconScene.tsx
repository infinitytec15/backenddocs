import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  SparklesIcon,
  RocketIcon,
  StarIcon,
  CrownIcon,
  MessageIcon,
} from "./PlanIcons";

type IconSceneProps = {
  iconType: "sparkles" | "rocket" | "star" | "crown" | "message";
  color: string;
  className?: string;
  interactive?: boolean;
};

export function IconScene({
  iconType,
  color,
  className = "",
  interactive = false,
}: IconSceneProps) {
  const getIcon = () => {
    switch (iconType) {
      case "sparkles":
        return <SparklesIcon color={color} />;
      case "rocket":
        return <RocketIcon color={color} />;
      case "star":
        return <StarIcon color={color} />;
      case "crown":
        return <CrownIcon color={color} />;
      case "message":
        return <MessageIcon color={color} />;
      default:
        return <SparklesIcon color={color} />;
    }
  };

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        {getIcon()}
        {interactive && <OrbitControls enableZoom={false} />}
      </Canvas>
    </div>
  );
}
