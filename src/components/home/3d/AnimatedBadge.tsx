import { motion } from "framer-motion";

interface AnimatedBadgeProps {
  text: string;
  color?: string;
}

export function AnimatedBadge({ text, color = "indigo" }: AnimatedBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.6,
      }}
      className={`absolute top-0 right-0 z-10 transform rotate-3 shadow-lg`}
    >
      <div
        className={`relative ${color === "blue" ? "bg-blue-500" : color === "indigo" ? "bg-indigo-500" : color === "purple" ? "bg-purple-500" : color === "amber" ? "bg-amber-500" : "bg-green-500"} text-white font-bold px-4 py-1 rounded-tr-xl rounded-bl-lg text-xs`}
      >
        <motion.div
          className="absolute inset-0 bg-white rounded-lg opacity-20"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.span
          className="relative z-10 inline-block"
          animate={{
            y: [-1, 1, -1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.span>
      </div>
    </motion.div>
  );
}
