
"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
gsap.registerPlugin(ScrollTrigger);

/* --------------------------------------------
   React Leaflet Dynamic Imports (No SSR)
---------------------------------------------- */
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import("react-leaflet").then((m) => m.Tooltip),
  { ssr: false }
);

/* --------------------------------------------
   FIX LEAFLET ICONS — Lazy Loaded
---------------------------------------------- */
function useLeafletIconFix() {
  useEffect(() => {
    (async () => {
      const L = await import("leaflet");

      L.Marker.prototype.options.icon = L.icon({
        iconRetinaUrl: "/marker-icon-2x.png",
        iconUrl: "/marker-icon.png",
        shadowUrl: "/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowSize: [41, 41],
      });
    })();
  }, []);
}

/* --------------------------------------------
   Fly To Component
---------------------------------------------- */
function MapFly({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (map) map.flyTo(position, 14, { duration: 1.2 });
  }, [position, map]);
  return null;
}

/* --------------------------------------------
   Location Data
---------------------------------------------- */
const locations = [
  {
    title: "Kolkata",
    text: `South City Business Park 
770, Eastern Metropolitan 
Bypass, Anandapur, 
Adarsha Nagar,
Kolkata : 700107 
Phone : 033 4007 7794`,
    lat: 22.521344803173267,
    lng: 88.40114688107688,
  },

  {
    title: "Mumbai",
    text: `1507, Marathon Millennium,
Lal Bahadur Shastri Marg,
Beside Nirmal Lifestyle Mall,
Mulund West, Mumbai,
Maharashtra 400080`,
    lat: 19.167500397436367,
    lng: 72.93838505921735,
  },

  {
    title: "Gurugram",
    text: `Unit no - 1501 st Floor,
Centrum Plaza,
Golf Course Road,
Sector -53, Gurugram,
Haryana 122002`,
    lat: 28.433941498367545,
    lng: 77.10422986130831,
  },

  {
    title: "Hyderabad",
    text: `1st Floor, Workafella Western Pearl,
Hitech City Rd, Kondapur,
Hyderabad, Telangana 500084`,
    lat: 17.458297209966894,
    lng: 78.37347767482315,
  },

  {
    title: "Bengaluru",
    text: `1st Floor, Anthill IQ,
20, Cunningham Rd,
Vasanth Nagar, Bengaluru,
Karnataka 560001`,
    lat: 12.98506227772602,
    lng: 77.59730170515094,
  },
];

/* --------------------------------------------
   MAIN COMPONENT
---------------------------------------------- */
export default function LetsTalk() {
  useLeafletIconFix();

  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const [activeLocation, setActiveLocation] = useState<[number, number]>([
    locations[0].lat,
    locations[0].lng,
  ]);

  /* --------------------------------------------
      GSAP Animations
  ---------------------------------------------- */
  useEffect(() => {
    const title = titleRef.current;
    const grid = gridRef.current;
    const section = sectionRef.current;

    if (!title || !grid || !section) return;

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      title,
      { autoAlpha: 0, y: 60 },
      { autoAlpha: 1, y: 0, duration: 1 }
    );

    tl.fromTo(
      grid.children,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 1, stagger: 0.15 },
      "-=0.5"
    );

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => tl.play(),
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen text-white px-6 md:px-12 lg:px-20 py-20 bg-black"
      style={{ fontFamily: "Gotham, sans-serif" }}
    >
      {/* TITLE */}
      <h1
        ref={titleRef}
        className="opacity-0 text-[#F4C016] text-[clamp(32px,4.4vw,120px)] mb-4 leading-tight"
      >
        Let's Talk
      </h1>

      {/* 🌟 CARDS ROW */}
      <div
        ref={gridRef}
        className="flex gap-3 overflow-x-auto no-scrollbar"
      >
        {locations.map((loc, i) => (
          <div
            key={i}
            onClick={() => setActiveLocation([loc.lat, loc.lng])}
            className="min-w-[260px] p-5 border border-gray-300/20 rounded-xl cursor-pointer hover:bg-gray-300/20 transition-all"
          >
            <h3 className="text-[#F4C016] mb-2 text-[clamp(16px,2vw,24px)] font-bold">
              {loc.title}
            </h3>

            <p className="text-gray-300 whitespace-pre-line text-[clamp(12px,1.8vw,18px)]">
              {loc.text}
            </p>
          </div>
        ))}
      </div>

      {/* 🌍 MAP */}
      <div className="mt-10 w-full h-[350px] md:h-[450px] lg:h-[550px] rounded-xl overflow-hidden shadow-2xl">
        <MapContainer
          center={activeLocation}
          zoom={12}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapFly position={activeLocation} />

          {locations.map((loc, i) => (
            <Marker
              key={i}
              position={[loc.lat, loc.lng]}
              eventHandlers={{
                click: () => setActiveLocation([loc.lat, loc.lng]),
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -50]}
                permanent
                opacity={1}
                className="!bg-white !border-none text-black font-semibold"
              >
                K&A, {loc.title}
              </Tooltip>

              <Popup>K&A, {loc.title}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
