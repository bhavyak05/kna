
"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, useInView } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Story = {
  id: number;
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  footer: string;
  link: string;
};

type Props = {
  stories: Story[];
};

export default function SuccessStoriesSlider({ stories }: Props) {
  const VISIBLE = 2;
  const [index, setIndex] = useState(0);

  // Section animation
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { margin: "-10% 0px -10% 0px" });

  // carousel refs
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [stepPx, setStepPx] = useState(0);

  // drag limits for swipe
  const [dragLimits, setDragLimits] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (stories.length <= VISIBLE) setIndex(0);
    else if (index > stories.length - VISIBLE)
      setIndex(Math.max(0, stories.length - VISIBLE));
  }, [stories.length, index]);

  const measure = () => {
    const track = trackRef.current;
    const card = cardRef.current;
    const container = containerRef.current;

    if (!track || !card || !container) return;

    const cardWidth = card.offsetWidth;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.gap || "0") || 0;
    const totalWidth = stories.length * cardWidth + (stories.length - 1) * gap;
    const visibleWidth = container.offsetWidth;

    const maxDrag = visibleWidth - totalWidth; // negative value

    // update stepPx
    setStepPx(cardWidth + gap);

    // drag constraints
    setDragLimits({
      left: maxDrag,
      right: 0,
    });
  };

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());

    if (trackRef.current) ro.observe(trackRef.current);
    if (cardRef.current) ro.observe(cardRef.current);
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [stories.length]);

  const canNext = index < Math.max(0, stories.length - VISIBLE);
  const canPrev = index > 0;

  const next = () => canNext && setIndex((i) => i + 1);
  const prev = () => canPrev && setIndex((i) => i - 1);

  const translateX = stepPx ? -(index * stepPx) : 0;

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, x: -160 }}
      animate={{
        opacity: inView ? 1 : 0,
        x: inView ? 0 : 160,
      }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="bg-white w-full px-4 sm:px-6 md:px-10 lg:px-20 py-8 sm:py-10 md:py-12 mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mx-auto w-full max-w-[1400px] mb-6 md:mb-10 text-black">
        <h2 className="font-semibold text-[clamp(26px,4vw,40px)]">
          Success stories
        </h2>

        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous"
            className="p-2 sm:p-3 rounded-full border hover:bg-gray-100 disabled:opacity-30 transition"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Next"
            className="p-2 sm:p-3 rounded-full border hover:bg-gray-100 disabled:opacity-30 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={containerRef}
        className="overflow-hidden mx-auto w-full max-w-[1400px] relative"
      >
        <motion.div
          ref={trackRef}
          animate={{ x: translateX }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="flex gap-[clamp(16px,3vw,32px)]"
          style={{ willChange: "transform" }}
          drag="x"
          dragElastic={0.15}
          dragConstraints={{
            left: dragLimits.left,
            right: dragLimits.right,
          }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -50 && canNext) next();
            if (info.offset.x > 50 && canPrev) prev();
          }}
        >
          {stories.map((story, idx) => (
            <a
              ref={idx === 0 ? cardRef : null}
              key={story.id}
              href={story.link}
              target="_blank"
              rel="noreferrer"
              className="flex-shrink-0"
              style={{
                width: "calc((100% - 2rem) / 2)",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              >
                <div className="w-full aspect-square relative rounded-t-3xl overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="aspect-square rounded-3xl object-cover"
                  />
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <p className="font-semibold text-[clamp(14px,1.8vw,18px)] leading-tight text-black">
                      {story.title}
                    </p>
                    <p className="text-gray-700 text-[clamp(12px,1.6vw,14px)] text-black">
                      {story.subtitle}
                    </p>
                  </div>

                  <p className="text-[clamp(10px,1.4vw,12px)] mt-2 tracking-wide text-gray-600 text-black">
                    {story.footer}
                  </p>
                </div>
              </motion.div>
            </a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
