export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 font-poppins">Terms of Service</h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing and using L2+ English ("the Service"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p>
            L2+ English provides online English language learning services, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>CEFR-based placement testing</li>
            <li>Live online classes via Zoom</li>
            <li>Downloadable course materials</li>
            <li>Progress tracking and reporting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <h3 className="text-xl font-semibold mb-2">Registration</h3>
          <p>
            You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials.
          </p>

          <h3 className="text-xl font-semibold mb-2 mt-4">Eligibility</h3>
          <p>
            You must be at least 16 years old to use our services. By registering, you represent that you meet this age requirement.
          </p>

          <h3 className="text-xl font-semibold mb-2 mt-4">Account Security</h3>
          <p>
            You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Subscriptions and Payments</h2>
          <h3 className="text-xl font-semibold mb-2">Pricing Plans</h3>
          <p>
            We offer various subscription tiers with different class allocations. All prices are displayed in USD and are subject to change with 30 days' notice.
          </p>

          <h3 className="text-xl font-semibold mb-2 mt-4">Billing</h3>
          <p>
            Subscriptions are billed monthly in advance. Payment is processed securely through Stripe. You authorize us to charge your payment method for recurring subscription fees.
          </p>

          <h3 className="text-xl font-semibold mb-2 mt-4">Failed Payments</h3>
          <p>
            If a payment fails, you will have a 3-day grace period to update your payment method. After this period, your subscription will be cancelled and access to classes will be revoked.
          </p>

          <h3 className="text-xl font-semibold mb-2 mt-4">Refund Policy</h3>
          <p>
            We offer a 14-day money-back guarantee for first-time subscribers. After 14 days, all subscription fees are non-refundable. You may cancel your subscription at any time to prevent future charges.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Class Enrollment and Attendance</h2>
          <h3 className="text-xl font-semibold mb-2">Enrollment</h3>
          <p>
            You may only enroll in classes that match your assigned CEFR level. Class enrollment is subject to availability and capacity limits.
          </p>

          <h3 className="text-xl font-semibold mb-2 mt-4">Attendance</h3>
          <p>
            We encourage regular attendance but understand scheduling conflicts may occur. There is no penalty for missing classes, but missed classes do not roll over to future months.
          </p>

          <h3 className="text-xl font-semibold mb-2 mt-4">Class Conduct</h3>
          <p>
            Students must maintain respectful behavior during classes. Disruptive behavior may result in removal from the class and, in severe cases, account suspension.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Placement Testing</h2>
          <p>
            All students must complete a placement test to determine their CEFR level. You may retake the test after 7 days. Attempting to manipulate test results may result in account suspension.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Course Materials</h2>
          <p>
            Course materials are provided for personal educational use only. You may not:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Redistribute or resell course materials</li>
            <li>Share login credentials with others</li>
            <li>Copy or reproduce materials for commercial purposes</li>
            <li>Remove copyright notices from materials</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
          <p>
            All content on the L2+ English platform, including but not limited to text, graphics, logos, course materials, and software, is the property of L2+ English and is protected by copyright and trademark laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. User Conduct</h2>
          <p>
            You agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the service for any illegal purpose</li>
            <li>Harass, threaten, or intimidate other users or instructors</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Upload malicious code or viruses</li>
            <li>Impersonate another person or entity</li>
            <li>Scrape or collect user data without permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Service Availability</h2>
          <p>
            We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. We may suspend or terminate the service for maintenance, updates, or unforeseen technical issues.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Cancellation and Termination</h2>
          <h3 className="text-xl font-semibold mb-2">Your Right to Cancel</h3>
          <p>
            You may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of your current billing period.
          </p>

          <h3 className="text-xl font-semibold mb-2 mt-4">Our Right to Terminate</h3>
          <p>
            We reserve the right to suspend or terminate your account if you violate these Terms of Service, engage in fraudulent activity, or disrupt the service for other users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Limitation of Liability</h2>
          <p>
            L2+ English shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service. Our total liability shall not exceed the amount you paid for the service in the 12 months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">13. Disclaimer of Warranties</h2>
          <p>
            The service is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the service will meet your specific learning objectives or improve your English proficiency to a certain level.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">14. Third-Party Services</h2>
          <p>
            Our service integrates with third-party platforms (Zoom, Stripe, etc.). We are not responsible for the availability, content, or practices of these third-party services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">15. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">16. Dispute Resolution</h2>
          <p>
            Any disputes arising from these terms or your use of the service shall be resolved through binding arbitration in accordance with the rules of [Arbitration Authority]. You agree to waive your right to participate in class action lawsuits.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">17. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. We will notify users of significant changes via email or platform notification at least 30 days before they take effect. Continued use of the service after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">18. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us:
          </p>
          <ul className="list-none space-y-2 mt-2">
            <li><strong>Email:</strong> legal@l2plusenglish.com</li>
            <li><strong>Support:</strong> support@l2plusenglish.com</li>
            <li><strong>Address:</strong> [Your Business Address]</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
