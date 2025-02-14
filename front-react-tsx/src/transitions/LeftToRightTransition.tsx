import { motion } from "framer-motion";

export const LeftToRightTransition = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 1, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.div>
);