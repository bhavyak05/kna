"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/AboutUs" },
  { label: "SERVICES / CAPABILITIES", href: "/Services" },
  { label: "CULTURE", href: "/culture" },
  { label: "MEDIA", href: "/Media" },
  { label: "CAREERS", href: "/Career" },
  { label: "CONTACT", href: "/ContactUs" },
];

// Basic site search index (add all pages you want searchable)
const siteIndex = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/AboutUs" },
  { title: "Services", url: "/Services" },
  { title: "Culture", url: "/culture" },
  { title: "Media", url: "/Media" },
  { title: "Careers", url: "/Career" },
  { title: "Contact", url: "/ContactUs" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  // blur on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    const filtered = siteIndex.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 1) {
      router.push(filtered[0].url);
    } else {
      setResults(filtered); // optionally show dropdown
    }
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${isScrolled
          ? "backdrop-blur-md bg-black/40 shadow-md border-b border-white/10"
          : "bg-black"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-1.5">

        {/* LOGO */}
        <Link href="/">
          <motion.div
            className="relative w-[60px] h-[60px] cursor-pointer select-none"
            animate={{ rotateY: [0, 180, 360] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src="/images/kna.png"
              alt="Logo"
              width={60}
              height={60}
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden" }}
            />
            <Image
              src="/images/10-years.png"
              alt="10 Years"
              width={60}
              height={60}
              className="absolute inset-0"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            />
          </motion.div>
        </Link>

        {/* MENU */}
        <ul className="hidden md:flex items-center space-x-0">
          {navLinks.map((link, i) => (
            <li key={link.href} className="flex items-center">
              <Link
                href={link.href}
                className="text-white text-[12px] tracking-wide px-4 font-normal hover:text-yellow-400 transition-colors duration-300"
              >
                {link.label}
              </Link>

              {/* vertical separator except last */}
              {i !== navLinks.length - 1 && (
                <div className="h-4 w-[1px] bg-gray-500 mx-2"></div>
              )}
            </li>
          ))}
        </ul>

        {/* SEARCH BAR */}
        
        {/* MOBILE MENU ICON */}
        <div className="md:hidden text-white text-xl cursor-pointer">
          ☰
        </div>
      </div>

      {/* OPTIONAL RESULTS DROPDOWN */}
      {results.length > 1 && (
        <div className="absolute right-10 top-[70px] bg-black/80 text-white px-4 py-2 rounded-lg w-64">
          {results.map((res) => (
            <Link
              key={res.url}
              href={res.url}
              className="block py-1 hover:text-yellow-400"
            >
              {res.title}
            </Link>
          ))}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";

// const navLinks = [
//   { label: "HOME", href: "/" },
//   { label: "ABOUT US", href: "/about" },
//   { label: "SERVICES / CAPABILITIES", href: "/services" },
//   { label: "CULTURE", href: "/culture" },
//   { label: "MEDIA", href: "/media" },
//   { label: "CAREERS", href: "/careers" },
//   { label: "CONTACT", href: "/contact" },
// ];

// // Expandable search index (replace with full automated index later)
// const siteIndex = [
//   { title: "Home", url: "/" },
//   { title: "About Us", url: "/about" },
//   { title: "Services & Capabilities", url: "/services" },
//   { title: "Culture", url: "/culture" },
//   { title: "Media", url: "/media" },
//   { title: "Careers", url: "/careers" },
//   { title: "Contact", url: "/contact" },
// ];

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<any[]>([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   // blur background on scroll
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // click outside to close dropdown
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setResults([]);
//       }
//     };
//     window.addEventListener("mousedown", handler);
//     return () => window.removeEventListener("mousedown", handler);
//   }, []);

//   // handle typing search
//   const handleInput = (value: string) => {
//     setQuery(value);

//     if (!value.trim()) {
//       setResults([]);
//       return;
//     }

//     const filtered = siteIndex.filter((item) =>
//       item.title.toLowerCase().includes(value.toLowerCase())
//     );

//     setResults(filtered);
//     setActiveIndex(0);
//   };

//   // handle keyboard navigation
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (results.length === 0) return;

//     if (e.key === "ArrowDown") {
//       setActiveIndex((prev) => (prev + 1) % results.length);
//     }
//     if (e.key === "ArrowUp") {
//       setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
//     }
//     if (e.key === "Enter") {
//       router.push(results[activeIndex].url);
//       setResults([]);
//     }
//   };

//   // highlight matched text
//   const highlightMatch = (text: string) => {
//     const parts = text.split(new RegExp(`(${query})`, "gi"));
//     return (
//       <>
//         {parts.map((part, i) =>
//           part.toLowerCase() === query.toLowerCase() ? (
//             <span key={i} className="text-yellow-400 font-semibold">
//               {part}
//             </span>
//           ) : (
//             <span key={i}>{part}</span>
//           )
//         )}
//       </>
//     );
//   };

//   return (
//     <motion.nav
//       initial={{ y: -60, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 
//         ${isScrolled
//           ? "backdrop-blur-md bg-black/40 shadow-md border-b border-white/10"
//           : "bg-black"}
//       `}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

//         {/* LOGO */}
//         <Link href="/">
//           <motion.div
//             className="relative w-[60px] h-[60px] cursor-pointer select-none"
//             animate={{ rotateY: [0, 180, 360] }}
//             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             style={{ transformStyle: "preserve-3d" }}
//           >
//             <Image
//               src="/images/kna.png"
//               alt="Logo"
//               width={60}
//               height={60}
//               className="absolute inset-0"
//             />
//             <Image
//               src="/images/10-years.png"
//               alt="10 Years"
//               width={60}
//               height={60}
//               className="absolute inset-0"
//               style={{ transform: "rotateY(180deg)" }}
//             />
//           </motion.div>
//         </Link>

//         {/* LINKS */}
//         <ul className="hidden md:flex items-center space-x-0">
//           {navLinks.map((link, i) => (
//             <li key={link.href} className="flex items-center">
//               <Link
//                 href={link.href}
//                 className="text-white text-[12px] tracking-wide px-4 font-normal hover:text-yellow-400 transition"
//               >
//                 {link.label}
//               </Link>

//               {/* separator */}
//               {i !== navLinks.length - 1 && (
//                 <div className="h-4 w-[1px] bg-gray-500 mx-1"></div>
//               )}
//             </li>
//           ))}
//         </ul>

//         {/* SEARCH BAR */}
//         <div className="relative" ref={dropdownRef}>
//           <div className="hidden md:flex items-center bg-[#111] border border-gray-700 rounded-full px-3 py-1">
//             <input
//               type="text"
//               className="bg-transparent text-white text-sm outline-none px-2 w-48"
//               placeholder="Search..."
//               value={query}
//               onChange={(e) => handleInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//             />

//             <Image
//               src="/icons/search.svg"
//               width={16}
//               height={16}
//               alt="Search"
//               className="opacity-60"
//             />
//           </div>

//           {/* SUGGESTIONS DROPDOWN */}
//           {results.length > 0 && (
//             <div className="absolute right-0 mt-2 w-64 bg-black/90 border border-gray-700 rounded-xl shadow-xl backdrop-blur-md max-h-64 overflow-y-auto">
//               {results.map((item, i) => (
//                 <div
//                   key={item.url}
//                   onClick={() => router.push(item.url)}
//                   className={`px-4 py-2 cursor-pointer text-sm 
//                     ${i === activeIndex ? "bg-white/10" : "hover:bg-white/10"}
//                   `}
//                 >
//                   {highlightMatch(item.title)}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* MOBILE MENU */}
//         <div className="md:hidden text-white text-xl cursor-pointer">☰</div>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";

// const navLinks = [
//   { label: "HOME", href: "/" },
//   { label: "ABOUT US", href: "/about" },
//   { label: "SERVICES / CAPABILITIES", href: "/services" },
//   { label: "CULTURE", href: "/culture" },
//   { label: "MEDIA", href: "/media" },
//   { label: "CAREERS", href: "/careers" },
//   { label: "CONTACT", href: "/contact" },
// ];

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   // detect scroll to toggle frosted glass effect
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <motion.nav
//       initial={{ y: -60, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
//         ${isScrolled
//           ? "backdrop-blur-md bg-black/40 shadow-md border-b border-white/10"
//           : "bg-black"}`
//       }
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between  py-3">
//         {/* Logo on left */}
//         <div className="flex items-center space-x-2">
//           <Link href="/">
//             <motion.div
//               className="relative w-[60px] h-[60px] cursor-pointer select-none"
//               animate={{ rotateY: [0, 180, 360] }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               style={{ transformStyle: "preserve-3d" }}
//             >
//               <Image
//                 src="/images/kna.png"
//                 alt="K&A Logo"
//                 width={60}
//                 height={60}
//                 className="absolute inset-0"
//                 style={{ backfaceVisibility: "hidden" }}
//               />
//               <Image
//                 src="/images/10-years.png"
//                 alt="10 Years"
//                 width={60}
//                 height={60}
//                 className="absolute inset-0"
//                 style={{
//                   backfaceVisibility: "hidden",
//                   transform: "rotateY(180deg)",
//                 }}
//               />
//             </motion.div>
//           </Link>
//         </div>

//         {/* Navigation Links */}
//         <ul className="hidden md:flex items-center space-x-4 lg:space-x-6">
//           {navLinks.map((link) => (
//             <li key={link.href}>
//               <Link
//                 href={link.href}
//                 className="text-white text-[12px] tracking-wide font-normal hover:text-yellow-400 transition-colors duration-300"
//               >
//                 {link.label}
//               </Link>
//             {i !== navLinks.length - 1 && (
//                 <div className="h-4 w-[1px] bg-gray-500 mx-2"></div>
//               )}
//             </li>
//           ))}
//         </ul>

//         {/* Optional mobile menu icon */}
//         <div className="md:hidden text-white text-xl cursor-pointer">
//           ☰
//         </div>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;
