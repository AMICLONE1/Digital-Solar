"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Shield, FileCheck, Building2, Lock, CheckCircle2, Award, BadgeCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const trustFeatures = [
  {
    icon: Shield,
    title: "Regulated & Compliant",
    description: "Fully compliant with Electricity Act and RBI payment guidelines",
    badge: "RBI Certified",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: FileCheck,
    title: "Audit-Ready Ledger",
    description: "Immutable, transparent credit calculations auditable by DISCOMs",
    badge: "Blockchain Verified",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Building2,
    title: "SPV Structure",
    description: "Each project ring-fenced in separate SPV for investor protection",
    badge: "Legally Protected",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "256-bit encryption, secure payments, and comprehensive insurance coverage",
    badge: "ISO 27001",
    color: "from-purple-500 to-pink-600",
  },
];

const certifications = [
  { name: "IT Act 2000", status: "Compliant", icon: CheckCircle2 },
  { name: "RBI Guidelines", status: "Payment Compliant", icon: BadgeCheck },
  { name: "Electricity Act", status: "Non-Supplier Position", icon: Award },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      const cards = sectionRef.current.querySelectorAll(".trust-card");
      
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9,
            rotationX: -15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate certification badges
      gsap.fromTo(
        ".cert-badge",
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="trust"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal text-offwhite overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-forest to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-6"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-forest/20 text-forest text-sm font-semibold rounded-full border border-forest/30"
          >
            Bank-Grade Security
          </motion.span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-offwhite">
            Trust Built on
            <br />
            <span className="bg-gradient-to-r from-gold via-gold/80 to-gold bg-clip-text text-transparent">
              Compliance
            </span>
          </h2>
          <p className="text-xl text-offwhite/70 max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade security meets regulatory excellence. Your investments are protected by the same standards trusted by banks.
          </p>
        </motion.div>

        {/* Trust Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                className="trust-card group relative"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative h-full p-8 bg-gradient-to-br from-offwhite/5 to-offwhite/0 backdrop-blur-sm rounded-2xl border border-offwhite/10 hover:border-offwhite/30 transition-all duration-300 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-forest/20 text-forest text-xs font-bold rounded-full border border-forest/30">
                      {feature.badge}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-gradient-to-br from-forest to-forest-light rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                    >
                      <Icon className="w-8 h-8 text-offwhite" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-offwhite mb-3">{feature.title}</h3>
                    <p className="text-offwhite/70 leading-relaxed text-sm">{feature.description}</p>
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compliance Badges - Bank Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-offwhite/5 to-transparent" />
          <div className="relative grid md:grid-cols-3 gap-8 pt-12 border-t border-offwhite/10">
            {certifications.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={i}
                  className="cert-badge text-center group"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full mb-4 border border-gold/30"
                  >
                    <Icon className="w-8 h-8 text-gold" />
                  </motion.div>
                  <div className="text-2xl font-bold text-offwhite mb-2">{cert.name}</div>
                  <div className="text-sm text-offwhite/60 font-medium">{cert.status}</div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                    className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mt-4"
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

