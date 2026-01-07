"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/nav/Navigation";
import Footer from "@/components/footer/Footer";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-offwhite">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-forest to-forest-light rounded-2xl mb-6 shadow-lg"
            >
              <Sparkles className="w-8 h-8 text-offwhite" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-charcoal mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Email Us</h3>
                    <p className="text-charcoal/70 text-sm">support@powernetpro.com</p>
                    <p className="text-charcoal/70 text-sm">info@powernetpro.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Call Us</h3>
                    <p className="text-charcoal/70 text-sm">+91 1800-XXX-XXXX</p>
                    <p className="text-charcoal/50 text-xs mt-1">Mon-Fri, 9 AM - 6 PM IST</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Visit Us</h3>
                    <p className="text-charcoal/70 text-sm">
                      123 Business Park,<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-charcoal/5">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-offwhite" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-charcoal mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-charcoal/70">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-charcoal mb-2">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-charcoal mb-2">
                          Subject
                        </label>
                        <input
                          id="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                          placeholder="How can we help?"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

