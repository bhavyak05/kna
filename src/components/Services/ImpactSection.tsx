
"use client";

import React from "react";

const skills = [
  "Motion Design.",
  "UX Design.",
  "Visual Design.",
  "Branding.",
  "Visual Front-End Development.",
  "Back-End Development.",
];

export default function ImpactSection() {
  return (
    <div className="w-full flex flex-col items-center text-white">

      {/* GREY BOX */}
      <div
        className="
          w-[92%] 
          md:w-[85%] 
          lg:w-[75%] 
          rounded-xl 
          px-6 
          sm:px-10 
          py-10 
          sm:py-14 
          md:py-16 
        "
        style={{ backgroundColor: "#474747" }}
      >
        <p
          className="
            leading-[1.3] 
            text-white 
            mb-10 
            text-[clamp(22px,4vw,48px)]
          "
          style={{
            fontFamily: "Gotham, sans-serif",
            fontWeight: 400,
          }}
        >
          We bring ideas to life with clarity, creativity, and smart thinking.
          By blending strategy, design, and technology, we create work that
          connects with people, strengthens brands, and leaves a lasting impact.
          <br />
          <br className="hidden sm:block" />
          <br className="hidden sm:block" />
        </p>

        {/* MARQUEE */}
        <div className="overflow-hidden whitespace-nowrap w-full mt-6 marquee">
          <div className="inline-block marquee-content font-bold">
            {skills.concat(skills).map((item, i) => (
              <span
                key={i}
                className="mx-4 sm:mx-6 inline-block text-[clamp(14px,2vw,22px)]"
                style={{ fontFamily: "Gotham, sans-serif" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* MAGIC SECTION */}
      <div className="text-center mt-20 sm:mt-28 md:mt-32 mb-12 sm:mb-16">

        <p
          className="text-[clamp(20px,4vw,42px)]"
          style={{ fontFamily: "Gotham, sans-serif" }}
        >
          Ultimately, it’s not a
        </p>

        <h1
          className="
            text-[clamp(80px,18vw,220px)]
            leading-[0.85]
            font-bold 
            mt-4
          "
          style={{ fontFamily: "Gotham, sans-serif" }}
        >
          magic.
        </h1>

        <p
          className="mt-6 text-[clamp(18px,3.5vw,40px)]"
          style={{ fontFamily: "Gotham, sans-serif" }}
        >
          It’s all skill, experience, <br />
          and dedication.
        </p>

      </div>
    </div>
  );
}
