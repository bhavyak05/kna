"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/all";

gsap.registerPlugin(MorphSVGPlugin);

const StatsTop = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.4, once: false });
  const [highlight, setHighlight] = useState(false);
  const shapeRef = useRef<SVGPathElement | null>(null);

  // 🟡 Droplet → Ball → Roll → Return → Pentagon Animation for Diamond
  useEffect(() => {
    if (!shapeRef.current) return;

    // Set initial state (higher position, smaller size)
    gsap.set(shapeRef.current, { y: -80, x: 0, scale: 1, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
      defaults: { ease: "power2.inOut" },
      paused: true,
    });

    // Step 1: Drop like a droplet (squash on impact)
    tl.to(shapeRef.current, {
      y: 0,
      scaleY: 0.7,
      scaleX: 1.2,
      duration: 0.5,
      ease: "power2.in",
    })
      // Bounce back slightly
      .to(shapeRef.current, {
        scaleY: 1.1,
        scaleX: 0.9,
        duration: 0.2,
        ease: "power2.out",
      })
      // Settle to normal
      .to(shapeRef.current, {
        scaleY: 1,
        scaleX: 1,
        duration: 0.2,
        ease: "power1.out",
      })
      // Step 2: Morph into a ball
      .to(shapeRef.current, {
        duration: 0.6,
        morphSVG: "M50 10 Q90 10 90 50 Q90 90 50 90 Q10 90 10 50 Q10 10 50 10 Z",
        ease: "power2.inOut",
      })
      // Step 3: Roll to the right
      .to(shapeRef.current, {
        x: 150,
        rotation: 360,
        duration: 2,
        ease: "power1.inOut",
      })
      // Step 4: Roll back to the left
      .to(shapeRef.current, {
        x: 0,
        rotation: 720,
        duration: 2,
        ease: "power1.inOut",
      })
      // Step 5: Morph back into pentagon
      .to(shapeRef.current, {
        duration: 0.6,
        morphSVG: "M50 10 L90 35 L73 85 L27 85 L10 35 Z",
        ease: "power2.inOut",
      })
      // Lift up to starting position
      .to(shapeRef.current, {
        y: -80,
        duration: 0.6,
        ease: "power2.in",
      });

    // Play only while visible
    if (isInView) tl.play();
    else tl.pause();

    return () => {
      tl.kill();
    };
  }, [isInView]);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setHighlight(true), 1800);
      return () => clearTimeout(timer);
    } else {
      setHighlight(false);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[90vh] flex items-end bg-black text-white overflow-hidden font-sans"
    >
      {/* === BACKGROUND IMAGE WITH ANIMATION === */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/team-working.png')", // change path if needed
        }}
        initial={{ opacity: 0, scale: 1.1, x: 120 }}
        animate={
          isInView
            ? {
                opacity: 1,
                scale: 1,
                x: 0,
                transition: {
                  duration: 1.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }
            : {
                opacity: 0,
                x: -100,
                transition: { duration: 1.2, ease: "easeInOut" },
              }
        }
      />

      {/* === LEFT GRADIENT OVERLAY === */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"
        initial={{ opacity: 0, x: -50 }}
        animate={
          isInView
            ? {
                opacity: 1,
                x: 0,
                transition: { duration: 1.6, delay: 0.3, ease: "easeOut" },
              }
            : { opacity: 0, x: -50 }
        }
      />

      {/* === CONTENT === */}
      <div className="relative z-10 w-full max-w-8xl mx-auto flex flex-col items-start justify-end px-6 md:px-16 pb-8 md:pb-8">
        {/* Diamond + Label */}
        <div className="flex items-center gap-4 mb-3">
          <div className="relative flex items-center">
            {/* Trail Line */}
            

            {/* Diamond Symbol */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -45, y: 20 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: [0.5, 1.2, 1],
                      rotate: [0, 72, 0],
                      y: [20, 0],
                      transition: {
                        duration: 1.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    }
                  : { opacity: 0, scale: 0.5, rotate: 0 }
              }
              className="text-[#f5c518] text-2xl origin-center relative z-10"
            >
              <motion.svg
                width="32"
                height="32"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        transition: { duration: 0.6, ease: "easeOut" },
                      }
                    : { opacity: 0 }
                }
              >
                <path
                  ref={shapeRef}
                  d="M50 10 L90 35 L73 85 L27 85 L10 35 Z"
                  fill="#f5c518"
                />
              </motion.svg>
            </motion.div>
          </div>
</div><div>
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, transition: { delay: 0.6 } }
                : { opacity: 0, y: 10 }
            }
            className="uppercase tracking- text-2xl text-gray-300"
          >
            Why K&A?
          </motion.span>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.2, delay: 0.8, ease: "easeOut" },
                }
              : { opacity: 0, y: 40 }
          }
          className="text-3xl md:text-5xl leading-snug md:leading-[1.25] font-light max-w-3xl text-left"
          style={{ fontFamily: "Gotham, sans-serif" }}
        >
          Experience, expertise, infrastructure & high-tech backbone,{" "}
          <motion.span
            animate={
              highlight
                ? {
                    color: "#f5c518",
                    transition: { duration: 0.8, ease: "easeInOut" },
                  }
                : { color: "#ffffff" }
            }
            className="font-normal"
          >
            talent pool, pan-India presence and strong leadership.
          </motion.span>
        </motion.h2>
      </div>
    </section>
  );
};

export default StatsTop;
