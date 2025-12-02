"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";

const Ideas = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });
  const [showVideo, setShowVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHeadingHovered, setIsHeadingHovered] = useState(false);

  const openVideo = () => setShowVideo(true);
  const closeVideo = () => setShowVideo(false);

  // Button bar animation variants
  const yellowVariant: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.5 } },
  };

  const playVariant: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={ref}
      className="w-full min-h-screen overflow-hidden font-sans text-white bg-black py-12"
    >
      {/* --- Top Heading --- */}
      <motion.div
        className="w-full bg-black py-2 flex justify-center items-center sticky top-0 z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.h2
          className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-light leading-none tracking-widest text-center cursor-pointer"
          style={{
            fontFamily: "Gotham, sans-serif",
            color: isHeadingHovered ? "#ffffff" : "#37353e",
            transition: "color 0.5s ease-in-out",
          }}
          onMouseEnter={() => setIsHeadingHovered(true)}
          onMouseLeave={() => setIsHeadingHovered(false)}
        >
          Turn on the ignition
        </motion.h2>
      </motion.div>

      {/* --- Background Image --- */}
      <motion.div
        className="relative w-full h-[70vh] overflow-hidden"
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.img
          src="/images/Office shoot B&W Thumbnail.png"
          alt="Team working"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2 }}
        />

        <motion.div
          className="absolute inset-0 bg-black/60"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>

        <motion.div
          className="relative z-10 flex flex-col justify-end h-full max-w-8xl mx-auto px-6 md:px-16 pb-1"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl leading-tight font-normal"
            style={{ fontFamily: "Gotham, sans-serif" }}
          >
            <span className="text-[#f5c518]">Ideas spark.</span>{" "}
            <span className="text-white">Stories captivate.</span>
          </h1>
        </motion.div>
      </motion.div>

      {/* --- Buttons Bar --- */}
      <div className="w-full flex flex-col md:flex-row overflow-hidden">
        {/* Left yellow section */}
        <motion.button
          type="button"
          variants={yellowVariant}
          initial="hidden"
          animate={isInView ? "visible" : "exit"}
          exit="exit"
          className="w-full md:w-1/2 bg-[#f5c518] text-white py-4 text-2xs md:text-2xs lg:text-2xs font-normal tracking-widest flex items-center justify-start pl-14 hover:bg-[#e0b800] transition"
        >
          EXPLORE WORKS
        </motion.button>

        {/* Right unified section (dark grey + black merged) */}
        <motion.button
          onClick={openVideo}
          variants={playVariant}
          initial="hidden"
          animate={isInView ? "visible" : "exit"}
          exit="exit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full md:w-1/2 bg-[#1c1c1c] text-white py-4 text-2xs md:text-2xs lg:text-2xs font-normal tracking-widest flex items-center justify-center gap-4 hover:bg-[#111] transition"
        >
          <motion.div
            className="w-10 h-10 flex items-center justify-center border border-white rounded-full"
            animate={{
              rotate: isHovered ? 360 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-white text-2xs"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </motion.div>
          PLAY VIDEO
        </motion.button>
      </div>

      {/* --- Video Modal --- */}
      <AnimatePresence mode="wait">
        {showVideo && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={closeVideo}
          >
            <motion.div
              key="modal"
              className="relative w-[92%] md:w-[80%] lg:w-[70%] aspect-video"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src="/videos/Office shoot B&W 10 MB.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover rounded-lg bg-black"
              />
              <button
                onClick={closeVideo}
                aria-label="Close video"
                className="absolute top-3 right-3 text-white text-2xl p-1"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Ideas;
