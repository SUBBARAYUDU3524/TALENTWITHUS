import React from 'react';

export default function WhyChooseUsSection() {
  return (
    <section
      id="whychooseus"
      className=" max-w-7xl mx-auto  rounded-3xl"
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-cyan-900 flex justify-center gap-2 items-center">
        <span className="hidden sm:block">🌟</span> Why Choose Talent With Us?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-[#deeaf3] shadow-xl border-t-8 md:border-l-8 md:border-t-0 border-cyan-500 rounded-2xl p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col gap-4">
          <ul className="space-y-5 text-gray-700 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 text-2xl">🤝</span>
              <div>
                <b>Client-Centric Approach</b> – We listen, strategize, and deliver exactly what you envision.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 text-2xl">🔒</span>
              <div>
                <b>Enterprise-Grade Security & Quality</b> – ISO practices, rigorous QA, and secure development.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 text-2xl">⚡</span>
              <div>
                <b>Agile & Transparent Process</b> – Fast, flexible, and always in touch.
              </div>
            </li>
          </ul>
        </div>
        <div className="bg-[#deeaf3] shadow-xl border-t-8 md:border-l-8 md:border-t-0 border-yellow-500 rounded-2xl p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col gap-4">
          <ul className="space-y-5 text-gray-700 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 text-2xl">💡</span>
              <div>
                <b>Innovation First</b> – We're ahead of trends: AI, cloud, and modern frameworks.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 text-2xl">⏰</span>
              <div>
                <b>24/7 Support</b> – Prompt, reliable, and ongoing help even after delivery.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 text-2xl">🚀</span>
              <div>
                <b>End-to-End Ownership</b> – From discovery to launch and beyond, we're with you.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
