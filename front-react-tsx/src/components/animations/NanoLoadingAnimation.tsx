import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../../lottie/futuristicNanoLoading.json";
import WavyProgressText from "./WavyProgressText";

interface NanoLoadingAnimationProps {
  textLoading?: string;
}

const NanoLoadingAnimation = ({ textLoading = 'Loading' }: NanoLoadingAnimationProps) => {

  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex-row text-center content-cen"
    >
        <Lottie
          animationData={animationData}
          loop
          autoplay

          style={{height: '250px', width: '250px'}}
        />
        <WavyProgressText text={textLoading}/>
    </motion.div>
  );
};

export default NanoLoadingAnimation;
