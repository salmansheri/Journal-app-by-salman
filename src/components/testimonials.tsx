"use client";

import { useRef } from "react";
import { Swiper } from "./swiper";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      const heading = headingRef.current;

      gsap.fromTo(
        heading,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          scrollTrigger: {
            trigger: heading,
            start: "top 100%",
          },
          ease: "power2.inOut",
        },
      );
    },
    {
      scope: elementRef,
    },
  );

  return (
    <section className="px-4 lg:px-8  " ref={elementRef}>
      <div className="max-w-6xl mx-auto" ref={headingRef}>
        <h1 className="text-4xl lg:text-7xl font-bold bg-gradient-to-r from-violet-500 via-violet-700 to-violet-900 bg-clip-text text-transparent text-balance py-5 text-center">
          Testimonials
        </h1>

        <Swiper />
      </div>
    </section>
  );
}
