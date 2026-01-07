"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Zap, 
  Calendar, 
  DollarSign, 
  ArrowRight,
  Sun,
  Battery,
  Target,
  Percent,
  Clock
} from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Animated number component
function AnimatedNumber({ 
  value, 
  prefix = "₹", 
  suffix = "", 
  duration = 2 
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef(value);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Run animation when value changes
    if (prevValueRef.current === value) {
      return;
    }

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    const startValue = displayValue;
    const endValue = value;
    prevValueRef.current = value;
    const startTime = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOutCubic;
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
      {suffix}
    </span>
  );
}

export default function SavingsCalculator() {
  const [avgBill, setAvgBill] = useState<number>(3000);
  const [savingsPercent, setSavingsPercent] = useState<number>(60);
  const sectionRef = useRef<HTMLElement>(null);

  // PowerNetPro project details
  const projectName = "Solar Horizon Pro";
  const projectLocation = "Rajasthan, India";
  const projectEndDate = "2040";
  const ratePerKwh = 6.5; // ₹ per kWh discount
  const reservationFeePerKw = 45000; // ₹ per kW
  const avgGenerationPerKw = 125; // kWh per kW per month

  // Calculations
  const monthlySavings = (avgBill * savingsPercent) / 100;
  const reservedSolarKw = monthlySavings / (ratePerKwh * avgGenerationPerKw / 1000);
  const energyProducedMonthly = reservedSolarKw * avgGenerationPerKw;
  const annualSavings = monthlySavings * 12;
  const projectLifetime = 20; // years
  const lifetimeSavings = annualSavings * projectLifetime;
  const oneTimeFee = reservedSolarKw * reservationFeePerKw;
  const paybackPeriod = oneTimeFee / annualSavings; // years
  const roi = ((lifetimeSavings - oneTimeFee) / oneTimeFee) * 100; // percentage

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      const container = sectionRef.current.querySelector(".calculator-container");
      const cards = sectionRef.current.querySelectorAll(".stat-card");

      if (container) {
        gsap.fromTo(
          container,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, rotationY: -15 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="savings-calculator"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-charcoal via-charcoal-light to-charcoal relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(27,94,32,0.15),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,193,7,0.1),transparent_50%)]" />
        <div
          className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20`}
        />
      </div>

      <div className="max-w-7xl mx-auto calculator-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold to-amber-500 rounded-3xl mb-6 shadow-2xl"
          >
            <Target className="w-10 h-10 text-charcoal" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-offwhite">
            Calculate Your <span className="text-gold">Solar Savings</span>
          </h2>
          <p className="text-xl text-offwhite/70 max-w-2xl mx-auto">
            Discover your potential savings with PowerNetPro Digital Solar. Customize your plan and see instant results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Input Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Project Info */}
            <div className="bg-gradient-to-br from-forest/20 to-forest/10 backdrop-blur-sm rounded-2xl p-6 border border-forest/30 text-offwhite">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-amber-500 rounded-xl flex items-center justify-center">
                  <Sun className="w-6 h-6 text-charcoal" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold">{projectName}</h3>
                  <p className="text-offwhite/60 text-sm">{projectLocation}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-offwhite/70">Operational Until</span>
                  <span className="font-semibold">{projectEndDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-offwhite/70">Rate per kWh</span>
                  <span className="font-semibold text-gold">₹{ratePerKwh}</span>
                </div>
              </div>
            </div>

            {/* Bill Input */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <label className="block text-sm font-semibold text-offwhite/90 mb-4">
                Monthly Electricity Bill
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gold">
                  ₹
                </span>
                <input
                  type="number"
                  value={avgBill}
                  onChange={(e) => setAvgBill(Math.max(500, Math.min(50000, Number(e.target.value))))}
                  min="500"
                  max="50000"
                  step="100"
                  className="w-full pl-10 pr-4 py-3 text-xl font-bold text-offwhite bg-white/5 border-2 border-white/10 rounded-xl focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all"
                />
              </div>
              <div className="flex justify-between text-xs text-offwhite/50 mt-2">
                <span>₹500</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Savings Slider */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-semibold text-offwhite/90">
                  Target Savings
                </label>
                <motion.span
                  key={savingsPercent}
                  initial={{ scale: 1.3, color: "#FFC107" }}
                  animate={{ scale: 1, color: "#FFC107" }}
                  className="text-2xl font-bold text-gold bg-gold/20 px-3 py-1 rounded-lg"
                >
                  {savingsPercent}%
                </motion.span>
              </div>
              <input
                type="range"
                min="25"
                max="100"
                value={savingsPercent}
                onChange={(e) => setSavingsPercent(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-charcoal/50 via-gold/30 to-charcoal/50 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #FFC107 0%, #FFC107 ${((savingsPercent - 25) / 75) * 100}%, rgba(255,255,255,0.1) ${((savingsPercent - 25) / 75) * 100}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-offwhite/50 mt-2">
                <span>25%</span>
                <span>100%</span>
              </div>
            </div>
          </motion.div>

          {/* Center: Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Main Savings Card */}
            <motion.div
              className="stat-card bg-gradient-to-br from-gold via-amber-500 to-gold rounded-3xl p-8 text-charcoal shadow-2xl"
              whileHover={{ scale: 1.02, rotateY: 5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-charcoal/20 rounded-2xl flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-charcoal" />
                </div>
                <span className="text-sm font-semibold bg-charcoal/10 px-3 py-1 rounded-full">
                  Monthly
                </span>
              </div>
              <div className="mb-2">
                <p className="text-sm font-semibold text-charcoal/70 mb-1">Your Monthly Savings</p>
                <p className="text-5xl font-heading font-bold">
                  <AnimatedNumber value={monthlySavings} />
                </p>
              </div>
            </motion.div>

            {/* Secondary Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="stat-card bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 text-offwhite"
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <Zap className="w-6 h-6 text-gold mb-3" />
                <p className="text-xs text-offwhite/70 mb-1">Reserved Capacity</p>
                <p className="text-2xl font-bold">
                  <AnimatedNumber value={reservedSolarKw} prefix="" suffix=" kW" />
                </p>
              </motion.div>

              <motion.div
                className="stat-card bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 text-offwhite"
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <Battery className="w-6 h-6 text-gold mb-3" />
                <p className="text-xs text-offwhite/70 mb-1">Energy/Month</p>
                <p className="text-2xl font-bold">
                  <AnimatedNumber value={energyProducedMonthly} prefix="" suffix=" kWh" />
                </p>
              </motion.div>

              <motion.div
                className="stat-card bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 text-offwhite"
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <Calendar className="w-6 h-6 text-gold mb-3" />
                <p className="text-xs text-offwhite/70 mb-1">Annual Savings</p>
                <p className="text-2xl font-bold">
                  <AnimatedNumber value={annualSavings} />
                </p>
              </motion.div>

              <motion.div
                className="stat-card bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 text-offwhite"
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <Percent className="w-6 h-6 text-gold mb-3" />
                <p className="text-xs text-offwhite/70 mb-1">ROI</p>
                <p className="text-2xl font-bold">
                  <AnimatedNumber value={roi} prefix="" suffix="%" />
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Lifetime & Investment */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {/* Lifetime Savings */}
            <motion.div
              className="stat-card bg-gradient-to-br from-forest to-forest-light rounded-3xl p-8 text-offwhite shadow-2xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-offwhite/20 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-offwhite" />
                </div>
                <span className="text-sm font-semibold bg-offwhite/20 px-3 py-1 rounded-full">
                  {projectLifetime} Years
                </span>
              </div>
              <div className="mb-2">
                <p className="text-sm font-semibold text-offwhite/80 mb-1">Total Lifetime Savings</p>
                <p className="text-4xl font-heading font-bold">
                  <AnimatedNumber value={lifetimeSavings} />
                </p>
              </div>
            </motion.div>

            {/* Investment & Payback */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-gold" />
                  <p className="text-sm font-semibold text-offwhite/90">Payback Period</p>
                </div>
                <p className="text-2xl font-bold text-offwhite">
                  <AnimatedNumber value={paybackPeriod} prefix="" suffix=" years" />
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-gold" />
                  <p className="text-sm font-semibold text-offwhite/90">One-time Investment</p>
                </div>
                <p className="text-2xl font-bold text-offwhite">
                  <AnimatedNumber value={oneTimeFee} />
                </p>
                <p className="text-xs text-offwhite/50 mt-1">Pay once, save for {projectLifetime} years</p>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/signup"
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-gold to-amber-500 text-charcoal rounded-2xl text-lg font-bold hover:shadow-2xl hover:shadow-gold/30 transition-all"
              >
                Start Saving Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
