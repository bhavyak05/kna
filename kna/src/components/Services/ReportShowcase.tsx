
"use client";

import React from "react";
import Link from "next/link";

interface ImageCard {
  title: string;
  image: string;
  subtitle?: string;
}

interface StackItem {
  label: string;
  key: string;
}

interface ReportShowcaseProps {
  title: string;
  paragraph: string;
  rightTextTitle: string;
  rightTextItems: string[];

  cards: ImageCard[];
  stack: StackItem[];
}

export default function ReportShowcase({
  title,
  paragraph,
  rightTextTitle,
  rightTextItems,
  cards,
  stack,
}: ReportShowcaseProps) {
  return (
    <div
      className="w-full min-h-screen px-6 sm:px-10 md:px-20 py-20"
      style={{ backgroundColor: "#DFDFDF", fontFamily: "Gotham, sans-serif" }}
    >
      {/* -------------------- TOP SECTION -------------------- */}
      <div
        className="
          flex flex-col md:flex-row 
          justify-between items-start 
          gap-10 
          pt-[clamp(60px,10vw,150px)]     /* responsive top spacing */
        "
      >
        {/* LEFT CONTENT */}
        <div className="max-w-3xl">
          <h1
            className="leading-tight mb-6 text-black"
            style={{
              fontSize: "clamp(32px,6vw,64px)",
              fontWeight: 600,
            }}
          >
            {title}
          </h1>

          <p
            className="leading-relaxed text-black"
            style={{
              fontSize: "clamp(16px,2vw,22px)",
              fontWeight: 400,
            }}
          >
            {paragraph}
          </p>
        </div>

        {/* RIGHT SIDE TEXT */}
        <div className="flex flex-col gap-2 mt-6 md:mt-0">
          <p
            style={{
              fontSize: "clamp(12px,1.4vw,14px)",
              color: "#000",
              opacity: 0.8,
            }}
          >
            {rightTextTitle}
          </p>

          {rightTextItems.map((item, i) => (
            <p
              key={i}
              className="flex items-center gap-2"
              style={{
                fontSize: "clamp(12px,1.4vw,14px)",
                color: "#000",
                opacity: 0.8,
              }}
            >
              <span className="w-2 h-2 bg-yellow-600 rounded-full inline-block" />
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* -------------------- IMAGE GRID -------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {cards.map((card, idx) => (
          <article
            key={idx}
            className="group rounded-2xl overflow-hidden bg-black shadow-sm"
            style={{ fontFamily: "Gotham, sans-serif" }}
          
          >
            {/* Image */}
            <div className="w-full h-[220px] sm:h-[240px] md:h-[260px] lg:h-[300px] overflow-hidden object-top items-start">
              <img
                src={card.image}
                alt={card.title}
                className="items-start w-full h-auto object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>

            {/* Text */}
            <div className="px-6 pt-2 pb-5">
              <h3
                className="leading-tight uppercase"
                style={{
                  fontSize: "clamp(16px,2vw,23px)",
                  color: "#ffffffbe",
                  letterSpacing: "-0.02em",
                }}
              >
                {card.title}
              </h3>

              {card.subtitle && (
                <p
                  className="mt-4"
                  style={{
                    fontSize: "clamp(12px,1.2vw,14px)",
                    color: "#ffffffbe",
                    opacity: 0.75,
                    letterSpacing: "0.08em",
                  }}
                >
                  {card.subtitle}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* -------------------- STACK SECTION -------------------- */}
      <div className="mt-16">
        {stack.map((item, i) => (
          <Link
            key={i}
            href={{
              pathname: "/report-showcase",
              query: { key: item.key },
            }}
            className="flex justify-between items-center py-6 px-4 border-b hover:bg-black/5 cursor-pointer"
          >
            <h2
              style={{
                fontSize: "clamp(20px,3vw,32px)",
                fontWeight: 600,
                color: "#000",
              }}
            >
              {item.label}
            </h2>

            <span className="text-2xl text-black">➜</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
