
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    title: "Business Development",
    desc: "If you have the talent for spotting opportunities and can turn conversations into partnerships, let us talk.",
    bg: "radial-gradient(77.15% 716.57% at 12.04% 47.66%, #282828 0%, rgba(27,27,27,0.89) 27.72%, rgba(13,13,13,0.78) 55.43%, rgba(30,30,30,0.5) 97.95%)",
  },
  {
    title: "Project Management",
    desc: "If you excel at planning, coordinating and driving projects to seamless execution, we would like to meet you.",
    bg: "radial-gradient(56.15% 521.53% at 33.04% 47.66%, #282828 0%, rgba(27,27,27,0.89) 27.72%, rgba(13,13,13,0.78) 55.43%, rgba(30,30,30,0.5) 97.95%)",
  },
  {
    title: "Research Analyst",
    desc: "If solving complex problems excites you and data makes you curious, you will feel right at home here.",
    bg: "radial-gradient(59.73% 554.75% at 68.15% 47.66%, #282828 0%, rgba(27,27,27,0.89) 27.72%, rgba(13,13,13,0.78) 55.43%, rgba(30,30,30,0.5) 97.95%)",
  },
  {
    title: "Editorial",
    desc: "If you can ignite ideas, craft language that captivates and create impact with every word, let us talk.",
    bg: "radial-gradient(77.15% 716.57% at 12.04% 47.66%, rgba(30,30,30,0.5) 2.05%, rgba(13,13,13,0.78) 44.57%, rgba(27,27,27,0.89) 72.28%, #282828 100%)",
  },
  {
    title: "Design",
    desc: "If design is your language, let us start a conversation.",
    bg: "radial-gradient(77.15% 716.57% at 12.04% 47.66%, #282828 0%, rgba(27,27,27,0.89) 27.72%, rgba(13,13,13,0.78) 55.43%, rgba(30,30,30,0.5) 97.95%)",
  },
];

export default function Departments() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".career-card");

      gsap.set(cards, {
        autoAlpha: 0,
        x: -120,
      });

      cards.forEach((card) => {
        const text = card.querySelector<HTMLElement>(".card-text");
        if (text) {
          gsap.set(text, { autoAlpha: 0, y: 18 });
        }
      });

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        end: "bottom 10%",
        batchMax: 3,

        onEnter: (batch) => {
          gsap.set(batch, { x: -120 });
          gsap.to(batch, {
            autoAlpha: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: { each: 0.18 },
          });

          batch.forEach((card) => {
            const text = card.querySelector<HTMLElement>(".card-text");
            if (text) {
              gsap.to(text, {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                delay: 0.12,
                ease: "power2.out",
              });
            }
          });
        },

        onEnterBack: (batch) => {
          gsap.set(batch, { x: -120 });
          gsap.to(batch, {
            autoAlpha: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: { each: 0.18 },
          });

          batch.forEach((card) => {
            const text = card.querySelector<HTMLElement>(".card-text");
            if (text) {
              gsap.to(text, {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                delay: 0.12,
                ease: "power2.out",
              });
            }
          });
        },

        onLeave: (batch) => {
          gsap.to(batch, {
            autoAlpha: 0,
            x: 120,
            duration: 0.65,
            ease: "power2.in",
            stagger: { each: 0.12 },
          });

          batch.forEach((card) => {
            const text = card.querySelector<HTMLElement>(".card-text");
            if (text) gsap.set(text, { autoAlpha: 0, y: 18 });
          });
        },

        onLeaveBack: (batch) => {
          gsap.to(batch, {
            autoAlpha: 0,
            x: 120,
            duration: 0.65,
            ease: "power2.in",
            stagger: { each: 0.12 },
          });

          batch.forEach((card) => {
            const text = card.querySelector<HTMLElement>(".card-text");
            if (text) gsap.set(text, { autoAlpha: 0, y: 18 });
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="
        w-full 
        py-16 md:py-24 lg:py-32
        space-y-8 
        px-6 md:px-12 lg:px-24
      "
    >
      {data.map((item, i) => (
        <div
          key={i}
          className="
            career-card
            w-full
            rounded-xl
            p-6 md:p-8 lg:p-10
            shadow-[8px_8px_20px_rgba(0,0,0,0.25)]
            overflow-hidden
          "
          style={{
            background: item.bg,
          }}
        >
          <h2
            className="
              text-[#F4C016]
              font-medium
              mb-3 md:mb-4
              text-[clamp(20px,4vw,32px)]
            "
            style={{ fontFamily: "Gotham, sans-serif" }}
          >
            {item.title}
          </h2>

          <p
            className="
              card-text
              text-white
              leading-relaxed
              text-[clamp(15px,2.4vw,20px)]
              max-w-[70ch]
            "
            style={{
              fontFamily: "Gotham, sans-serif",
            }}
          >
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
