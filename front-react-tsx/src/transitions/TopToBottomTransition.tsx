import { motion } from "framer-motion";

export const TopToBottomTransition = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 1, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.div>
);