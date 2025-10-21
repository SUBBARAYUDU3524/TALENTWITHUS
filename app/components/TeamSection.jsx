'use client';
import { useState } from 'react';

// Team member data
const teamMembers = [
  {
    name: 'Aarav Patel',
    role: 'Lead Developer',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Aarav specializes in scalable backend architecture and cloud integrations. With 8+ years’ experience in full-stack development, Aarav leads the engineering team and mentors new developers.',
    email: 'aarav.patel@example.com',
    linkedin: 'https://linkedin.com/in/aaravpatel',
    github: 'https://github.com/',
  },
  {
    name: 'Saanvi Sharma',
    role: 'UI/UX Designer',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Saanvi crafts beautiful, intuitive interfaces and user experiences. She blends creativity and research to ensure every product is engaging and accessible.',
    email: 'saanvi.sharma@example.com',
    linkedin: 'https://linkedin.com/in/saanvisharma',
    github: 'https://github.com/',
  },
  {
    name: 'Rohan Gupta',
    role: 'Mobile App Specialist',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    bio: 'Rohan has a passion for mobile-first solutions. He’s developed dozens of cross-platform apps and keeps up with the latest in Flutter and React Native.',
    email: 'rohan.gupta@example.com',
    linkedin: 'https://linkedin.com/in/rohandgupta',
    github: 'https://github.com/',
  },
  {
    name: 'Priya Desai',
    role: 'AI & Data Analytics Lead',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Priya transforms data into insights. She leads the AI/ML initiatives and helps clients unlock the power of analytics for better business decisions.',
    email: 'priya.desai@example.com',
    linkedin: 'https://linkedin.com/in/priyadesai',
    github: 'https://github.com/',
  },
];

export default function TeamSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="mt-14 mb-12">
      <h2 className="text-3xl font-bold text-cyan-600 mb-8 text-center">
        👥 Meet Our Team
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="relative bg-gradient-to-tr from-[#192a4a] to-[#1b2944] backdrop-blur-md rounded-3xl border border-cyan-600 shadow-lg p-7 flex flex-col items-center cursor-pointer text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-cyan-500/40"
            onClick={() => setSelected(idx)}
          >
            <div className="relative w-28 h-28 mb-6 rounded-full overflow-hidden shadow-lg ring-2 ring-cyan-400/75">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 via-transparent to-cyan-600/30 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h3 className="font-[Poppins] text-2xl font-semibold text-white leading-tight mb-1 drop-shadow-lg">
              {member.name}
            </h3>
            <p className="font-[Merriweather] italic text-cyan-300 font-light tracking-wide drop-shadow-sm mb-4">
              {member.role}
            </p>
            <div className="flex space-x-6">
              {/* Example social icons */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-cyan-300 hover:text-cyan-500 transition"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 0.72 0.72"
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  fill="currentColor"
                >
                  <path d="M.614.06H.106a.043.043 0 0 0-.044.043v.514A.043.043 0 0 0 .106.66h.508A.043.043 0 0 0 .658.617V.103A.043.043 0 0 0 .614.06M.243.562h-.09v-.27h.09ZM.198.254a.047.047 0 1 1 0-.094.047.047 0 1 1 0 .094m.37.308h-.09V.417c0-.036-.013-.06-.046-.06A.05.05 0 0 0 .385.39L.382.412v.15h-.09v-.27h.09V.33A.09.09 0 0 1 .463.285c.06 0 .103.039.103.122Z" />
                </svg>
              </a>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-cyan-300 hover:text-cyan-500 transition"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 0.72 0.72"
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  fill="currentColor"
                >
                  <path d="M.36.067a.3.3 0 0 0-.095.585C.28.655.286.646.286.638V.582C.211.596.191.564.185.547A.1.1 0 0 0 .154.505C.144.499.129.486.154.485A.06.06 0 0 1 .2.516a.064.064 0 0 0 .087.025.06.06 0 0 1 .019-.04C.239.494.17.468.17.353A.12.12 0 0 1 .201.272a.1.1 0 0 1 .003-.08S.229.184.286.223a.3.3 0 0 1 .15 0C.493.184.518.192.518.192a.1.1 0 0 1 .003.08.12.12 0 0 1 .031.081c0 .115-.07.141-.137.148a.07.07 0 0 1 .02.056v.082c0 .008.006.017.021.014A.3.3 0 0 0 .36.067" />
                </svg>
              </a>
              {/* Add more icons as needed */}
            </div>
          </div>
        ))}
      </div>
      {/* Modal for member info */}
      {selected !== null && (
        <div className="fixed z-50 inset-0 bg-black/70 bg-opacity-70 flex items-center justify-center px-3">
          <div className="bg-[#14223c] rounded-2xl shadow-2xl border-2 border-cyan-700 p-8 max-w-md w-full relative text-white animate-fade-in">
            <button
              className="absolute top-3 right-4 text-2xl cursor-pointer text-cyan-300 hover:text-cyan-500"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="flex flex-col items-center max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg p-8 text-center text-gray-200">
              <div className="relative w-32 h-32 mb-5 rounded-full overflow-hidden ring-4 ring-cyan-400 ring-opacity-70 shadow-lg">
                <img
                  src={teamMembers[selected].image}
                  alt={teamMembers[selected].name}
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/30 via-transparent to-cyan-600/40 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <h3 className="text-3xl font-extrabold tracking-wide text-white drop-shadow-md mb-1">
                {teamMembers[selected].name}
              </h3>

              <p className="text-cyan-300 font-light italic tracking-wide mb-4 max-w-xs drop-shadow-sm">
                {teamMembers[selected].role}
              </p>

              <p className="text-gray-300 leading-relaxed mb-6 px-4 max-w-prose">
                {teamMembers[selected].bio}
              </p>

              <div className="flex flex-col gap-3 items-center">
                <a
                  href={`mailto:${teamMembers[selected].email}`}
                  className="text-cyan-200 font-semibold underline hover:text-cyan-400 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ✉️ {teamMembers[selected].email}
                </a>
                <a
                  href={teamMembers[selected].linkedin}
                  className="text-cyan-200 font-semibold underline hover:text-cyan-400 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.22s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
