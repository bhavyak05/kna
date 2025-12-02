'use client';
import BenchmarkSection from "@/components/AboutUs/BenchmarkSection";
import CapabilityCards from "@/components/AboutUs/CapabilityCards";
import Header from "@/components/AboutUs/Header";
import SlowMarquee from "@/components/AboutUs/SlowMarquee";
import { marqueeImages } from "@/components/marquee-images";
import VerticalSuccessStories from "@/components/AboutUs/VerticalSuccessStories";
const storiesList = [
  {
    id: 1,
    image: "/images/services/Maskgroup02.png",
    title: "Gold Shield Award FY2022",
    subtitle: "ICAI Awards",
    footer: "NATIONAL PAYMENTS CORPORATION OF INDIA",
    link: "https://example.com/story-1",
  },
  {
    id: 2,
    image: "/images/services/Maskgroup02.png",
    title: "Gold Shield Award FY2021",
    subtitle: "ICAI Awards",
    footer: "NATIONAL PAYMENTS CORPORATION OF INDIA",
    link: "https://example.com/story-2",
  },
  {
    id: 3,
    image: "/images/services/Maskgroup02.png",
    title: "Silver Award FY2020",
    subtitle: "ICAI Awards",
    footer: "NATIONAL PAYMENTS CORPORATION OF INDIA",
    link: "https://example.com/story-3",
  },
  // add more...
];
const AboutUs = () => {

    return (
            <div>
                <Header/>
                <CapabilityCards/>
                <BenchmarkSection/>
                <SlowMarquee images={marqueeImages} duration={300} />;
                <VerticalSuccessStories stories={storiesList} />;

            </div>
    );
};

export default AboutUs;