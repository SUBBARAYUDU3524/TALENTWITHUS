import React from 'react'

const page = () => (
  <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-10 px-4 flex justify-center items-start">
    <section className="max-w-3xl w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
          Privacy Policy
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-1">
          TalentWithUs Software Pvt. Ltd.
        </h2>
        <div className="text-base font-medium text-gray-600">
          Effective Date: October 29, 2025
        </div>
      </div>

      <article className="space-y-8 text-gray-700 leading-relaxed text-justify">
        <section>
          <h3 className="text-lg font-bold text-blue-600 mb-2">Introduction</h3>
          <p>
            TalentWithUs is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, process, and safeguard your data when you interact with us through our website, software applications, and related services.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-600 mb-2">Information We Collect</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your name, email address, and contact details</li>
            <li>Company name and project information (if provided)</li>
            <li>Usage data and cookies, including analytics and technical logging</li>
            <li>Payment information (if applicable, via secure gateways)</li>
            <li>Any other information you choose to provide</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-600 mb-2">How We Use Your Information</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>To provide, operate, and improve our services and products</li>
            <li>To communicate regarding updates, projects, and support</li>
            <li>To comply with applicable legal and regulatory requirements</li>
            <li>For analytics, personalization, and security enhancement</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-600 mb-2">Sharing & Disclosure</h3>
          <p>
            We do not sell your personal information. We only share data with trusted third-party providers (such as payment gateways, analytics, or cloud infrastructure partners) strictly as necessary for our business operations, all adhering to appropriate privacy and security standards.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-600 mb-2">Cookies & Tracking</h3>
          <p>
            Our website and software may use cookies, web beacons, and similar technologies to collect usage information and enhance your experience. You can manage cookie preferences at any time in your browser settings.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-600 mb-2">Data Security</h3>
          <p>
            We deploy industry-standard measures including encryption, secure servers, and periodic audits to keep your data protected against unauthorized access, alteration, or disclosure.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-600 mb-2">User Rights</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Request access or correction of your personal data</li>
            <li>Request deletion or restrict processing where applicable</li>
            <li>Withdraw consent at any time</li>
            <li>Contact us for compliance concerns</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-600 mb-2">International Transfers</h3>
          <p>
            If your data is transferred internationally, it is handled in accordance with relevant laws and with robust safeguards to ensure continued protection.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-600 mb-2">Updates & Changes</h3>
          <p>
            TalentWithUs may update this Privacy Policy as our products or legal requirements evolve. We will notify users of significant changes via this page or direct communication.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-600 mb-2">Contact Us</h3>
          <p>
            For any privacy questions or requests, please contact us at <a className="text-blue-600 underline hover:text-blue-700" href="mailto:privacy@talentwithus.com">privacy@talentwithus.com</a>.
          </p>
        </section>
      </article>
    </section>
  </main>
)

export default page