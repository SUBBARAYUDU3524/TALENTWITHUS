import React from 'react';

const CompliancePage = () => (
  <main className="bg-gradient-to-br from-blue-50 via-white to-white min-h-screen py-10 px-4 flex justify-center items-start">
    <section className="max-w-3xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-200 p-8 md:p-12 text-blue-900 text-justify leading-relaxed">
      <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow mb-6 text-center">
        Compliance Policy
      </h1>

      <article className="space-y-8">
        <section>
          <p>
            TalentWithUs is dedicated to meeting all legal, regulatory, and industry standards applicable to our software development and services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Regulatory Compliance</h2>
          <p>
            We comply with GDPR, ISO 27001, and other relevant frameworks to protect data privacy and maintain operational integrity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Internal Controls</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Frequent audits to monitor compliance.</li>
            <li>Training programs to educate employees on compliance obligations.</li>
            <li>Risk assessments and policy updates aligned with regulatory changes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Vendor Compliance</h2>
          <p>
            All third-party vendors are assessed to ensure they adhere to our compliance standards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Transparency and Accountability</h2>
          <p>
            We maintain clear communication about compliance policies and expect strict adherence from all personnel.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Contact Us</h2>
          <p>
            For compliance questions or concerns, contact us at <a className="text-blue-600 underline" href="mailto:compliance@talentwithus.com">compliance@talentwithus.com</a>.
          </p>
        </section>
      </article>
    </section>
  </main>
);

export default CompliancePage;
