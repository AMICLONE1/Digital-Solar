"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ThreeScene from "./ThreeScene";
import { Sun, Zap, IndianRupee, Leaf, Shield, Clock, TrendingUp, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const [countedStats, setCountedStats] = useState({
    savings: 0,
    co2: 0,
    capacity: 0,
  });

  // Animated number counting
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const counters = {
      savings: { target: 2.5, current: 0, suffix: "Cr+" },
      co2: { target: 500, current: 0, suffix: "+" },
      capacity: { target: 5, current: 0, suffix: "MW" },
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

      setCountedStats({
        savings: counters.savings.target * easeOut,
        co2: counters.co2.target * easeOut,
        capacity: counters.capacity.target * easeOut,
      });

      if (step >= steps) {
        clearInterval(timer);
        setCountedStats({
          savings: counters.savings.target,
          co2: counters.co2.target,
          capacity: counters.capacity.target,
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      // Animate gradient orbs
      gsap.to(".gradient-orb", {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        rotation: "random(0, 360)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Text reveal animation
      gsap.from(".hero-text", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      });
    },
    { scope: heroRef }
  );

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-offwhite via-forest/5 to-gold/10"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="gradient-orb absolute top-20 left-10 w-72 h-72 bg-forest/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="gradient-orb absolute bottom-20 right-10 w-96 h-96 bg-gold/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="gradient-orb absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-forest/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Three.js Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <ThreeScene />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm border border-forest/20 rounded-full shadow-lg"
          >
            <span className="flex items-center justify-center w-6 h-6 bg-forest rounded-full">
              <Sun className="w-3.5 h-3.5 text-offwhite" />
            </span>
            <span className="text-sm font-semibold text-charcoal">Join 10,000+ Solar Savers</span>
            <span className="px-2 py-0.5 bg-gold/20 text-gold-dark text-xs font-bold rounded-full">NEW</span>
          </motion.div>

          {/* Main Heading with Split Text Animation */}
          <div className="hero-text">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-charcoal leading-[1.1]"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="block"
              >
                Solar Savings.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="block bg-gradient-to-r from-forest via-forest-light to-forest bg-clip-text text-transparent"
              >
                Without Panels.
              </motion.span>
            </motion.h1>
          </div>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-charcoal/70 max-w-2xl mx-auto leading-relaxed"
          >
            Get savings on your bills even if you live in an apartment, rent your home, or own the space.
            <span className="text-forest font-semibold"> No installation. No hassles.</span> Just pure savings.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.div
                whileHover={{ boxShadow: "0 20px 60px rgba(27, 94, 32, 0.4)" }}
                className="absolute inset-0 bg-gradient-to-r from-forest to-forest-light rounded-2xl blur-xl opacity-50"
              />
              <Link
                href="/reserve"
                className="group relative px-10 py-5 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-2xl text-lg font-semibold shadow-2xl flex items-center gap-3 overflow-hidden"
              >
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  className="relative z-10"
                >
                  Join Projects
                </motion.span>
                <motion.span
                  className="relative z-10 inline-flex items-center justify-center w-9 h-9 bg-white/20 rounded-full group-hover:bg-white/30 calm-transition"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#how-it-works"
                className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-charcoal/10 text-charcoal rounded-2xl text-lg font-semibold hover:bg-white hover:border-forest/30 hover:shadow-lg calm-transition"
              >
                See How It Works
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-12 max-w-4xl mx-auto"
          >
            {[
              { 
                icon: IndianRupee, 
                value: countedStats.savings.toFixed(1), 
                suffix: "Cr+", 
                label: "Savings Generated",
                color: "from-green-500 to-emerald-600"
              },
              { 
                icon: Leaf, 
                value: Math.round(countedStats.co2), 
                suffix: "+", 
                label: "Tons CO₂ Saved",
                color: "from-emerald-500 to-teal-600"
              },
              { 
                icon: Zap, 
                value: countedStats.capacity.toFixed(0), 
                suffix: "MW", 
                label: "Solar Capacity",
                color: "from-amber-500 to-orange-600"
              },
              { 
                icon: Shield, 
                value: "100", 
                suffix: "%", 
                label: "Regulated & Safe",
                color: "from-blue-500 to-indigo-600"
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.7 + i * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-charcoal/5 hover:border-forest/30 hover:shadow-2xl calm-transition relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <stat.icon className="w-8 h-8 text-forest mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-charcoal mb-1">
                    {stat.value}
                    <span className="text-2xl">{stat.suffix}</span>
                  </div>
                  <div className="text-xs md:text-sm text-charcoal/60 font-medium">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-charcoal/70"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-forest rounded-full animate-pulse"></div>
              <span>No Installation Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-forest rounded-full animate-pulse"></div>
              <span>Regulated by Electricity Act</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-forest rounded-full animate-pulse"></div>
              <span>Instant Bill Credits</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-forest" />
              <span>2-Minute Signup</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-charcoal/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-charcoal/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

