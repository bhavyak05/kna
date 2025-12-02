// // "use client";

// // import React, { useEffect, useRef } from "react";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // gsap.registerPlugin(ScrollTrigger);

// // /**
// //  * NEW VERSION — FIXES:
// //  * ✔ No more constant re-render + lag
// //  * ✔ Section gets pinned ONLY when entering
// //  * ✔ Gradient + image transitions stay perfectly in sync
// //  * ✔ Uses GSAP timeline tied directly to horizontal scroll
// //  */
// // export default function ThemeTransition() {
// //   const rootRef = useRef<HTMLDivElement | null>(null);
// //   const trackRef = useRef<HTMLDivElement | null>(null);

// //   useEffect(() => {
// //     const root = rootRef.current;
// //     const track = trackRef.current;

// //     if (!root || !track) return;

// //     const panels = gsap.utils.toArray<HTMLDivElement>(".tt-pane");
// //     const panelCount = panels.length;

// //     const tl = gsap.timeline({
// //       defaults: { ease: "none" }
// //     });

// //     // Horizontal movement
// //     tl.to(track, {
// //       xPercent: -100 * (panelCount - 1)
// //     });

// //     // COLOR TIMELINE — synced exactly to the scroll progress
// //     tl.to(
// //       {},
// //       {
// //         duration: 1,
// //         onUpdate: () => {
// //           const p = tl.progress();

// //           // Smooth interpolation between panel colors
// //           const themes = [
// //             {
// //               main: "#b9dcff",
// //               sub: "#f2fbfe",
// //               title: "#8dc9f4",
// //               text: "#070f36"
// //             },
// //             {
// //               main: "#ffe7a9",
// //               sub: "#fff9f0",
// //               title: "#f4c36d",
// //               text: "#2a1f11"
// //             },
// //             {
// //               main: "#bfe8c9",
// //               sub: "#f6fff7",
// //               title: "#7fcf8f",
// //               text: "#052a12"
// //             }
// //           ];

// //           const index = Math.floor(p * (themes.length - 1));
// //           const nextIndex = Math.min(index + 1, themes.length - 1);
// //           const localP = (p * (themes.length - 1)) % 1;

// //           const lerp = (a: string, b: string, t: number) => {
// //             const ca = +("0x" + a.slice(1));
// //             const cb = +("0x" + b.slice(1));
// //             const r = Math.round(((ca >> 16) * (1 - t) + (cb >> 16) * t));
// //             const g = Math.round((((ca >> 8) & 255) * (1 - t) + ((cb >> 8) & 255) * t));
// //             const bl = Math.round(((ca & 255) * (1 - t) + (cb & 255) * t));
// //             return `rgb(${r},${g},${bl})`;
// //           };

// //           const themeA = themes[index];
// //           const themeB = themes[nextIndex];

// //           document.documentElement.style.setProperty(
// //             "--theme-main-bg",
// //             lerp(themeA.main, themeB.main, localP)
// //           );
// //           document.documentElement.style.setProperty(
// //             "--theme-sub-bg",
// //             lerp(themeA.sub, themeB.sub, localP)
// //           );
// //           document.documentElement.style.setProperty(
// //             "--theme-title",
// //             lerp(themeA.title, themeB.title, localP)
// //           );
// //           document.documentElement.style.setProperty(
// //             "--theme-text",
// //             lerp(themeA.text, themeB.text, localP)
// //           );
// //         }
// //       },
// //       0
// //     );

// //     ScrollTrigger.create({
// //       animation: tl,
// //       trigger: root,
// //       start: "top top",
// //       end: () => `+=${window.innerWidth * (panelCount - 1)}`,
// //       scrub: 1,
// //       pin: true,
// //       anticipatePin: 1
// //     });

// //     return () => ScrollTrigger.getAll().forEach((st) => st.kill());
// //   }, []);

// //   return (
// //     <div ref={rootRef} className="tt-root">
// //       <svg className="tt-bg" viewBox="0 0 1920 1300" preserveAspectRatio="none">
// //         <rect width="1920" height="1300" fill="url(#grad)" />
        
// //       </svg>

// //       <section className="tt-content">
// //         <h1>Urbanist</h1>
// //         </section>

// //       <section className="tt-track" ref={trackRef}>
// //         <div className="tt-pane">
// //           <img src="https://images.pexels.com/photos/1546249/pexels-photo-1546249.jpeg" />
// //         </div>
// //         <div className="tt-pane">
// //           <img src="https://images.pexels.com/photos/56876/queen-cup-honeycomb-honey-bee-new-queen-rearing-compartment-56876.jpeg" />
// //         </div>
// //         <div className="tt-pane">
// //           <img src="https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg" />
// //         </div>
// //       </section>

// //       <style jsx global>{`
// //         :root {
// //           --theme-main-bg: #b9dcff;
// //           --theme-sub-bg: #f2fbfe;
// //           --theme-title: #8dc9f4;
// //           --theme-text: #070f36;
// //         }

// //         .tt-root {
// //           height: 100vh;
// //           position: relative;
// //           overflow: hidden;
// //         }

// //         .tt-bg {
// //           position: fixed;
// //           inset: 0;
// //           width: 100%;
// //           height: 100vh;
// //           z-index: 0;
// //         }

// //         .tt-content {
// //           position: fixed;
// //           inset: 0;
// //           padding-inline: min(12vw, 120px);
// //           z-index: 3;
// //           color: var(--theme-text);
// //         }

// //         .tt-content h1 {
// //           font-size: clamp(80px, 14vw, 240px);
// //           color: var(--theme-title);
// //         }

// //         .tt-track {
// //           display: flex;
// //           width: 300vw;
// //           height: 100vh;
// //           position: relative;
// //           z-index: 1;
// //         }

// //         .tt-pane {
// //           flex: 0 0 100vw;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           position: relative;
// //         }

// //         .tt-pane img {
// //           width: 55vw;
// //           height: auto;
// //           border-radius: 12px;
// //           box-shadow: 0 10px 40px rgba(0,0,0,0.2);
// //           object-fit: cover;
// //         }

// //         @media (max-width: 900px) {
// //           .tt-pane img { width: 80vw; }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }



// // "use client";

// // import React, { useEffect, useRef } from "react";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import Link from "next/link";

// // gsap.registerPlugin(ScrollTrigger);

// // /**
// //  * VERSION WITH:
// //  * ✔ 16 images
// //  * ✔ Each image has a label + link
// //  * ✔ 2 images visible per screen (left + right)
// //  * ✔ Alternating vertical offsets (left-up/right-down then left-down/right-up)
// //  * ✔ Smooth horizontal scroll with synced animations
// //  * ✔ Center title = "K&A"
// //  */
// // export default function ThemeTransition() {
// //   const rootRef = useRef<HTMLDivElement | null>(null);
// //   const trackRef = useRef<HTMLDivElement | null>(null);

// //   const items = Array.from({ length: 16 }).map((_, i) => ({
// //     id: i,
// //     label: `Category ${i + 1}`,
// //     link: `/category/${i + 1}`,
// //     img: `https://picsum.photos/seed/${i + 1}/900/1400`
// //   }));

// //   useEffect(() => {
// //     const root = rootRef.current;
// //     const track = trackRef.current;
// //     if (!root || !track) return;

// //     const panels = gsap.utils.toArray<HTMLDivElement>(".tt-pane");
// //     const panelCount = panels.length;

// //     const tl = gsap.timeline({ defaults: { ease: "none" } });

// //     // Horizontal movement
// //     tl.to(track, { xPercent: -100 * (panelCount - 1) });

// //     ScrollTrigger.create({
// //       animation: tl,
// //       trigger: root,
// //       start: "top top",
// //       end: () => `+=${window.innerWidth * (panelCount - 1)}`,
// //       scrub: 1,
// //       pin: true,
// //       anticipatePin: 1
// //     });

// //     return () => ScrollTrigger.getAll().forEach((st) => st.kill());
// //   }, []);

// //   return (
// //     <div ref={rootRef} className="tt-root">
// //       <svg className="tt-bg" viewBox="0 0 1920 1300" preserveAspectRatio="none">
// //         <rect width="1920" height="1300" fill="url(#grad)" />
// //       </svg>

// //       <section className="tt-content">
// //         <h1>K&A</h1>
// //       </section>

// //       <section className="tt-track" ref={trackRef}>
// //         {items.map((item, i) => {
// //           const isEven = i % 2 === 0;
// //           return (
// //             <div key={item.id} className="tt-pane">
// //               <Link href={item.link} className="tt-link">
// //                 <img
// //                   src={item.img}
// //                   className={`img ${isEven ? "img-up-left" : "img-down-left"}`}
// //                 />
// //                 <img
// //                   src={item.img}
// //                   className={`img ${isEven ? "img-down-right" : "img-up-right"}`}
// //                 />
// //                 <span className="label">{item.label}</span>
// //               </Link>
// //             </div>
// //           );
// //         })}
// //       </section>

// //       <style jsx global>{`
// //         :root {
// //           --theme-main-bg: #b9dcff;
// //           --theme-sub-bg: #f2fbfe;
// //           --theme-title: #8dc9f4;
// //           --theme-text: #070f36;
// //         }

// //         .tt-root {
// //           height: 100vh;
// //           position: relative;
// //           overflow: hidden;
// //         }

// //         .tt-bg {
// //           position: fixed;
// //           inset: 0;
// //           width: 100%;
// //           height: 100vh;
// //           z-index: 0;
// //         }

// //         .tt-content {
// //           position: fixed;
// //           inset: 0;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           z-index: 5;
// //           color: var(--theme-text);
// //         }

// //         .tt-content h1 {
// //           font-size: clamp(120px, 20vw, 280px);
// //           color: var(--theme-title);
// //           font-weight: 700;
// //         }

// //         .tt-track {
// //           display: flex;
// //           width: 1600vw; /* 16 panels */
// //           height: 100vh;
// //           position: relative;
// //           z-index: 2;
// //         }

// //         .tt-pane {
// //           flex: 0 0 100vw;
// //           position: relative;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //         }

// //         .tt-link {
// //           position: relative;
// //           width: 100%;
// //           height: 100%;
// //           display: block;
// //         }

// //         .img {
// //           position: absolute;
// //           width: 28vw;
// //           height: 28vw;
// //           object-fit: cover;
// //           border-radius: 16px;
// //           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
// //           transition: transform 0.3s ease;
// //         }

// //         /* Left + Right images alternating */
// //         .img-up-left { left: 12vw; top: 12vh; }
// //         .img-down-left { left: 12vw; bottom: 12vh; }
// //         .img-up-right { right: 12vw; top: 12vh; }
// //         .img-down-right { right: 12vw; bottom: 12vh; }

// //         .label {
// //           position: absolute;
// //           bottom: 6vh;
// //           left: 50%;
// //           transform: translateX(-50%);
// //           color: white;
// //           font-size: 1.4rem;
// //           font-weight: 600;
// //           text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
// //         }

// //         @media (max-width: 1000px) {
// //           .img {
// //             width: 40vw;
// //           }
// //         }

// //         @media (max-width: 700px) {
// //           .img {
// //             width: 55vw;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// // "use client";

// // import React, { useEffect, useRef } from "react";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import Link from "next/link";

// // gsap.registerPlugin(ScrollTrigger);

// // /**
// //  * UPDATED VERSION — FIXES:
// //  * ✔ Constant spacing so K&A stays EXACTLY between left + right images
// //  * ✔ Each image is independently clickable (2 per panel)
// //  * ✔ Each image has its own UNIQUE label
// //  * ✔ Smooth scroll but LESS sensitive trackpad scroll (scrub: 0.25)
// //  */
// // export default function ThemeTransition() {
// //   const rootRef = useRef<HTMLDivElement | null>(null);
// //   const trackRef = useRef<HTMLDivElement | null>(null);

// //   // 16 UNIQUE IMAGES + LABELS + LINKS
// //   const items = [
// //     { left: "/preview.jpg", right: "/preview.jpg", leftLabel: "Silk", rightLabel: "Linen", leftLink: "/silk", rightLink: "/linen" },
// //     { left: "/preview.jpg", right: "/preview.jpg", leftLabel: "Cotton", rightLabel: "Festive", leftLink: "/cotton", rightLink: "/festive" },
// //     { left: "/preview.jpg", right: "/preview.jpg", leftLabel: "Bridal", rightLabel: "Designer", leftLink: "/bridal", rightLink: "/designer" },
// //     { left: "/preview.jpg", right: "/preview.jpg", leftLabel: "Handloom", rightLabel: "Formal", leftLink: "/handloom", rightLink: "/formal" },
// //     { left: "/preview.jpg", right: "/preview.jpg", leftLabel: "Daily Wear", rightLabel: "Party", leftLink: "/daily", rightLink: "/party" },
// //     { left: "/preview.jpg", right: "/preview.jpg", leftLabel: "Embroidery", rightLabel: "Premium", leftLink: "/embroidery", rightLink: "/premium" },
// //     { left: "/preview.jpg", right: "/preview.jpg", leftLabel: "Western", rightLabel: "Traditional", leftLink: "/western", rightLink: "/traditional" },
// //     { left: "/preview.jpg", right: "/preview.jpg", leftLabel: "New Arrivals", rightLabel: "Trending", leftLink: "/new", rightLink: "/trending" }
// //   ];

// //   useEffect(() => {
// //   const root = rootRef.current;
// //   const track = trackRef.current;
// //   if (!root || !track) return;

// //   // --- Smooth Scroll Normalizer ---
// //   ScrollTrigger.normalizeScroll({
// //   allowNestedScroll: true,
// //   lockAxis: false,
// //   type: "touch,wheel,pointer"
// // });


// //   const panels = gsap.utils.toArray<HTMLDivElement>(".tt-pane");
// //   const panelCount = panels.length;

// //   const tl = gsap.timeline({ defaults: { ease: "none" } });

// //   tl.to(track, { xPercent: -100 * (panelCount - 1) });

// //   ScrollTrigger.create({
// //     animation: tl,
// //     trigger: root,
// //     start: "top top",
// //     end: () => track.scrollWidth - window.innerWidth,
// //     scrub: 2,
// //     pin: true,
// //     anticipatePin: 1
// //   });

// //   return () => ScrollTrigger.getAll().forEach(st => st.kill());
// // }, []);


// //   return (
// //     <div ref={rootRef} className="tt-root">
// //       <svg className="tt-bg" viewBox="0 0 1920 1300" preserveAspectRatio="none">
// //         <rect width="1920" height="1300" fill="url(#grad)" />
// //       </svg>

// //       {/* CENTER TITLE */}
// //       <section className="tt-content">
// //         <h2></h2>
// //       </section>

// //       {/* HORIZONTAL SCROLL */}
// //       <section className="tt-track" ref={trackRef}>
// //         {items.map((item, i) => {
// //           const isEven = i % 2 === 0;
// //           return (
// //             <div key={i} className="tt-pane">
// //               {/* LEFT IMAGE */}
// //               <Link href={item.leftLink} className="img-wrapper-left">
// //                 <img
// //                   src={item.left}
// //                   className={`img ${isEven ? "img-up" : "img-up"}`}
// //                 />
// //                 <span className="label-left">{item.leftLabel}</span>
// //               </Link>

// //               {/* RIGHT IMAGE */}
// //               <Link href={item.rightLink} className="img-wrapper-right">
// //                 <img
// //                   src={item.right}
// //                   className={`img ${isEven ? "img-down" : "img-down"}`}
// //                 />
// //                 <span className="label-right">{item.rightLabel}</span>
// //               </Link>
// //             </div>
// //           );
// //         })}
// //       </section>

// //       <style jsx global>{`
// //         :root {
// //           --theme-main-bg: #b9dcff;
// //           --theme-sub-bg: #f2fbfe;
// //           --theme-title: #8dc9f4;
// //           --theme-text: #070f36;
// //         }

// //         .tt-root {
// //           height: 100vh;
// //           position: relative;
// //           overflow: hidden;
// //         }

// //         .tt-bg {
// //           position: fixed;
// //           inset: 0;
// //           width: 100%;
// //           height: 100vh;
// //           z-index: 0;
// //         }

// //         .tt-content {
// //           position: fixed;
// //           inset: 0;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           z-index: 20;
// //           pointer-events: none;
// //         }

// //         .tt-content h2 {
// //           font-size: clamp(120px, 18vw, 260px);
// //           color: var(--theme-title);
// //           font-weight: 700;
// //           text-align: center;
// //         }

// //         .tt-track {
// //           display: flex;
// //           width: 800vw; /* 8 panels */
// //           height: 100vh;
// //           position: relative;
// //           z-index: 5;
// //         }

// //         .tt-pane {
// //           flex: 0 0 100vw;
// //           position: relative;
// //         }

// //         .img-wrapper-left,
// //         .img-wrapper-right {
// //           position: absolute;
// //           width: 30vw;
// //           text-align: center;
// //           z-index: 10;
// //         }

// //         .img-wrapper-left { left: 8vw; }
// //         .img-wrapper-right { right: 8vw; }

// //         .img {
// //           width: 100%;
// //           height: 28vw;
// //           object-fit: cover;
// //           border-radius: 16px;
// //           box-shadow: 0 10px 40px rgba(0,0,0,0.25);
// //         }

// //         .img-up { top: 14vh; position: relative; }
// //         .img-down { top: 30vh; position: relative; }

// //         .label-left,
// //         .label-right {
// //           margin-top: 1rem;
// //           display: block;
// //           font-size: 1.4rem;
// //           font-weight: 600;
// //           color: white;
// //           text-shadow: 0 4px 20px rgba(0,0,0,0.4);
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }



// // "use client";

// // import React, { useEffect, useRef } from "react";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import Link from "next/link";

// // gsap.registerPlugin(ScrollTrigger);

// // export default function ThemeTransition() {
// //   const rootRef = useRef<HTMLDivElement | null>(null);
// //   const trackRef = useRef<HTMLDivElement | null>(null);

// //   // 16 IMAGES TOTAL — for now all use your uploaded placeholder
// //   const img = "/preview.jpg";

// //   // 8 PANELS × 2 IMAGES = 16 IMAGES
// //   const items = [
// //     { left: img, right: img, leftLabel: "Silk", rightLabel: "Linen" },
// //     { left: img, right: img, leftLabel: "Cotton", rightLabel: "Festive" },
// //     { left: img, right: img, leftLabel: "Bridal", rightLabel: "Designer" },
// //     { left: img, right: img, leftLabel: "Handloom", rightLabel: "Formal" },
// //     { left: img, right: img, leftLabel: "Daily Wear", rightLabel: "Party" },
// //     { left: img, right: img, leftLabel: "Embroidery", rightLabel: "Premium" },
// //     { left: img, right: img, leftLabel: "Western", rightLabel: "Traditional" },
// //     { left: img, right: img, leftLabel: "New Arrivals", rightLabel: "Trending" },
// //   ];

// //   useEffect(() => {
// //   const root = rootRef.current;
// //   const track = trackRef.current;
// //   if (!root || !track) return;

// //   const panels = gsap.utils.toArray<HTMLDivElement>(".tt-pane");
// //   const maxScroll = (panels.length - 1) * window.innerWidth;

// //   let target = 0;
// //   let current = 0;
// //   let raf: number | null = null;
// //   const ease = 0.12;
// //   const wheelSpeed = 1.1;
// //   const touchSpeed = 1.6;

// //   const update = () => {
// //     current += (target - current) * ease;
// //     if (Math.abs(current - target) < 0.5) current = target;
// //     gsap.set(track, { x: -current });
// //     if (current !== target) raf = requestAnimationFrame(update);
// //     else raf = null;
// //   };

// //   const startUpdate = () => {
// //     if (!raf) raf = requestAnimationFrame(update);
// //   };

// //   const onWheel = (e: WheelEvent) => {
// //     e.preventDefault();
// //     target = Math.max(0, Math.min(maxScroll, target + e.deltaY * wheelSpeed));
// //     startUpdate();
// //   };

// //   let touchY = 0;
// //   const onTouchStart = (e: TouchEvent) => {
// //     touchY = e.touches[0].clientY;
// //   };
// //   const onTouchMove = (e: TouchEvent) => {
// //     const delta = touchY - e.touches[0].clientY;
// //     touchY = e.touches[0].clientY;
// //     target = Math.max(0, Math.min(maxScroll, target + delta * touchSpeed));
// //     startUpdate();
// //   };

// //   const addListeners = () => {
// //     window.addEventListener("wheel", onWheel, { passive: false });
// //     window.addEventListener("touchstart", onTouchStart, { passive: true });
// //     window.addEventListener("touchmove", onTouchMove, { passive: false });
// //   };

// //   const removeListeners = () => {
// //     window.removeEventListener("wheel", onWheel);
// //     window.removeEventListener("touchstart", onTouchStart);
// //     window.removeEventListener("touchmove", onTouchMove);
// //   };

// //   // 🔥 This ScrollTrigger controls pin ONLY
// //   ScrollTrigger.create({
// //     trigger: root,
// //     start: "top top",
// //     end: "+=" + maxScroll,
// //     pin: true,
// //     pinSpacing: true,

// //     onEnter: () => addListeners(),
// //     onLeave: () => removeListeners(),

// //     onEnterBack: () => addListeners(),
// //     onLeaveBack: () => removeListeners()
// //   });

// //   return () => {
// //     if (raf) cancelAnimationFrame(raf);
// //     removeListeners();
// //     ScrollTrigger.killAll();
// //   };
// // }, []);

// //   return (
// //     <div ref={rootRef} className="tt-root">

// //       {/* Center title */}
// //       <div className="tt-content">
// //         <h1></h1>
// //       </div>

// //       {/* Horizontal panels */}
// //       <div ref={trackRef} className="tt-track">
// //         {items.map((item, i) => (
// //           <div key={i} className="tt-pane">
            
// //             {/* Left Image */}
// //             <Link href="#" className="img-wrapper-left">
// //               <img src={item.left} className="img img-up" />
// //               <span className="label">{item.leftLabel}</span>
// //             </Link>

// //             {/* Right Image */}
// //             <Link href="#" className="img-wrapper-right">
// //               <img src={item.right} className="img img-down" />
// //               <span className="label">{item.rightLabel}</span>
// //             </Link>

// //           </div>
// //         ))}
// //       </div>

// //       {/* Styling */}
// //       <style jsx global>{`
// //         .tt-root {
// //           height: 100vh;
// //           overflow: hidden;
// //           position: relative;
// //         }

// //         .tt-content {
// //           position: fixed;
// //           top: 0;
// //           left: 0;
// //           right: 0;
// //           bottom: 0;
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //           pointer-events: none;
// //           z-index: 10;
// //         }

// //         .tt-content h1 {
// //           font-size: clamp(80px, 16vw, 200px);
// //           font-weight: 700;
// //           color: #ffffff;
// //         }

// //         .tt-track {
// //           display: flex;
// //           height: 100vh;
// //           width: calc(8 * 100vw);
// //           position: relative;
// //         }

// //         .tt-pane {
// //           width: 100vw;
// //           height: 100vh;
// //           position: relative;
// //           flex-shrink: 0;
// //         }

// //         .img-wrapper-left,
// //         .img-wrapper-right {
// //           position: absolute;
// //           width: 30vw;
// //           text-align: center;
// //         }

// //         .img-wrapper-left { left: 8vw; top: 10vh; }
// //         .img-wrapper-right { right: 8vw; top: 40vh; }

// //         .img {
// //           width: 100%;
// //           height: 25vw;
// //           object-fit: cover;
// //           border-radius: 14px;
// //         }

// //         .label {
// //           display: block;
// //           margin-top: 0.8rem;
// //           font-size: 1.3rem;
// //           color: #fff;
// //           text-shadow: 0 4px 20px rgba(0,0,0,0.4);
// //           font-weight: 600;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }
"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------
// 16 IMAGES (8 panes × 2)
// ------------------------------------------------------
interface Item {
  left: string;
  right: string;
  leftLabel: string;
  rightLabel: string;
  leftSlug: string;
  rightSlug: string;
}

const img = "/preview1.jpg";

const items: Item[] = [
  { left: img, right: img, leftLabel: "box1", rightLabel: "Linen", leftSlug: "silk", rightSlug: "linen" },
  { left: img, right: img, leftLabel: "Cotton", rightLabel: "Festive", leftSlug: "cotton", rightSlug: "festive" },
  { left: img, right: img, leftLabel: "Bridal", rightLabel: "Designer", leftSlug: "bridal", rightSlug: "designer" },
  { left: img, right: img, leftLabel: "Handloom", rightLabel: "Formal", leftSlug: "handloom", rightSlug: "formal" },
  { left: img, right: img, leftLabel: "Daily Wear", rightLabel: "Party", leftSlug: "daily-wear", rightSlug: "party" },
  { left: img, right: img, leftLabel: "Embroidery", rightLabel: "Premium", leftSlug: "embroidery", rightSlug: "premium" },
  { left: img, right: img, leftLabel: "Western", rightLabel: "Traditional", leftSlug: "western", rightSlug: "traditional" },
  { left: img, right: img, leftLabel: "New Arrivals", rightLabel: "Trending", leftSlug: "new-arrivals", rightSlug: "trending" },
];

// ------------------------------------------------------
// Background Gradient Keyframes
// ------------------------------------------------------
const gradients = [
  ["#ffdee9", "#b5fffc"],
  ["#c6ffdd", "#fbd786"],
  ["#fbc2eb", "#a6c1ee"],
  ["#fa709a", "#fee140"],
  ["#84fab0", "#8fd3f4"],
  ["#a18cd1", "#fbc2eb"],
  ["#ffecd2", "#fcb69f"],
  ["#d4fc79", "#96e6a1"],
];

// Utility to blend colors
const lerpColor = (a: string, b: string, t: number) => {
  const ca = parseInt(a.slice(1), 16);
  const cb = parseInt(b.slice(1), 16);
  const ar = (ca >> 16) & 255, ag = (ca >> 8) & 255, ab = ca & 255;
  const br = (cb >> 16) & 255, bg = (cb >> 8) & 255, bb = cb & 255;
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `rgb(${rr},${rg},${rb})`;
};

export default function ThemeTransition() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeLabel, setActiveLabel] = useState(items[0].leftLabel);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const panels = gsap.utils.toArray<HTMLDivElement>(".tt-pane");
    const maxScroll = (panels.length - 1) * window.innerWidth;

    // ---------------------------
    // MAIN GSAP SCROLL TIMELINE
    // ---------------------------
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "main-pin",
        trigger: root,
        start: "top top",
        end: `+=${maxScroll}`,
        pin: true,
        scrub: 1,
      },
    });

    tl.to(
      track,
      {
        x: -maxScroll,
        ease: "none",
      },
      0
    );

    // ---------------------------
    // LABEL UPDATES
    // ---------------------------
    panels.forEach((panel, i) => {
      const centerPoint = (i / (panels.length - 1)) * maxScroll;

      ScrollTrigger.create({
        trigger: root,
        start: () => `top+=${centerPoint - window.innerWidth / 2}`,
        end: () => `top+=${centerPoint + window.innerWidth / 2}`,
        onEnter: () => setActiveLabel(items[i].leftLabel),
        onEnterBack: () => setActiveLabel(items[i].leftLabel),
      });
    });

    // ---------------------------
    // BACKGROUND GRADIENT TRANSITION
    // ---------------------------
    gsap.ticker.add(() => {
      const st = ScrollTrigger.getById("main-pin");
      if (!st) return;

      const progress = st.progress;
      const scaled = progress * (gradients.length - 1);

      const idx = Math.floor(scaled);
      const next = Math.min(idx + 1, gradients.length - 1);
      const t = scaled - idx;

      const c1 = lerpColor(gradients[idx][0], gradients[next][0], t);
      const c2 = lerpColor(gradients[idx][1], gradients[next][1], t);

      document.documentElement.style.setProperty("--g1", c1);
      document.documentElement.style.setProperty("--g2", c2);
    });

    return () => {
      tl.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root) st.kill();
      });
    };
  }, []);

  return (
    <div ref={rootRef} className="tt-root">
      {/* Fixed background gradient */}
      <div className="tt-bg"></div>

      {/* Center title if needed */}
      <div className="tt-content"></div>

      {/* Horizontal Panels */}
      <div ref={trackRef} className="tt-track">
        {items.map((item, i) => (
          <div key={i} className="tt-pane">
            <Link href={`/category/${item.leftSlug}`} className="img-wrapper-left">
              <img src={item.left} className="img img-up" />
              <span className="label">{item.leftLabel}</span>
            </Link>

            <Link href={`/category/${item.rightSlug}`} className="img-wrapper-right">
              <img src={item.right} className="img img-down" />
              <span className="label">{item.rightLabel}</span>
            </Link>
          </div>
        ))}
      </div>

      {/* CSS */}
      <style jsx global>{`
        html { overflow-x: hidden; }
        body { margin: 0; }

        .tt-root {
          height: 100vh;
          overflow: hidden;
          position: relative;
        }

        .tt-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: linear-gradient(135deg, var(--g1), var(--g2));
          transition: background 0.15s linear;
          pointer-events: none;
        }

        .tt-content {
          position: fixed;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .tt-track {
          display: flex;
          height: 100vh;
          width: calc(${items.length} * 100vw);
          position: relative;
          z-index: 5;
        }

        .tt-pane {
          width: 100vw;
          height: 100vh;
          flex-shrink: 0;
          position: relative;
        }

        .img-wrapper-left,
        .img-wrapper-right {
          position: absolute;
          width: 30vw;
          text-align: center;
          z-index: 5;
          pointer-events: auto;
          text-decoration: none;
        }

        .img-wrapper-left { left: 8vw; top: 10vh; }
        .img-wrapper-right { right: 8vw; top: 40vh; }

        .img {
          width: 100%;
          height: 25vw;
          border-radius: 14px;
          object-fit: cover;
        }

        .label {
          margin-top: 0.8rem;
          font-size: 1.3rem;
          color: gray;
          font-weight: 450;
          
        }
      `}</style>
    </div>
  );
}



// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Link from "next/link";

// gsap.registerPlugin(ScrollTrigger);

// interface Item {
//   left: string;
//   right: string;
//   leftLabel: string;
//   rightLabel: string;
//   leftSlug: string;
//   rightSlug: string;
// }

// const img = "/preview.jpg";

// // 8 panels × 2 = 16 images
// const items: Item[] = [
//   { left: img, right: img, leftLabel: "Silk", rightLabel: "Linen", leftSlug: "silk", rightSlug: "linen" },
//   { left: img, right: img, leftLabel: "Cotton", rightLabel: "Festive", leftSlug: "cotton", rightSlug: "festive" },
//   { left: img, right: img, leftLabel: "Bridal", rightLabel: "Designer", leftSlug: "bridal", rightSlug: "designer" },
//   { left: img, right: img, leftLabel: "Handloom", rightLabel: "Formal", leftSlug: "handloom", rightSlug: "formal" },
//   { left: img, right: img, leftLabel: "Daily Wear", rightLabel: "Party", leftSlug: "daily-wear", rightSlug: "party" },
//   { left: img, right: img, leftLabel: "Embroidery", rightLabel: "Premium", leftSlug: "embroidery", rightSlug: "premium" },
//   { left: img, right: img, leftLabel: "Western", rightLabel: "Traditional", leftSlug: "western", rightSlug: "traditional" },
//   { left: img, right: img, leftLabel: "New Arrivals", rightLabel: "Trending", leftSlug: "new-arrivals", rightSlug: "trending" },
// ];

// // 🎨 Background gradients for each panel
// // Replace these later with your desired gradients
// const gradients = [
//   "linear-gradient(135deg, #FDEFF9 0%, #EC38BC 100%)",
//   "linear-gradient(135deg, #FFF1C1 0%, #FFB347 100%)",
//   "linear-gradient(135deg, #E4F1FE 0%, #8EC5FC 100%)",
//   "linear-gradient(135deg, #FFE6E6 0%, #FF8C8C 100%)",
//   "linear-gradient(135deg, #E8FFF5 0%, #52E5A2 100%)",
//   "linear-gradient(135deg, #FFF0F5 0%, #F78CA0 100%)",
//   "linear-gradient(135deg, #F2F9FF 0%, #C0D9FF 100%)",
//   "linear-gradient(135deg, #FFF3E0 0%, #FFBB73 100%)",
// ];

// export default function ThemeTransition() {
//   const rootRef = useRef<HTMLDivElement | null>(null);
//   const trackRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const root = rootRef.current;
//     const track = trackRef.current;
//     if (!root || !track) return;

//     const panels = gsap.utils.toArray<HTMLDivElement>(".tt-pane");
//     const maxScroll = (panels.length - 1) * window.innerWidth;

//     let target = 0;
//     let current = 0;
//     let raf: number | null = null;
//     const ease = 0.08;

//     const update = () => {
//       current += (target - current) * ease;

//       if (Math.abs(current - target) < 0.3) current = target;
//       gsap.set(track, { x: -current });

//       if (current !== target) raf = requestAnimationFrame(update);
//       else raf = null;
//     };

//     const startUpdate = () => {
//       if (!raf) raf = requestAnimationFrame(update);
//     };

//     const onWheel = (e: WheelEvent) => {
//       e.preventDefault();
//       target = Math.max(0, Math.min(maxScroll, target + e.deltaY));
//       startUpdate();
//     };

//     let touchY = 0;
//     const onTouchStart = (e: TouchEvent) => {
//       touchY = e.touches[0].clientY;
//     };

//     const onTouchMove = (e: TouchEvent) => {
//       const delta = touchY - e.touches[0].clientY;
//       touchY = e.touches[0].clientY;
//       target = Math.max(0, Math.min(maxScroll, target + delta * 2));
//       startUpdate();
//     };

//     const addListeners = () => {
//       window.addEventListener("wheel", onWheel, { passive: false });
//       window.addEventListener("touchstart", onTouchStart, { passive: true });
//       window.addEventListener("touchmove", onTouchMove, { passive: false });
//     };

//     const removeListeners = () => {
//       window.removeEventListener("wheel", onWheel);
//       window.removeEventListener("touchstart", onTouchStart);
//       window.removeEventListener("touchmove", onTouchMove);
//     };

//     ScrollTrigger.create({
//       trigger: root,
//       start: "top top",
//       end: "+=" + maxScroll,
//       pin: true,
//       pinSpacing: true,

//       onEnter: addListeners,
//       onLeave: removeListeners,
//       onEnterBack: addListeners,
//       onLeaveBack: removeListeners,
//     });

//     return () => {
//       removeListeners();
//       if (raf) cancelAnimationFrame(raf);
//       ScrollTrigger.killAll();
//     };
//   }, []);

//   return (
//     <div ref={rootRef} className="tt-root">

//       {/* Horizontal Track */}
//       <div ref={trackRef} className="tt-track">
//         {items.map((item, i) => (
//           <div
//             key={i}
//             className="tt-pane"
//             style={{
//               background: gradients[i],       // 🎨 APPLY GRADIENT HERE
//               transition: "background 0.4s ease"
//             }}
//           >
//             <Link href={`/category/${item.leftSlug}`} className="img-wrapper-left">
//               <img src="/preview.jpg" className="img img-up" />
//               <span className="label">{item.leftLabel}</span>
//             </Link>

//             <Link href={`/category/${item.rightSlug}`} className="img-wrapper-right">
//               <img src="/preview.jpg" className="img img-down" />
//               <span className="label">{item.rightLabel}</span>
//             </Link>
//           </div>
//         ))}
//       </div>

//       <style jsx global>{`
//         .tt-root {
//           height: 100vh;
//           overflow: hidden;
//           position: relative;
//         }

//         .tt-track {
//           display: flex;
//           height: 100vh;
//           width: calc(${items.length} * 100vw);
//         }

//         .tt-pane {
//           width: 100vw;
//           height: 100vh;
//           position: relative;
//           flex-shrink: 0;
//         }

//         .img-wrapper-left,
//         .img-wrapper-right {
//           position: absolute;
//           width: 32vw;
//           text-align: center;
//           z-index: 5;
//         }

//         .img-wrapper-left { left: 7vw; top: 12vh; }
//         .img-wrapper-right { right: 7vw; top: 38vh; }

//         .img {
//           width: 100%;
//           height: 27vw;
//           object-fit: cover;
//           border-radius: 15px;
//         }

//         .label {
//           margin-top: 0.8rem;
//           font-size: 1.3rem;
//           font-weight: 600;
//           color: #fff;
//           text-shadow: 0 4px 20px rgba(0,0,0,0.5);
//         }
//       `}</style>
//     </div>
//   );
// }



// "use client";

// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Link from "next/link";

// gsap.registerPlugin(ScrollTrigger);

// const items = [
//   { leftLabel: "Silk", rightLabel: "Linen", leftSlug: "silk", rightSlug: "linen" },
//   { leftLabel: "Cotton", rightLabel: "Festive", leftSlug: "cotton", rightSlug: "festive" },
//   { leftLabel: "Bridal", rightLabel: "Designer", leftSlug: "bridal", rightSlug: "designer" },
//   { leftLabel: "Handloom", rightLabel: "Formal", leftSlug: "handloom", rightSlug: "formal" },
//   { leftLabel: "Daily Wear", rightLabel: "Party", leftSlug: "daily-wear", rightSlug: "party" },
//   { leftLabel: "Embroidery", rightLabel: "Premium", leftSlug: "embroidery", rightSlug: "premium" },
//   { leftLabel: "Western", rightLabel: "Traditional", leftSlug: "western", rightSlug: "traditional" },
//   { leftLabel: "New Arrivals", rightLabel: "Trending", leftSlug: "new-arrivals", rightSlug: "trending" },
// ];

// // 🎨 Give 8 gradient keyframes (start + end colors)
// const gradientStops = [
//   ["#ffdee9", "#b5fffc"],
//   ["#c6ffdd", "#fbd786"],
//   ["#fbc2eb", "#a6c1ee"],
//   ["#fa709a", "#fee140"],
//   ["#84fab0", "#8fd3f4"],
//   ["#a18cd1", "#fbc2eb"],
//   ["#ffecd2", "#fcb69f"],
//   ["#d4fc79", "#96e6a1"]
// ];

// function lerpColor(a: string, b: string, t: number) {
//   const ca = parseInt(a.slice(1), 16);
//   const cb = parseInt(b.slice(1), 16);

//   const ar = (ca >> 16) & 255, ag = (ca >> 8) & 255, ab = ca & 255;
//   const br = (cb >> 16) & 255, bg = (cb >> 8) & 255, bb = cb & 255;

//   const rr = Math.round(ar + (br - ar) * t);
//   const rg = Math.round(ag + (bg - ag) * t);
//   const rb = Math.round(ab + (bb - ab) * t);

//   return `rgb(${rr},${rg},${rb})`;
// }

// export default function ThemeTransition() {
//   const rootRef = useRef<HTMLDivElement>(null);
//   const trackRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const root = rootRef.current!;
//     const track = trackRef.current!;
//     const panels = gsap.utils.toArray<HTMLDivElement>(".tt-pane");
//     const maxScroll = (panels.length - 1) * window.innerWidth;

//     let target = 0;
//     let current = 0;
//     let raf: number | null = null;

//     const ease = 0.1;

//     const update = () => {
//       current += (target - current) * ease;
//       if (Math.abs(target - current) < 0.5) current = target;

//       gsap.set(track, { x: -current });

//       // gradient interpolation progress
//       const progress = current / maxScroll;
//       const scaled = progress * (gradientStops.length - 1);

//       const idx = Math.floor(scaled);
//       const next = Math.min(idx + 1, gradientStops.length - 1);
//       const t = scaled - idx;

//       const c1 = lerpColor(gradientStops[idx][0], gradientStops[next][0], t);
//       const c2 = lerpColor(gradientStops[idx][1], gradientStops[next][1], t);

//       document.documentElement.style.setProperty("--g1", c1);
//       document.documentElement.style.setProperty("--g2", c2);

//       if (current !== target) raf = requestAnimationFrame(update);
//       else raf = null;
//     };

//     const start = () => raf || (raf = requestAnimationFrame(update));

//     const onWheel = (e: WheelEvent) => {
//       e.preventDefault();
//       target = Math.max(0, Math.min(maxScroll, target + e.deltaY));
//       start();
//     };

//     let touchY = 0;
//     const onTS = (e: TouchEvent) => (touchY = e.touches[0].clientY);
//     const onTM = (e: TouchEvent) => {
//       const delta = touchY - e.touches[0].clientY;
//       touchY = e.touches[0].clientY;
//       target = Math.max(0, Math.min(maxScroll, target + delta * 2));
//       start();
//     };

//     const addEvents = () => {
//       window.addEventListener("wheel", onWheel, { passive: false });
//       window.addEventListener("touchstart", onTS, { passive: true });
//       window.addEventListener("touchmove", onTM, { passive: false });
//     };
//     const removeEvents = () => {
//       window.removeEventListener("wheel", onWheel);
//       window.removeEventListener("touchstart", onTS);
//       window.removeEventListener("touchmove", onTM);
//     };

//     ScrollTrigger.create({
//       trigger: root,
//       start: "top top",
//       end: "+=" + maxScroll,
//       pin: true,
//       onEnter: addEvents,
//       onLeave: removeEvents,
//       onEnterBack: addEvents,
//       onLeaveBack: removeEvents
//     });

//     return () => {
//       removeEvents();
//       raf && cancelAnimationFrame(raf);
//       ScrollTrigger.killAll();
//     };
//   }, []);

//   return (
//     <div ref={rootRef} className="tt-root">
//       {/* Global background */}
//       <div className="tt-bg" />

//       <div ref={trackRef} className="tt-track">
//         {items.map((item, i) => (
//           <div key={i} className="tt-pane">
//             <Link href={`/category/${item.leftSlug}`} className="img-wrapper-left">
//               <img src="/preview.jpg" className="img" />
//               <span className="label">{item.leftLabel}</span>
//             </Link>

//             <Link href={`/category/${item.rightSlug}`} className="img-wrapper-right">
//               <img src="/preview.jpg" className="img" />
//               <span className="label">{item.rightLabel}</span>
//             </Link>
//           </div>
//         ))}
//       </div>

//       <style jsx global>{`
//         :root {
//           --g1: #ffdee9;
//           --g2: #b5fffc;
//         }

//         .tt-root {
//           height: 100vh;
//           overflow: hidden;
//           position: relative;
//         }

//         .tt-bg {
//           position: fixed;
//           inset: 0;
//           background: linear-gradient(135deg, var(--g1), var(--g2));
//           transition: background 0.15s linear;
//           z-index: 0;
//         }

//         .tt-track {
//           display: flex;
//           height: 100vh;
//           width: calc(${items.length} * 100vw);
//           position: relative;
//           z-index: 5;
//         }

//         .tt-pane {
//           width: 100vw;
//           height: 100vh;
//           position: relative;
//           flex-shrink: 0;
//         }

//         .img-wrapper-left,
//         .img-wrapper-right {
//           position: absolute;
//           width: 32vw;
//           text-align: center;
//           z-index: 10;
//         }

//         .img-wrapper-left { left: 7vw; top: 12vh; }
//         .img-wrapper-right { right: 7vw; top: 38vh; }

//         .img {
//           width: 100%;
//           height: 27vw;
//           border-radius: 14px;
//           object-fit: cover;
//         }

//         .label {
//           color: gray;
//           margin-top: 12px;
//           font-size: 1.3rem;
//           font-weight: 600;
//           text-shadow: 0 4px 20px rgba(0,0,0,0.5);
//         }
//       `}</style>
//     </div>
//   );
// }
