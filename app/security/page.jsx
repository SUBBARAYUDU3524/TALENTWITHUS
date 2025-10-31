import React from 'react';

const SecurityPage = () => (
  <main className="bg-gradient-to-br from-blue-50 via-white to-white min-h-screen py-10 px-4 flex justify-center items-start">
    <section className="max-w-3xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-200 p-8 md:p-12 text-blue-900 text-justify leading-relaxed">
      <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow mb-6 text-center">
        Security Policy
      </h1>

      <article className="space-y-8">
        <section>
          <p>
            TalentWithUs prioritizes the security of our systems, products, and customer data. This Security Policy outlines the measures and controls we employ to safeguard information confidentiality, integrity, and availability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Scope</h2>
          <p>
            This policy applies to all employees, contractors, and partners with access to TalentWithUs’s systems and data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Core Principles</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Confidentiality:</strong> Ensuring data is accessed only by authorized individuals.</li>
            <li><strong>Integrity:</strong> Maintaining data accuracy and preventing unauthorized changes.</li>
            <li><strong>Availability:</strong> Guaranteeing data and services are accessible when needed.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Security Measures</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Role-based access control and strong authentication.</li>
            <li>Encryption of sensitive data in transit and at rest.</li>
            <li>Regular vulnerability assessments and penetration tests.</li>
            <li>Continuous network and system monitoring.</li>
            <li>Employee training on security best practices.</li>
            <li>Incident response and disaster recovery planning.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Data Protection</h2>
          <p>
            We comply with relevant data protection laws and retain data only as long as necessary.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Reporting</h2>
          <p>
            Users and employees are encouraged to report any security concerns promptly through dedicated channels.
          </p>
        </section>
      </article>
    </section>
  </main>
);

export default SecurityPage;
