"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/nav/Navigation";
import Footer from "@/components/footer/Footer";
import { ChevronDown, Sparkles, HelpCircle } from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What is Digital Solar?",
        answer: "Digital Solar allows you to reserve capacity from large solar plants and receive monthly credits on your electricity bills. You don't need to install any solar panels - you simply own a share of generation from utility-scale solar projects.",
      },
      {
        question: "How do I get started?",
        answer: "Getting started is easy! Simply sign up with your email and password, complete a quick KYC verification, connect your utility account, and then reserve capacity from available solar projects. The entire process takes less than 10 minutes.",
      },
      {
        question: "Do I need to install solar panels?",
        answer: "No! That's the beauty of Digital Solar. You don't need any installation, maintenance, or upfront costs for solar panels. You simply reserve capacity from existing large solar plants and receive credits based on actual generation.",
      },
    ],
  },
  {
    category: "Credits & Savings",
    questions: [
      {
        question: "How are credits calculated?",
        answer: "Credits are calculated monthly based on the formula: (Your Reserved kW / Total Project kW) × Actual Generation (kWh) × Fixed Credit Rate (₹/kWh). This ensures you receive credits proportional to your share of the solar project.",
      },
      {
        question: "When will I receive credits?",
        answer: "Credits are calculated and added to your account monthly, typically within 5-7 days after the end of each month. You can view your credit history in the dashboard.",
      },
      {
        question: "How are credits applied to my bill?",
        answer: "Credits are automatically applied to your electricity bill through BBPS (Bharat Bill Payment System) integration. Once you connect your utility account, credits are applied automatically each month.",
      },
      {
        question: "What if I don't use all my credits in a month?",
        answer: "Unused credits roll over to the next month. However, credits do expire after a certain period (typically 12 months) to ensure fair usage. You can check your credit expiry dates in the dashboard.",
      },
    ],
  },
  {
    category: "Reservations & Payments",
    questions: [
      {
        question: "How much capacity can I reserve?",
        answer: "You can reserve anywhere from 1 kW to 20 kW of capacity per project. The amount you reserve determines your monthly credit amount. You can reserve capacity from multiple projects if desired.",
      },
      {
        question: "What is the cost of reserving capacity?",
        answer: "The cost varies by project and is typically a one-time payment. Pricing is displayed when you select a project. You can use our savings calculator to see projected returns before reserving.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major payment methods through Razorpay, including credit cards, debit cards, UPI, net banking, and digital wallets. All payments are secure and encrypted.",
      },
      {
        question: "Can I cancel my reservation?",
        answer: "Reservations are generally non-refundable, but you may be able to transfer your capacity to another user or sell it back under certain conditions. Please contact support for specific cases.",
      },
    ],
  },
  {
    category: "Safety & Compliance",
    questions: [
      {
        question: "Is this legal and regulated?",
        answer: "Yes! PowerNetPro operates in full compliance with the Electricity Act 2003 and RBI payment guidelines. We maintain a non-supplier position and all transactions are transparent and auditable.",
      },
      {
        question: "How is my data protected?",
        answer: "We use bank-grade encryption and security measures to protect your data. All sensitive information is encrypted, and we follow industry best practices for data security and privacy compliance.",
      },
      {
        question: "What happens if the solar project fails?",
        answer: "Each project is ring-fenced in a separate SPV (Special Purpose Vehicle) for investor protection. In the unlikely event of project issues, your investment is protected by the SPV structure.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const allQuestions = faqs.flatMap((faq) =>
    faq.questions.map((q, idx) => ({
      ...q,
      category: faq.category,
      globalIndex: faqs
        .slice(0, faqs.indexOf(faq))
        .reduce((acc, f) => acc + f.questions.length, 0) + idx,
    }))
  );

  const filteredQuestions = selectedCategory
    ? allQuestions.filter((q) => q.category === selectedCategory)
    : allQuestions;

  return (
    <main className="min-h-screen bg-offwhite">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-forest to-forest-light rounded-2xl mb-6 shadow-lg"
            >
              <HelpCircle className="w-8 h-8 text-offwhite" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-charcoal mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-charcoal/70">
              Find answers to common questions about Digital Solar
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-3 mb-8 justify-center"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === null
                  ? "bg-forest text-offwhite shadow-lg"
                  : "bg-white text-charcoal hover:bg-charcoal/5 border border-charcoal/10"
              }`}
            >
              All Questions
            </button>
            {faqs.map((faq) => (
              <button
                key={faq.category}
                onClick={() => setSelectedCategory(faq.category)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedCategory === faq.category
                    ? "bg-forest text-offwhite shadow-lg"
                    : "bg-white text-charcoal hover:bg-charcoal/5 border border-charcoal/10"
                }`}
              >
                {faq.category}
              </button>
            ))}
          </motion.div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredQuestions.map((item, index) => (
              <motion.div
                key={item.globalIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-charcoal/5 overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(item.globalIndex)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-charcoal/2 transition-all"
                >
                  <div className="flex-1">
                    <div className="text-xs text-forest font-semibold mb-1">
                      {item.category}
                    </div>
                    <h3 className="font-semibold text-charcoal">{item.question}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-charcoal/40 transition-transform flex-shrink-0 ml-4 ${
                      openIndex === item.globalIndex ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === item.globalIndex && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-charcoal/70 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Still Have Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-forest to-forest-light rounded-2xl p-8 text-center text-offwhite"
          >
            <h3 className="text-2xl font-heading font-bold mb-2">
              Still have questions?
            </h3>
            <p className="mb-6 text-offwhite/90">
              Can&apos;t find the answer you&apos;re looking for? Please reach out to our friendly team.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-white text-forest rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

