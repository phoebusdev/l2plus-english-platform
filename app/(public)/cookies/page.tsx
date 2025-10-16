export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 font-poppins">Cookie Policy</h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
          <p>
            L2+ English uses cookies to enhance your experience and provide essential functionality. We use the following types of cookies:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>

          <h3 className="text-xl font-semibold mb-2">Essential Cookies (Required)</h3>
          <p>
            These cookies are necessary for the website to function and cannot be disabled in our systems. They are usually only set in response to actions you take, such as logging in or filling in forms.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Authentication Cookies:</strong> Keep you logged in as you navigate the platform
            </li>
            <li>
              <strong>Session Cookies:</strong> Enable core functionality like accessing your dashboard and taking tests
            </li>
            <li>
              <strong>Security Cookies:</strong> Protect against cross-site request forgery (CSRF) attacks
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 mt-6">Functional Cookies (Optional)</h3>
          <p>
            These cookies enable enhanced functionality and personalization but are not essential for the website to work.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Preference Cookies:</strong> Remember your settings like timezone and language preferences
            </li>
            <li>
              <strong>Progress Cookies:</strong> Save your progress through multi-page forms (e.g., placement test)
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 mt-6">Analytics Cookies (Optional)</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Vercel Analytics:</strong> Tracks page views, session duration, and user journeys
            </li>
            <li>
              <strong>Performance Cookies:</strong> Measure website speed and identify technical issues
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 mt-6">Third-Party Cookies</h3>
          <p>
            Some cookies are placed by third-party services that appear on our pages:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Stripe:</strong> Processes payments securely (essential for checkout)
            </li>
            <li>
              <strong>Zoom:</strong> Enables live class functionality when you join meetings
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Cookie Duration</h2>
          <p>
            Cookies may be "session cookies" or "persistent cookies":
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Session Cookies:</strong> Deleted when you close your browser (e.g., CSRF protection)
            </li>
            <li>
              <strong>Persistent Cookies:</strong> Remain on your device for a set period or until manually deleted (e.g., "remember me" functionality, typically 30 days)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Specific Cookies Used</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Cookie Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">next-auth.session-token</td>
                  <td className="border border-gray-300 px-4 py-2">Authentication session</td>
                  <td className="border border-gray-300 px-4 py-2">30 days</td>
                  <td className="border border-gray-300 px-4 py-2">Essential</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">next-auth.csrf-token</td>
                  <td className="border border-gray-300 px-4 py-2">CSRF protection</td>
                  <td className="border border-gray-300 px-4 py-2">Session</td>
                  <td className="border border-gray-300 px-4 py-2">Essential</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">__stripe_*</td>
                  <td className="border border-gray-300 px-4 py-2">Payment processing</td>
                  <td className="border border-gray-300 px-4 py-2">Varies</td>
                  <td className="border border-gray-300 px-4 py-2">Essential</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">_vercel_analytics_*</td>
                  <td className="border border-gray-300 px-4 py-2">Usage analytics</td>
                  <td className="border border-gray-300 px-4 py-2">1 year</td>
                  <td className="border border-gray-300 px-4 py-2">Analytics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Managing Cookies</h2>
          <h3 className="text-xl font-semibold mb-2">Browser Settings</h3>
          <p>
            Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of our service may not function properly if you disable cookies.
          </p>

          <p className="mt-4">
            <strong>Popular browser cookie settings:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data
            </li>
            <li>
              <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data
            </li>
            <li>
              <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
            </li>
            <li>
              <strong>Edge:</strong> Settings → Cookies and site permissions → Manage cookies
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 mt-6">Mobile Devices</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>iOS Safari:</strong> Settings → Safari → Block All Cookies
            </li>
            <li>
              <strong>Android Chrome:</strong> Chrome app → Settings → Site settings → Cookies
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Impact of Disabling Cookies</h2>
          <p>
            If you disable essential cookies, certain features will not work:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You will not be able to log in or maintain your session</li>
            <li>Your placement test progress will not be saved</li>
            <li>Class enrollment and payment checkout will not function</li>
            <li>Dashboard personalization will be unavailable</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Third-Party Cookie Policies</h2>
          <p>
            For more information about cookies used by our third-party services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Stripe:</strong>{' '}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                stripe.com/privacy
              </a>
            </li>
            <li>
              <strong>Zoom:</strong>{' '}
              <a
                href="https://explore.zoom.us/en/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                explore.zoom.us/en/privacy
              </a>
            </li>
            <li>
              <strong>Vercel:</strong>{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                vercel.com/legal/privacy-policy
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy periodically to reflect changes in our practices or for legal, operational, or regulatory reasons. We will post the updated policy on this page with a new "Last Updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
          <p>
            If you have questions about our use of cookies, please contact us:
          </p>
          <ul className="list-none space-y-2 mt-2">
            <li>
              <strong>Email:</strong> privacy@l2plusenglish.com
            </li>
            <li>
              <strong>Subject:</strong> Cookie Policy Inquiry
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. GDPR Compliance</h2>
          <p>
            For users in the European Economic Area (EEA), UK, and Switzerland: We comply with GDPR requirements regarding cookie consent. Essential cookies are used based on legitimate interest, while optional cookies require your consent. You can withdraw consent at any time through your browser settings.
          </p>
        </section>
      </div>
    </div>
  )
}
