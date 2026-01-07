"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import { Zap, Leaf, DollarSign, TrendingUp } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Animated counter component
function AnimatedCounter({ 
  value, 
  suffix = "", 
  prefix = "",
  duration = 2 
}: { 
  value: number; 
  suffix?: string; 
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const startValue = 0;
    const endValue = value;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOutCubic;
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  const formatNumber = (num: number) => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(2) + "Cr";
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2) + "L";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0 });
  };

  return (
    <div ref={ref}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </div>
  );
}

const stats = [
  {
    icon: Zap,
    value: 1670.47,
    suffix: " kW",
    label: "Digital Solar Installed",
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
  },
  {
    icon: Leaf,
    value: 2634329.77,
    suffix: " kWh",
    label: "Clean Energy Delivered",
    color: "from-forest to-forest-light",
    bgColor: "bg-forest/10",
  },
  {
    icon: DollarSign,
    value: 14635152.25,
    prefix: "₹",
    label: "Credits Generated",
    color: "from-gold to-amber-500",
    bgColor: "bg-gold/10",
  },
  {
    icon: TrendingUp,
    value: 2370896.8,
    suffix: " kg",
    label: "Carbon Avoided",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Animate stat cards
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".stat-card"),
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
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
      id="stats"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-charcoal to-charcoal relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(27,94,32,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-offwhite">
            Connecting People, <span className="text-gold">Power and Planet</span>
          </h2>
          <p className="text-xl text-offwhite/70 max-w-2xl mx-auto">
            Real numbers from real customers. See the collective impact we're making together.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card group"
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`${stat.bgColor} rounded-3xl p-8 border-2 border-transparent hover:border-forest/30 transition-all h-full relative overflow-hidden`}>
                {/* Decorative gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Value */}
                  <div className="mb-3">
                    <motion.div
                      className="text-4xl md:text-5xl font-heading font-bold text-charcoal"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <AnimatedCounter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                    </motion.div>
                  </div>

                  {/* Label */}
                  <p className="text-charcoal/70 font-medium leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

