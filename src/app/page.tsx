import Hero from "@/components/Home/Hero";
import Navbar from "@/components/Navbar";
import Discover from "@/components/Home/Discover";
import Ideas from "@/components/Home/Ideas";
import Services from "@/components/Home/Services";
import StatsTop from "@/components/Home/StatsTop";
import StatLow from "@/components/Home/StatLow";
import Footers from "@/components/Footers";

import ThemeTransition from "@/components/Home/ThemeTransition";

export default function Home() {
  return (
    <>
      <Navbar /> 
      <Hero />
      <Discover />
      <Ideas/>
      <Services/>
      <StatsTop/>
      <StatLow/>
      
      
      <Footers />
    </>
  );
}
