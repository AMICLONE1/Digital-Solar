"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ReturnsSection() {
  const [capacity, setCapacity] = useState(5); // kW
  const sectionRef = useRef<HTMLElement>(null);

  // Calculate projected savings
  const ratePerKwh = 6.5; // ₹ per kWh (example)
  const avgGenerationPerKw = 120; // kWh per kW per month (example)
  const monthlySavings = capacity * avgGenerationPerKw * ratePerKwh;

  // Generate chart data
  const chartData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i).toLocaleDateString("en-US", { month: "short" }),
    savings: monthlySavings * (i + 1),
  }));

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelector(".returns-content"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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

  return (
    <section
      id="returns"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-offwhite"
    >
      <div className="max-w-7xl mx-auto returns-content space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-charcoal">
            Predictable Returns
          </h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            See how much you can save based on your reserved capacity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Interactive Slider */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-lg font-semibold text-charcoal">
                  Reserved Capacity
                </label>
                <motion.span 
                  key={capacity}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-forest"
                >
                  {capacity} kW
                </motion.span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-charcoal/10 via-forest/20 to-charcoal/10 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1B5E20 0%, #1B5E20 ${((capacity - 1) / 19) * 100}%, #E5E5E5 ${((capacity - 1) / 19) * 100}%, #E5E5E5 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-charcoal/60">
                <span>1 kW</span>
                <span>20 kW</span>
              </div>
            </div>

            <motion.div 
              key={capacity}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="p-8 bg-gradient-to-br from-forest/10 via-forest/5 to-gold/10 rounded-2xl border border-forest/20 shadow-lg space-y-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-charcoal/10">
                <div>
                  <span className="text-charcoal/70 text-sm block mb-1">Monthly Savings</span>
                  <motion.span 
                    key={monthlySavings}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-bold text-forest"
                  >
                    ₹{monthlySavings.toLocaleString("en-IN")}
                  </motion.span>
                </div>
                <div className="w-16 h-16 bg-forest/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-charcoal/70 text-sm block mb-1">Annual Savings</span>
                  <motion.span 
                    key={monthlySavings * 12}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-charcoal"
                  >
                    ₹{(monthlySavings * 12).toLocaleString("en-IN")}
                  </motion.span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-forest font-semibold">ROI: ~15%</div>
                  <div className="text-xs text-charcoal/50">per annum</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Savings Projection Chart */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-charcoal">12-Month Projection</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2C" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#2C2C2C" />
                  <YAxis stroke="#2C2C2C" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FAF9F6",
                      border: "1px solid #2C2C2C",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="savings"
                    stroke="#1B5E20"
                    strokeWidth={3}
                    dot={{ fill: "#1B5E20", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center pt-8"
        >
          <p className="text-charcoal/60 text-sm">
            * Projections based on average generation. Actual savings may vary.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

