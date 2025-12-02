
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Header() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });

  return (
    <section
      ref={ref}
      className="
        w-full 
        
        flex 
        items-end 
        bg-black 
        text-white 
        m-0 
        pb-0
        pt-[30vh] md:pt-[35vh] /* responsive top spacing */
      "
    >
      <div className="
        w-full 
        px-5 
        sm:px-8 
        md:px-12 
        lg:px-20 
        xl:px-28
      ">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                }
              : { opacity: 0, y: 20 }
          }
          className="
            font-light
            leading-[1.1]
            text-[clamp(32px,4.4vw,120px)]

          "
          style={{ fontFamily: "Gotham, sans-serif", 
            fontWeight: "400"}}
        >
          Propeling your <br />
          ambition into a <br />
          powerful brand.
        </motion.h2>

      </div>
    </section>
  );
}
