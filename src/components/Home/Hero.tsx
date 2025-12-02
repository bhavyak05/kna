"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [animationStage, setAnimationStage] = useState<"video" | "outline" | "fill">("video");

  const layers = [
    {
      text: "IGNITE",
      video: "/videos/Ignite.mp4",
      align: "left",
      fillIndices: [0, 1, 2], // IGN
    },
    {
      text: "INNOVATE",
      video: "/videos/Innovate.mp4",
      align: "right",
      fillIndices: [4, 5, 6, 7], // VATE
    },
    {
      text: "IMPACT",
      video: "/videos/Impact.mp4",
      align: "left",
      fillIndices: [0, 1], // IM
    },
  ];

  // === Scroll-triggered animation sequence ===
  useEffect(() => {
    if (isInView) {
      setAnimationStage("video");
      const videoTimer = setTimeout(() => setAnimationStage("outline"), 2000);
      const fillTimer = setTimeout(() => setAnimationStage("fill"), 3000);
      return () => {
        clearTimeout(videoTimer);
        clearTimeout(fillTimer);
      };
    } else {
      setAnimationStage("video"); // Reset to initial state
    }
  }, [isInView]);

  // === Letter animation variants ===
  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      color: "transparent",
      WebkitTextStroke: "1.75px white",
    },
    outline: (i: number) => ({
      opacity: 1,
      color: "transparent",
      WebkitTextStroke: "1.75px white",
      transition: { delay: i * 0.12, duration: 0.4, ease: "easeInOut" },
    }),
    fill: (i: number) => ({
      opacity: [0, 1],
      color: ["transparent", "white"],
      WebkitTextStroke: "0px",
      transition: { delay: i * 0.08, duration: 0.8, ease: "easeInOut" },
    }),
  } as any;

  return (
    <section ref={ref} className="relative w-full h- flex flex-col overflow-hidden bg-black pt-20">
      {/* <div className="max-w-7xl mx-auto px-4 w-full h-full"> */}
      <div >
        {layers.map((layer, layerIndex) => (
          <motion.div
            key={layerIndex}
            className="relative flex flex-1 overflow-hidden"
            style={{ height: "33.333%" }}
            initial={{ opacity: 0, x: layer.align === "right" ? 200 : -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: layerIndex * 0.5,
              duration: 1.4,
              ease: "easeOut",
            }}
          >
            <div className="relative w-full h-full flex items-center">
              {layer.align === "left" ? (
                <>
                  {/* ===== Filled letters (black side) ===== */}
                  <div
                    className="relative z-30 bg-black flex items-center justify-start h-[65%]"
                    style={{ width: "auto", paddingRight: "0" }}
                  >
                    <h1
                      className="leading-none tracking-tight whitespace-nowrap font-anton"
                      style={{
                        fontSize: layer.text === "INNOVATE" ? "calc(26vh)" : "calc(32vh)",
                        lineHeight: "1",
                      }}
                    >
                      {layer.text.split("").map((char, i) => {
                        const isFillLetter = layer.fillIndices.includes(i);
                        if (!isFillLetter) return null;

                        let animateStage = "hidden";
                        if (animationStage === "outline") animateStage = "outline";
                        if (animationStage === "fill") animateStage = "fill";

                        return (
                          <motion.span
                            key={i}
                            custom={i}
                            variants={letterVariants}
                            initial="hidden"
                            animate={animateStage}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        );
                      })}
                    </h1>
                  </div>

                  {/* ===== Outlined letters with video (right side) ===== */}
                  <div className="relative flex-1 h-full overflow-hidden">
                    {/* Video background */}
                    <motion.div
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        zIndex: 10,
                        backgroundColor: "black",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: layerIndex * 0.6,
                        duration: 1.5,
                        ease: "easeOut",
                      }}
                    >
                      <video
                        src={layer.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                      />
                      {/* Gradient for smooth merging with black side */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-20"></div>
                    </motion.div>

                    {/* Outlined text */}
                    <div
                      className="relative z-30 flex items-center justify-start h-full"
                      style={{ paddingLeft: "0", mixBlendMode: "screen" }}
                    >
                      <h1
                        className="leading-none tracking-tight whitespace-nowrap font-anton"
                        style={{
                          fontSize: layer.text === "INNOVATE" ? "calc(26vh)" : "calc(32vh)",
                          lineHeight: "1",
                        }}
                      >
                        {layer.text.split("").map((char, i) => {
                          const isFillLetter = layer.fillIndices.includes(i);
                          if (isFillLetter) return null;

                          let animateStage = "hidden";
                          if (animationStage === "outline" || animationStage === "fill")
                            animateStage = "outline";

                          return (
                            <motion.span
                              key={i}
                              custom={i}
                              variants={letterVariants}
                              initial="hidden"
                              animate={animateStage}
                              className="inline-block"
                            >
                              {char}
                            </motion.span>
                          );
                        })}
                      </h1>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* ===== Outlined letters with video (left side) ===== */}
                  <div className="relative flex-1 h-full overflow-hidden">
                    <motion.div
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        zIndex: 10,
                        backgroundColor: "black",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: layerIndex * 0.6,
                        duration: 1.5,
                        ease: "easeOut",
                      }}
                    >
                      <video
                        src={layer.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                      />
                      {/* Gradient for smooth merging with black side */}
                      <div className="absolute inset-0 bg-gradient-to-l from-black via-black/70 to-transparent z-20"></div>
                    </motion.div>

                    {/* Outlined text */}
                    <div
                      className="relative z-30 flex items-center justify-end h-full"
                      style={{ paddingRight: "0", mixBlendMode: "screen" }}
                    >
                      <h1
                        className="leading-none tracking-tight whitespace-nowrap font-anton text-right"
                        style={{
                          fontSize: "calc(32vh)",
                          lineHeight: "1",
                        }}
                      >
                        {layer.text.split("").map((char, i) => {
                          const isFillLetter = layer.fillIndices.includes(i);
                          if (isFillLetter) return null;

                          let animateStage = "hidden";
                          if (animationStage === "outline" || animationStage === "fill")
                            animateStage = "outline";

                          return (
                            <motion.span
                              key={i}
                              custom={i}
                              variants={letterVariants}
                              initial="hidden"
                              animate={animateStage}
                              className="inline-block"
                            >
                              {char}
                            </motion.span>
                          );
                        })}
                      </h1>
                    </div>
                  </div>

                  {/* ===== Filled letters (black side) ===== */}
                  <div
                    className="relative z-30 bg-black flex items-center justify-end h-[65%]"
                    style={{ width: "auto", paddingLeft: "0" }}
                  >
                    <h1
                      className="leading-none tracking-tight whitespace-nowrap font-anton text-right"
                      style={{
                        fontSize: "calc(32vh)",
                        lineHeight: "1",
                      }}
                    >
                      {layer.text.split("").map((char, i) => {
                        const isFillLetter = layer.fillIndices.includes(i);
                        if (!isFillLetter) return null;

                        let animateStage = "hidden";
                        if (animationStage === "outline") animateStage = "outline";
                        if (animationStage === "fill") animateStage = "fill";

                        return (
                          <motion.span
                            key={i}
                            custom={i}
                            variants={letterVariants}
                            initial="hidden"
                            animate={animateStage}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        );
                      })}
                    </h1>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
