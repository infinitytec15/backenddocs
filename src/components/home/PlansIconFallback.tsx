import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Rocket, Star, Crown, MessageSquare } from "lucide-react";

type IconProps = {
  iconType: "sparkles" | "rocket" | "star" | "crown" | "message";
  color: string;
  size?: number;
};

export function PlansIconFallback({ iconType, color, size = 40 }: IconProps) {
  const getIcon = () => {
    switch (iconType) {
      case "sparkles":
        return <Sparkles size={size} color={color} />;
      case "rocket":
        return <Rocket size={size} color={color} />;
      case "star":
        return <Star size={size} color={color} />;
      case "crown":
        return <Crown size={size} color={color} />;
      case "message":
        return <MessageSquare size={size} color={color} />;
      default:
        return <Sparkles size={size} color={color} />;
    }
  };

  return (
    <motion.div
      whileHover={{ rotate: 5, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10,
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        rotate: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="flex items-center justify-center h-full w-full"
    >
      {getIcon()}
    </motion.div>
  );
}
