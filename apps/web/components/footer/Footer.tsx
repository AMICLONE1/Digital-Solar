"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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

export default function Footer() {
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

          {/* CTA */}
          <div>
            <h4 className="font-semibold mb-4">Get Started</h4>
            <Link
              href="/reserve"
              className="inline-block px-6 py-2 bg-forest text-offwhite rounded-lg hover:bg-forest-light calm-transition font-medium"
            >
              Reserve Solar
            </Link>
          </div>
        </div>

        <div className="border-t border-offwhite/10 pt-8 text-center text-sm text-offwhite/60">
          <p>&copy; {new Date().getFullYear()} PowerNetPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

