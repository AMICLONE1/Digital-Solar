"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react";

const footerLinks = {
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/compliance", label: "Compliance" },
  ],
  company: [
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/powernetpro", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/powernetpro", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/powernetpro", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/powernetpro", label: "Instagram" },
  { icon: Mail, href: "mailto:contact@powernetpro.com", label: "Email" },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-charcoal text-offwhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold">PowerNetPro</h3>
            <p className="text-offwhite/70 text-sm">
              Digital Solar Platform. Solar savings without solar panels.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-offwhite/70 hover:text-offwhite calm-transition text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-offwhite/70 hover:text-offwhite calm-transition text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA & Social */}
          <div>
            <h4 className="font-semibold mb-4">Get Started</h4>
            <Link
              href="/signup"
              className="inline-block px-6 py-2 bg-forest text-offwhite rounded-lg hover:bg-forest-light calm-transition font-medium mb-6"
            >
              Reserve Solar
            </Link>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-offwhite/10 hover:bg-offwhite/20 rounded-lg flex items-center justify-center transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-offwhite" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-offwhite/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-offwhite/60">
            <p>&copy; {currentYear} PowerNetPro. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-offwhite transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-offwhite transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-offwhite transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

