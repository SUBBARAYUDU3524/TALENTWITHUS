// 'use client';
// import React, { useState } from 'react';
// import {
//   FaReact,
//   FaNodeJs,
//   FaPython,
//   FaJava,
//   FaAws,
//   FaDatabase,
//   FaAndroid,
//   FaApple,
//   FaAngular,
//   FaPhp,
//   FaHtml5,
//   FaCss3Alt,
// } from 'react-icons/fa';
// import {
//   SiNextdotjs,
//   SiMongodb,
//   SiTailwindcss,
//   SiFirebase,
//   SiDjango,
//   SiFlutter,
//   SiLaravel,
//   SiMysql,
//   SiKubernetes,
//   SiDocker,
// } from 'react-icons/si';

// const techSupports = [
//   {
//     icon: <FaReact className="text-cyan-400 text-4xl" />,
//     name: 'React.js',
//     short: 'Modern UI & Single Page Applications',
//     desc: 'We provide comprehensive support for React.js projects, including code reviews, complex state management, performance optimization, UI/UX best practices, and troubleshooting. Ideal for startups and enterprises building scalable frontends.',
//     highlights: [
//       'SPA architecture and routing',
//       'Hooks & Context API',
//       'Performance tuning',
//       'Component library integration',
//     ],
//   },
//   {
//     icon: <SiNextdotjs className="text-gray-200 text-4xl" />,
//     name: 'Next.js',
//     short: 'SSR, SSG, and Fullstack Capabilities',
//     desc: 'From server-side rendering to API routes, our team helps you leverage Next.js for SEO-friendly, highly performant web applications. We support deployment, static export, and advanced routing strategies.',
//     highlights: [
//       'Server-side rendering (SSR)',
//       'API routes and backend integration',
//       'Static site generation (SSG)',
//       'SEO optimization',
//     ],
//   },
//   {
//     icon: <FaNodeJs className="text-green-500 text-4xl" />,
//     name: 'Node.js',
//     short: 'Backend APIs & Real-Time Solutions',
//     desc: 'Expertise in building scalable REST APIs, WebSockets, and microservices with Node.js and Express. We help debug, optimize, and scale your backend for production and cloud environments.',
//     highlights: [
//       'REST API development',
//       'Real-time & event-driven apps',
//       'Express.js, NestJS, Socket.IO',
//       'Cloud deployment (AWS/GCP/Azure)',
//     ],
//   },
//   {
//     icon: <SiMongodb className="text-green-400 text-4xl" />,
//     name: 'MongoDB',
//     short: 'Flexible NoSQL Database Support',
//     desc: 'Get help with schema design, aggregation pipelines, performance tuning, and Atlas setup. We resolve data migration, security, and scaling issues for high-traffic MongoDB deployments.',
//     highlights: [
//       'Schema modeling & validation',
//       'Aggregation framework',
//       'Performance optimization',
//       'Atlas cloud setup',
//     ],
//   },
//   {
//     icon: <FaPython className="text-yellow-400 text-4xl" />,
//     name: 'Python',
//     short: 'Automation, Scripting & ML/AI',
//     desc: 'We support automation scripts, data analysis, and end-to-end machine learning workflows using Python. Our team assists with troubleshooting, code optimization, and deployment.',
//     highlights: [
//       'Automation & data pipelines',
//       'Flask, Django web frameworks',
//       'Machine learning (scikit-learn, TensorFlow)',
//       'Scripting best practices',
//     ],
//   },
//   {
//     icon: <SiDjango className="text-green-200 text-4xl" />,
//     name: 'Django',
//     short: 'Robust Web Backends',
//     desc: 'Support for Django projects including ORM queries, admin customization, REST APIs with DRF, and deployment. Ideal for businesses needing secure, scalable backend solutions.',
//     highlights: [
//       'Django ORM and admin',
//       'Authentication & permissions',
//       'Django REST Framework (DRF)',
//       'Server deployment (Gunicorn/Nginx)',
//     ],
//   },
//   {
//     icon: <FaJava className="text-orange-400 text-4xl" />,
//     name: 'Java',
//     short: 'Enterprise Apps & Android Backend',
//     desc: 'Our Java experts provide support for Spring Boot microservices, enterprise systems, and Android backend integrations. We help with debugging, scalability, and deployment.',
//     highlights: [
//       'Spring Boot microservices',
//       'Java EE & REST APIs',
//       'Performance tuning',
//       'Android backend integration',
//     ],
//   },
//   {
//     icon: <FaAndroid className="text-green-300 text-4xl" />,
//     name: 'Android',
//     short: 'Native Mobile App Support',
//     desc: 'Get assistance with native Android app development, UI/UX, API integration, and troubleshooting. We help you publish and optimize apps for the Play Store.',
//     highlights: [
//       'Kotlin & Java app development',
//       'UI/UX & Material Design',
//       'API & Firebase integration',
//       'Publishing & Play Store support',
//     ],
//   },
//   {
//     icon: <FaApple className="text-gray-200 text-4xl" />,
//     name: 'iOS',
//     short: 'Swift & Objective-C Apps',
//     desc: 'We support iOS mobile projects from UI building to backend integration and App Store deployment, ensuring quality and performance.',
//     highlights: [
//       'Swift & Objective-C',
//       'UI/UX with UIKit/SwiftUI',
//       'API & Core Data integration',
//       'App Store publishing',
//     ],
//   },
//   {
//     icon: <SiFlutter className="text-cyan-400 text-4xl" />,
//     name: 'Flutter',
//     short: 'Cross-Platform Mobile Apps',
//     desc: 'Build and support high-quality mobile apps for Android and iOS from a single codebase using Dart and Flutter. Assistance with widgets, plugins, and deployment.',
//     highlights: [
//       'Custom widget development',
//       'State management (Provider, Bloc)',
//       'Plugin integration',
//       'Cross-platform deployment',
//     ],
//   },
//   {
//     icon: <FaAngular className="text-red-400 text-4xl" />,
//     name: 'Angular',
//     short: 'Enterprise-Grade Web Apps',
//     desc: 'Support for Angular projects including enterprise architecture, RxJS, services, and CLI tooling. Best for scalable, maintainable web applications.',
//     highlights: [
//       'RxJS & reactive programming',
//       'Component & module structure',
//       'CLI and build tools',
//       'State management (NgRx)',
//     ],
//   },
//   {
//     icon: <SiTailwindcss className="text-cyan-300 text-4xl" />,
//     name: 'Tailwind CSS',
//     short: 'Rapid UI Development',
//     desc: 'Expert guidance in crafting custom designs and responsive layouts with Tailwind CSS. We assist with best practices and integration.',
//     highlights: [
//       'Utility-first CSS',
//       'Custom theming',
//       'Responsive design',
//       'Performance optimization',
//     ],
//   },
//   {
//     icon: <FaPhp className="text-indigo-400 text-4xl" />,
//     name: 'PHP',
//     short: 'Websites, APIs & WordPress',
//     desc: 'From custom PHP applications to WordPress and Laravel, we support code fixes, plugin integration, and security hardening.',
//     highlights: [
//       'Custom PHP development',
//       'WordPress plugins & themes',
//       'Laravel framework',
//       'Security & optimization',
//     ],
//   },
//   {
//     icon: <SiLaravel className="text-red-400 text-4xl" />,
//     name: 'Laravel',
//     short: 'Modern PHP Web Framework',
//     desc: 'Support for Laravel-based web apps, REST APIs, Blade templating, and deployment. We help with migrations, authentication, and testing.',
//     highlights: [
//       'RESTful API development',
//       'Blade templates & Mix',
//       'Database migrations',
//       'Authentication & middleware',
//     ],
//   },
//   {
//     icon: <SiMysql className="text-blue-400 text-4xl" />,
//     name: 'MySQL',
//     short: 'Reliable Relational Databases',
//     desc: 'We help design, optimize, and troubleshoot MySQL databases, from queries to backups and cloud hosting.',
//     highlights: [
//       'Schema design',
//       'Query optimization',
//       'Replication & backups',
//       'Cloud database setup',
//     ],
//   },
//   {
//     icon: <FaDatabase className="text-purple-400 text-4xl" />,
//     name: 'Other Databases',
//     short: 'PostgreSQL, Redis, Firebase, etc.',
//     desc: 'We also provide support for PostgreSQL, Redis, Firebase, and other databases. Get help with setup, queries, and integrations.',
//     highlights: [
//       'PostgreSQL/Redis setup',
//       'Realtime databases (Firebase)',
//       'Data migration',
//       'Backup and restore',
//     ],
//   },
//   {
//     icon: <FaAws className="text-yellow-300 text-4xl" />,
//     name: 'AWS Cloud',
//     short: 'Cloud Infrastructure & DevOps',
//     desc: 'Full support for AWS services including EC2, S3, Lambda, IAM, and deployment pipelines. We help you scale and secure your infrastructure.',
//     highlights: [
//       'EC2, S3, Lambda',
//       'IAM & security',
//       'CI/CD pipelines',
//       'Scalability & monitoring',
//     ],
//   },
//   {
//     icon: <SiKubernetes className="text-blue-400 text-4xl" />,
//     name: 'Kubernetes',
//     short: 'Container Orchestration',
//     desc: 'Support for Kubernetes setup, scaling, and management. We assist with deployment, monitoring, and troubleshooting clusters.',
//     highlights: [
//       'Cluster setup',
//       'Pod & service management',
//       'Helm charts',
//       'Scaling & monitoring',
//     ],
//   },
//   {
//     icon: <SiDocker className="text-blue-300 text-4xl" />,
//     name: 'Docker',
//     short: 'Containerization & DevOps',
//     desc: 'Get help with Dockerizing your apps, creating Dockerfiles & Compose files, and CI/CD integration for rapid deployment.',
//     highlights: [
//       'Dockerfile & Compose',
//       'CI/CD pipelines',
//       'Container security',
//       'Multi-environment support',
//     ],
//   },
//   {
//     icon: <SiFirebase className="text-yellow-400 text-4xl" />,
//     name: 'Firebase',
//     short: 'Realtime Apps & Cloud Functions',
//     desc: 'Full stack support for Firebase projects: Realtime DB, Firestore, Auth, Cloud Functions, and hosting.',
//     highlights: [
//       'Realtime DB & Firestore',
//       'Authentication',
//       'Cloud Functions',
//       'Hosting & deployment',
//     ],
//   },
//   {
//     icon: <FaHtml5 className="text-orange-400 text-4xl" />,
//     name: 'HTML5',
//     short: 'Modern, Accessible Web Markup',
//     desc: 'Support for writing semantic, accessible, and SEO-friendly HTML5 for web projects and landing pages.',
//     highlights: [
//       'Semantic markup',
//       'SEO best practices',
//       'Responsive design',
//       'Accessibility (a11y)',
//     ],
//   },
// ];

// export default function OurWorks() {
//   const [modal, setModal] = useState(null);

//   return (
//     <div>
//       <div className="text-center mx-auto max-w-2xl mb-10">
//         <p className="text-gray-300 text-base">
//           Our team provides end-to-end support, project delivery,
//           troubleshooting, and optimization on a wide range of leading
//           technologies and platforms. Whether you need full-stack development,
//           mobile apps, cloud, or DevOps—we've got your stack covered.
//         </p>
//       </div>
//       <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
//         {techSupports.map((tech, idx) => (
//           <div
//             key={tech.name}
//             className="flex flex-col items-center bg-gradient-to-br from-[#161b22] via-[#10121a] to-[#23272f] border border-cyan-900 rounded-2xl shadow-lg p-6 hover:scale-105 transition min-h-[260px] cursor-pointer text-center"
//             onClick={() => setModal(idx)}
//           >
//             <div className="mb-3">{tech.icon}</div>
//             <div className="text-lg font-semibold text-cyan-300 mb-1">
//               {tech.name}
//             </div>
//             <div className="text-cyan-200 text-sm mb-2">{tech.short}</div>
//             <div className="text-gray-400 text-xs">
//               {tech.desc.slice(0, 60)}...
//             </div>
//             <button
//               className="mt-5 cursor-pointer py-2 px-5 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setModal(idx);
//               }}
//             >
//               Learn More
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       {modal !== null && (
//         <div className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center px-3">
//           <div className="bg-gradient-to-br from-[#181b29] via-[#0a0a0a] to-[#191c24] border-2 border-cyan-700 rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
//             <button
//               className="absolute top-4 right-5 text-2xl text-cyan-300 cursor-pointer hover:text-cyan-200 transition"
//               onClick={() => setModal(null)}
//               aria-label="Close"
//             >
//               &times;
//             </button>
//             <div className="flex items-center gap-4 mb-4">
//               <span>{techSupports[modal].icon}</span>
//               <span className="text-xl font-bold text-cyan-300">
//                 {techSupports[modal].name}
//               </span>
//             </div>
//             <div className="mb-2 text-cyan-200 text-base font-semibold">
//               {techSupports[modal].short}
//             </div>
//             <div className="mb-5 text-gray-300">{techSupports[modal].desc}</div>
//             <div className="mb-5">
//               <div className="font-semibold text-cyan-400 mb-2">
//                 Key Areas We Support:
//               </div>
//               <ul className="list-disc pl-6 text-gray-300 text-sm space-y-1">
//                 {techSupports[modal].highlights.map((item, i) => (
//                   <li key={i}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//             <a
//               href="#contact"
//               onClick={() => setModal(null)}
//               className="block w-full text-center py-3 rounded-lg font-semibold bg-cyan-600 hover:bg-cyan-700 transition text-white shadow text-lg"
//             >
//               Book a Demo
//             </a>
//           </div>
//           <style jsx>{`
//             .animate-fade-in {
//               animation: fadeIn 0.18s;
//             }
//             @keyframes fadeIn {
//               from {
//                 opacity: 0;
//                 transform: translateY(10px);
//               }
//               to {
//                 opacity: 1;
//                 transform: translateY(0);
//               }
//             }
//           `}</style>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';
import React, { useState } from 'react';
import {
  FaReact, FaNodeJs, FaPython, FaJava, FaAws, FaDatabase, FaAndroid, FaApple,
  FaAngular, FaPhp, FaHtml5, FaCss3Alt,
} from 'react-icons/fa';
import {
  SiNextdotjs, SiMongodb, SiTailwindcss, SiFirebase,
  SiDjango, SiFlutter, SiLaravel, SiMysql, SiKubernetes, SiDocker,
} from 'react-icons/si';
 
const techSupports = [
  {
    icon: <FaReact className="text-cyan-400 text-4xl" />,
    name: 'React.js',
    short: 'Modern UI & Single Page Applications',
    desc: 'We provide comprehensive support for React.js projects, including code reviews, complex state management, performance optimization, UI/UX best practices, and troubleshooting. Ideal for startups and enterprises building scalable frontends.',
    highlights: [
      'SPA architecture and routing',
      'Hooks & Context API',
      'Performance tuning',
      'Component library integration',
    ],
  },
  {
    icon: <SiNextdotjs className="text-gray-200 text-4xl" />,
    name: 'Next.js',
    short: 'SSR, SSG, and Fullstack Capabilities',
    desc: 'From server-side rendering to API routes, our team helps you leverage Next.js for SEO-friendly, highly performant web applications. We support deployment, static export, and advanced routing strategies.',
    highlights: [
      'Server-side rendering (SSR)',
      'API routes and backend integration',
      'Static site generation (SSG)',
      'SEO optimization',
    ],
  },
  {
    icon: <FaNodeJs className="text-green-500 text-4xl" />,
    name: 'Node.js',
    short: 'Backend APIs & Real-Time Solutions',
    desc: 'Expertise in building scalable REST APIs, WebSockets, and microservices with Node.js and Express. We help debug, optimize, and scale your backend for production and cloud environments.',
    highlights: [
      'REST API development',
      'Real-time & event-driven apps',
      'Express.js, NestJS, Socket.IO',
      'Cloud deployment (AWS/GCP/Azure)',
    ],
  },
  {
    icon: <SiMongodb className="text-green-400 text-4xl" />,
    name: 'MongoDB',
    short: 'Flexible NoSQL Database Support',
    desc: 'Get help with schema design, aggregation pipelines, performance tuning, and Atlas setup. We resolve data migration, security, and scaling issues for high-traffic MongoDB deployments.',
    highlights: [
      'Schema modeling & validation',
      'Aggregation framework',
      'Performance optimization',
      'Atlas cloud setup',
    ],
  },
  {
    icon: <FaPython className="text-yellow-400 text-4xl" />,
    name: 'Python',
    short: 'Automation, Scripting & ML/AI',
    desc: 'We support automation scripts, data analysis, and end-to-end machine learning workflows using Python. Our team assists with troubleshooting, code optimization, and deployment.',
    highlights: [
      'Automation & data pipelines',
      'Flask, Django web frameworks',
      'Machine learning (scikit-learn, TensorFlow)',
      'Scripting best practices',
    ],
  },
  {
    icon: <SiDjango className="text-green-200 text-4xl" />,
    name: 'Django',
    short: 'Robust Web Backends',
    desc: 'Support for Django projects including ORM queries, admin customization, REST APIs with DRF, and deployment. Ideal for businesses needing secure, scalable backend solutions.',
    highlights: [
      'Django ORM and admin',
      'Authentication & permissions',
      'Django REST Framework (DRF)',
      'Server deployment (Gunicorn/Nginx)',
    ],
  },
  {
    icon: <FaJava className="text-orange-400 text-4xl" />,
    name: 'Java',
    short: 'Enterprise Apps & Android Backend',
    desc: 'Our Java experts provide support for Spring Boot microservices, enterprise systems, and Android backend integrations. We help with debugging, scalability, and deployment.',
    highlights: [
      'Spring Boot microservices',
      'Java EE & REST APIs',
      'Performance tuning',
      'Android backend integration',
    ],
  },
  {
    icon: <FaAndroid className="text-green-300 text-4xl" />,
    name: 'Android',
    short: 'Native Mobile App Support',
    desc: 'Get assistance with native Android app development, UI/UX, API integration, and troubleshooting. We help you publish and optimize apps for the Play Store.',
    highlights: [
      'Kotlin & Java app development',
      'UI/UX & Material Design',
      'API & Firebase integration',
      'Publishing & Play Store support',
    ],
  },
  {
    icon: <FaApple className="text-gray-200 text-4xl" />,
    name: 'iOS',
    short: 'Swift & Objective-C Apps',
    desc: 'We support iOS mobile projects from UI building to backend integration and App Store deployment, ensuring quality and performance.',
    highlights: [
      'Swift & Objective-C',
      'UI/UX with UIKit/SwiftUI',
      'API & Core Data integration',
      'App Store publishing',
    ],
  },
  {
    icon: <SiFlutter className="text-cyan-400 text-4xl" />,
    name: 'Flutter',
    short: 'Cross-Platform Mobile Apps',
    desc: 'Build and support high-quality mobile apps for Android and iOS from a single codebase using Dart and Flutter. Assistance with widgets, plugins, and deployment.',
    highlights: [
      'Custom widget development',
      'State management (Provider, Bloc)',
      'Plugin integration',
      'Cross-platform deployment',
    ],
  },
  {
    icon: <FaAngular className="text-red-400 text-4xl" />,
    name: 'Angular',
    short: 'Enterprise-Grade Web Apps',
    desc: 'Support for Angular projects including enterprise architecture, RxJS, services, and CLI tooling. Best for scalable, maintainable web applications.',
    highlights: [
      'RxJS & reactive programming',
      'Component & module structure',
      'CLI and build tools',
      'State management (NgRx)',
    ],
  },
  {
    icon: <SiTailwindcss className="text-cyan-300 text-4xl" />,
    name: 'Tailwind CSS',
    short: 'Rapid UI Development',
    desc: 'Expert guidance in crafting custom designs and responsive layouts with Tailwind CSS. We assist with best practices and integration.',
    highlights: [
      'Utility-first CSS',
      'Custom theming',
      'Responsive design',
      'Performance optimization',
    ],
  },
  {
    icon: <FaPhp className="text-indigo-400 text-4xl" />,
    name: 'PHP',
    short: 'Websites, APIs & WordPress',
    desc: 'From custom PHP applications to WordPress and Laravel, we support code fixes, plugin integration, and security hardening.',
    highlights: [
      'Custom PHP development',
      'WordPress plugins & themes',
      'Laravel framework',
      'Security & optimization',
    ],
  },
  {
    icon: <SiLaravel className="text-red-400 text-4xl" />,
    name: 'Laravel',
    short: 'Modern PHP Web Framework',
    desc: 'Support for Laravel-based web apps, REST APIs, Blade templating, and deployment. We help with migrations, authentication, and testing.',
    highlights: [
      'RESTful API development',
      'Blade templates & Mix',
      'Database migrations',
      'Authentication & middleware',
    ],
  },
  {
    icon: <SiMysql className="text-blue-400 text-4xl" />,
    name: 'MySQL',
    short: 'Reliable Relational Databases',
    desc: 'We help design, optimize, and troubleshoot MySQL databases, from queries to backups and cloud hosting.',
    highlights: [
      'Schema design',
      'Query optimization',
      'Replication & backups',
      'Cloud database setup',
    ],
  },
  {
    icon: <FaDatabase className="text-purple-400 text-4xl" />,
    name: 'Other Databases',
    short: 'PostgreSQL, Redis, Firebase, etc.',
    desc: 'We also provide support for PostgreSQL, Redis, Firebase, and other databases. Get help with setup, queries, and integrations.',
    highlights: [
      'PostgreSQL/Redis setup',
      'Realtime databases (Firebase)',
      'Data migration',
      'Backup and restore',
    ],
  },
  {
    icon: <FaAws className="text-yellow-300 text-4xl" />,
    name: 'AWS Cloud',
    short: 'Cloud Infrastructure & DevOps',
    desc: 'Full support for AWS services including EC2, S3, Lambda, IAM, and deployment pipelines. We help you scale and secure your infrastructure.',
    highlights: [
      'EC2, S3, Lambda',
      'IAM & security',
      'CI/CD pipelines',
      'Scalability & monitoring',
    ],
  },
  {
    icon: <SiKubernetes className="text-blue-400 text-4xl" />,
    name: 'Kubernetes',
    short: 'Container Orchestration',
    desc: 'Support for Kubernetes setup, scaling, and management. We assist with deployment, monitoring, and troubleshooting clusters.',
    highlights: [
      'Cluster setup',
      'Pod & service management',
      'Helm charts',
      'Scaling & monitoring',
    ],
  },
  {
    icon: <SiDocker className="text-blue-300 text-4xl" />,
    name: 'Docker',
    short: 'Containerization & DevOps',
    desc: 'Get help with Dockerizing your apps, creating Dockerfiles & Compose files, and CI/CD integration for rapid deployment.',
    highlights: [
      'Dockerfile & Compose',
      'CI/CD pipelines',
      'Container security',
      'Multi-environment support',
    ],
  },
  {
    icon: <SiFirebase className="text-yellow-400 text-4xl" />,
    name: 'Firebase',
    short: 'Realtime Apps & Cloud Functions',
    desc: 'Full stack support for Firebase projects: Realtime DB, Firestore, Auth, Cloud Functions, and hosting.',
    highlights: [
      'Realtime DB & Firestore',
      'Authentication',
      'Cloud Functions',
      'Hosting & deployment',
    ],
  },
  {
    icon: <FaHtml5 className="text-orange-400 text-4xl" />,
    name: 'HTML5',
    short: 'Modern, Accessible Web Markup',
    desc: 'Support for writing semantic, accessible, and SEO-friendly HTML5 for web projects and landing pages.',
    highlights: [
      'Semantic markup',
      'SEO best practices',
      'Responsive design',
      'Accessibility (a11y)',
    ],
  },
];

export default function OurWorks() {
  const [modal, setModal] = useState(null);

  return (
    <div className=" pt-0 pb-5 px-4">
      <h2
        id="what-we-do"
        className="text-3xl md:text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] via-[#00AEEF] to-[#0059FF] tracking-tight"
      >
       Our Project Portfolio
      </h2>
      <div className="text-center mx-auto max-w-2xl mb-12">
        <p className="text-gray-700 text-base font-medium">
          Our team provides end-to-end support, project delivery,
          troubleshooting, and optimization on a wide range of leading
          technologies and platforms. Whether you need full-stack development,
          mobile apps, cloud, or DevOps—we've got your stack covered.
        </p>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-9">
        {techSupports.map((tech, idx) => (
          <div
            key={tech.name}
            className="flex flex-col items-center bg-gradient-to-br from-white to-blue-50 border border-cyan-100 rounded-2xl shadow-lg p-8 hover:scale-105 transition min-h-[260px] cursor-pointer text-center group"
            onClick={() => setModal(idx)}
            tabIndex={0}
            aria-label={`See details for ${tech.name}`}
          >
            <div className={`mb-3 rounded-full bg-white shadow group-hover:shadow-cyan-400/40 group-hover:bg-cyan-50 transition p-3`}>
              {tech.icon}
            </div>
            <div className="text-lg font-semibold text-cyan-700 mb-1">{tech.name}</div>
            <div className="text-cyan-500 text-sm mb-2">{tech.short}</div>
            <div className="text-gray-500 text-xs">{tech.desc.slice(0, 80)}...</div>
            <button
              className="mt-6 cursor-pointer py-2 px-7 bg-gradient-to-r from-[#1EB8F3] to-[#0052CC] hover:from-[#0052CC] hover:to-[#1EB8F3] text-white font-bold rounded-full transition drop-shadow-lg text-base"
              onClick={e => { e.stopPropagation(); setModal(idx); }}
              aria-label={`Learn more about ${tech.name}`}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal !== null && (
        <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center px-3">
          <div className="bg-white rounded-2xl border-2 border-cyan-400 shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
            <button
              className="absolute top-4 right-5 text-2xl text-cyan-600 cursor-pointer hover:text-cyan-900 transition"
              onClick={() => setModal(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{techSupports[modal].icon}</span>
              <span className="text-xl font-bold text-cyan-700">{techSupports[modal].name}</span>
            </div>
            <div className="mb-2 text-cyan-600 text-base font-semibold">{techSupports[modal].short}</div>
            <div className="mb-5 text-gray-700">{techSupports[modal].desc}</div>
            <div className="mb-5">
              <div className="font-semibold text-cyan-700 mb-2 text-base">Key Areas We Support:</div>
              <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                {techSupports[modal].highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <a
              href="#contact"
              onClick={() => setModal(null)}
              className="block w-full text-center py-3 rounded-full font-bold bg-gradient-to-r from-[#1EB8F3] to-[#0052CC] hover:from-[#0052CC] hover:to-[#1EB8F3] transition text-white shadow text-lg"
            >
              Book a Demo
            </a>
          </div>
          <style jsx>{`
            .animate-fade-in {
              animation: fadeIn 0.18s;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
