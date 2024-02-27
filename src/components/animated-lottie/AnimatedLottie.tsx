"use client";

import React from "react";
import Lottie from "lottie-react";

interface AnimatedLottieProps {
  animationData: Object;
}

const AnimatedLottie: React.FC<AnimatedLottieProps> = ({ animationData }) => {
  return <Lottie animationData={animationData} loop={true} />;
};

export default AnimatedLottie;
