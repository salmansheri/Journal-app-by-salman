"use client";

import { featuresArray } from "@/lib/constant";
import FeatureCard from "./feature-card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
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
    <section ref={elementRef} className=" px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1
          ref={headingRef}
          className="text-4xl lg:text-7xl opacity-0  font-bold bg-gradient-to-r from-violet-500 via-violet-700 to-violet-900 bg-clip-text text-transparent text-balance py-5 text-center"
        >
          Features
        </h1>
        <div className="grid lg:grid-cols-3 gap-6">
          {featuresArray.map((item) => (
            <FeatureCard
              title={item.title}
              description={item.description}
              src={item.icon}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
