import React from 'react'

const page = () => (
  <main className="bg-gradient-to-br from-blue-50 via-white to-white min-h-screen py-10 px-4 flex justify-center items-start">
    <section className="max-w-3xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-200 p-8 md:p-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 drop-shadow mb-3">
          Terms & Conditions
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-blue-500 mb-1">
          TalentWithUs Software Pvt. Ltd.
        </h2>
        <div className="text-base font-medium text-blue-400">Effective Date: October 29, 2025</div>
      </div>

      <article className="space-y-8 text-blue-900 text-justify leading-relaxed">
        <section>
          <h3 className="text-lg font-bold text-blue-700 mb-2">Introduction</h3>
          <p>
            These Terms and Conditions (“Terms”) govern your use of software, websites, and services (“Services”) provided by TalentWithUs Software Pvt. Ltd. (“TalentWithUs”, “we”, “us” or “our”). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, please do not use our Services.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-700 mb-2">Use of Services</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>You must be at least 18 years old or have legal parental consent to use our Services.</li>
            <li>You agree to provide accurate, complete, and current information.</li>
            <li>Unauthorized or illegal use of the Services is strictly prohibited.</li>
            <li>You agree not to engage in any activity that disrupts or interferes with the Services.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-700 mb-2">Intellectual Property</h3>
          <p>
            All content, software, trademarks, and materials provided by TalentWithUs are the property of TalentWithUs and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-700 mb-2">User Content</h3>
          <p>
            You retain all rights to content you submit or upload. By submitting, you grant us a non-exclusive license to use, display, and distribute your content in relation to providing the Services. You are responsible for your content and must not infringe the rights of third parties.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-700 mb-2">Privacy Policy</h3>
          <p>
            Your privacy is important to us. Please review our <a className="text-blue-600 underline" href="/privacy-policy">Privacy Policy</a> for details on how we collect, use, and protect your information.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-700 mb-2">Limitation of Liability</h3>
          <p>
            Our Services are provided “as is” and without any warranties. TalentWithUs is not liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use the Services. This limitation applies to the fullest extent permitted by law.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-700 mb-2">Termination</h3>
          <p>
            We reserve the right to suspend or terminate your access to our Services at any time, without prior notice, for any violation of these Terms or for any other reason deemed appropriate by us.
          </p>
        </section>
        
        <section>
          <h3 className="text-lg font-bold text-blue-700 mb-2">Governing Law</h3>
          <p>
            These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of the Services are subject to the exclusive jurisdiction of the courts in Bengaluru, India.
          </p>
        </section>
        
        <section>
          <h3 className="text-lg font-bold text-blue-700 mb-2">Changes to Terms</h3>
          <p>
            We may update these Terms from time to time. Users will be notified of any material changes, and continued use of the Services constitutes acceptance of the revised Terms.
          </p>
        </section>
        
        <section>
          <h3 className="text-lg font-bold text-blue-700 mb-2">Contact Us</h3>
          <p>
            For any questions or concerns regarding these Terms, contact us at <a className="text-blue-600 underline" href="mailto:support@talentwithus.com">support@talentwithus.com</a>.
          </p>
        </section>
      </article>
    </section>
  </main>
)

export default page
