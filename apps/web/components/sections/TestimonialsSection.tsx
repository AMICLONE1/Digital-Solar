"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    quote: "Solar power is abundant but not very accessible. But now with PowerNetPro, I pay for a part of my power bill without having to install panels by myself. No hassles, no fossils.",
    author: "Sandeep",
    role: "Customer since 2020",
    publication: "The Better India",
    rating: 5,
    highlight: "Solar ≠ Rooftops",
  },
  {
    id: 2,
    quote: "Tapped into solar power produced miles away to pay for energy with panels mounted on sites across India. A digital platform is a win-win situation for everyone.",
    author: "Suraj",
    role: "Customer since 2021",
    publication: "Scroll",
    rating: 5,
    highlight: "Solar over the internet",
  },
  {
    id: 3,
    quote: "As a tenant, I never thought I could go solar. PowerNetPro changed that. I'm saving ₹2,500 every month on my electricity bill, and I didn't need to install anything!",
    author: "Priya",
    role: "Customer since 2022",
    publication: "YourStory",
    rating: 5,
    highlight: "Perfect for renters",
  },
  {
    id: 4,
    quote: "The best part? I can use my credits on multiple bills and even transfer them. It's like having a solar investment that moves with me.",
    author: "Rajesh",
    role: "Customer since 2021",
    publication: "Economic Times",
    rating: 5,
    highlight: "Flexible & transferable",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelector(".testimonials-header"),
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-offwhite via-white to-offwhite relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-forest/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16 testimonials-header"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-charcoal">
            What Our <span className="text-forest">Customers Say</span>
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            Join thousands of happy customers who are saving money and the planet with Digital Solar.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -50, rotateY: 15 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-charcoal/10 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 w-24 h-24 bg-forest/10 rounded-full flex items-center justify-center">
                <Quote className="w-12 h-12 text-forest/30" />
              </div>

              {/* Highlight Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-6"
              >
                <span className="px-4 py-2 bg-gradient-to-r from-forest to-forest-light text-offwhite text-sm font-bold rounded-full">
                  {currentTestimonial.highlight}
                </span>
              </motion.div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-2xl md:text-3xl font-heading text-charcoal mb-8 leading-relaxed relative z-10">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-6 border-t border-charcoal/10">
                <div>
                  <p className="text-lg font-semibold text-charcoal">{currentTestimonial.author}</p>
                  <p className="text-sm text-charcoal/60">{currentTestimonial.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-charcoal/70">{currentTestimonial.publication}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white rounded-full shadow-lg border border-charcoal/10 flex items-center justify-center hover:bg-forest hover:text-offwhite transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-forest"
                      : "bg-charcoal/20 hover:bg-charcoal/40"
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white rounded-full shadow-lg border border-charcoal/10 flex items-center justify-center hover:bg-forest hover:text-offwhite transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

