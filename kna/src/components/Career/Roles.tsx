
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const JOBS = [
  { title: "Research Analyst", location: "Kolkata", department: "Research Analyst" },
  { title: "Editor", location: "Mumbai", department: "Editor" },
  { title: "Post Print Production", location: "Delhi", department: "Post Print Production" },
  { title: "Designer", location: "Kolkata", department: "Designer" },
];

const LOCATIONS = ["Kolkata", "Mumbai", "Delhi", "Kolkata"];
const DEPARTMENTS = ["Research Analyst", "Editor", "Post Print Production", "Designer"];

export default function OpenRoles() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Location");
  const [department, setDepartment] = useState("Department");

  const [showLocation, setShowLocation] = useState(false);
  const [showDept, setShowDept] = useState(false);

  const locationRef = useRef<HTMLDivElement | null>(null);
  const deptRef = useRef<HTMLDivElement | null>(null);

  const { ref: sectionRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setShowLocation(false);
      }
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) {
        setShowDept(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredJobs = JOBS.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = location === "Location" || job.location === location;
    const matchesDept = department === "Department" || job.department === department;
    return matchesSearch && matchesLocation && matchesDept;
  });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full px-6 md:px-10 lg:px-20 py-16 text-white font-[Gotham]"
    >
      {/* HEADER */}
      <h1
        className="mb-10 text-[clamp(28px,5vw,48px)] font-light"
        style={{ fontFamily: "Gotham" }}
      >
        OPEN ROLES
      </h1>

      {/* SEARCH BAR */}
      <div className="w-full mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            h-[clamp(48px,6vw,56px)] 
            w-full 
            rounded-[15px] 
            px-5 
            text-[clamp(14px,2.5vw,18px)] 
            outline-none
          "
          style={{
            background:
              "radial-gradient(77.15% 716.57% at 12.04% 47.66%, #282828 0%, rgba(27,27,27,0.89) 27.72%, rgba(13,13,13,0.78) 55.43%, rgba(30,30,30,0.5) 97.95%)",
          }}
        />
      </div>

      {/* FILTERS — RESPONSIVE ROW */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">

        {/* LOCATION DROPDOWN */}
        <div className="relative w-full md:w-1/2" ref={locationRef}>
          <button
            onClick={() => {
              setShowLocation(!showLocation);
              setShowDept(false);
            }}
            className="
              w-full 
              h-[clamp(48px,6vw,56px)] 
              flex justify-between items-center 
              rounded-[15px] 
              px-5 
              text-[clamp(14px,2.5vw,18px)]
            "
            style={{
              background:
                "radial-gradient(139% 1297% at 12% 48%, #282828 0%, rgba(13,13,13,0.78) 55%, rgba(30,30,30,0.5) 98%)",
            }}
          >
            {location}

            <motion.div
              animate={{ rotate: showLocation ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="opacity-70" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showLocation && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="
                  absolute 
                  w-full 
                  mt-2 
                  rounded-[15px] 
                  z-20 
                  overflow-hidden 
                  max-h-[260px] 
                  overflow-y-auto
                "
                style={{
                  background:
                    "radial-gradient(139% 1297% at 12% 48%, #282828 0%, rgba(13,13,13,0.78) 55%, rgba(30,30,30,0.5) 98%)",
                }}
              >
                <div
                  onClick={() => {
                    setLocation("Location");
                    setShowLocation(false);
                  }}
                  className="px-6 py-3 text-red-400 font-medium hover:bg-[#3a3a3a]/40 cursor-pointer"
                >
                  Clear Filter
                </div>

                {LOCATIONS.map((loc) => (
                  <div
                    key={loc}
                    onClick={() => {
                      setLocation(loc);
                      setShowLocation(false);
                    }}
                    className="px-6 py-3 hover:bg-[#3a3a3a]/40 cursor-pointer"
                  >
                    {loc}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DEPARTMENT DROPDOWN */}
        <div className="relative w-full md:w-1/2" ref={deptRef}>
          <button
            onClick={() => {
              setShowDept(!showDept);
              setShowLocation(false);
            }}
            className="
              w-full 
              h-[clamp(48px,6vw,56px)] 
              flex justify-between items-center 
              rounded-[15px] 
              px-5 
              text-[clamp(14px,2.5vw,18px)]
            "
            style={{
              background:
                "radial-gradient(139% 1297% at 12% 48%, #282828 0%, rgba(13,13,13,0.78) 55%, rgba(30,30,30,0.5) 98%)",
            }}
          >
            {department}

            <motion.div
              animate={{ rotate: showDept ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="opacity-70" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showDept && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="
                  absolute 
                  w-full 
                  mt-2 
                  rounded-[15px] 
                  z-20 
                  overflow-hidden 
                  max-h-[260px] 
                  overflow-y-auto
                "
                style={{
                  background:
                    "radial-gradient(139% 1297% at 12% 48%, #282828 0%, rgba(13,13,13,0.78) 55%, rgba(30,30,30,0.5) 98%)",
                }}
              >
                <div
                  onClick={() => {
                    setDepartment("Department");
                    setShowDept(false);
                  }}
                  className="px-6 py-3 text-red-400 font-medium hover:bg-[#3a3a3a]/40 cursor-pointer"
                >
                  Clear Filter
                </div>

                {DEPARTMENTS.map((dept) => (
                  <div
                    key={dept}
                    onClick={() => {
                      setDepartment(dept);
                      setShowDept(false);
                    }}
                    className="px-6 py-3 hover:bg-[#3a3a3a]/40 cursor-pointer"
                  >
                    {dept}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* JOB RESULTS — OPTIONAL: IF YOU WANT RESPONSIVE GRID, ASK ME */}
    </motion.div>
  );
}
