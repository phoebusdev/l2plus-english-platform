export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 font-poppins">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            L2+ English ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our online English language learning platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
          <p>When you register, we collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Timezone preference</li>
            <li>English proficiency level</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 mt-4">Payment Information</h3>
          <p>
            Payment processing is handled securely by Stripe. We do not store your full credit card details on our servers.
          </p>

          <h3 className="text-xl font-semibold mb-2 mt-4">Usage Data</h3>
          <p>We collect information about your use of our platform, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Placement test results</li>
            <li>Class attendance records</li>
            <li>Downloaded materials</li>
            <li>Login activity</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and maintain our services</li>
            <li>Process your subscription payments</li>
            <li>Send you class reminders and important updates</li>
            <li>Assess your English proficiency level</li>
            <li>Improve our platform and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Stripe:</strong> For payment processing</li>
            <li><strong>Resend:</strong> For email delivery</li>
            <li><strong>Zoom:</strong> When you join our classes</li>
            <li><strong>Kondesk CRM:</strong> For customer relationship management</li>
          </ul>
          <p className="mt-2">
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights (GDPR)</h2>
          <p>Under GDPR, you have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Correct inaccurate data</li>
            <li><strong>Erasure:</strong> Request deletion of your data</li>
            <li><strong>Portability:</strong> Receive your data in a structured format</li>
            <li><strong>Object:</strong> Object to processing of your data</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, contact us at privacy@l2plusenglish.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encrypted data transmission (SSL/TLS)</li>
            <li>Secure password hashing (Argon2id)</li>
            <li>Regular security audits</li>
            <li>Access controls and authentication</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
          <p>
            We retain your personal data for as long as necessary to provide our services and comply with legal obligations. When you request deletion, we will anonymize or delete your data within 30 days, except where retention is required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Cookies</h2>
          <p>
            We use essential cookies to maintain your session and provide our services. You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
          <p>
            Our services are intended for users aged 16 and older. We do not knowingly collect information from children under 16.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you of significant changes by email or through a notice on our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-none space-y-2 mt-2">
            <li><strong>Email:</strong> privacy@l2plusenglish.com</li>
            <li><strong>Address:</strong> [Your Business Address]</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
