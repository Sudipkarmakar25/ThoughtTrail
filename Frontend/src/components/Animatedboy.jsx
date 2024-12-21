import { motion } from 'framer-motion';
import React from 'react';

const AnimatedBoy = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }} // Start off-screen to the left
      animate={{ x:+100, opacity: 1 }} // Move to the center and fade in
      transition={{ duration: 2 }} // Animation duration
      className="absolute left-0 top-1/2 transform -translate-y-1/2"
    >
      <img src="https://www.pngmart.com/files/21/3D-Cartoon-Boy-PNG-HD.png" alt="Animated Boy" className="h-[350px] w-auto" />
    </motion.div>
  );
}

export default AnimatedBoy;