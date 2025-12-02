// // // "use client";

// // // import { useEffect, useRef, useState } from "react";
// // // import { motion } from "framer-motion";
// // // import gsap from "gsap";
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // // if (typeof window !== "undefined") {
// // //   gsap.registerPlugin(ScrollTrigger);
// // // }

// // // const Discover = () => {
// // //   const sectionRef = useRef<HTMLDivElement | null>(null);
// // //   const videoRef = useRef<HTMLVideoElement | null>(null);
// // //   const maskLeftRef = useRef<HTMLDivElement | null>(null);
// // //   const maskRightRef = useRef<HTMLDivElement | null>(null);
// // //   const textContainerRef = useRef<HTMLDivElement | null>(null);
// // //   const starRef = useRef<HTMLSpanElement | null>(null);

// // //   const [yellowActive, setYellowActive] = useState(false);

// // //   const lines = [
// // //     "For over a decade, these tenets continue ",
// // //     "to define who we are, what we do and ",
// // //     "how we sculpt our legacy in the ever-evolving",
// // //     "world of branding and communication.",
// // //   ];

// // //   useEffect(() => {
// // //     if (
// // //       !sectionRef.current ||
// // //       !maskLeftRef.current ||
// // //       !maskRightRef.current ||
// // //       !textContainerRef.current ||
// // //       !starRef.current
// // //     )
// // //       return;

// // //     // convert targets into `any[]` to satisfy GSAP + TS
// // //     const masks = [maskLeftRef.current, maskRightRef.current] as any[];
// // //     const starEl = starRef.current as any;

// // //     // children to array
// // //     const textEls = textContainerRef.current
// // //       ? Array.from(textContainerRef.current.children).map((c) => c as any)
// // //       : [];

// // //     const ctx = gsap.context(() => {
// // //       const tl = gsap.timeline({
// // //         scrollTrigger: {
// // //           trigger: sectionRef.current,
// // //           start: "top top",
// // //           end: "+=4000", // total scroll distance for full sequence
// // //           scrub: 1.5,
// // //           pin: true,
// // //           anticipatePin: 1,
// // //           onLeave: () => setYellowActive(false),
// // //           onLeaveBack: () => setYellowActive(false),
// // //         },
// // //       });

// // //       // 🎬 STEP 1 — Video Merge (from split to full)
// // //       // NOTE: xPercent is provided as a function — typed as (i:any) => number
// // //       tl.fromTo(
// // //         masks,
// // //         { xPercent: 0 },
// // //         {
// // //           xPercent: (i: any) => (i === 0 ? -100 : 100),
// // //           duration: 1.5,
// // //           ease: "power4.inOut",
// // //         },
// // //         0
// // //       );

// // //       // 🎞 STEP 2 — Hold briefly
// // //       tl.to({}, { duration: 0.4 });

// // //       // 🎞 STEP 3 — Close video (split back inward)
// // //       tl.to(
// // //         masks,
// // //         {
// // //           xPercent: (i: any) => 0,
// // //           duration: 1.2,
// // //           ease: "power4.inOut",
// // //         },
// // //         ">+0.5"
// // //       );

// // //       // ✨ STEP 4 — Star appears and rotates (start of text generation)
// // //       tl.fromTo(
// // //         starEl,
// // //         { opacity: 0, scale: 0.3, rotate: 0 },
// // //         {
// // //           opacity: 1,
// // //           scale: 1,
// // //           rotate: 360,
// // //           duration: 1.2,
// // //           ease: "power2.inOut",
// // //         },
// // //         ">-0.1"
// // //       );

// // //       // 🌟 STEP 5 — Star generates the text (Gemini style)
// // //       if (textEls.length) {
// // //         tl.fromTo(
// // //           textEls,
// // //           { opacity: 0, y: 25, filter: "blur(8px)" },
// // //           {
// // //             opacity: 1,
// // //             y: 0,
// // //             filter: "blur(0px)",
// // //             duration: 1,
// // //             stagger: 0.4,
// // //             ease: "power2.out",
// // //             onStart: () => {
// // //               gsap.to(starEl, {
// // //                 rotate: "+=720",
// // //                 scale: 1.4,
// // //                 duration: 2,
// // //                 ease: "power2.inOut",
// // //               });
// // //               setTimeout(() => setYellowActive(true), 1800);
// // //             },
// // //           },
// // //           ">-0.2"
// // //         );
// // //       }

// // //       // 🕐 STEP 6 — Hold the text
// // //       tl.to({}, { duration: 0.8 });

// // //       // 🌀 STEP 7 — Exit (fade text + star out)
// // //       tl.to(
// // //         [textContainerRef.current, starEl] as any[],
// // //         {
// // //           opacity: 0,
// // //           y: -50,
// // //           duration: 1.2,
// // //           ease: "power2.inOut",
// // //         },
// // //         ">+0.3"
// // //       );
// // //     }, sectionRef);

// // //     return () => ctx.revert();
// // //   }, []);

// // //   return (
// // //     <section
// // //       ref={sectionRef}
// // //       className="relative w-full h-screen overflow-hidden bg-black text-white flex items-center justify-center font-gotham"
// // //     >
// // //       {/* 🎥 SINGLE VIDEO */}
// // //       <video
// // //         ref={videoRef}
// // //         src="/videos/Office shoot B&W 10 MB.mp4"
// // //         autoPlay
// // //         loop
// // //         muted
// // //         playsInline
// // //         className="absolute inset-0 w-full h-full object-cover z-0"
// // //       />

// // //       {/* 🌓 SPLIT MASKS */}
// // //       <div
// // //         ref={maskLeftRef}
// // //         className="absolute top-0 left-0 w-1/2 h-full bg-black z-10"
// // //       />
// // //       <div
// // //         ref={maskRightRef}
// // //         className="absolute top-0 right-0 w-1/2 h-full bg-black z-10"
// // //       />

// // //       {/* ✨ STAR + TEXT */}
// // //       <div className="absolute z-20 flex flex-col items-center justify-center text-center max-w-5xl px-6 md:px-12">
// // //         {/* STAR */}
// // //         <motion.span
// // //           ref={starRef}
// // //           className="text-yellow-400 text-5xl md:text-6xl mb-6"
// // //           animate={{
// // //             rotate: [0, 360],
// // //             scale: [1, 1.15, 1],
// // //           }}
// // //           transition={{
// // //             repeat: Infinity,
// // //             duration: 4,
// // //             ease: "easeInOut",
// // //           }}
// // //         >
// // //           ✦
// // //         </motion.span>

// // //         {/* TEXT LINES */}
// // //         <div ref={textContainerRef}>
// // //           {lines.map((line, idx) => (
// // //             <motion.p
// // //               key={idx}
// // //               className="text-2xl md:text-3xl leading-snug tracking-wide"
// // //               animate={
// // //                 idx === lines.length - 1 && yellowActive
// // //                   ? { color: "#facc15", transition: { duration: 0.8 } }
// // //                   : { color: "#ffffff" }
// // //               }
// // //             >
// // //               {line}
// // //             </motion.p>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* ⬇️ SCROLL INDICATOR */}
// // //       <motion.div
// // //         className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 text-sm tracking-widest z-30"
// // //         animate={{ y: [0, -10, 0] }}
// // //         transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
// // //       >
// // //         SCROLL ↓
// // //       </motion.div>
// // //     </section>
// // //   );
// // // };

// // // export default Discover;

// // "use client";

// // import { useEffect, useRef, useState } from "react";
// // import { motion } from "framer-motion";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // if (typeof window !== "undefined") {
// //   gsap.registerPlugin(ScrollTrigger);
// // }

// // const Discover = () => {
// //   const sectionRef = useRef<HTMLDivElement | null>(null);
// //   const videoRef = useRef<HTMLVideoElement | null>(null);

// //   // NEW: top + bottom mask bars
// //   const maskTopRef = useRef<HTMLDivElement | null>(null);
// //   const maskBottomRef = useRef<HTMLDivElement | null>(null);

// //   const textContainerRef = useRef<HTMLDivElement | null>(null);
// //   const starRef = useRef<HTMLSpanElement | null>(null);

// //   const [yellowActive, setYellowActive] = useState(false);

// //   const lines = [
// //     "For over a decade, these tenets continue ",
// //     "to define who we are, what we do and ",
// //     "how we sculpt our legacy in the ever-evolving",
// //     "world of branding and communication.",
// //   ];

// //   useEffect(() => {
// //     if (
// //       !sectionRef.current ||
// //       !maskTopRef.current ||
// //       !maskBottomRef.current ||
// //       !textContainerRef.current ||
// //       !starRef.current
// //     )
// //       return;

// //     // Masks & text children
// //     const masks = [maskTopRef.current, maskBottomRef.current] as any[];
// //     const starEl = starRef.current as any;

// //     const textEls = Array.from(
// //       textContainerRef.current.children
// //     ).map((e) => e as any);

// //     const ctx = gsap.context(() => {
// //       const tl = gsap.timeline({
// //         scrollTrigger: {
// //           trigger: sectionRef.current,
// //           start: "top top",
// //           end: "+=2000",
// //           scrub: false, // 🔥 NO SCRUB
// //           pin: true,
// //         },
// //       });

// //       /* -----------------------------------
// //           STEP 1 — TEXT + STAR INTRO
// //       ----------------------------------- */
// //       tl.fromTo(
// //         starEl,
// //         { opacity: 0, scale: 0.3, rotate: 0 },
// //         {
// //           opacity: 1,
// //           scale: 1,
// //           rotate: 360,
// //           duration: 1,
// //           ease: "power2.out",
// //         },
// //         0
// //       );

// //       tl.from(
// //         textEls,
// //         {
// //           opacity: 0,
// //           y: 25,
// //           filter: "blur(8px)",
// //           stagger: 0.25,
// //           duration: 1,
// //           ease: "power2.out",
// //           onComplete: () => setYellowActive(true),
// //         },
// //         "-=0.3"
// //       );

// //       tl.to({}, { duration: 1 }); // Hold text

// //       /* -----------------------------------
// //           STEP 2 — TEXT FADE OUT
// //       ----------------------------------- */
// //       tl.to(
// //         [textContainerRef.current, starEl],
// //         {
// //           opacity: 0,
// //           y: -30,
// //           duration: 1,
// //           ease: "power2.inOut",
// //         },
// //         ">-0.2"
// //       );

// //       /* -----------------------------------
// //           STEP 3 — VIDEO BARS REVEAL
// //       ----------------------------------- */

// //       // Start masks fully covering video
// //       gsap.set(maskTopRef.current, { height: "50%" });
// //       gsap.set(maskBottomRef.current, { height: "50%" });

// //       tl.to(
// //         masks,
// //         {
// //           height: 0, // pull apart upward + downward
// //           duration: 1.7,
// //           ease: "power4.inOut",
// //         },
// //         ">-0.1"
// //       );

// //       tl.to({}, { duration: 1 }); // Hold video

// //     }, sectionRef);

// //     return () => ctx.revert();
// //   }, []);

// //   return (
// //     <section
// //       ref={sectionRef}
// //       className="relative w-full h-screen overflow-hidden bg-black text-white flex items-center justify-center font-gotham"
// //     >
// //       {/* 🎥 BACKGROUND VIDEO */}
// //       <video
// //         ref={videoRef}
// //         src="/videos/Office shoot B&W 10 MB.mp4"
// //         autoPlay
// //         loop
// //         muted
// //         playsInline
// //         className="absolute inset-0 w-full h-full object-cover z-0"
// //       />

// //       {/* 🟧 TOP + BOTTOM MASK BARS */}
// //       <div
// //         ref={maskTopRef}
// //         className="absolute top-0 left-0 w-full h-1/2 bg-black z-10"
// //       />
// //       <div
// //         ref={maskBottomRef}
// //         className="absolute bottom-0 left-0 w-full h-1/2 bg-black z-10"
// //       />

// //       {/* ✨ STAR + TEXT */}
// //       <div className="absolute z-20 flex flex-col items-center justify-center text-center max-w-5xl px-6 md:px-12">
// //         <motion.span
// //           ref={starRef}
// //           className="text-yellow-400 text-5xl md:text-6xl mb-6"
// //         >
// //           ✦
// //         </motion.span>

// //         <div ref={textContainerRef}>
// //           {lines.map((line, idx) => (
// //             <motion.p
// //               key={idx}
// //               className="text-2xl md:text-3xl leading-snug tracking-wide"
// //               animate={
// //                 idx === lines.length - 1 && yellowActive
// //                   ? { color: "#facc15", transition: { duration: 0.8 } }
// //                   : { color: "#ffffff" }
// //               }
// //             >
// //               {line}
// //             </motion.p>
// //           ))}
// //         </div>
// //       </div>

// //       {/* ⬇️ SCROLL INDICATOR */}
// //       <motion.div
// //         className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 text-sm tracking-widest z-30"
// //         animate={{ y: [0, -10, 0] }}
// //         transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
// //       >
// //         SCROLL ↓
// //       </motion.div>
// //     </section>
// //   );
// // };

// // export default Discover;
// "use client";

// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const NUM_BARS = 12; // ⬅️ number of vertical bars (edit if needed)

// const Discover = () => {
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const barContainerRef = useRef<HTMLDivElement | null>(null);

//   const textContainerRef = useRef<HTMLDivElement | null>(null);
//   const starRef = useRef<HTMLSpanElement | null>(null);

//   const [yellowActive, setYellowActive] = useState(false);

//   const lines = [
//     "For over a decade, these tenets continue ",
//     "to define who we are, what we do and ",
//     "how we sculpt our legacy in the ever-evolving",
//     "world of branding and communication.",
//   ];

//   useEffect(() => {
//     if (
//       !sectionRef.current ||
//       !barContainerRef.current ||
//       !textContainerRef.current ||
//       !starRef.current
//     )
//       return;

//     const bars = Array.from(barContainerRef.current.children).map(
//       (el) => el as any
//     );

//     const textEls = Array.from(
//       textContainerRef.current.children
//     ).map((el) => el as any);

//     const starEl = starRef.current as any;

//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=3000",
//           scrub: false,
//           pin: true,
//         },
//       });

//       /* ---------------------------------------------------
//           STEP 1 — TEXT + STAR INTRO
//       ---------------------------------------------------- */
//       tl.fromTo(
//         starEl,
//         { opacity: 0, scale: 0.3, rotate: 0 },
//         {
//           opacity: 1,
//           scale: 1,
//           rotate: 360,
//           duration: 1,
//           ease: "power2.out",
//         },
//         0
//       );

//       tl.from(
//         textEls,
//         {
//           opacity: 0,
//           y: 25,
//           filter: "blur(8px)",
//           stagger: 0.35,
//           duration: 1,
//           ease: "power2.out",
//           onComplete: () => setYellowActive(true),
//         },
//         "-=0.3"
//       );

//       tl.to({}, { duration: 1.6 }); // ⬅️ EXTRA HOLD TIME BEFORE VIDEO APPEARS

//       /* ---------------------------------------------------
//           STEP 2 — FADE OUT TEXT + STAR
//       ---------------------------------------------------- */
//       tl.to(
//         [textContainerRef.current, starEl],
//         {
//           opacity: 0,
//           y: -40,
//           duration: 1.3,
//           ease: "power2.inOut",
//         },
//         ">-0.1"
//       );

//       /* ---------------------------------------------------
//           STEP 3 — VIDEO REVEALS USING VERTICAL BARS
//       ---------------------------------------------------- */

//       // Bars start at full height
//       gsap.set(bars, { height: "100%" });

//       tl.to(
//         bars,
//         {
//           height: 0,
//           duration: 1.8,
//           ease: "power4.inOut",
//           stagger: {
//             each: 0.08,
//             from: "center",
//           },
//         },
//         ">-0.2"
//       );

//       tl.to({}, { duration: 1 }); // Hold video

//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full h-screen overflow-hidden bg-black text-white flex items-center justify-center font-gotham"
//     >
//       {/* 🎥 VIDEO */}
//       <video
//         ref={videoRef}
//         src="/videos/Office shoot B&W 10 MB.mp4"
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover z-0"
//       />

//       {/* 🟦 VERTICAL BAR MASK CONTAINER */}
//       <div
//         ref={barContainerRef}
//         className="absolute inset-0 z-10 flex"
//       >
//         {Array.from({ length: NUM_BARS }).map((_, i) => (
//           <div
//             key={i}
//             className="flex-1 bg-black"
//             style={{
//               marginRight: i !== NUM_BARS - 1 ? "2px" : "0px",
//             }}
//           ></div>
//         ))}
//       </div>

//       {/* ✨ STAR + TEXT */}
//       <div className="absolute z-20 flex flex-col items-center justify-center text-center max-w-5xl px-6 md:px-12">
//         {/* STAR */}
//         <motion.span
//           ref={starRef}
//           className="text-yellow-400 text-5xl md:text-6xl mb-6"
//         >
//           ✦
//         </motion.span>

//         {/* TEXT */}
//         <div ref={textContainerRef}>
//           {lines.map((line, idx) => (
//             <motion.p
//               key={idx}
//               className="text-2xl md:text-3xl leading-snug tracking-wide"
//               animate={
//                 idx === lines.length - 1 && yellowActive
//                   ? { color: "#facc15", transition: { duration: 0.8 } }
//                   : { color: "#ffffff" }
//               }
//             >
//               {line}
//             </motion.p>
//           ))}
//         </div>
//       </div>

//       {/* SCROLL INDICATOR */}
//       <motion.div
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 text-sm tracking-widest z-30"
//         animate={{ y: [0, -10, 0] }}
//         transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
//       >
//         SCROLL ↓
//       </motion.div>
//     </section>
//   );
// };

// export default Discover;


"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NUM_BARS = 12;

const Discover = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const starRef = useRef<HTMLSpanElement | null>(null);

  const [yellowActive, setYellowActive] = useState(false);

  const lines = [
    "For over a decade, these tenets continue ",
    "to define who we are, what we do and ",
    "how we sculpt our legacy in the ever-evolving",
    "world of branding and communication.",
  ];

  useEffect(() => {
    if (!sectionRef.current || !textContainerRef.current || !starRef.current)
      return;

    const bars = barsRef.current;
    const textEls = Array.from(textContainerRef.current.children) as any[];
    const starEl = starRef.current as any;
    const video = videoRef.current as any;

    const ctx = gsap.context(() => {
      /* RESET STATE — bars covering video & video invisible */
      gsap.set(video, { opacity: 0 });
      gsap.set(bars, { height: "100%" });
      gsap.set(textEls, { opacity: 0, y: 20, filter: "blur(10px)" });
      gsap.set(starEl, { opacity: 0, scale: 0.3 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: false,
          pin: true,
          toggleActions: "restart none none reverse",

          onEnter: () => {
            setYellowActive(false);
            tl.restart();
          },

          onEnterBack: () => {
            setYellowActive(false);
            tl.restart();
          },

          onLeave: () => {
    gsap.to(video, { opacity: 0, duration: 0.4, ease: "power1.out" });
    gsap.to(bars, { height: "100%", duration: 0.4, ease: "power1.out" });
  },

  onLeaveBack: () => {
    gsap.to(video, { opacity: 0, duration: 0.4, ease: "power1.out" });
    gsap.to(bars, { height: "100%", duration: 0.4, ease: "power1.out" });
  },
},
      });

      /* ---------------------------------------------------
          STEP 1 — STAR APPEARS
      ---------------------------------------------------- */
      tl.to(
        starEl,
        {
          opacity: 1,
          scale: 1,
          rotate: 360,
          duration: 1.2,
          ease: "power2.out",
        },
        0
      );

      /* ---------------------------------------------------
          STEP 2 — TEXT REVEAL (GEMINI STYLE)
      ---------------------------------------------------- */
      tl.to(
        textEls,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.35,
          duration: 1.1,
          ease: "power2.out",
          onComplete: () => setYellowActive(true),
        },
        "-=0.4"
      );

      /* HOLD TEXT BEFORE VIDEO */
      tl.to({}, { duration: 1.2 });

      /* ---------------------------------------------------
          STEP 3 — HIDE TEXT + STAR
      ---------------------------------------------------- */
      tl.to(
        [textContainerRef.current, starEl],
        {
          opacity: 0,
          y: -40,
          duration: 0.1,
          ease: "power2.inOut",
        },
        ">-0.1"
      );

      /* ---------------------------------------------------
          STEP 4 — BAR VIDEO REVEAL
      ---------------------------------------------------- */
      tl.to(
        video,
        { opacity: 1, duration: 0.8, ease: "power1.inOut" },
        ">-0.2"
      );

      tl.to(
        bars,
        {
          height: 0,
          duration: 2,
          ease: "power4.inOut",
          stagger: {
            each: 0.08,
            from: "center",
          },
        },
        ">-0.2"
      );

      return () => ctx.revert();
    }, sectionRef);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black text-white flex items-center justify-center font-gotham"
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src="/videos/Office shoot B&W 10 MB.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* VERTICAL BARS */}
      <div className="absolute inset-0 z-10 flex">
        {Array.from({ length: NUM_BARS }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) barsRef.current[i] = el;
            }}
            className="bg-black flex-1"
            style={{ marginRight: i !== NUM_BARS - 1 ? "2px" : "0px" }}
          ></div>
        ))}
      </div>

      {/* TEXT + STAR */}
      <div className="absolute z-20 flex flex-col items-center text-center max-w-5xl px-6">
        <motion.span
          ref={starRef}
          className="text-yellow-400 text-6xl mb-6"
        >
          ✦
        </motion.span>

        <div ref={textContainerRef}>
          {lines.map((line, idx) => (
            <motion.p
              key={idx}
              className="text-2xl md:text-3xl leading-snug tracking-wide"
              animate={
                idx === lines.length - 1 && yellowActive
                  ? { color: "#facc15" }
                  : { color: "#ffffff" }
              }
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discover;
