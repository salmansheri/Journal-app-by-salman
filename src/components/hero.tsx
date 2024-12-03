"use client";
import { Button } from "./ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.fromTo(
        ".hero__heading",
        {
          scale: 0.5,
        },
        {
          scale: 1,
          duration: 1.4,
          opacity: 1,
        },
      );

      tl.fromTo(
        ".hero__content",
        {
          y: 20,
        },
        {
          y: 0,
          duration: 1.2,
          opacity: 1,
        },
      );

      tl.fromTo(
        ".hero__button",
        {
          rotate: 0,
        },
        {
          rotate: 360,
          duration: 1.5,
          opacity: 1,
        },
      );
    },
    {
      scope: containerRef,
    },
  );

  return (
    <section className="h-screen" ref={containerRef}>
      <div>
        <div className="py-16 space-y-7">
          <h1 className="hero__heading opacity-0 font-extrabold  z-10 text-6xl py-10 text-balance  text-center bg-gradient-to-r from-violet-500 via-violet-700 to-violet-950 bg-clip-text text-transparent">
            Your Journey Your Story Start Journaling Today
          </h1>
          <p className="hero__content text-violet-200 opacity-0 text-lg text-balance font-medium text-center ">
            Breathe Life into Your Memories, Journaling Made Simple: Start
            Writing your Story Today
          </p>
          <div className="flex  items-center justify-center w-full">
            <Button
              onClick={() => router.push("/dashboard")}
              className="hero__button opacity-0 rounded-full"
              size="lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
