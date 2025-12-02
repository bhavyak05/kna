"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const cards = [
  {
    video: "/videos/design-animation.mp4",
    title: "High-Performance Design",
    text: `True design lingers in the mind.

We go beyond aesthetics to deliver ideas that stand out, connect and outshine.`,
  },
  {
    video: "/videos/people-animation.mp4",
    title: "Powered by Our People",
    text: `We are a tribe of storytellers, artists, technical thinkers and problem solvers. 
Together, we craft digital experiences that captivate, connect and stand the test of time.`,
  },
  {
    video: "/videos/engineering-animation.mp4",
    title: "Engineering Digital Strength that Endures",
    text: `We engineer with foresight. Every tech decision is tied to your objectives, ensuring your digital ecosystem remains robust, scalable and future-proof.`,
  },
];

export default function CapabilityCards() {
  return (
    <div className="w-full px-6 md:px-12 lg:px-24 py-20">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}

function Card({ video, title, text }: any) {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -80 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full py-16 border-t border-b border-[#737373] flex flex-col md:flex-row items-center gap-10"
    >
      {/* LEFT — VIDEO */}
      <div className="w-full md:w-[35%] flex justify-center">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-[260px] md:w-[300px] object-contain"
        />
      </div>

      {/* RIGHT — TEXT */}
      <div className="w-full md:w-[60%] text-white">
        <h2
          className="mb-4 leading-snug"
          style={{ fontFamily: "Gotham", fontSize: "35px", fontWeight: 400 }}
        >
          {title}
        </h2>

        <p
          className="whitespace-pre-line opacity-90 leading-relaxed"
          style={{ fontFamily: "Gotham", fontSize: "21px", fontWeight: 300 }}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
}


