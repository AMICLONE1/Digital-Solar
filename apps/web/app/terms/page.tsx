export default function TermsPage() {
  return (
    <div className="min-h-screen bg-offwhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose prose-charcoal">
        <h1 className="text-4xl font-heading font-bold text-charcoal mb-8">Terms of Service</h1>

        <div className="space-y-6 text-charcoal/80">
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using PowerNetPro Digital Solar platform, you accept and agree to be
              bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">2. Service Description</h2>
            <p>
              PowerNetPro provides a digital platform for reserving solar capacity from large solar
              plants. Users receive monthly credits based on their share of generation, which can be
              applied to electricity bills.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">3. User Obligations</h2>
            <p>Users agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain the security of their account credentials</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not use the service for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">4. Capacity Reservation</h2>
            <p>
              Capacity reservations are subject to availability and are allocated on a first-come,
              first-served basis. All reservations are final and non-refundable except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">5. Credit Calculation</h2>
            <p>
              Credits are calculated monthly based on actual solar generation and your reserved capacity.
              Credits are applied automatically to your electricity bills via BBPS integration.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">6. Payment Terms</h2>
            <p>
              All payments must be made through our secure payment gateway. Payment failures may result
              in cancellation of reservations or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">7. Limitation of Liability</h2>
            <p>
              PowerNetPro is not liable for any indirect, incidental, or consequential damages arising
              from the use of our services. Our liability is limited to the amount paid by the user.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">8. Compliance</h2>
            <p>
              This service operates in compliance with the Electricity Act, IT Act 2000, and RBI
              payment guidelines. We maintain all necessary licenses and registrations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Users will be notified of
              significant changes via email or platform notification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">10. Contact</h2>
            <p>
              For questions about these terms, please contact us at:
              <br />
              Email: legal@powernetpro.com
            </p>
          </section>

          <section className="mt-8 pt-8 border-t border-charcoal/10">
            <p className="text-sm text-charcoal/60">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

