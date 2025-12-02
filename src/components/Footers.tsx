"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/all";
import { motion, useInView } from "framer-motion";

gsap.registerPlugin(MorphSVGPlugin);

const Footers = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.4, once: false });
  const shapeRef = useRef<SVGPathElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const horizontalDividerRef = useRef<HTMLDivElement | null>(null);

  // 🟡 Droplet → Ball → Roll → Return → Pentagon Animation
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

  // 🧩 Divider & gridlines animation
  useEffect(() => {
    if (!gridRef.current || !horizontalDividerRef.current) return;

    const horizontal = horizontalDividerRef.current;
    const verticals = gridRef.current.querySelectorAll(".gridline");

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    if (isInView) {
      tl.to(horizontal, { scaleX: 1, opacity: 1, duration: 0.8 })
        .to(
          verticals,
          { height: "100%", opacity: 1, duration: 0.8, stagger: 0.2 },
          "+=0.2"
        );
    } else {
      gsap.to([horizontal, verticals], {
        opacity: 0,
        height: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power1.inOut",
      });
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen bg-black text-white px-8 md:px-20 py-10 flex flex-col justify-between overflow-hidden font-sans"
    >
      {/* === TOP SECTION === */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-3 md:w-2/3 relative">
          <div className="flex flex-col items-start gap-2">
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

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, transition: { delay: 0.3 } }
                  : { opacity: 0, y: 10 }
              }
              className="uppercase tracking-widest text-lg text-gray-400"
            >
              We're here to help
            </motion.span>
          </div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.6, ease: "easeOut" },
                  }
                : { opacity: 0, y: 20 }
            }
            className="text-4xl md:text-6xl lg:text-7xl leading-tight font-light"
            style={{ fontFamily: "Gotham, sans-serif" }}
          >
            We don't just ideate;
            <br />
            we build <span className="text-[#f5c518]">together.</span>
          </motion.h2>

          {/* Extended Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              isInView
                ? {
                    scaleX: 1.5,
                    opacity: 1,
                    transition: {
                      delay: 1,
                      duration: 0.6,
                      ease: "easeInOut",
                    },
                  }
                : { scaleX: 0, opacity: 0 }
            }
            className="w-full h-[1px] bg-gray-700 mt-4 origin-left"
          />
        </div>

        {/* RIGHT SIDE: NEXT BUTTON */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={
            isInView
              ? { opacity: 1, x: 0, transition: { delay: 1.2 } }
              : { opacity: 0, x: 50 }
          }
          className="flex flex-row items-center pt-30 gap-2 mt-4 md:mt-0"
        >
          <span className="uppercase text-xl tracking-widest text-gray-400">
            Next
          </span>
          <motion.div
            whileHover={{ rotate: 45, scale: 1.1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-15 h-15 rounded-full bg-[#2b2b2b] flex items-center justify-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10"
            >
              <path d="M7 17L17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* === GRID DIVIDER === */}
      <div
        ref={horizontalDividerRef}
        className="w-full h-[1px] bg-gray-700 mt-8 origin-left scale-x-0 opacity-0"
      />

      {/* === GRID SECTION === */}
      <div className="relative mt-8" ref={gridRef}>
        {[1, 2].map((i) => (
          <div
            key={i}
            className={`gridline absolute top-0 bottom-0 w-[1px] bg-gray-700 opacity-0 h-0 ${
              i === 1 ? "left-1/3" : "left-2/3"
            }`}
          />
        ))}

        <div className="grid md:grid-cols-3 gap-6 relative mt-4">
          {/* Column 1: FAQs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            className="px-8"
            animate={
              isInView
                ? { opacity: 1, x: 0, transition: { delay: 2, duration: 0.6 } }
                : { opacity: 0, x: -30 }
            }
            
          >
            <h3 className="text-base font-semibold mb-3">FAQs</h3>
            <div className="space-y-2 text-gray-400 text-sm leading-relaxed">
              <p>
                Cab id quae ne nullore secumque listi si disstitia volessim idit,
                aperum dit, cus rest, ipsam sinum quodit. Electo rspero dolupta
                cusapee.
              </p>
              <hr className="border-gray-700" />
              <p>
                Berorepe rspero dolupta cusaep ellitate core commolor aliqui
                culpa voloriandi intecti onsedit doluptae.
              </p>
              <hr className="border-gray-700" />
              <p>
                Ibus cumquam quidesto eum il ma comnit quis aut ped quatenist
                audandellit dent.
              </p>
            </div>
          </motion.div>

          {/* Column 2: Offices */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            className="px-8"
            animate={
              isInView
                ? { opacity: 1, x: 0, transition: { delay: 2.2, duration: 0.6 } }
                : { opacity: 0, x: -30 }
            }
          >
            <h3 className="text-base font-semibold mb-3">STOP BY OUR OFFICES</h3>
            <div className="text-gray-400 text-sm leading-relaxed space-y-3">
              <div>
                <p className="text-[#f5c518] font-medium mb-1">Kolkata</p>
                <p>
                  South City Business Park, 770, Eastern Metropolitan Bypass Rd,
                  Adarsha Nagar, Kolkata, West Bengal 700107
                </p>
              </div>
              <hr className="border-gray-700" />
              <div>
                <p className="text-[#f5c518] font-medium mb-1">Mumbai</p>
                <p>
                  9th Floor, Supreme Centre, Linking Road, Bandra (W), Mumbai,
                  Maharashtra 400050
                </p>
              </div>
              <hr className="border-gray-700" />
              <div>
                <p className="text-[#f5c518] font-medium mb-1">Delhi</p>
                <p>
                  DLF Cyber City, Tower A, Phase II, Gurugram, Haryana 122002
                </p>
              </div>
            </div>
          </motion.div>

          {/* Column 3: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            className="px-8"
            animate={
              isInView
                ? { opacity: 1, x: 0, transition: { delay: 2.4, duration: 0.6 } }
                : { opacity: 0, x: -30 }
            }
          >
            <h3 className="text-base font-semibold mb-3">DROP US A LINE</h3>
            <form className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-1/2 bg-transparent border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-500 rounded-full"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-1/2 bg-transparent border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-500 rounded-full"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-1/2 bg-transparent border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-500 rounded-full"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-1/2 bg-transparent border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-500 rounded-full"
                />
              </div>
              <input
                type="text"
                placeholder="Organisation"
                className="w-full bg-transparent border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-500 rounded-full"
              />
              <textarea
                placeholder="Message"
                className="w-full bg-transparent border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-500 rounded-md h-20 resize-none"
              />
              <button className="w-full bg-transparent border border-gray-600 text-gray-600 rounded-full hover:bg-[#e0b800] hover:text-black font-medium py-2 text-sm tracking-widest transition">
                Submit
              </button>
            </form>



          </motion.div>
        </div>
      </div>

     

      {/* === BOTTOM DIVIDER + COPYRIGHT + SOCIAL ICONS === */}
<motion.div
  initial={{ scaleX: 0, opacity: 0 }}
  animate={
    isInView
      ? {
          scaleX: 1,
          opacity: 1,
          transition: { delay: 2.8, duration: 0.5, ease: "easeInOut" },
        }
      : { scaleX: 0, opacity: 0 }
  }
  className="w-full h-[1px] bg-gray-700 mt-8 origin-left"
/>

{/* FLEX ROW FOR COPYRIGHT + ICONS */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={
    isInView
      ? {
          opacity: 1,
          y: 0,
          transition: { delay: 3, duration: 0.6 },
        }
      : { opacity: 0, y: 10 }
  }
  className="text-gray-600 text-xs mt-3 w-full flex justify-between items-center"
>
  {/* LEFT: COPYRIGHT TEXT */}
  <p>© Kalolwala & Associates Private Limited © 2025. All rights reserved.</p>

  {/* RIGHT: SOCIAL ICONS */}
  <div className="flex gap-4 text-gray-400">

    {/* Facebook */}
    <a
      href="https://www.facebook.com/kalolwalaassociates/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.02 3.66 9.19 8.44 9.93v-7.03H8.08v-2.9h2.36V9.83c0-2.33 1.38-3.62 3.51-3.62 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46v1.75h2.59l-.41 2.9h-2.18V22c4.78-.74 8.44-4.91 8.44-9.93z"/>
      </svg>
    </a>

    {/* Instagram */}
    <a
      href="https://www.instagram.com/kalolwalaassociates/?igshid=1haq6e2igqh4l"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
      </svg>
    </a>

    {/* YouTube */}
    <a
      href="https://www.youtube.com/channel/UC6AxPH06zke5MGr7TQNYdfA"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.6 3.2H4.4A4.38 4.38 0 000 7.6v8.8a4.38 4.38 0 004.4 4.4h15.2a4.38 4.38 0 004.4-4.4V7.6a4.38 4.38 0 00-4.4-4.4zM9.6 16.2V7.8l6.8 4.2-6.8 4.2z"/>
      </svg>
    </a>

    {/* LinkedIn */}
    <a
      href="https://www.linkedin.com/company/kalolwala-associates-private-limited"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-8 7H8v10h3V10zm-.5-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM20 10h-3v1.39c-.69-.97-1.68-1.39-2.82-1.39C12.09 10 11 11.24 11 13v7h3v-6c0-.76.53-1.35 1.24-1.35.82 0 1.76.59 1.76 1.97V20h3v-8z"/>
      </svg>
    </a>

  </div>
</motion.div>


    </section>
  );
};

export default Footers;