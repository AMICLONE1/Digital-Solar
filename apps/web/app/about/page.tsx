"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Leaf, Shield, Users, Target } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability First",
      description: "We're committed to accelerating India's transition to clean energy.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Making solar energy accessible to everyone through technology.",
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Clear pricing, verified projects, and transparent credit calculations.",
    },
    {
      icon: Users,
      title: "Customer Centric",
      description: "Your savings and satisfaction are our top priorities.",
    },
  ];

  const stats = [
    { label: "Solar Capacity", value: "10,000+ kW", suffix: "Reserved" },
    { label: "Users", value: "10,000+", suffix: "Active" },
    { label: "Savings Generated", value: "₹2.5Cr+", suffix: "Total" },
    { label: "CO₂ Avoided", value: "500+", suffix: "Tons" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-offwhite via-offwhite to-forest/5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-forest to-forest-light rounded-2xl mb-6 shadow-lg"
          >
            <Sparkles className="w-10 h-10 text-offwhite" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-bold text-charcoal"
          >
            About PowerNetPro
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-charcoal/70 max-w-2xl mx-auto"
          >
            Making solar energy accessible to everyone, without the need for rooftop panels.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 space-y-6 border border-charcoal/5"
          >
            <h2 className="text-3xl font-heading font-bold text-charcoal mb-4">Our Mission</h2>
            <p className="text-lg text-charcoal/70 leading-relaxed">
              PowerNetPro was founded with a simple vision: to make clean, affordable solar energy
              accessible to every Indian household. We believe that everyone should benefit from
              solar power, regardless of whether they own a rooftop or have the means to install
              panels.
            </p>
            <p className="text-lg text-charcoal/70 leading-relaxed">
              Through our Digital Solar platform, we connect you directly to large-scale solar
              projects. You reserve capacity, and we ensure you receive monthly credits on your
              electricity bill based on actual generation. It&apos;s that simple.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-heading font-bold text-charcoal text-center mb-12"
          >
            Our Impact
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <div className="text-3xl font-bold text-forest mb-2">{stat.value}</div>
                <div className="text-sm text-charcoal/60">{stat.label}</div>
                <div className="text-xs text-charcoal/40 mt-1">{stat.suffix}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-heading font-bold text-charcoal text-center mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-charcoal/5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal mb-2">{value.title}</h3>
                    <p className="text-charcoal/70">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-forest to-forest-light rounded-2xl p-12 text-offwhite space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Ready to Start Saving?
            </h2>
            <p className="text-xl text-offwhite/90">
              Join thousands of smart savers who are reducing their electricity bills with Digital Solar.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-offwhite text-forest rounded-xl hover:bg-gold transition-all font-semibold text-lg"
            >
              Get Started for Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

