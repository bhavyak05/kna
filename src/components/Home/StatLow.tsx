// // // "use client";
// // // import { motion, AnimatePresence, useInView,Variants } from "framer-motion";
// // // import { useRef, useState, useLayoutEffect } from "react";
// // // import { Play, X } from "lucide-react";

// // // const stats = [
// // //   { value: "300+", label: "CLIENTS SERVED", align: "left" },
// // //   { value: "10+", label: "YEARS OF EXPERIENCE", align: "right" },
// // //   { value: "100+", label: "TALENT POOL WITH GENDER DIVERSITY", align: "left" },
// // //   { value: "95%", label: "CLIENT RETENTION RATE EVERY YEAR", align: "right" },
// // // ];

// // // const StatLow = () => {
// // //   const ref = useRef<HTMLDivElement | null>(null);
// // //   const statsRef = useRef<HTMLDivElement | null>(null);
// // //   const videoRef = useRef<HTMLVideoElement | null>(null);
// // //   const [statsHeight, setStatsHeight] = useState<number | null>(null);
// // //   const [hovered, setHovered] = useState(false);
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
// // //   const isInView = useInView(ref, { amount: 0.45, once: false });

// // //   // ✅ Dynamically sync video height with stats container
// // //   useLayoutEffect(() => {
// // //     const updateHeight = () => {
// // //       if (statsRef.current) {
// // //         setStatsHeight(statsRef.current.offsetHeight);
// // //       }
// // //     };
// // //     updateHeight();
// // //     window.addEventListener("resize", updateHeight);
// // //     return () => window.removeEventListener("resize", updateHeight);
// // //   }, []);

// // //   // 🎞 Video Animations
// // //   const videoVariants :Variants = {
// // //     hidden: {
// // //       scale: 0,
// // //       borderRadius: "100%",
// // //       opacity: 0,
// // //       filter: "grayscale(100%) blur(8px)",
// // //     },
// // //     visible: {
// // //       scale: 1,
// // //       borderRadius: "1rem",
// // //       opacity: 1,
// // //       filter: hovered ? "grayscale(0%) blur(0px)" : "grayscale(100%) blur(0px)",
// // //       transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
// // //     },
// // //     exit: {
// // //       scale: 0,
// // //       borderRadius: "100%",
// // //       opacity: 0,
// // //       filter: "grayscale(100%) blur(8px)",
// // //       transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
// // //     },
// // //   };

// // //   // 🧭 Grid fade-in/out (entire stats box)
// // //   const gridVariants:Variants = {
// // //     hidden: { opacity: 0 },
// // //     visible: {
// // //       opacity: 1,
// // //       transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
// // //     },
// // //     exit: { opacity: 0, transition: { duration: 0.4, ease: "easeIn" } },
// // //   };

// // //   // 🧭 Text row animations
// // //   const rowVariants:Variants = {
// // //     hiddenFromRight: { opacity: 0, x: 200 },
// // //     visibleFromRight: {
// // //       opacity: 1,
// // //       x: 0,
// // //       transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 },
// // //     },
// // //     exitToRight: { opacity: 0, x: 200, transition: { duration: 0.6 } },

// // //     hiddenFromLeft: { opacity: 0, x: -200 },
// // //     visibleFromLeft: {
// // //       opacity: 1,
// // //       x: 0,
// // //       transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 },
// // //     },
// // //     exitToLeft: { opacity: 0, x: -200, transition: { duration: 0.6 } },
// // //   };

// // //   return (
// // //     <>
// // //       <section
// // //         ref={ref}
// // //         className="w-full bg-[#000] py-12 text-white flex flex-col   md:flex-row justify-center items-center font-gotham overflow-hidden min-h-[80vh] md:min-h-[70vh] gap-0"
// // //       >
// // //         {/* LEFT: Stats Section */}
// // //         <motion.div
// // //           ref={statsRef}
// // //           variants={gridVariants}
// // //           initial="hidden"
// // //           animate={isInView ? "visible" : "exit"}
// // //           exit="exit"
// // //           className="w-full md:w-1/2 flex  justify-center items-start pl-3 md:pl-6 pr-1.25  "
// // //         >
// // //           <div className="w-full  rounded-2xl border border-gray-800 overflow-hidden bg-[url('/images/dot-bg.png')] bg-repeat p-2 ">
// // //             <div className="bg-transparent rounded-xl overflow-hidden ">
// // //               {stats.map((stat) => {
// // //                 const isLeft = stat.align === "left";
// // //                 return (
// // //                   <motion.div
// // //                     key={stat.label}
// // //                     initial={isLeft ? "hiddenFromRight" : "hiddenFromLeft"}
// // //                     animate={
// // //                       isInView
// // //                         ? isLeft
// // //                           ? "visibleFromRight"
// // //                           : "visibleFromLeft"
// // //                         : isLeft
// // //                         ? "exitToRight"
// // //                         : "exitToLeft"
// // //                     }
// // //                     exit={isLeft ? "exitToRight" : "exitToLeft"}
// // //                     variants={rowVariants}
// // //                     className="flex items-center justify-between py-8 px-6 border-b border-gray-800 last:border-b-0"
// // //                   >
// // //                     {isLeft ? (
// // //                       <>
// // //                         <div className="flex-1">
// // //                           <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-yellow-400 leading-none">
// // //                             {stat.value}
// // //                           </h3>
// // //                           <p className="mt-3 text-[11px] md:text-xs tracking-[0.18em] text-gray-400 uppercase">
// // //                             {stat.label}
// // //                           </p>
// // //                         </div>
// // //                         <div className="w-[35%]" />
// // //                       </>
// // //                     ) : (
// // //                       <>
// // //                         <div className="w-[35%]" />
// // //                         <div className="flex-1 text-right">
// // //                           <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-yellow-400 leading-none">
// // //                             {stat.value}
// // //                           </h3>
// // //                           <p className="mt-3 text-[11px] md:text-xs tracking-[0.18em] text-gray-400 uppercase">
// // //                             {stat.label}
// // //                           </p>
// // //                         </div>
// // //                       </>
// // //                     )}
// // //                   </motion.div>
// // //                 );
// // //               })}
// // //             </div>
// // //           </div>
// // //         </motion.div>

// // //         {/* RIGHT: Video Section */}
// // //         <div className="w-full md:w-1/2 flex justify-center items-start pr-3 md:pr-6 pl-1.25">
// // //           <motion.div
// // //           onMouseEnter={() => {
// // //                 setHovered(true);
// // //                 setIsVideoPlaying(true);
// // //                 videoRef.current?.play();
// // //               }}
// // //               onMouseLeave={() => {
// // //                 setHovered(false);
// // //                 setIsVideoPlaying(false);
// // //                 videoRef.current?.pause();
// // //               }}
// // //             className="w-full rounded-2xl overflow-hidden bg-black relative transition-all"
// // //             style={{ height: statsHeight ? `${statsHeight}px` : "auto" }}
// // //           >
// // // //             <motion.video
// // //               src="/videos/Office shoot B&W 10 MB.mp4"
// // //               autoPlay
// // //               loop
// // //               muted
// // //               playsInline
// // //               className="aspect-square object-cover rounded-2xl"
// // //               animate={{ filter: hovered ? "grayscale(0%)" : "grayscale(100%)" }}
// // //               transition={{ duration: 0.6 }}
// // //             />

// // //             {/* Play Button */}
// // //             <motion.div
// // //               onMouseEnter={() => setHovered(true)}
// // //               onMouseLeave={() => setHovered(false)}
// // //               onClick={() => setShowModal(true)}
// // //               animate={{ rotate: hovered ? 360 : -360 }}
// // //               transition={{ duration: 1.2, ease: "easeInOut" }}
// // //               className="absolute left-6 bottom-6 bg-black/50 rounded-full p-3 md:p-4 border border-yellow-400 cursor-pointer hover:bg-yellow-400/20 transition-colors"
// // //             >
// // //               <Play size={24} className="text-yellow-400" />
// // //             </motion.div>

// // //             {/* Quote */}
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 18 }}
// // //               animate={
// // //                 isInView
// // //                   ? {
// // //                       opacity: 1,
// // //                       y: 0,
// // //                       transition: { delay: 0.9, duration: 0.6 },
// // //                     }
// // //                   : { opacity: 0, y: 18 }
// // //               }
// // //               className="absolute right-6 bottom-6 md:right-8 md:bottom-8 bg-black/60 p-4 md:p-6 rounded-md max-w-[360px] text-right"
// // //             >
// // //               <p className="text-sm md:text-lg leading-snug text-white font-medium mb-2">
// // //                 “I’m already getting calls from people all around the world in
// // //                 different functions who have heard and want to get onboard.”
// // //               </p>
// // //               <p className="text-xs md:text-sm text-yellow-400 font-semibold">
// // //                 Hussain Kalolwala
// // //               </p>
// // //               <p className="text-[11px] md:text-xs text-gray-400">
// // //                 Founder & CEO
// // //               </p>
// // //             </motion.div>
// // //           </motion.div>
// // //         </div>
// // //       </section>

// // //       {/* 🎥 Modal */}
// // //       <AnimatePresence>
// // //         {showModal && (
// // //           <motion.div
// // //             className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             exit={{ opacity: 0 }}
// // //             onClick={() => setShowModal(false)}
// // //           >
// // //             <motion.div
// // //               initial={{ scale: 0.9, opacity: 0 }}
// // //               animate={{ scale: 1, opacity: 1 }}
// // //               exit={{ scale: 0.9, opacity: 0 }}
// // //               transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
// // //               className="relative w-[92%] md:w-[70%] max-w-5xl bg-black rounded-xl overflow-hidden"
// // //               onClick={(e) => e.stopPropagation()}
// // //             >
// // //               <button
// // //                 onClick={() => setShowModal(false)}
// // //                 className="absolute top-4 right-4 z-10 text-white hover:text-yellow-400"
// // //               >
// // //                 <X size={26} />
// // //               </button>
// // //               <video
// // //                 src="/videos/Office shoot B&W 10 MB.mp4"
// // //                 controls
// // //                 autoPlay
// // //                 className="w-full h-auto object-cover"
// // //               />
// // //             </motion.div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //     </>
// // //   );
// // // };

// // // export default StatLow;
// // "use client";
// // import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
// // import { useRef, useState, useLayoutEffect } from "react";
// // import { Play, X } from "lucide-react";

// // const stats = [
// //   { value: "300+", label: "CLIENTS SERVED", align: "left" },
// //   { value: "10+", label: "YEARS OF EXPERIENCE", align: "right" },
// //   { value: "100+", label: "TALENT POOL WITH GENDER DIVERSITY", align: "left" },
// //   { value: "95%", label: "CLIENT RETENTION RATE EVERY YEAR", align: "right" },
// // ];

// // // BORDER REVEAL
// // const borderReveal: Variants = {
// //   hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
// //   visible: {
// //     opacity: 1,
// //     clipPath: "inset(0 0 0% 0)",
// //     transition: { duration: 1, ease: "easeInOut" },
// //   },
// // };

// // // STATIC/DIGITAL NUMBER EFFECT
// // const staticNumber: Variants = {
// //   hidden: { opacity: 0, filter: "blur(8px)" },
// //   visible: {
// //     opacity: 1,
// //     filter: "blur(0px)",
// //     transition: { duration: 0.8, ease: "easeOut", delay: 0.5 },
// //   },
// // };

// // const glitch: Variants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: [0, 1, 0.4, 1],
// //     x: [0, -3, 3, 0],
// //     transition: { duration: 0.25, repeat: 2 },
// //   },
// // };

// // const StatLow = () => {
// //   const ref = useRef<HTMLDivElement | null>(null);
// //   const statsRef = useRef<HTMLDivElement | null>(null);
// //   const videoRef = useRef<HTMLVideoElement | null>(null);

// //   const [statsHeight, setStatsHeight] = useState<number | null>(null);
// //   const [hovered, setHovered] = useState(false);
// //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
// //   const [showModal, setShowModal] = useState(false);

// //   const isInView = useInView(ref, { amount: 0.4 });

// //   // SYNC VIDEO HEIGHT TO LEFT SECTION
// //   useLayoutEffect(() => {
// //     const updateHeight = () => {
// //       if (statsRef.current) {
// //         setStatsHeight(statsRef.current.offsetHeight);
// //       }
// //     };
// //     updateHeight();
// //     window.addEventListener("resize", updateHeight);
// //     return () => window.removeEventListener("resize", updateHeight);
// //   }, []);

// //   return (
// //     <>
// //       <section
// //         ref={ref}
// //         className="w-full bg-[#000] py-12 text-white flex flex-col md:flex-row justify-center items-center font-gotham overflow-hidden min-h-[80vh] md:min-h-[70vh]"
// //       >
// //         {/* LEFT — Stats Box */}
// //         <motion.div
// //           variants={borderReveal}
// //           initial="hidden"
// //           animate={isInView ? "visible" : "hidden"}
// //           ref={statsRef}
// //           className="w-full md:w-1/2 flex justify-center items-start pl-3 md:pl-6 pr-1.25"
// //         >
// //           <div className="w-full rounded-2xl border border-gray-800 overflow-hidden bg-[url('/images/dot-bg.png')] bg-repeat p-2">
// //             <div className="bg-transparent rounded-xl overflow-hidden">
// //               {stats.map((stat) => {
// //                 const isLeft = stat.align === "left";

// //                 return (
// //                   <div
// //                     key={stat.label}
// //                     className="flex items-center justify-between py-8 px-6 border-b border-gray-800 last:border-b-0"
// //                   >
// //                     {isLeft ? (
// //                       <>
// //                         {/* LEFT ALIGNED */}
// //                         <div className="flex-1">
// //                           <motion.h3
// //                             variants={staticNumber}
// //                             initial="hidden"
// //                             animate={isInView ? "visible" : "hidden"}
// //                             className="relative text-5xl md:text-6xl lg:text-7xl font-light text-yellow-400 leading-none"
// //                           >
// //                             {/* glitch overlay */}
// //                             <motion.span
// //                               className="absolute inset-0 text-yellow-600"
// //                               variants={glitch}
// //                               initial="hidden"
// //                               animate={isInView ? "visible" : "hidden"}
// //                             >
// //                               {stat.value}
// //                             </motion.span>
// //                             {stat.value}
// //                           </motion.h3>

// //                           <p className="mt-3 text-[11px] md:text-xs tracking-[0.18em] text-gray-400 uppercase">
// //                             {stat.label}
// //                           </p>
// //                         </div>
// //                         <div className="w-[35%]" />
// //                       </>
// //                     ) : (
// //                       <>
// //                         {/* RIGHT ALIGNED */}
// //                         <div className="w-[35%]" />
// //                         <div className="flex-1 text-right">
// //                           <motion.h3
// //                             variants={staticNumber}
// //                             initial="hidden"
// //                             animate={isInView ? "visible" : "hidden"}
// //                             className="relative text-5xl md:text-6xl lg:text-7xl font-light text-yellow-400 leading-none"
// //                           >
// //                             <motion.span
// //                               className="absolute inset-0 text-yellow-600"
// //                               variants={glitch}
// //                               initial="hidden"
// //                               animate={isInView ? "visible" : "hidden"}
// //                             >
// //                               {stat.value}
// //                             </motion.span>
// //                             {stat.value}
// //                           </motion.h3>

// //                           <p className="mt-3 text-[11px] md:text-xs tracking-[0.18em] text-gray-400 uppercase">
// //                             {stat.label}
// //                           </p>
// //                         </div>
// //                       </>
// //                     )}
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         </motion.div>

// //         {/* RIGHT — Video Section */}
// //         <div className="w-full md:w-1/2 flex justify-center items-start pr-3 md:pr-6 pl-1.25">
// //           <motion.div
// //           onMouseEnter={() => {
// //                 setHovered(true);
// //                 setIsVideoPlaying(true);
// //                 videoRef.current?.play();
// //               }}
// //               onMouseLeave={() => {
// //                 setHovered(false);
// //                 setIsVideoPlaying(false);
// //                 videoRef.current?.pause();
// //               }}
// //             className="w-full rounded-2xl overflow-hidden bg-black relative transition-all"
// //             style={{ height: statsHeight ? `${statsHeight}px` : "auto" }}
// //           >
// //             {/* Video */}
// //             <video
// //               ref={videoRef}
// //               src="/videos/Office shoot B&W 10 MB.mp4"
// //               muted
// //               loop
// //               playsInline
// //               className="aspect-square object-cover rounded-2xl transition-all duration-500"
// //               style={{
// //                 filter: isVideoPlaying ? "grayscale(0%)" : "grayscale(100%)",
// //               }}
// //             />

// //             {/* PLAY BUTTON */}
// //             <motion.div
              
// //               onClick={() => setShowModal(true)}
// //               className="absolute left-6 bottom-6 bg-black/50 rounded-full p-3 md:p-4 border border-yellow-400 cursor-pointer"
// //             >
// //               <Play size={28} className="text-yellow-400" />
// //             </motion.div>

// //             {/* QUOTE */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 18 }}
// //               animate={
// //                 isInView
// //                   ? { opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.6 } }
// //                   : { opacity: 0, y: 18 }
// //               }
// //               className="absolute right-6 bottom-6 md:right-8 md:bottom-8 bg-black/60 p-4 md:p-6 rounded-md max-w-[360px] text-right"
// //             >
// //               <p className="text-sm md:text-lg leading-snug text-white font-medium mb-2">
// //                 “I’m already getting calls from people all around the world in
// //                 different functions who have heard and want to get onboard.”
// //               </p>
// //               <p className="text-xs md:text-sm text-[#FFD300] font-semibold">
// //                 Hussain Kalolwala
// //               </p>
// //               <p className="text-[11px] md:text-xs text-gray-400">
// //                 Founder & CEO
// //               </p>
// //             </motion.div>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* VIDEO MODAL */}
// //       <AnimatePresence>
// //         {showModal && (
// //           <motion.div
// //             className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             onClick={() => setShowModal(false)}
// //           >
// //             <motion.div
// //               initial={{ scale: 0.9, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.9, opacity: 0 }}
// //               transition={{ duration: 0.35 }}
// //               className="relative w-[92%] md:w-[70%] max-w-5xl bg-black rounded-xl overflow-hidden"
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               <button
// //                 onClick={() => setShowModal(false)}
// //                 className="absolute top-4 right-4 z-10 text-white hover:text-yellow-400"
// //               >
// //                 <X size={26} />
// //               </button>

// //               <video
// //                 src="/videos/Office shoot B&W 10 MB.mp4"
// //                 controls
// //                 autoPlay
// //                 className="w-full h-auto object-cover"
// //               />
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // };

// // export default StatLow;


// "use client";
// import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
// import { useRef, useState, useLayoutEffect } from "react";
// import { Play, X } from "lucide-react";

// const stats = [
//   { value: "300+", label: "CLIENTS SERVED", align: "left" },
//   { value: "10+", label: "YEARS OF EXPERIENCE", align: "right" },
//   { value: "100+", label: "TALENT POOL WITH GENDER DIVERSITY", align: "left" },
//   { value: "95%", label: "CLIENT RETENTION RATE EVERY YEAR", align: "right" },
// ];

// // ORIGINAL ROW ANIMATIONS
// const rowVariants: Variants = {
//   hiddenRight: { opacity: 0, x: 120 },
//   visibleRight: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.8, ease: "easeOut" },
//   },
//   hiddenLeft: { opacity: 0, x: -120 },
//   visibleLeft: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.8, ease: "easeOut" },
//   },
// };

// const StatLow = () => {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const statsRef = useRef<HTMLDivElement | null>(null);
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   const [statsHeight, setStatsHeight] = useState<number | null>(null);
//   const [hovered, setHovered] = useState(false);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const isInView = useInView(ref, { amount: 0.4 });

//   // SYNC VIDEO HEIGHT WITH STATS
//   useLayoutEffect(() => {
//     const updateHeight = () => {
//       if (statsRef.current) {
//         setStatsHeight(statsRef.current.offsetHeight);
//       }
//     };
//     updateHeight();
//     window.addEventListener("resize", updateHeight);
//     return () => window.removeEventListener("resize", updateHeight);
//   }, []);

//   return (
//     <>
//       <section
//         ref={ref}
//         className="w-full bg-[#000] py-12 text-white flex flex-col md:flex-row justify-center items-center font-gotham overflow-hidden min-h-[80vh] md:min-h-[70vh]"
//       >
//         {/* LEFT — Stats */}
//         <div
//           ref={statsRef}
//           className="w-full md:w-1/2 flex justify-center items-start pl-3 md:pl-6 pr-1.25"
//         >
//           <div className="w-full rounded-2xl border border-gray-800 overflow-hidden bg-[url('/images/dot-bg.png')] bg-repeat p-2">
//             <div className="bg-transparent rounded-xl overflow-hidden">
//               {stats.map((stat) => {
//                 const alignLeft = stat.align === "left";

//                 return (
//                   <motion.div
//                     key={stat.label}
//                     initial={alignLeft ? "hiddenRight" : "hiddenLeft"}
//                     animate={
//                       isInView
//                         ? alignLeft
//                           ? "visibleRight"
//                           : "visibleLeft"
//                         : alignLeft
//                         ? "hiddenRight"
//                         : "hiddenLeft"
//                     }
//                     variants={rowVariants}
//                     className="flex items-center justify-between py-8 px-6 border-b border-gray-800 last:border-b-0"
//                   >
//                     {alignLeft ? (
//                       <>
//                         <div className="flex-1">
//                           <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-yellow-400 leading-none">
//                             {stat.value}
//                           </h3>
//                           <p className="mt-3 text-[11px] md:text-xs tracking-[0.18em] text-gray-400 uppercase">
//                             {stat.label}
//                           </p>
//                         </div>
//                         <div className="w-[35%]" />
//                       </>
//                     ) : (
//                       <>
//                         <div className="w-[35%]" />
//                         <div className="flex-1 text-right">
//                           <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-yellow-400 leading-none">
//                             {stat.value}
//                           </h3>
//                           <p className="mt-3 text-[11px] md:text-xs tracking-[0.18em] text-gray-400 uppercase">
//                             {stat.label}
//                           </p>
//                         </div>
//                       </>
//                     )}
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT — Video */}
//         <div className="w-full md:w-1/2 flex justify-center items-start pr-3 md:pr-6 pl-1.25">
//           <motion.div
//             onMouseEnter={() => {
//               setHovered(true);
//               setIsVideoPlaying(true);
//               videoRef.current?.play();
//             }}
//             onMouseLeave={() => {
//               setHovered(false);
//               setIsVideoPlaying(false);
//               videoRef.current?.pause();
//             }}
//             className="w-full rounded-2xl overflow-hidden bg-black relative transition-all"
//             style={{ height: statsHeight ? `${statsHeight}px` : "auto" }}
//           >
//             <video
//               ref={videoRef}
//               src="/videos/Office shoot B&W 10 MB.mp4"
//               muted
//               loop
//               playsInline
//               className="aspect-square object-cover rounded-2xl transition-all duration-500"
//               style={{
//                 filter: isVideoPlaying ? "grayscale(0%)" : "grayscale(100%)",
//               }}
//             />

//             {/* Play Button */}
//             <motion.div
//               onClick={() => setShowModal(true)}
//               className="absolute left-6 bottom-6 bg-black/50 rounded-full p-3 md:p-4 border border-yellow-400 cursor-pointer"
//             >
//               <Play size={28} className="text-yellow-400" />
//             </motion.div>

//             {/* QUOTE */}
//             <motion.div
//               initial={{ opacity: 0, y: 18 }}
//               animate={
//                 isInView
//                   ? { opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.6 } }
//                   : { opacity: 0, y: 18 }
//               }
//               className="absolute right-6 bottom-6 md:right-8 md:bottom-8 bg-black/60 p-4 md:p-6 rounded-md max-w-[360px] text-right"
//             >
//               <p className="text-sm md:text-lg leading-snug text-white font-medium mb-2">
//                 “I’m already getting calls from people all around the world in
//                 different functions who have heard and want to get onboard.”
//               </p>

//               <p className="text-xs md:text-sm text-[#FFD300] font-semibold">
//                 Hussain Kalolwala
//               </p>
//               <p className="text-[11px] md:text-xs text-gray-400">
//                 Founder & CEO
//               </p>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* MODAL */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setShowModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.35 }}
//               className="relative w-[92%] md:w-[70%] max-w-5xl bg-black rounded-xl overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="absolute top-4 right-4 z-10 text-white hover:text-yellow-400"
//               >
//                 <X size={26} />
//               </button>

//               <video
//                 src="/videos/Office shoot B&W 10 MB.mp4"
//                 controls
//                 autoPlay
//                 className="w-full h-auto object-cover"
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default StatLow;


"use client";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
import { Play, X } from "lucide-react";

const stats = [
  { value: "300+", label: "CLIENTS SERVED", align: "left" },
  { value: "10+", label: "YEARS OF EXPERIENCE", align: "right" },
  { value: "100+", label: "TALENT POOL WITH GENDER DIVERSITY", align: "left" },
  { value: "95%", label: "CLIENT RETENTION RATE EVERY YEAR", align: "right" },
];

/* ----- original slide-in variants (kept for reference) -----
const rowVariants: Variants = {
  hiddenRight: { opacity: 0, x: 120 },
  visibleRight: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  hiddenLeft: { opacity: 0, x: -120 },
  visibleLeft: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};
-------------------------------------------------------------*/

// BORDER reveal (rectangular border wipe)
const borderReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, clipPath: "inset(0 0 100% 0)", transition: { duration: 0.5 } },
};

// VIDEO mask reveal using circle() clip-path that expands to reveal the whole rectangle
const videoMask: Variants = {
  hidden: { opacity: 0, clipPath: "circle(0% at 50% 50%)", scale: 0.98 },
  visible: {
    opacity: 1,
    clipPath: "circle(150% at 50% 50%)", // large enough to reveal entire rectangle
    scale: 1,
    transition: { duration: 2, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    clipPath: "circle(0% at 50% 50%)",
    scale: 0.98,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

// label vertical wipe (all labels together)
const labelReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.7, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    clipPath: "inset(100% 0 0 0)",
    transition: { duration: 0.45 }
  }
};


// numbers blur -> sharp
const numberReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: { opacity: 0, filter: "blur(12px)", transition: { duration: 0.4 } }
};


const StatLow = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isInView = useInView(ref, { amount: 0.42 }); // trigger when ~40% visible
  const [statsHeight, setStatsHeight] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // sync video height with stats column height (keeps original geometry)
  useLayoutEffect(() => {
    const update = () => {
      if (statsRef.current) setStatsHeight(statsRef.current.offsetHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <section
        ref={ref}
        className="w-full bg-[#000] py-12 text-white flex flex-col md:flex-row justify-center items-center font-gotham overflow-hidden min-h-[80vh] md:min-h-[70vh]"
      >
        {/* LEFT: Stats box with border reveal */}
        <motion.div
          ref={statsRef}
          variants={borderReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          exit="exit"
          className="w-full md:w-1/2 flex justify-center items-start pl-3 md:pl-6 pr-1.25"
        >
          <div className="w-full rounded-2xl border border-gray-800 overflow-hidden bg-[url('/images/dot-bg.png')] bg-repeat p-2">
            <div className="bg-transparent rounded-xl overflow-hidden">
              {stats.map((stat, rowIndex) => {
  const alignLeft = stat.align === "left";

  return (
    <div
      key={stat.label}
      className="flex items-center justify-between py-8 px-6 border-b border-gray-800 last:border-b-0"
    >
      {alignLeft ? (
        <>
          <div className="flex-1">
            {/* NUMBER */}
            <motion.h3
              variants={numberReveal}
              initial="hidden"
              animate={
                isInView
                  ? { 
                      ...numberReveal.visible,
                      transition: { 
  duration: 0.6,
  ease: "easeOut",
  delay: 0.05 + rowIndex * 0.05
}

                    }
                  : "hidden"
              }
              className="text-5xl md:text-6xl lg:text-7xl font-light text-yellow-400 leading-none"
            >
              {stat.value}
            </motion.h3>

            {/* LABEL */}
            <motion.p
              variants={labelReveal}
              initial="hidden"
              animate={
                isInView
                  ? { 
                      ...labelReveal.visible,
                      transition: { 
  duration: 0.7,
  ease: "easeOut",
  delay: rowIndex * 0.04
}

                    }
                  : "hidden"
              }
              className="mt-3 text-[11px] md:text-xs tracking-[0.18em] text-gray-400 uppercase"
            >
              {stat.label}
            </motion.p>
          </div>

          <div className="w-[35%]" />
        </>
      ) : (
        <>
          <div className="w-[35%]" />

          <div className="flex-1 text-right">
            {/* NUMBER */}
            <motion.p
  variants={labelReveal}
  initial="hidden"
  animate={
    isInView
      ? { 
          ...labelReveal.visible,
          transition: { 
  duration: 0.7,
  ease: "easeOut",
  delay: rowIndex * 0.04
}

        }
      : "hidden"
  }
  className="mt-3 text-[11px] md:text-xs tracking-[0.18em] text-gray-400 uppercase"
>
  {stat.label}
</motion.p>

<motion.h3
  variants={numberReveal}
  initial="hidden"
  animate={
    isInView
      ? { 
          ...numberReveal.visible,
          transition: { 
  duration: 0.6,
  ease: "easeOut",
  delay: (rowIndex * 0.04) + 0.4
}

        }
      : "hidden"
  }
  className="text-5xl md:text-6xl lg:text-7xl font-light text-yellow-400 leading-none"
>
  {stat.value}
</motion.h3>

          </div>
        </>
      )}
    </div>
  );
})}

            </div>
          </div>
        </motion.div>

        {/* RIGHT: Video (rectangular) - revealed via circular clip-path but returns to rectangle */}
        <div className="w-full md:w-1/2 flex justify-center items-start pr-3 md:pr-6 pl-1.25">
          <motion.div
            variants={videoMask}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="exit"
            onMouseEnter={() => {
              setIsVideoPlaying(true);
              videoRef.current?.play();
            }}
            onMouseLeave={() => {
              setIsVideoPlaying(false);
              videoRef.current?.pause();
            }}
            className="w-full rounded-2xl overflow-hidden bg-black relative"
            style={{ height: statsHeight ? `${statsHeight}px` : "auto" }}
          >
            {/* Video element stays rectangular; clip-path animation is only on the wrapper */}
            <video
              ref={videoRef}
              src="/videos/Office shoot B&W 10 MB.mp4"
              muted
              loop
              playsInline
              className="w-full h-full object-cover rounded-2xl"
              style={{
                filter: isVideoPlaying ? "grayscale(0%)" : "grayscale(100%)",
              }}
            />

            {/* Play button (opens modal) */}
            <div
              onClick={() => setShowModal(true)}
              className="absolute left-6 bottom-6 bg-black/50 rounded-full p-3 md:p-4 border border-yellow-400 cursor-pointer"
              role="button"
            >
              <Play size={28} className="text-yellow-400" />
            </div>

            {/* Quote / credit — keep Hussain in yellow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute right-6 bottom-6 md:right-8 md:bottom-8 bg-black/60 p-4 md:p-6 rounded-md max-w-[360px] text-right"
            >
              <p className="text-sm md:text-lg leading-snug text-white font-medium mb-2">
                “I’m already getting calls from people all around the world in different functions who have heard and want to get onboard.”
              </p>
              <p className="text-xs md:text-sm text-[#FFD300] font-semibold">Hussain Kalolwala</p>
              <p className="text-[11px] md:text-xs text-gray-400">Founder & CEO</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modal video */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="relative w-[92%] md:w-[70%] max-w-5xl bg-black rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-10 text-white hover:text-yellow-400"
              >
                <X size={26} />
              </button>

              <video src="/videos/Office shoot B&W 10 MB.mp4" controls autoPlay className="w-full h-auto object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StatLow;
