"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  XCircle, 
  Home, 
  Zap, 
  Shield, 
  Receipt,
  MapPin,
  TrendingUp,
  ArrowRight
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const comparisonData = [
  {
    category: "Best For",
    digitalSolar: {
      text: "Tenants, apartments, and anyone without roof access",
      icon: Home,
      positive: true,
    },
    rooftopSolar: {
      text: "Standalone houses with roof ownership",
      icon: Home,
      positive: false,
    },
  },
  {
    category: "Requirements",
    digitalSolar: {
      text: "Zero Installation - No hardware or permits needed",
      icon: Zap,
      positive: true,
    },
    rooftopSolar: {
      text: "Fixed to Rooftop - Local utility approval required",
      icon: MapPin,
      positive: false,
    },
  },
  {
    category: "Safeguards",
    digitalSolar: {
      text: "Secured Generation - 75% of forecasted generation covered",
      icon: Shield,
      positive: true,
    },
    rooftopSolar: {
      text: "Yield risk on you - Intermittency due to weather and shade",
      icon: Shield,
      positive: false,
    },
  },
  {
    category: "Savings on Bill",
    digitalSolar: {
      text: "Offset with Credits - Slash usage & fixed charges",
      icon: Receipt,
      positive: true,
    },
    rooftopSolar: {
      text: "Reduce in Units - Lowers only usage charges",
      icon: Receipt,
      positive: false,
    },
  },
  {
    category: "Flexibility",
    digitalSolar: {
      text: "Offset multiple locations, add capacity later, transferable",
      icon: TrendingUp,
      positive: true,
    },
    rooftopSolar: {
      text: "Limited by roof space, expensive troubleshooting",
      icon: TrendingUp,
      positive: false,
    },
  },
];

export default function ComparisonTable() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      const rows = sectionRef.current.querySelectorAll(".comparison-row");
      const headers = sectionRef.current.querySelectorAll(".comparison-header");

      if (rows.length > 0) {
        gsap.fromTo(
          rows,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
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

      if (headers.length > 0) {
        gsap.fromTo(
          headers,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
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
      id="comparison"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-offwhite to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-forest/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-charcoal">
            Digital Solar vs <span className="text-forest">Rooftop Solar</span>
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            See why Digital Solar is the smarter choice for most people. Compare the key differences side-by-side.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl shadow-2xl border border-charcoal/10 overflow-hidden">
          {/* Table Header */}
          <div className="grid md:grid-cols-3 gap-4 p-6 bg-gradient-to-r from-charcoal/5 via-charcoal/10 to-charcoal/5 border-b border-charcoal/10">
            <div className="comparison-header">
              <h3 className="text-sm font-semibold text-charcoal/70 uppercase tracking-wide">
                Feature
              </h3>
            </div>
            <div className="comparison-header text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-xl">
                <Zap className="w-5 h-5" />
                <span className="font-bold">Digital Solar</span>
              </div>
            </div>
            <div className="comparison-header text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal/10 text-charcoal rounded-xl">
                <Home className="w-5 h-5" />
                <span className="font-bold">Rooftop Solar</span>
              </div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-charcoal/5">
            {comparisonData.map((item, index) => (
              <motion.div
                key={index}
                className="comparison-row grid md:grid-cols-3 gap-4 p-6 hover:bg-offwhite/50 transition-colors group"
                whileHover={{ x: 4 }}
              >
                {/* Category */}
                <div className="flex items-center">
                  <h4 className="text-lg font-semibold text-charcoal">{item.category}</h4>
                </div>

                {/* Digital Solar */}
                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-forest/5 to-forest/10 rounded-xl border border-forest/20">
                  <div className="flex-shrink-0 mt-1">
                    {item.digitalSolar.positive ? (
                      <CheckCircle2 className="w-6 h-6 text-forest" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <item.digitalSolar.icon className="w-4 h-4 text-forest" />
                      <span className="text-sm font-semibold text-forest">Digital Solar</span>
                    </div>
                    <p className="text-sm text-charcoal/80 leading-relaxed">
                      {item.digitalSolar.text}
                    </p>
                  </div>
                </div>

                {/* Rooftop Solar */}
                <div className="flex items-start gap-3 p-4 bg-charcoal/5 rounded-xl border border-charcoal/10">
                  <div className="flex-shrink-0 mt-1">
                    {item.rooftopSolar.positive ? (
                      <CheckCircle2 className="w-6 h-6 text-forest" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <item.rooftopSolar.icon className="w-4 h-4 text-charcoal/60" />
                      <span className="text-sm font-semibold text-charcoal/70">Rooftop Solar</span>
                    </div>
                    <p className="text-sm text-charcoal/70 leading-relaxed">
                      {item.rooftopSolar.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-2xl text-lg font-semibold hover:shadow-2xl hover:shadow-forest/30 transition-all"
          >
            Choose Digital Solar
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

