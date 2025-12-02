"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

type Card = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  url: string;
};

const SAMPLE_CARDS: Card[] = [
  {
    id: "c1",
    title: "How to measure storytelling ROI",
    excerpt: "Metrics that matter",
    date: "JANUARY 10, 2021",
    image: "/images/media/r111.png",
    url: "/blog/storytelling-roi",
  },
  {
    id: "c2",
    title: "Are you owning your company narrative?",
    excerpt: "The art of storytelling through an Annual Report",
    date: "JUNE 05, 2020",
    image: "/images/media/Rectangle109.png",
    url: "/blog/owning-your-narrative",
  },
  {
    id: "c3",
    title: "Is Your Annual Report a Reflection of Stakeholder Sustainability?",
    excerpt: "Annual Report review and takeaways",
    date: "JUNE 25, 2020",
    image: "/images/media/r110.png",
    url: "/blog/stakeholder-sustainability",
  },
  {
    id: "c4",
    title: "Reporting trends to watch",
    excerpt: "What to include in your next report",
    date: "DECEMBER 02, 2020",
    image: "/images/media/r110.png",
    url: "/blog/reporting-trends",
  },
  {
    id: "c5",
    title: "The art of story in Annual Reports",
    excerpt: "Crafting better narratives",
    date: "OCTOBER 08, 2020",
    image: "/images/media/r111.png",
    url: "/blog/storytelling-reports",
  },
  {
    id: "c6",
    title: "Designing for stakeholder impact",
    excerpt: "Design + content alignment",
    date: "NOVEMBER 14, 2020",
    image: "/images/media/Rectangle109.png",
    url: "/blog/design-stakeholder-impact",
  },
];

export default function CarouselSection({ cards = SAMPLE_CARDS }: { cards?: Card[] }) {
  const VISIBLE = 3;
  const GAP = 24;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const autoplayRef = useRef<number | null>(null);

  // Calculate card width
  useEffect(() => {
    function measure() {
      if (!carouselRef.current) return;

      const containerWidth = carouselRef.current.clientWidth;
      const totalGap = GAP * (VISIBLE - 1);
      const width = (containerWidth - totalGap) / VISIBLE;

      setCardWidth(width);
    }

    measure();
    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll movement (non-infinite)
  function animateTo(nextIndex: number) {
    if (!trackRef.current) return;

    const maxIndex = cards.length - VISIBLE;
    const clamped = Math.max(0, Math.min(nextIndex, maxIndex));

    const x = -clamped * (cardWidth + GAP);

    gsap.to(trackRef.current, {
      x,
      duration: 0.6,
      ease: "power3.out",
    });

    setIndex(clamped);
  }

  const next = () => animateTo(index + 1);
  const prev = () => animateTo(index - 1);

  // Autoplay
  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);

    autoplayRef.current = window.setInterval(() => {
      if (!isHovering) next();
    }, 3500);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [index, isHovering, cardWidth]);

  // Entry / Exit animation
  useEffect(() => {
    if (!rootRef.current) return;

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      headingRef.current,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
      .fromTo(
        carouselRef.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        bottomRef.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

    const trigger = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top 75%",
      end: "bottom 25%",
      onEnter: () => tl.play(),
      onEnterBack: () => tl.play(),
      onLeave: () => tl.reverse(),
      onLeaveBack: () => tl.reverse(),
    });
    
    return () => {
      tl.kill();
      trigger.kill();
    };
  }, []);

  // Card Component (Equal Height)
  const CardItem = ({ c }: { c: Card }) => (
  <Link href={c.url} className="block">
    <article
      className="flex flex-col rounded-sm overflow-hidden shadow-lg group bg-[#0b0b0b] h-full"
      style={{
        width: `${cardWidth}px`,   // responsive width
      }}
    >
      {/* IMAGE WITH FIXED ASPECT RATIO (RESPONSIVE) */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          src={c.image}
          alt={c.title}
          className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>

      {/* CONTENT ALWAYS EQUALS OUT HEIGHT */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <h3 className="text-[#F4C016] text-[16px] md:text-[18px] font-medium font-[Gotham]">
          {c.title}
        </h3>

        <div className="flex items-center mt-4">
          <span className="text-[12px] text-gray-300">{c.date}</span>
          <span className="flex-1 h-px ml-3 bg-white/10"></span>
        </div>
      </div>
    </article>
  </Link>
);

const canNext = index < Math.max(0, cards.length - VISIBLE);
  const canPrev = index > 0;

  return (
    <section
      ref={rootRef}
      className="w-full px-10 md:px-20 py-20 bg-black text-white"
    > <div className="flex justify-between items-center mx-auto w-full max-w-[1400px] mb-6 md:mb-10 ">
      {/* HEADING */}
      <h2
        ref={headingRef}
        className="
            text-white 
            leading-[1.1]
            font-medium
            pb-15
            text-[clamp(32px,4.4vw,120px)]

          "
          style={{ fontFamily: "Gotham, sans-serif", 
            fontWeight: "400"}}
      >
        Finding the story in the
        <br />
        subtle space between words.
      </h2>
      <div className="flex gap-2 sm:gap-3">
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous"
            className="p-2 sm:p-3 rounded-full border hover:bg-gray-100 hover:text-black disabled:opacity-30 transition"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Next"
            className="p-2 sm:p-3 rounded-full border hover:bg-gray-100 hover:text-black disabled:opacity-30 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
</div>
      {/* CAROUSEL */}
      <div
        ref={carouselRef}
        className="relative opacity-0"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        

        {/* VIEWPORT */}
        <div className="overflow-hidden px-[60px] py-[10px]">
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform"
            style={{ transform: "translateX(0px)" }}
          >
            {cards.map((c) => (
              <CardItem key={c.id} c={c} />
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM TEXT */}
      <div ref={bottomRef} className="mt-14 opacity-0 px-4 sm:px-8 md:px-0">
  <p
    className="
      font-[Gotham] 
      text-gray-300 
      mb-8
      text-[clamp(14px,2.5vw,48px)]
    "
  >
    SEE WHAT EVERYONE'S TALKING ABOUT
  </p>

  <p
    className="
      font-[Gotham]
      text-[clamp(16px,2.2vw,32px)]
      max-w-[min(90%,900px)]
    "
  >
    We are committed to building your brand and crafting the best services so you can{" "}
    <span className="text-[#F4C016]">reach more people and leave the competition behind</span>.
    Our <span className="text-[#F4C016]">innovation engine</span> never stops, fueled by creativity.
  </p>
</div>

    </section>
  );
}
