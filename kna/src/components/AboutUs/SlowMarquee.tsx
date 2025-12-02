
"use client";

import Image, { StaticImageData } from "next/image";
import styles from "./SlowMarquee.module.css";

type Props = {
  images: (string | StaticImageData)[];
  height?: number;
  gap?: number;
  duration?: number;
};

export default function SlowMarquee({
  images,
  height = 64,
  gap = 32,
  duration = 30,
}: Props) {
  const items = [...images, ...images];

  return (
    <div
      className={styles.viewport}
      style={
        {
          "--base-height": `${height}px`,
          "--base-gap": `${gap}px`,
          "--base-duration": `${duration}s`,
          "--height": `${height}px`,
          "--gap": `${gap}px`,
          "--duration": `${duration}s`,
        } as any
      }
    >
      <div className={styles.track}>
        {items.map((img, i) => (
          <div
            key={i}
            className={styles.item}
            style={{ marginRight: "var(--gap)" }}
          >
            <div className={styles.imgWrapper}>
              <Image src={img} alt="" fill className="object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
