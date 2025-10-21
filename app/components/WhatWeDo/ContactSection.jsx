// 'use client';
// import React from 'react';
// import Image from 'next/image';
// import contactImg from '../../../public/assets/contact.jpg'; // Replace with your image path

// export default function ContactSection() {
//   return (
//     <section className="py-16 px-4  ">
//       <h2 className="text-4xl text-white text-center font-bold mb-5">
//         Have a project in mind?
//       </h2>
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-0 md:gap-8 rounded-3xl shadow-2xl border border-cyan-800 bg-gradient-to-br from-[#1e2a44] to-[#181b29] overflow-hidden">
//         {/* Image Side */}
//         <div className="relative hidden md:block w-1/2 min-h-[440px]">
//           <Image
//             src={contactImg}
//             alt="Contact illustration"
//             fill
//             className="object-cover object-center h-full w-full"
//             sizes="(max-width: 1024px) 100vw, 50vw"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#1e2a44]/80 via-transparent to-transparent"></div>
//         </div>
//         {/* Form Side */}
//         <div className="flex-1 flex flex-col justify-center px-6 py-10 md:py-0">
//           <p className="my-5 text-cyan-100 text-center md:text-left">
//             Ready to transform your ideas into reality?{' '}
//             <span className="text-cyan-300 font-semibold">
//               Let’s build something exceptional together.
//             </span>
//             <br />
//             Fill out the form and our team will get back to you within 24 hours.
//           </p>
//           <form
//             action="https://formspree.io/f/yourformid"
//             method="POST"
//             className="w-full space-y-5"
//           >
//             <div>
//               <label className="block mb-1 font-medium text-cyan-300">
//                 Name
//               </label>
//               <input
//                 name="name"
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-cyan-600 bg-[#11192a] text-white"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-medium text-cyan-300">
//                 Email
//               </label>
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-cyan-600 bg-[#11192a] text-white"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-medium text-cyan-300">
//                 Service Type
//               </label>
//               <select
//                 name="service"
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-cyan-600 bg-[#11192a] text-white"
//               >
//                 <option value="">Select Service</option>
//                 <option>Project Development</option>
//                 <option>App Development</option>
//                 <option>Website</option>
//                 <option>SEO</option>
//                 <option>Branding</option>
//                 <option>AI/ML</option>
//                 <option>Other</option>
//               </select>
//             </div>
//             <div>
//               <label className="block mb-1 font-medium text-cyan-300">
//                 Message
//               </label>
//               <textarea
//                 name="message"
//                 rows={3}
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-cyan-600 bg-[#11192a] text-white"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full cursor-pointer py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition"
//             >
//               Send Inquiry
//             </button>
//           </form>
//           <div className="mt-6 text-center text-cyan-200 text-sm mb-4">
//             Or email us at{' '}
//             <a
//               href="mailto:hello@yourcompany.com"
//               className="underline text-cyan-300 "
//             >
//               hello@yourcompany.com
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';
import React from 'react';
import Image from 'next/image';
import contactImg from '../../../public/contact2.jpg'; // Update to your image path

export default function ContactSection() {
  return (
    <section className="pb-16 pt-5 px-4">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] via-[#00AEEF] to-[#0059FF]">
        Let’s Connect About Your Project
      </h2>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-0 md:gap-10 rounded-3xl shadow-xl border border-cyan-100 bg-white/90 overflow-hidden">
        {/* Image Side */}
        <div className="relative hidden md:block w-1/2 min-h-[440px]">
          <Image
            src={contactImg}
            alt="Contact illustration"
            fill
            className="object-cover object-center h-full w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1eb8f3aa] via-transparent to-transparent"></div>
        </div>
        {/* Form Side */}
        <div className="flex-1 flex flex-col justify-center px-6 py-10 md:py-0 bg-white/90">
          <p className="my-4 text-cyan-900 text-center md:text-left text-lg font-medium">
            Ready to transform your ideas into reality? <br />
            <span className="text-cyan-700 font-bold">
              Let’s build something exceptional together.
            </span>
            <br />
            Fill out the form and our team will get back to you within 24 hours.
          </p>
          <form
            action="https://formspree.io/f/yourformid"
            method="POST"
            className="w-full space-y-5"
          >
            <div>
              <label className="block mb-1 font-semibold text-cyan-700">
                Name
              </label>
              <input
                name="name"
                required
                className="w-full px-4 py-2 rounded-lg border border-cyan-300 bg-blue-50 text-cyan-900 focus:ring-2 focus:ring-cyan-200"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-cyan-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 rounded-lg border border-cyan-300 bg-blue-50 text-cyan-900 focus:ring-2 focus:ring-cyan-200"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-cyan-700">
                Service Type
              </label>
              <select
                name="service"
                required
                className="w-full px-4 py-2 rounded-lg border border-cyan-300 bg-blue-50 text-cyan-900 focus:ring-2 focus:ring-cyan-200"
              >
                <option value="">Select Service</option>
                <option>Project Development</option>
                <option>App Development</option>
                <option>Website</option>
                <option>SEO</option>
                <option>Branding</option>
                <option>AI/ML</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold text-cyan-700">
                Message
              </label>
              <textarea
                name="message"
                rows={3}
                required
                className="w-full px-4 py-2 rounded-lg border border-cyan-300 bg-blue-50 text-cyan-900 focus:ring-2 focus:ring-cyan-200"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer py-3 bg-gradient-to-r from-[#1EB8F3] to-[#0052CC] hover:from-[#0052CC] hover:to-[#1EB8F3] text-white font-bold rounded-lg transition shadow-lg"
            >
              Send Inquiry
            </button>
          </form>
          <div className="mt-6 text-center text-cyan-700 text-sm mb-4">
            Or email us at{' '}
            <a
              href="mailto:hello@yourcompany.com"
              className="underline text-cyan-600 hover:text-cyan-400"
            >
              hello@yourcompany.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
