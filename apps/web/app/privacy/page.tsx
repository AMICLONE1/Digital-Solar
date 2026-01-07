export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-offwhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose prose-charcoal">
        <h1 className="text-4xl font-heading font-bold text-charcoal mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-charcoal/80">
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal identification information (name, phone, email)</li>
              <li>KYC documents (Aadhaar, PAN)</li>
              <li>Utility consumer number and DISCOM information</li>
              <li>Payment information (processed securely through payment gateways)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Process reservations and payments</li>
              <li>Calculate and apply credits to your bills</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Send you important updates about your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>AES-256 encryption for sensitive data at rest</li>
              <li>TLS 1.3 encryption for data in transit</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">4. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services
              and comply with legal obligations. Financial records are retained as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4">6. Contact Us</h2>
            <p>
              For privacy-related questions or concerns, please contact us at:
              <br />
              Email: privacy@powernetpro.com
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

