export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-offwhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-charcoal mb-8">Compliance & Regulations</h1>

        <div className="space-y-8 text-charcoal/80">
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Regulatory Compliance</h2>
            <p className="mb-4">
              PowerNetPro Digital Solar operates in full compliance with applicable Indian laws and
              regulations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Electricity Act 2003:</strong> We operate as a non-supplier platform,
                facilitating credit entitlements without engaging in electricity trading.
              </li>
              <li>
                <strong>IT Act 2000:</strong> All data handling and processing complies with
                information technology regulations.
              </li>
              <li>
                <strong>RBI Payment Guidelines:</strong> Payment processing follows Reserve Bank
                of India guidelines for digital payments.
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Data Protection</h2>
            <p className="mb-4">
              We implement comprehensive data protection measures:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>AES-256 encryption for sensitive data at rest</li>
              <li>TLS 1.3 encryption for all data in transit</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and role-based permissions</li>
              <li>Audit logging for all critical operations</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Financial Compliance</h2>
            <p className="mb-4">
              Our financial operations maintain full transparency and auditability:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Immutable ledger system for all credit transactions</li>
              <li>Versioned calculation formulas for audit trails</li>
              <li>Regular reconciliation with DISCOM records</li>
              <li>Compliance with accounting standards</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">SPV Structure</h2>
            <p>
              Each solar project is ring-fenced in a separate Special Purpose Vehicle (SPV) to ensure:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Asset protection and investor security</li>
              <li>Clear legal separation between projects</li>
              <li>Easier regulatory approvals</li>
              <li>Simplified exit mechanisms</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Audit & Reporting</h2>
            <p>
              We maintain comprehensive audit trails and reporting:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>All credit calculations are logged and auditable</li>
              <li>Regular reporting to regulatory authorities</li>
              <li>DISCOM-accessible audit logs</li>
              <li>Annual compliance certifications</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

