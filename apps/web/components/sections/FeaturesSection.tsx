"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { 
  Home, 
  Zap, 
  Shield, 
  TrendingUp, 
  Clock, 
  DollarSign,
  CheckCircle2
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Home,
    title: "Needs No Installation",
    description: "No obtrusive structures on roof. Works from anywhere.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Zap,
    title: "Go Solar Instantly",
    description: "3 minutes, not the usual 3 months. Start saving today.",
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
  },
  {
    icon: TrendingUp,
    title: "Maximize Savings",
    description: "20% more savings than rooftop solar. Better returns guaranteed.",
    color: "from-forest to-forest-light",
    bgColor: "bg-forest/10",
  },
  {
    icon: Shield,
    title: "Zero Hassles",
    description: "Monthly checks and cleaning by us. You just save.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: DollarSign,
    title: "No Added Costs",
    description: "No operational charges on you. Transparent pricing.",
    color: "from-gold to-amber-500",
    bgColor: "bg-gold/10",
  },
  {
    icon: Clock,
    title: "Diversify Your Solar",
    description: "Reserve from multiple projects. Spread your investment.",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Animate feature cards
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".feature-card"),
        { opacity: 0, y: 50, rotationX: -15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
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
      id="features"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-offwhite to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-forest/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
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
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-forest/10 text-forest text-sm font-semibold rounded-full"
          >
            Why PowerNetPro
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-charcoal">
            More for <span className="text-forest">Less</span>
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            Everything you need to go solar, without the complexity. Simple, smart, and savings-focused.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -8 }}
            >
              <div className={`${feature.bgColor} rounded-3xl p-8 border-2 border-transparent hover:border-forest/30 transition-all h-full relative overflow-hidden`}>
                {/* Decorative gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-bold text-charcoal mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Check mark */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-6 right-6"
                  >
                    <CheckCircle2 className="w-6 h-6 text-forest" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-forest/10 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <CheckCircle2 className="w-5 h-5 text-forest" />
            <span className="text-sm font-semibold text-charcoal">
              Tax-free savings • Exit anytime • No hidden fees
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

