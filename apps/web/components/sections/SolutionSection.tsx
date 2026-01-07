"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Sun, Zap, Receipt, ArrowRight, CheckCircle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !blocksRef.current) return;

      const blocks = blocksRef.current.children;
      gsap.fromTo(
        blocks,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  // Simulate capacity blocks
  const totalBlocks = 24;
  const filledBlocks = 15; // Example: 62.5% filled

  const steps = [
    {
      icon: Sun,
      step: "01",
      title: "Reserve Your Share",
      description: "Choose from verified solar projects and reserve capacity in kW. Pay once, save for years.",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: Zap,
      step: "02",
      title: "Earn Monthly Credits",
      description: "Every month, receive credits based on actual solar generation from your reserved capacity.",
      color: "from-forest to-forest-light",
    },
    {
      icon: Receipt,
      step: "03",
      title: "Save on Bills",
      description: "Credits are automatically applied to your electricity bill via BBPS. Watch your bills shrink!",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-offwhite via-white to-offwhite relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-1.5 bg-forest/10 text-forest text-sm font-semibold rounded-full"
          >
            How It Works
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-charcoal">
            Digital Solar, <span className="text-forest">Simplified</span>
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            Three simple steps to start saving on your electricity bills without any installation or maintenance.
          </p>
        </motion.div>

        {/* Interactive Capacity Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-charcoal to-charcoal-light rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-forest/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-offwhite">
                Own a Piece of the Sun
              </h3>
              <p className="text-offwhite/70 text-lg">
                Each block represents solar capacity you can reserve. Green blocks are already reserved by happy customers. 
                Secure your share before it&apos;s fully allocated!
              </p>
              <div className="flex items-center gap-6 text-offwhite/80">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-forest rounded"></div>
                  <span className="text-sm">Reserved ({filledBlocks})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-offwhite/20 rounded"></div>
                  <span className="text-sm">Available ({totalBlocks - filledBlocks})</span>
                </div>
              </div>
            </div>
            
            <div
              ref={blocksRef}
              className="grid grid-cols-6 gap-2 md:gap-3"
            >
              {Array.from({ length: totalBlocks }).map((_, i) => {
                const isFilled = i < filledBlocks;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className={`aspect-square rounded-lg cursor-pointer calm-transition ${
                      isFilled
                        ? "bg-gradient-to-br from-forest to-forest-light shadow-lg shadow-forest/30"
                        : "bg-offwhite/20 hover:bg-offwhite/30 border border-offwhite/10"
                    }`}
                    title={isFilled ? "Reserved" : "Available - Click to reserve!"}
                  >
                    {isFilled && (
                      <div className="w-full h-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-offwhite/60" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group"
            >
              {/* Connector Line (hidden on mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-px">
                  <div className="w-full h-full bg-gradient-to-r from-charcoal/20 to-charcoal/5" />
                  <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
                </div>
              )}
              
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 md:p-8 border border-charcoal/5 hover:border-forest/20 hover:shadow-2xl calm-transition h-full relative overflow-hidden group"
              >
                {/* Decorative gradient on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                
                {/* Step Number & Icon */}
                <div className="relative z-10 flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl`}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <span className="text-5xl font-heading font-bold text-charcoal/10 group-hover:text-charcoal/20 transition-colors">{item.step}</span>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-heading font-bold text-charcoal mb-3 group-hover:text-forest transition-colors">{item.title}</h3>
                  <p className="text-charcoal/70 leading-relaxed">{item.description}</p>
                </div>

                {/* Progress indicator */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.5, duration: 0.8 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-forest to-forest-light"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-2xl text-lg font-semibold hover:shadow-2xl hover:shadow-forest/30 calm-transition"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

