// 'use client';

// import { useState } from 'react';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { db } from '../../FirebaseConfig';

// const TYPE_OPTIONS = [
//   {
//     value: 'website',
//     label: 'Website',
//     desc: 'Professional, scalable web platforms for any purpose.',
//   },
//   {
//     value: 'app',
//     label: 'App',
//     desc: 'Mobile apps for iOS, Android, or both — native or cross-platform.',
//   },
//   {
//     value: 'automation',
//     label: 'Automation Tool',
//     desc: 'Automate workflows, business logic, or repetitive tasks.',
//   },
//   {
//     value: 'ai',
//     label: 'AI/ML Solution',
//     desc: 'Custom AI models, chatbots, analytics & intelligent systems.',
//   },
//   {
//     value: 'product',
//     label: 'Digital Product',
//     desc: 'SaaS, e-commerce, dashboards, portals and more.',
//   },
//   { value: 'other', label: 'Other', desc: 'Tell us your unique vision!' },
// ];

// export default function CreationRequestForm() {
//   const [type, setType] = useState(TYPE_OPTIONS[0].value);
//   const [form, setForm] = useState({
//     name: '',
//     purpose: '',
//     platform: '',
//     features: '',
//     targetAudience: '',
//     phone: '',
//     details: '',
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setType(e.target.value);
//     setForm({
//       name: '',
//       purpose: '',
//       platform: '',
//       features: '',
//       targetAudience: '',
//       phone: '',
//       details: '',
//     });
//     setSubmitted(false);
//     setError('');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const dataToSave = {
//         requestType: type,
//         projectName: form.name,
//         purpose: form.purpose,
//         platform: ['app', 'automation'].includes(type) ? form.platform : '',
//         features: form.features,
//         targetAudience: form.targetAudience,
//         phoneNumber: form.phone,
//         details: form.details,
//         createdAt: serverTimestamp(),
//       };
//       await addDoc(collection(db, 'creationRequests'), dataToSave);
//       setSubmitted(true);
//       setForm({
//         name: '',
//         purpose: '',
//         platform: '',
//         features: '',
//         targetAudience: '',
//         phone: '',
//         details: '',
//       });
//     } catch {
//       setError('Something went wrong. Please try again.');
//       setSubmitted(false);
//     }
//   };

//   return (
//     <section className="py-16 px-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d1e7f9] via-[#dbe3f0] to-[#bbc3df] text-gray-900">
//       <div className="w-full max-w-4xl mx-auto bg-white/95 rounded-2xl p-12 sm:p-16 shadow-2xl border border-sky-200">
//         <h2 className="text-3xl font-bold mb-4 text-center text-sky-700 tracking-wide">
//           Request Your Digital Solution
//         </h2>
//         <p className="text-center text-slate-700 mb-12 max-w-xl mx-auto">
//           Looking for a website, app, or something custom? Tell us your vision —
//           our expert team will guide you from idea to launch!
//         </p>
//         {/* Type Selection */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
//           {TYPE_OPTIONS.map((opt) => (
//             <label
//               key={opt.value}
//               className={`flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition shadow-md select-none text-center text-slate-700 ${
//                 type === opt.value
//                   ? 'bg-sky-700 text-white border-sky-800 shadow-lg'
//                   : 'bg-white border-slate-300 hover:border-sky-500'
//               }`}
//               title={opt.desc}
//             >
//               <input
//                 type="radio"
//                 name="type"
//                 value={opt.value}
//                 checked={type === opt.value}
//                 onChange={handleTypeChange}
//                 className="sr-only"
//               />
//               <span className="text-lg font-semibold">{opt.label}</span>
//               <small className="mt-1 text-sm text-slate-400">{opt.desc}</small>
//             </label>
//           ))}
//         </div>

//         {submitted ? (
//           <div className="p-8 bg-green-600 rounded-lg shadow-lg text-white text-center text-xl font-semibold">
//             Thanks for submitting! Our team will contact you soon.
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-8">
//             <div>
//               <label className="block mb-2 font-semibold text-slate-700">
//                 {type === 'website'
//                   ? 'Website Name'
//                   : type === 'app'
//                   ? 'App Name'
//                   : type === 'automation'
//                   ? 'Automation Tool Name'
//                   : type === 'ai'
//                   ? 'AI/ML Solution Name'
//                   : type === 'product'
//                   ? 'Product Name'
//                   : 'Project Name'}
//               </label>
//               <input
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//                 placeholder="Project Name"
//                 className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
//               />
//             </div>
//             <div>
//               <label className="block mb-2 font-semibold text-slate-700">
//                 Purpose
//               </label>
//               <input
//                 name="purpose"
//                 value={form.purpose}
//                 onChange={handleChange}
//                 required
//                 placeholder="e.g. Sell products, automate tasks, launch SaaS"
//                 className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
//               />
//             </div>

//             {(type === 'app' || type === 'automation') && (
//               <div>
//                 <label className="block mb-2 font-semibold text-slate-700">
//                   Platform
//                 </label>
//                 <select
//                   name="platform"
//                   value={form.platform}
//                   onChange={handleChange}
//                   required
//                   className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
//                 >
//                   <option value="">Select platform</option>
//                   <option value="iOS">iOS</option>
//                   <option value="Android">Android</option>
//                   <option value="Desktop">Desktop</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             )}

//             <div>
//               <label className="block mb-2 font-semibold text-slate-700">
//                 Key Features / Requirements
//               </label>
//               <input
//                 name="features"
//                 value={form.features}
//                 onChange={handleChange}
//                 required
//                 placeholder="e.g. Payments, AI, chat, admin panel"
//                 className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
//               />
//             </div>

//             <div>
//               <label className="block mb-2 font-semibold text-slate-700">
//                 Target Audience
//               </label>
//               <input
//                 name="targetAudience"
//                 value={form.targetAudience}
//                 onChange={handleChange}
//                 required
//                 placeholder="e.g. Students, enterprises, public"
//                 className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
//               />
//             </div>

//             <div>
//               <label className="block mb-2 font-semibold text-slate-700">
//                 Phone Number
//               </label>
//               <input
//                 name="phone"
//                 value={form.phone}
//                 onChange={handleChange}
//                 required
//                 type="tel"
//                 pattern="[0-9]{10,15}"
//                 placeholder="Enter your phone number"
//                 className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
//               />
//             </div>

//             <div>
//               <label className="block mb-2 font-semibold text-slate-700">
//                 More Details (optional)
//               </label>
//               <textarea
//                 name="details"
//                 value={form.details}
//                 onChange={handleChange}
//                 rows={4}
//                 placeholder="Describe your requirements, timelines, inspirations, or questions…"
//                 className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
//               />
//             </div>

//             {error && <p className="text-red-600 text-center">{error}</p>}

//             <button
//               type="submit"
//               className="w-full py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-lg hover:bg-sky-700 cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-sky-400"
//             >
//               Request{' '}
//               {TYPE_OPTIONS.find((opt) => opt.value === type)?.label ||
//                 'Project'}
//             </button>
//           </form>
//         )}
//       </div>
//     </section>
//   );
// }

'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

const TYPE_OPTIONS = [
  {
    value: 'website',
    label: 'Website',
    desc: 'Professional, scalable web platforms for any purpose.',
  },
  {
    value: 'app',
    label: 'App',
    desc: 'Mobile apps for iOS, Android, or both — native or cross-platform.',
  },
  {
    value: 'automation',
    label: 'Automation Tool',
    desc: 'Automate workflows, business logic, or repetitive tasks.',
  },
  {
    value: 'ai',
    label: 'AI/ML Solution',
    desc: 'Custom AI models, chatbots, analytics & intelligent systems.',
  },
  {
    value: 'product',
    label: 'Digital Product',
    desc: 'SaaS, e-commerce, dashboards, portals and more.',
  },
  { value: 'other', label: 'Other', desc: 'Tell us your unique vision!' },
];

export default function CreationRequestForm() {
  const [type, setType] = useState(TYPE_OPTIONS[0].value);
  const [form, setForm] = useState({
    name: '',
    purpose: '',
    platform: '',
    features: '',
    targetAudience: '',
    phone: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
    setForm({
      name: '',
      purpose: '',
      platform: '',
      features: '',
      targetAudience: '',
      phone: '',
      details: '',
    });
    setSubmitted(false);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const dataToSave = {
        requestType: type,
        projectName: form.name,
        purpose: form.purpose,
        platform: ['app', 'automation'].includes(type) ? form.platform : '',
        features: form.features,
        targetAudience: form.targetAudience,
        phoneNumber: form.phone,
        details: form.details,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'creationRequests'), dataToSave);
      setSubmitted(true);
      setForm({
        name: '',
        purpose: '',
        platform: '',
        features: '',
        targetAudience: '',
        phone: '',
        details: '',
      });
    } catch {
      setError('Something went wrong. Please try again.');
      setSubmitted(false);
    }
  };

  return (
    <section className="py-10 px-4 min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white text-gray-900">
      <div className="w-full max-w-4xl mx-auto bg-white/90 rounded-2xl p-6 sm:p-12 shadow-2xl border border-[#1EB8F345]">
        <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-[#1EB8F3] via-[#00AEEF] to-[#0059FF] bg-clip-text text-transparent tracking-wide">
          Request Your Digital Solution
        </h2>
        <p className="text-center text-slate-700 mb-10 max-w-xl mx-auto">
          Looking for a website, app, or something custom? Tell us your vision — our expert team will guide you from idea to launch!
        </p>
        {/* Type Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {TYPE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex flex-col items-center justify-center px-5 py-4 rounded-xl border cursor-pointer transition text-center text-base font-medium shadow-sm
                ${type === opt.value
                  ? 'bg-gradient-to-r from-[#1EB8F3] to-[#0059FF] text-white border-blue-700 shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-slate-200 hover:border-blue-400 hover:shadow-lg hover:scale-105'
                }`}
              style={{ minHeight: '7.5rem' }}
              title={opt.desc}
              tabIndex={0}
            >
              <input
                type="radio"
                name="type"
                value={opt.value}
                checked={type === opt.value}
                onChange={handleTypeChange}
                className="sr-only"
              />
              <span className={`text-lg font-semibold mb-1 ${type === opt.value ? 'text-white' : 'text-blue-800'} transition`}>
                {opt.label}
              </span>
              <small className={`mt-1 text-sm ${type === opt.value ? 'text-blue-100' : 'text-slate-400'}`}>
                {opt.desc}
              </small>
            </label>
          ))}
        </div>

        {submitted ? (
          <div className="p-8 bg-gradient-to-r from-green-500 to-blue-400 rounded-lg shadow-lg text-white text-center text-xl font-semibold">
            Thanks for submitting! Our team will contact you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                {type === 'website'
                  ? 'Website Name'
                  : type === 'app'
                  ? 'App Name'
                  : type === 'automation'
                  ? 'Automation Tool Name'
                  : type === 'ai'
                  ? 'AI/ML Solution Name'
                  : type === 'product'
                  ? 'Product Name'
                  : 'Project Name'}
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Project Name"
                className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Purpose
              </label>
              <input
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                required
                placeholder="e.g. Sell products, automate tasks, launch SaaS"
                className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {(type === 'app' || type === 'automation') && (
              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Platform
                </label>
                <select
                  name="platform"
                  value={form.platform}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Select platform</option>
                  <option value="iOS">iOS</option>
                  <option value="Android">Android</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            )}

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Key Features / Requirements
              </label>
              <input
                name="features"
                value={form.features}
                onChange={handleChange}
                required
                placeholder="e.g. Payments, AI, chat, admin panel"
                className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Target Audience
              </label>
              <input
                name="targetAudience"
                value={form.targetAudience}
                onChange={handleChange}
                required
                placeholder="e.g. Students, enterprises, public"
                className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Phone Number
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                type="tel"
                pattern="[0-9]{10,15}"
                placeholder="Enter your phone number"
                className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                More Details (optional)
              </label>
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your requirements, timelines, inspirations, or questions…"
                className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              />
            </div>

            {error && <p className="text-red-600 text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#1EB8F3] to-[#0059FF] text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:bg-gradient-to-r hover:from-[#0059FF] hover:to-[#1EB8F3] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Request{' '}
              {TYPE_OPTIONS.find((opt) => opt.value === type)?.label ||
                'Project'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
