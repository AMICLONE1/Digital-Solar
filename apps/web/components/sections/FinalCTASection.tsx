"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Animate CTA elements
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".cta-element"),
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.7)",
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

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest-light to-charcoal">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="50" cy="50" r="2"/%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-12">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="cta-element inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl border-2 border-white/30 shadow-2xl"
        >
          <Sparkles className="w-12 h-12 text-offwhite" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="cta-element text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-offwhite leading-tight"
        >
          Ready to Start
          <br />
          <span className="bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent">
            Saving Today?
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="cta-element text-xl text-offwhite/80 max-w-2xl mx-auto leading-relaxed"
        >
          Join thousands of smart savers who are reducing their electricity bills and carbon footprint with Digital Solar.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="cta-element flex flex-wrap items-center justify-center gap-8 text-offwhite/90"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gold" />
            <span className="font-semibold">₹2.5Cr+ Saved</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-gold" />
            <span className="font-semibold">10,000+ Users</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="font-semibold">500+ Tons CO₂ Avoided</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="cta-element flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <motion.div
              whileHover={{ boxShadow: "0 20px 60px rgba(255, 193, 7, 0.5)" }}
              className="absolute inset-0 bg-gradient-to-r from-gold to-amber-500 rounded-2xl blur-xl opacity-60"
            />
            <Link
              href="/signup"
              className="group relative px-10 py-5 bg-gradient-to-r from-gold to-amber-500 text-charcoal rounded-2xl text-lg font-bold shadow-2xl flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Get Started for Free</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/contact"
              className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-offwhite rounded-2xl text-lg font-semibold hover:bg-white/20 transition-all flex items-center gap-3"
            >
              Talk to Us
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="cta-element pt-8"
        >
          <p className="text-sm text-offwhite/60">
            ✓ No credit card required • ✓ 2-minute signup • ✓ Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}

