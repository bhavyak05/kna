// // // "use client";

// // // import { motion } from "framer-motion";
// // // import { ArrowUpRight } from "lucide-react";
// // // import { useRef, useEffect } from "react";
// // // import gsap from "gsap";
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // // if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// // // const services = [
// // //   "Integrated Annual Report",
// // //   "Sustainability and ESG reports",
// // //   "Web Development",
// // //   "Presentations",
// // //   "Branding and Activation",
// // //   "Videos",
// // //   "Data & Technology",
// // // ];

// // // const Services = () => {
// // //   const sectionRef = useRef<HTMLDivElement | null>(null);
// // //   const headerRef = useRef<HTMLDivElement | null>(null);
// // //   const circleRef = useRef<HTMLSpanElement | null>(null);
// // //   const cardsRef = useRef<HTMLDivElement[]>([]);



// // // // 🟡 Rolling Circle – runs continuously whenever section is visible (independent of pin)
// // // // Replace your existing useEffect that builds a GSAP timeline for the circle with the following:
// // // // 🟡 Rolling Circle (runs continuously while section is visible, independent of ScrollTrigger pinning)
// // // useEffect(() => {
// // //   if (!circleRef.current || !sectionRef.current) return;

// // //   const ball = circleRef.current;

// // //   // Create the GSAP timeline
// // //   const rollTl = gsap.timeline({
// // //     repeat: -1,
// // //     defaults: { ease: "none" },
// // //     paused: true,
// // //   });

// // //   // Rolling motion (back and forth)
// // //   rollTl
// // //     .to(ball, { x: 200, rotation: 360, duration: 2 })
// // //     .to(ball, { x: 0, rotation: 720, duration: 2 });

// // //   // Independent ticker — manually advances the timeline
// // //   let ticking = false;
// // //   const update = () => {
// // //     if (rollTl.isActive()) rollTl.time(rollTl.time() + 1 / 60); // manually advance ~60 FPS
// // //   };

// // //   const startRolling = () => {
// // //     if (!ticking) {
// // //       ticking = true;
// // //       gsap.ticker.add(update);
// // //       rollTl.play();
// // //     }
// // //   };

// // //   const stopRolling = () => {
// // //     if (ticking) {
// // //       ticking = false;
// // //       gsap.ticker.remove(update);
// // //       rollTl.pause();
// // //     }
// // //   };

// // //   // ScrollTrigger to detect when section is visible
// // //   const trigger = ScrollTrigger.create({
// // //     trigger: sectionRef.current,
// // //     start: "top+=90 bottom", // start when section clears navbar
// // //   end: "bottom top",
// // //     onEnter: startRolling,
// // //     onEnterBack: startRolling,
// // //     onLeave: stopRolling,
// // //     onLeaveBack: stopRolling,
// // //   });

// // //   // Cleanup
// // //   return () => {
// // //     stopRolling();
// // //     rollTl.kill();
// // //     trigger.kill();
// // //   };
// // // }, []);


// // //   // 🧩 Direction-aware scroll animation (header + cards)
// // //   useEffect(() => {
// // //     const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
// // //     if (!cards.length || !sectionRef.current || !headerRef.current) return;

// // //     const ctx = gsap.context(() => {
// // //       const vh = window.innerHeight;

// // //       // === Set Initial States ===
// // //       gsap.set(headerRef.current, { opacity: 0, y: 80 });
// // //       gsap.set(cards, { yPercent: 150, opacity: 0, scaleY: 0.6 });

// // //       // === Define Timelines ===
// // //       const headerIn = gsap.timeline().to(headerRef.current, {
// // //         opacity: 1,
// // //         y: 0,
// // //         duration: 0.8,
// // //         ease: "power2.out",
// // //       });

// // //       const cardsIn = gsap.timeline({ defaults: { ease: "power2.out" } });
// // //       cards.forEach((card, i) => {
// // //         cardsIn
// // //           .to(
// // //             card,
// // //             {
// // //               yPercent: -i * (100 / services.length),
// // //               opacity: 1,
// // //               scaleY: 1.05,
// // //               duration: 0.6,
// // //             },
// // //             i * 0.4
// // //           )
// // //           .to(
// // //             card,
// // //             { scaleY: 1, duration: 0.4 },
// // //             i * 0.4 + 0.3
// // //           );
// // //       });

// // //       const cardsOut = gsap.timeline().to(cards, {
// // //         opacity: 0,
// // //         yPercent: 150,
// // //         duration: 0.6,
// // //         stagger: 0.1,
// // //         ease: "power1.in",
// // //       });

// // //       const headerOut = gsap.timeline().to(headerRef.current, {
// // //         opacity: 0,
// // //         y: 80,
// // //         duration: 0.6,
// // //         ease: "power1.in",
// // //       });

// // //       // === Master ScrollTrigger ===
// // //       const masterTl = gsap.timeline({ paused: true });
// // //       masterTl.add(headerIn);
// // //       masterTl.add(cardsIn, "+=0.2");
// // //       masterTl.add(cardsOut);
// // //       masterTl.add(headerOut, "-=0.3");

// // //       ScrollTrigger.create({
// // //         trigger: sectionRef.current,
// // //         start: "top 90px",
// // //         end: () => "+=" + vh * 3,
// // //         pin: true,
// // //         scrub: true,
// // //         anticipatePin: 1,
// // //         invalidateOnRefresh: true,
// // //         onUpdate: (self) => {
// // //           // progress determines play position
// // //           const progress = self.progress;
// // //           masterTl.progress(progress);

// // //           // If scrolling upward (direction -1) and re-entering, reset from start
// // //           if (self.direction === -1 && progress < 0.05) {
// // //             gsap.set(headerRef.current, { opacity: 0, y: 80 });
// // //             gsap.set(cards, { yPercent: 150, opacity: 0, scaleY: 0.6 });
// // //           }
// // //         },
// // //       });
// // //     }, sectionRef);

// // //     return () => ctx.revert();
// // //   }, []);

// // //   return (
// // //     <section
// // //       ref={sectionRef}
// // //       className="w-full bg-black text-white font-gotham overflow-hidden pt-[10px]"
// // //     >
// // //       {/* Header Section */}
// // //       <div
// // //         ref={headerRef}
// // //         className="w-full px-6 md:px-16  flex flex-col md:flex-row justify-between items-start md:items-center bg-black"
// // //       >
// // //         <div className="flex flex-col gap-1">
// // //           <div className="relative flex items-center gap-1 text-2xl uppercase text-gray-400">
// // //             <motion.span
// // //               ref={circleRef}
// // //               className="absolute w-2 h-2 rounded-full bg-yellow-400"
// // //               style={{ top: -10, left: 0 }}
// // //             ></motion.span>
// // //             <span>On the K&A Menu</span>
// // //           </div>
// // //           <h2 className="text-3xl md:text-4xl font-normal leading-tight">
// // //             We transform <br />
// // //             <span className="font-normal text-white">
// // //               ambitions into brands
// // //             </span>
// // //           </h2>
// // //         </div>
// // //       </div>

// // //       {/* Cards Section */}
// // //       <div className="relative w-full flex flex-col items-stretch justify-center h-[80vh]">
// // //         {services.map((item, index) => (
// // //           <div
// // //             key={item}
// // //            ref={(el) => {
// // //   if (el) cardsRef.current[index] = el;
// // // }}

// // //             className={`group relative flex justify-between items-start px-6 md:px-16 py-4 cursor-pointer
// // //               ${
// // //                 index === 0
// // //                   ? "bg-[#b7b7b7] text-white"
// // //                   : index === 1
// // //                   ? "bg-[#999999] text-white"
// // //                   : index === 2
// // //                   ? "bg-[#878789] text-white"
// // //                   : index === 3
// // //                   ? "bg-[#666666] text-white"
// // //                   : index === 4
// // //                   ? "bg-[#434343] text-white"
// // //                   : index === 5
// // //                   ? "bg-[#373737] text-white"
// // //                   : "bg-[#000000] text-white"
// // //               }
// // //               transition-all duration-300 hover:brightness-110 hover:scale-[1.01]`}
// // //             style={{
// // //               height: `${80 / services.length}vh`,
// // //               minHeight: "60px",
// // //               transformOrigin: "center bottom",
// // //             }}
// // //           >
// // //             <h3 className="text-lg md:text-4xl font-bold tracking-wider">
// // //               {item}
// // //             </h3>

// // //             <div className="flex items-center">
// // //   <ArrowUpRight
// // //     size={36} 
// // //     className="text-white transition-transform duration-300 group-hover:translate-x-2"
// // //   />
// // // </div>

// // //           </div>
// // //         ))}
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default Services;



// // // "use client";

// // // import { motion } from "framer-motion";
// // // import { ArrowUpRight } from "lucide-react";
// // // import { useRef, useEffect, useState } from "react";
// // // import gsap from "gsap";
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // // if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// // // const services = [
// // //   "Integrated Annual Report",
// // //   "Sustainability and ESG reports",
// // //   "Web Development",
// // //   "Presentations",
// // //   "Branding and Activation",
// // //   "Videos",
// // //   "Data & Technology",
// // // ];

// // // export default function Services() {
// // //   const sectionRef = useRef<HTMLDivElement | null>(null);
// // //   const headerRef = useRef<HTMLDivElement | null>(null);
// // //   const circleRef = useRef<HTMLSpanElement | null>(null);
// // //   const cardsRef = useRef<HTMLDivElement[]>([]);
// // //   const labelRefs = useRef<HTMLDivElement[]>([]);
// // //   const [headerHeight, setHeaderHeight] = useState(0);

// // //   /* ---------------------------------------------------
// // //      DYNAMIC HEADER HEIGHT CALCULATION 
// // //   --------------------------------------------------- */
// // //   useEffect(() => {
// // //     if (!headerRef.current) return;

// // //     const measure = () => {
// // //       setHeaderHeight(headerRef.current!.getBoundingClientRect().height);
// // //     };

// // //     measure();
// // //     window.addEventListener("resize", measure);
// // //     return () => window.removeEventListener("resize", measure);
// // //   }, []);

// // //   /* ---------------------------------------------------
// // //      CONTINUOUS ROLLING BALL (independent of card animation)
// // //   --------------------------------------------------- */
// // //   useEffect(() => {
// // //     if (!circleRef.current || !sectionRef.current) return;

// // //     const ball = circleRef.current;

// // //     const rollTl = gsap.timeline({
// // //       repeat: -1,
// // //       defaults: { ease: "none" },
// // //       paused: true,
// // //     });

// // //     rollTl
// // //       .to(ball, { x: 200, rotation: 360, duration: 2 })
// // //       .to(ball, { x: 0, rotation: 720, duration: 2 });

// // //     let ticking = false;
// // //     const update = () => {
// // //       rollTl.time(rollTl.time() + 1 / 60);
// // //     };

// // //     const startRolling = () => {
// // //       if (!ticking) {
// // //         ticking = true;
// // //         gsap.ticker.add(update);
// // //         rollTl.play();
// // //       }
// // //     };

// // //     const stopRolling = () => {
// // //       if (ticking) {
// // //         ticking = false;
// // //         gsap.ticker.remove(update);
// // //         rollTl.pause();
// // //       }
// // //     };

// // //     const trigger = ScrollTrigger.create({
// // //       trigger: sectionRef.current,
// // //       start: "top+=90 bottom",
// // //       end: "bottom top",
// // //       onEnter: startRolling,
// // //       onEnterBack: startRolling,
// // //       onLeave: stopRolling,
// // //       onLeaveBack: stopRolling,
// // //     });

// // //     return () => {
// // //       stopRolling();
// // //       rollTl.kill();
// // //       trigger.kill();
// // //     };
// // //   }, []);

// // //   /* ---------------------------------------------------
// // //      CARD SWEEP ANIMATION (full viewport stacked)
// // //   --------------------------------------------------- */
// // //   useEffect(() => {
// // //     const cards = cardsRef.current.filter(Boolean);
// // //     const labels = labelRefs.current.filter(Boolean);

// // //     if (!cards.length || !labels.length || !sectionRef.current) return;

// // //     const ctx = gsap.context(() => {
// // //       const vh = window.innerHeight;

// // //       /* -----------------------------
// // //          INITIAL STATE FOR ALL CARDS
// // //       ------------------------------ */
// // //       gsap.set(cards, {
// // //         opacity: 0,
// // //         y: vh,
// // //         position: "absolute",
// // //         left: 0,
// // //         width: "100%",
// // //       });

// // //       /* -----------------------------
// // //          MAIN SCROLL TIMELINE
// // //       ------------------------------ */

// // //       const tl = gsap.timeline({
// // //         scrollTrigger: {
// // //           trigger: sectionRef.current,
// // //           start: "top 90px",
// // //           end: "+=" + vh * (services.length + 1),
// // //           scrub: true,
// // //           pin: true,
// // //         },
// // //       });

// // //       services.forEach((_, i) => {
// // //         const card = cards[i];
// // //         const label = labels[i];

// // //         const remainingHeight =
// // //           vh -
// // //           headerHeight -
// // //           i * 50; // label stacking height (each label ~50px)

// // //         // animate card sweeping from bottom into stacked position
// // //         tl.to(
// // //           card,
// // //           {
// // //             opacity: 1,
// // //             y: headerHeight + i * 50,
// // //             height: remainingHeight,
// // //             duration: 1,
// // //             ease: "power2.out",
// // //           },
// // //           "+=0.1"
// // //         );

// // //         // after card settles, keep only its label visible
// // //         tl.to(
// // //           card,
// // //           {
// // //             height: 50,
// // //             ease: "none",
// // //           },
// // //           "+=0.3"
// // //         );

// // //         tl.to(
// // //           label,
// // //           {
// // //             opacity: 1,
// // //           },
// // //           "<"
// // //         );
// // //       });
// // //     }, sectionRef);

// // //     return () => ctx.revert();
// // //   }, [headerHeight]);

// // //   return (
// // //     <section
// // //       ref={sectionRef}
// // //       className="w-full bg-black text-white font-gotham overflow-hidden pt-[10px] relative"
// // //       style={{ height: "100vh" }}
// // //     >
// // //       {/* Header */}
// // //       <div
// // //         ref={headerRef}
// // //         className="w-full px-6 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center bg-black pb-6"
// // //       >
// // //         <div className="flex flex-col gap-1">
// // //           <div className="relative flex items-center gap-1 text-2xl uppercase text-gray-400">
// // //             <motion.span
// // //               ref={circleRef}
// // //               className="absolute w-2 h-2 rounded-full bg-yellow-400"
// // //               style={{ top: -10, left: 0 }}
// // //             ></motion.span>
// // //             <span>On the K&A Menu</span>
// // //           </div>
// // //           <h2 className="text-3xl md:text-4xl font-normal leading-tight">
// // //             We transform <br />
// // //             <span className="font-normal text-white">ambitions into brands</span>
// // //           </h2>
// // //         </div>
// // //       </div>

// // //       {/* Card Stack */}
// // //       <div className="relative w-full h-full">
// // //         {services.map((item, index) => (
// // //           <div
// // //             key={item}
// // //             ref={(el) => (cardsRef.current[index] = el!)}
// // //             className="bg-[#1b1b1b] border border-gray-700 px-6 md:px-16 overflow-hidden"
// // //           >
// // //             <div
// // //               ref={(el) => (labelRefs.current[index] = el!)}
// // //               className="opacity-0 absolute top-0 left-0 px-6 md:px-16 py-4 z-20"
// // //             >
// // //               <h3 className="text-lg md:text-2xl font-bold tracking-wider">
// // //                 {item}
// // //               </h3>
// // //             </div>

// // //             <div
// // //   ref={(el) => (labelRefs.current[index] = el!)}
// // //   className="label absolute top-0 left-0 px-6 md:px-16 py-4 z-20 opacity-0"
// // // >
// // //   <h3 className="text-lg md:text-2xl font-bold tracking-wider">
// // //     {item}
// // //   </h3>
// // // </div>

// // //           </div>
// // //         ))}
// // //       </div>
// // //     </section>
// // //   );
// // // }
// // // "use client";
// // // import { motion } from "framer-motion";
// // // import { ArrowUpRight } from "lucide-react";
// // // import { useRef, useEffect } from "react";
// // // import gsap from "gsap";
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // // if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// // // const services = [
// // //   "Integrated Annual Report",
// // //   "Sustainability and ESG reports",
// // //   "Web Development",
// // //   "Presentations",
// // //   "Branding and Activation",
// // //   "Videos",
// // //   "Data & Technology",
// // // ];

// // // const Services = () => {
// // //   const sectionRef = useRef<HTMLDivElement | null>(null);
// // //   const headerRef = useRef<HTMLDivElement | null>(null);
// // //   const circleRef = useRef<HTMLSpanElement | null>(null);
// // //   const cardsRef = useRef<HTMLDivElement[]>([]);

// // //   // 🟡 Rolling Circle (runs continuously while section is visible, independent of ScrollTrigger pinning)
// // //   useEffect(() => {
// // //     if (!circleRef.current || !sectionRef.current) return;
// // //     const ball = circleRef.current;
    
// // //     // Create the GSAP timeline
// // //     const rollTl = gsap.timeline({
// // //       repeat: -1,
// // //       defaults: { ease: "none" },
// // //       paused: true,
// // //     });
    
// // //     // Rolling motion (back and forth)
// // //     rollTl
// // //       .to(ball, { x: 200, rotation: 360, duration: 2 })
// // //       .to(ball, { x: 0, rotation: 720, duration: 2 });
    
// // //     // Independent ticker — manually advances the timeline
// // //     let ticking = false;
// // //     const update = () => {
// // //       if (rollTl.isActive()) rollTl.time(rollTl.time() + 1 / 60); // manually advance ~60 FPS
// // //     };
    
// // //     const startRolling = () => {
// // //       if (!ticking) {
// // //         ticking = true;
// // //         gsap.ticker.add(update);
// // //         rollTl.play();
// // //       }
// // //     };
    
// // //     const stopRolling = () => {
// // //       if (ticking) {
// // //         ticking = false;
// // //         gsap.ticker.remove(update);
// // //         rollTl.pause();
// // //       }
// // //     };
    
// // //     // ScrollTrigger to detect when section is visible
// // //     const trigger = ScrollTrigger.create({
// // //       trigger: sectionRef.current,
// // //       start: "top+=90 bottom",
// // //       end: "bottom top",
// // //       onEnter: startRolling,
// // //       onEnterBack: startRolling,
// // //       onLeave: stopRolling,
// // //       onLeaveBack: stopRolling,
// // //     });
    
// // //     // Cleanup
// // //     return () => {
// // //       stopRolling();
// // //       rollTl.kill();
// // //       trigger.kill();
// // //     };
// // //   }, []);

// // //   // 🧩 Direction-aware scroll animation (header + cards)
// // //   useEffect(() => {
// // //     const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
// // //     if (!cards.length || !sectionRef.current || !headerRef.current) return;

// // //     const ctx = gsap.context(() => {
// // //       const vh = window.innerHeight;
// // //       const headerHeight = headerRef.current?.offsetHeight || 0;
      
// // //       // === Set Initial States ===
// // //       gsap.set(headerRef.current, { opacity: 0, y: 80 });
// // //       gsap.set(cards, { y: vh, opacity: 1 });
      
// // //       // === Define Timelines ===
// // //       const headerIn = gsap.timeline().to(headerRef.current, {
// // //         opacity: 1,
// // //         y: 0,
// // //         duration: 0.8,
// // //         ease: "power2.out",
// // //       });
      
// // //       const cardsIn = gsap.timeline({ defaults: { ease: "power2.out" } });
      
// // //       // Calculate positions for stacking
// // //       let cumulativeHeight = headerHeight;
// // //       const labelHeight = 80; // Approximate height for label visibility
      
// // //       cards.forEach((card, i) => {
// // //         const targetY = cumulativeHeight;
        
// // //         cardsIn.to(
// // //           card,
// // //           {
// // //             y: targetY,
// // //             opacity: 1,
// // //             duration: 0.8,
// // //           },
// // //           i * 0.3
// // //         );
        
// // //         cumulativeHeight += labelHeight;
// // //       });
      
// // //       const cardsOut = gsap.timeline().to(cards, {
// // //         opacity: 0,
// // //         y: vh,
// // //         duration: 0.6,
// // //         stagger: 0.1,
// // //         ease: "power1.in",
// // //       });
      
// // //       const headerOut = gsap.timeline().to(headerRef.current, {
// // //         opacity: 0,
// // //         y: 80,
// // //         duration: 0.6,
// // //         ease: "power1.in",
// // //       });
      
// // //       // === Master ScrollTrigger ===
// // //       const masterTl = gsap.timeline({ paused: true });
// // //       masterTl.add(headerIn);
// // //       masterTl.add(cardsIn, "+=0.2");
// // //       masterTl.add(cardsOut);
// // //       masterTl.add(headerOut, "-=0.3");
      
// // //       ScrollTrigger.create({
// // //         trigger: sectionRef.current,
// // //         start: "top 90px",
// // //         end: () => "+=" + vh * 3,
// // //         pin: true,
// // //         scrub: true,
// // //         anticipatePin: 1,
// // //         invalidateOnRefresh: true,
// // //         onUpdate: (self) => {
// // //           const progress = self.progress;
// // //           masterTl.progress(progress);
          
// // //           if (self.direction === -1 && progress < 0.05) {
// // //             gsap.set(headerRef.current, { opacity: 0, y: 80 });
// // //             gsap.set(cards, { y: vh, opacity: 1 });
// // //           }
// // //         },
// // //       });
// // //     }, sectionRef);

// // //     return () => ctx.revert();
// // //   }, []);

// // //   return (
// // //     <section
// // //       ref={sectionRef}
// // //       className="w-full bg-black text-white font-gotham overflow-hidden pt-[10px]"
// // //     >
// // //       {/* Header Section */}
// // //       <div
// // //         ref={headerRef}
// // //         className="w-full px-6 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center bg-black"
// // //       >
// // //         <div className="flex flex-col gap-1">
// // //           <div className="relative flex items-center gap-1 text-2xl uppercase text-gray-400">
// // //             <motion.span
// // //               ref={circleRef}
// // //               className="absolute w-2 h-2 rounded-full bg-yellow-400"
// // //               style={{ top: -10, left: 0 }}
// // //             ></motion.span>
// // //             <span>On the K&A Menu</span>
// // //           </div>
// // //           <h2 className="text-3xl md:text-4xl font-normal leading-tight">
// // //             We transform <br />
// // //             <span className="font-normal text-white">
// // //               ambitions into brands
// // //             </span>
// // //           </h2>
// // //         </div>
// // //       </div>

// // //       {/* Cards Section */}
// // //       <div className="relative w-full h-[calc(100vh-200px)]">
// // //         {services.map((item, index) => (
// // //           <div
// // //             key={item}
// // //             ref={(el) => {
// // //               if (el) cardsRef.current[index] = el;
// // //             }}
// // //             className={`group absolute left-0 right-0 flex justify-between items-start px-6 md:px-16 py-4 cursor-pointer
// // //               ${
// // //                 index === 0
// // //                   ? "bg-[#b7b7b7] text-white"
// // //                   : index === 1
// // //                   ? "bg-[#999999] text-white"
// // //                   : index === 2
// // //                   ? "bg-[#878789] text-white"
// // //                   : index === 3
// // //                   ? "bg-[#666666] text-white"
// // //                   : index === 4
// // //                   ? "bg-[#434343] text-white"
// // //                   : index === 5
// // //                   ? "bg-[#373737] text-white"
// // //                   : "bg-[#000000] text-white"
// // //               }
// // //               transition-all duration-300 hover:brightness-110`}
// // //             style={{
// // //               height: "calc(100vh - 200px)",
// // //               minHeight: "400px",
// // //             }}
// // //           >
// // //             <h3 className="text-lg md:text-4xl font-bold tracking-wider">
// // //               {item}
// // //             </h3>
// // //             <div className="flex items-center">
// // //               <ArrowUpRight
// // //                 size={36}
// // //                 className="text-white transition-transform duration-300 group-hover:translate-x-2"
// // //               />
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default Services;
// // "use client";
// // import { motion } from "framer-motion";
// // import { ArrowUpRight } from "lucide-react";
// // import { useRef, useEffect } from "react";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// // const services = [
// //   "Integrated Annual Report",
// //   "Sustainability and ESG reports",
// //   "Web Development",
// //   "Presentations",
// //   "Branding and Activation",
// //   "Videos",
// //   "Data & Technology",
// // ];

// // const Services = () => {
// //   const sectionRef = useRef<HTMLDivElement | null>(null);
// //   const headerRef = useRef<HTMLDivElement | null>(null);
// //   const circleRef = useRef<HTMLSpanElement | null>(null);
// //   const cardsRef = useRef<HTMLDivElement[]>([]);

// //   // 🟡 Rolling Circle (runs continuously while section is visible, independent of ScrollTrigger pinning)
// //   useEffect(() => {
// //     if (!circleRef.current || !sectionRef.current) return;
// //     const ball = circleRef.current;
    
// //     // Create the GSAP timeline
// //     const rollTl = gsap.timeline({
// //       repeat: -1,
// //       defaults: { ease: "none" },
// //       paused: true,
// //     });
    
// //     // Rolling motion (back and forth)
// //     rollTl
// //       .to(ball, { x: 200, rotation: 360, duration: 2 })
// //       .to(ball, { x: 0, rotation: 720, duration: 2 });
    
// //     // Independent ticker — manually advances the timeline
// //     let ticking = false;
// //     const update = () => {
// //       if (rollTl.isActive()) rollTl.time(rollTl.time() + 1 / 60); // manually advance ~60 FPS
// //     };
    
// //     const startRolling = () => {
// //       if (!ticking) {
// //         ticking = true;
// //         gsap.ticker.add(update);
// //         rollTl.play();
// //       }
// //     };
    
// //     const stopRolling = () => {
// //       if (ticking) {
// //         ticking = false;
// //         gsap.ticker.remove(update);
// //         rollTl.pause();
// //       }
// //     };
    
// //     // ScrollTrigger to detect when section is visible
// //     const trigger = ScrollTrigger.create({
// //       trigger: sectionRef.current,
// //       start: "top+=90 bottom",
// //       end: "bottom top",
// //       onEnter: startRolling,
// //       onEnterBack: startRolling,
// //       onLeave: stopRolling,
// //       onLeaveBack: stopRolling,
// //     });
    
// //     // Cleanup
// //     return () => {
// //       stopRolling();
// //       rollTl.kill();
// //       trigger.kill();
// //     };
// //   }, []);

// //   // 🧩 Direction-aware scroll animation (header + cards)
// //   useEffect(() => {
// //     const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
// //     if (!cards.length || !sectionRef.current || !headerRef.current) return;

// //     const ctx = gsap.context(() => {
// //       const vh = window.innerHeight;
// //       const headerHeight = headerRef.current?.offsetHeight || 0;
      
// //       // === Set Initial States ===
// //       gsap.set(headerRef.current, { opacity: 0, y: 80 });
// //       gsap.set(cards, { y: vh, opacity: 1 });
      
// //       // === Define Timelines ===
// //       const headerIn = gsap.timeline().to(headerRef.current, {
// //         opacity: 1,
// //         y: 0,
// //         duration: 0.8,
// //         ease: "power2.out",
// //       });
      
// //       const cardsIn = gsap.timeline({ defaults: { ease: "power2.out" } });
      
// //       // Calculate positions for stacking
// //       let cumulativeHeight = headerHeight + 10; // Small gap after header
// //       const labelHeight = 70; // Reduced height for tighter stacking
      
// //       cards.forEach((card, i) => {
// //         const targetY = cumulativeHeight;
        
// //         cardsIn.to(
// //           card,
// //           {
// //             y: targetY,
// //             opacity: 1,
// //             duration: 0.8,
// //           },
// //           i * 0.3
// //         );
        
// //         cumulativeHeight += labelHeight;
// //       });
      
// //       const cardsOut = gsap.timeline().to(cards, {
// //         opacity: 0,
// //         y: vh,
// //         duration: 0.6,
// //         stagger: 0.1,
// //         ease: "power1.in",
// //       });
      
// //       const headerOut = gsap.timeline().to(headerRef.current, {
// //         opacity: 0,
// //         y: 80,
// //         duration: 0.6,
// //         ease: "power1.in",
// //       });
      
// //       // === Master ScrollTrigger ===
// //       const masterTl = gsap.timeline({ paused: true });
// //       masterTl.add(headerIn);
// //       masterTl.add(cardsIn, "+=0.2");
// //       masterTl.add(cardsOut);
// //       masterTl.add(headerOut, "-=0.3");
      
// //       ScrollTrigger.create({
// //         trigger: sectionRef.current,
// //         start: "top 90px",
// //         end: () => "+=" + vh * 3,
// //         pin: true,
// //         scrub: true,
// //         anticipatePin: 1,
// //         invalidateOnRefresh: true,
// //         onUpdate: (self) => {
// //           const progress = self.progress;
// //           masterTl.progress(progress);
          
// //           if (self.direction === -1 && progress < 0.05) {
// //             gsap.set(headerRef.current, { opacity: 0, y: 80 });
// //             gsap.set(cards, { y: vh, opacity: 1 });
// //           }
// //         },
// //       });
// //     }, sectionRef);

// //     return () => ctx.revert();
// //   }, []);

// //   return (
// //     <section
// //       ref={sectionRef}
// //       className="w-full bg-black text-white font-gotham overflow-hidden pt-[10px]"
// //     >
// //       {/* Header Section */}
// //       <div
// //         ref={headerRef}
// //         className="w-full px-6 md:px-16 pb-2 flex flex-col md:flex-row justify-between items-start md:items-center bg-black"
// //       >
// //         <div className="flex flex-col gap-1">
// //           <div className="relative flex items-center gap-1 text-xl uppercase text-gray-400">
// //             <motion.span
// //               ref={circleRef}
// //               className="absolute w-2 h-2 rounded-full bg-yellow-400"
// //               style={{ top: -10, left: 0 }}
// //             ></motion.span>
// //             <span>On the K&A Menu</span>
// //           </div>
// //           <h2 className="text-3xl md:text-4xl font-normal leading-tight">
// //             We transform <br />
// //             <span className="font-normal text-white">
// //               ambitions into brands
// //             </span>
// //           </h2>
// //         </div>
// //       </div>

// //       {/* Cards Section */}
// //       <div className="relative w-full h-[calc(100vh-140px)]">
// //         {services.map((item, index) => (
// //           <div
// //             key={item}
// //             ref={(el) => {
// //               if (el) cardsRef.current[index] = el;
// //             }}
// //             className={`group absolute left-0 right-0 flex justify-between items-start px-6 md:px-16 py-4 cursor-pointer
// //               ${
// //                 index === 0
// //                   ? "bg-[#b7b7b7] text-white"
// //                   : index === 1
// //                   ? "bg-[#999999] text-white"
// //                   : index === 2
// //                   ? "bg-[#878789] text-white"
// //                   : index === 3
// //                   ? "bg-[#666666] text-white"
// //                   : index === 4
// //                   ? "bg-[#434343] text-white"
// //                   : index === 5
// //                   ? "bg-[#373737] text-white"
// //                   : "bg-[#000000] text-white"
// //               }
// //               transition-all duration-300 hover:brightness-110`}
// //             style={{
// //               height: "calc(100vh - 140px)",
// //               minHeight: "400px",
// //             }}
// //           >
// //             <h3 className="text-lg md:text-4xl font-bold tracking-wider">
// //               {item}
// //             </h3>
// //             <div className="flex items-center">
// //               <ArrowUpRight
// //                 size={36}
// //                 className="text-white transition-transform duration-300 group-hover:translate-x-2"
// //               />
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // };

// // export default Services;



// "use client";
// import { motion } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";
// import { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// const services = [
//   "Integrated Annual Report",
//   "Sustainability and ESG reports",
//   "Web Development",
//   "Presentations",
//   "Branding and Activation",
//   "Videos",
//   "Data & Technology",
// ];

// const Services = () => {
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//   const headerRef = useRef<HTMLDivElement | null>(null);
//   const circleRef = useRef<HTMLSpanElement | null>(null);
//   const cardsRef = useRef<HTMLDivElement[]>([]);

//   // 🟡 Rolling Circle (runs continuously while section is visible, independent of ScrollTrigger pinning)
//   useEffect(() => {
//     if (!circleRef.current || !sectionRef.current) return;
//     const ball = circleRef.current;
    
//     // Create the GSAP timeline
//     const rollTl = gsap.timeline({
//       repeat: -1,
//       defaults: { ease: "none" },
//       paused: true,
//     });
    
//     // Rolling motion (back and forth)
//     rollTl
//       .to(ball, { x: 200, rotation: 360, duration: 2 })
//       .to(ball, { x: 0, rotation: 720, duration: 2 });
    
//     // Independent ticker — manually advances the timeline
//     let ticking = false;
//     const update = () => {
//       if (rollTl.isActive()) rollTl.time(rollTl.time() + 1 / 60); // manually advance ~60 FPS
//     };
    
//     const startRolling = () => {
//       if (!ticking) {
//         ticking = true;
//         gsap.ticker.add(update);
//         rollTl.play();
//       }
//     };
    
//     const stopRolling = () => {
//       if (ticking) {
//         ticking = false;
//         gsap.ticker.remove(update);
//         rollTl.pause();
//       }
//     };
    
//     // ScrollTrigger to detect when section is visible
//     const trigger = ScrollTrigger.create({
//       trigger: sectionRef.current,
//       start: "top+=90 bottom",
//       end: "bottom top",
//       onEnter: startRolling,
//       onEnterBack: startRolling,
//       onLeave: stopRolling,
//       onLeaveBack: stopRolling,
//     });
    
//     // Cleanup
//     return () => {
//       stopRolling();
//       rollTl.kill();
//       trigger.kill();
//     };
//   }, []);

//   // 🧩 Direction-aware scroll animation (header + cards)
//   useEffect(() => {
//     const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
//     if (!cards.length || !sectionRef.current || !headerRef.current) return;

//     const ctx = gsap.context(() => {
//       const vh = window.innerHeight;
//       const headerHeight = headerRef.current?.offsetHeight || 0;
      
//       // === Set Initial States ===
//       gsap.set(headerRef.current, { opacity: 0, y: 80 });
//       gsap.set(cards, { y: vh, opacity: 1 });
      
//       // === Define Timelines ===
//       const headerIn = gsap.timeline().to(headerRef.current, {
//         opacity: 1,
//         y: 0,
//         duration: 0.8,
//         ease: "power2.out",
//       });
      
//       const cardsIn = gsap.timeline({ defaults: { ease: "power2.out" } });
      
//       // Calculate positions for stacking
//       let cumulativeHeight = headerHeight;
//       const labelHeight = 50; // Tighter stacking to fit all cards
      
//       cards.forEach((card, i) => {
//         const targetY = cumulativeHeight;
        
//         cardsIn.to(
//           card,
//           {
//             y: targetY,
//             opacity: 1,
//             duration: 0.8,
//           },
//           i * 0.3
//         );
        
//         cumulativeHeight += labelHeight;
//       });
      
//       const cardsOut = gsap.timeline().to(cards, {
//         opacity: 0,
//         y: vh,
//         duration: 0.6,
//         stagger: 0.1,
//         ease: "power1.in",
//       });
      
//       const headerOut = gsap.timeline().to(headerRef.current, {
//         opacity: 0,
//         y: 80,
//         duration: 0.6,
//         ease: "power1.in",
//       });
      
//       // === Master ScrollTrigger ===
//       const masterTl = gsap.timeline({ paused: true });
//       masterTl.add(headerIn);
//       masterTl.add(cardsIn, "+=0.2");
//       masterTl.add(cardsOut);
//       masterTl.add(headerOut, "-=0.3");
      
//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: "top 90px",
//         end: () => "+=" + vh * 3,
//         pin: true,
//         scrub: true,
//         anticipatePin: 1,
//         invalidateOnRefresh: true,
//         onUpdate: (self) => {
//           const progress = self.progress;
//           masterTl.progress(progress);
          
//           if (self.direction === -1 && progress < 0.05) {
//             gsap.set(headerRef.current, { opacity: 0, y: 80 });
//             gsap.set(cards, { y: vh, opacity: 1 });
//           }
//         },
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="w-full bg-black text-white font-gotham overflow-hidden pt-[10px]"
//     >
//       {/* Header Section */}
//       <div
//         ref={headerRef}
//         className="w-full px-6 md:px-16 py-4 flex flex-col md:flex-row justify-between items-start md:items-center bg-black"
//       >
//         <div className="flex flex-col gap-0">
//           <div className="relative flex items-center gap-1 text-lg uppercase text-gray-400">
//             <motion.span
//               ref={circleRef}
//               className="absolute w-2 h-2 rounded-full bg-yellow-400"
//               style={{ top: -10, left: 0 }}
//             ></motion.span>
//             <span>On the K&A Menu</span>
//           </div>
//           <h2 className="text-2xl md:text-3xl font-normal leading-tight">
//             We transform <br />
//             <span className="font-normal text-white">
//               ambitions into brands
//             </span>
//           </h2>
//         </div>
//       </div>

//       {/* Cards Section */}
//       <div className="relative w-full" style={{ height: `calc(100vh - ${90}px)` }}>
//         {services.map((item, index) => (
//           <div
//             key={item}
//             ref={(el) => {
//               if (el) cardsRef.current[index] = el;
//             }}
//             className={`group absolute left-0 right-0 flex justify-between items-start px-6 md:px-16 py-3 cursor-pointer
//               ${
//                 index === 0
//                   ? "bg-[#b7b7b7] text-white"
//                   : index === 1
//                   ? "bg-[#999999] text-white"
//                   : index === 2
//                   ? "bg-[#878789] text-white"
//                   : index === 3
//                   ? "bg-[#666666] text-white"
//                   : index === 4
//                   ? "bg-[#434343] text-white"
//                   : index === 5
//                   ? "bg-[#373737] text-white"
//                   : "bg-[#000000] text-white"
//               }
//               transition-all duration-300 hover:brightness-110`}
//             style={{
//               height: `calc(100vh - ${90}px)`,
//               minHeight: "300px",
//             }}
//           >
//             <h3 className="text-base md:text-3xl font-bold tracking-wider">
//               {item}
//             </h3>
//             <div className="flex items-center">
//               <ArrowUpRight
//                 size={28}
//                 className="text-white transition-transform duration-300 group-hover:translate-x-2"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Services;
"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = [
  "Integrated Annual Report",
  "Sustainability and ESG reports",
  "Web Development",
  "Presentations",
  "Branding and Activation",
  "Videos",
  "Data & Technology",
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // 🟡 Rolling Circle (runs continuously while section is visible, independent of ScrollTrigger pinning)
  useEffect(() => {
    if (!circleRef.current || !sectionRef.current) return;
    const ball = circleRef.current;
    
    // Create the GSAP timeline
    const rollTl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" },
      paused: true,
    });
    
    // Rolling motion (back and forth)
    rollTl
      .to(ball, { x: 200, rotation: 360, duration: 2 })
      .to(ball, { x: 0, rotation: 720, duration: 2 });
    
    // Independent ticker — manually advances the timeline
    let ticking = false;
    const update = () => {
      if (rollTl.isActive()) rollTl.time(rollTl.time() + 1 / 60); // manually advance ~60 FPS
    };
    
    const startRolling = () => {
      if (!ticking) {
        ticking = true;
        gsap.ticker.add(update);
        rollTl.play();
      }
    };
    
    const stopRolling = () => {
      if (ticking) {
        ticking = false;
        gsap.ticker.remove(update);
        rollTl.pause();
      }
    };
    
    // ScrollTrigger to detect when section is visible
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top+=90 bottom",
      end: "bottom top",
      onEnter: startRolling,
      onEnterBack: startRolling,
      onLeave: stopRolling,
      onLeaveBack: stopRolling,
    });
    
    // Cleanup
    return () => {
      stopRolling();
      rollTl.kill();
      trigger.kill();
    };
  }, []);

  // 🧩 Direction-aware scroll animation (header + cards)
  // 🟦 Independent card entry animation (NOT scroll controlled)
useEffect(() => {
  const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
  if (!cards.length || !sectionRef.current || !headerRef.current) return;

  const ctx = gsap.context(() => {
    const vh = window.innerHeight;
    const headerHeight = headerRef.current!.offsetHeight;
    const containerHeight = vh - headerHeight;
    const labelHeight = containerHeight / (services.length + 1.5);

    // INITIAL STATES
    gsap.set(headerRef.current, { opacity: 0, y: 80 });
    gsap.set(cards, { opacity: 0, y: vh });

    // HEADER TIMELINE (Scroll trigger controlled)
    const headerTl = gsap.timeline().to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // 🎯 FUNCTION TO RUN CARD ENTRY (independent animation)
    const playCardEntry = () => {
      let cumulativeY = 0;

      cards.forEach((card, i) => {
        gsap.to(card, {
          y: cumulativeY,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.35 * i + 0.2, // runs automatically after header
        });

        cumulativeY += labelHeight;
      });
    };
    const collapseUp = () => {
  gsap.killTweensOf(cards); // prevent interference with entry animation

  // Move entire block up together, without offsetting entry positions
  gsap.to(cards, {
    y: (i) => cards[i].offsetTop - 200,  // move upward independent of original target
    opacity: 0,
    duration: 0.55,
    ease: "power2.in",
    stagger: 0.05,
  });

  gsap.to(headerRef.current, {
    opacity: 0,
    y: -80,
    duration: 0.45,
    ease: "power2.in",
  });
};


    // SCROLLTRIGGER — ONLY PIN + PLAY ENTRY ON ENTER
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 90px",
      end: "+=" + vh * 1,
      pin: true,
      scrub: false, // ❗ scrub OFF so scroll does NOT control animation
      anticipatePin: 1,

      onEnter: () => {
          gsap.set(cards, { opacity: 0, y: window.innerHeight });

        headerTl.restart();
        playCardEntry();        // 🔥 cards animate automatically
      },

      onEnterBack: () => {
          gsap.set(cards, { opacity: 0, y: window.innerHeight });

        headerTl.restart();
        playCardEntry();        // 🔥 plays again on reverse scroll
      },

      // COLLAPSE UP — independent exit animation

onLeave: collapseUp,
onLeaveBack: collapseUp,

    });
  }, sectionRef);

  return () => ctx.revert();
}, []);


  return (
    <section
      ref={sectionRef}
      className="w-full bg-black text-white font-gotham overflow-hidden pt-[10px]"
    >
      {/* Header Section */}
      <div
        ref={headerRef}
        className="w-full px-6 md:px-16 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center bg-black"
      >
        <div className="flex flex-col gap-0">
          <div className="relative flex items-center gap-1 text-lg uppercase text-gray-400">
            <motion.span
              ref={circleRef}
              className="absolute w-2 h-2 rounded-full bg-yellow-400"
              style={{ top: -10, left: 0 }}
            ></motion.span>
            <span>On the K&A Menu</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-normal leading-tight mb-0">
            We transform <br />
            <span className="font-normal text-white">
              ambitions into brands
            </span>
          </h2>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative w-full items-center p-0 m-0" style={{ height: `calc(100vh)` }}>
        {services.map((item, index) => (
          <div
            key={item}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className={`group absolute left-0 right-0 flex justify-between items-start px-6 py-3 md:px-16  cursor-pointer
              ${
                index === 0
                  ? "bg-[#b7b7b7] text-white"
                  : index === 1
                  ? "bg-[#999999] text-white"
                  : index === 2
                  ? "bg-[#878789] text-white"
                  : index === 3
                  ? "bg-[#666666] text-white"
                  : index === 4
                  ? "bg-[#434343] text-white"
                  : index === 5
                  ? "bg-[#373737] text-white"
                  : "bg-[#000000] text-white"
              }
              transition-all duration-300 hover:brightness-110`}
            style={{
              height:
                typeof window !== "undefined"
                  ? window.innerHeight / (services.length + 2)
                  : 300, // fallback
              minHeight: "300px",
            }}

          >
            <h3 className="text-base md:text-4xl font-bold tracking-wider">
              {item}
            </h3>
            <div className="flex items-center">
              <ArrowUpRight
                size={28}
                className="text-white transition-transform duration-300 group-hover:translate-x-2"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;