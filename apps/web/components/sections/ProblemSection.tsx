"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !textRef.current || !animationRef.current) {
        return;
      }

      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        animationRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  // Placeholder for Lottie animation - replace with actual animation JSON
  const lottieAnimation = {
    // This would be replaced with actual Lottie JSON
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 400,
    h: 400,
    nm: "City to Rooftops",
    ddd: 0,
    assets: [],
    layers: [],
  };

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-offwhite"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Block */}
        <div ref={textRef} className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-charcoal">
            The Problem
          </h2>
          <div className="space-y-4 text-lg text-charcoal/80 leading-relaxed">
            <p>
              India&apos;s solar problem isn&apos;t generation. It&apos;s access. Millions of
              households want clean energy savings, but rooftop solar is often impractical or
              impossible.
            </p>
            <p>
              Limited space, building restrictions, high upfront costs, and maintenance concerns
              block millions from accessing solar benefits.
            </p>
            <p className="font-semibold text-forest">
              Meanwhile, large solar plants generate efficiently but remain inaccessible to
              individual consumers.
            </p>
          </div>
        </div>

        {/* Visual Problem Representation */}
        <div ref={animationRef} className="flex items-center justify-center">
          <div className="w-full max-w-md space-y-4">
            {/* City Buildings */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-t from-charcoal/20 to-charcoal/10 rounded-t-lg"
                  style={{ height: `${60 + i * 20}px` }}
                />
              ))}
            </div>
            
            {/* Blocked Rooftops */}
            <div className="relative bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚫</span>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal">Blocked Access</h3>
                  <p className="text-sm text-charcoal/60">Rooftop solar unavailable</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-charcoal/70">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                  <span>Limited space</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                  <span>Building restrictions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                  <span>High upfront costs</span>
                </div>
              </div>
            </div>
            
            {/* Arrow pointing to solution */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl text-forest"
              >
                ↓
              </motion.div>
              <p className="text-sm text-charcoal/60 mt-2">Digital Solar Solution</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

