import { motion } from "framer-motion";

export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-cream"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.svg
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-rose"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.85, 1, 0.85], opacity: 1 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 18px rgba(230,150,160,0.55))" }}
        >
          <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
        </motion.svg>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-display text-lg italic text-ink/70"
        >
          a little something for you…
        </motion.p>
      </div>
    </motion.div>
  );
}
