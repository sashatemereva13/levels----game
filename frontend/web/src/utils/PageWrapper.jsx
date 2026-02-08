import { motion } from "framer-motion";

export function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.1,
        ease: "easeInOut",
      }}
      style={{ height: "100%", width: "100%" }}
    >
      {children}
    </motion.div>
  );
}
