import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../../lottie/scanningCard.json";

const ScanningCardAnimation = () => {
  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
    >
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{height: '250px', width: '250px'}}
        />
    </motion.div>
  );
};

export default ScanningCardAnimation;
