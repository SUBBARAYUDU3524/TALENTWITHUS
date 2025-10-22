import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Aarav Patel',
    role: 'Lead Developer',
    avatar: '/team/alice.jpg', // Replace with actual path
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Saanvi Sharma',
    role: 'UI/UX Designer',
    avatar: '/team/bob.jpg',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Vasu K',
    role: 'Frontend  Developer | UI/UX Designer',
    avatar: 'https://avatars.githubusercontent.com/u/84690382?v=4',
    linkedin: 'https://www.linkedin.com/in/vasuk24/',
    github: 'https://github.com/Sreenivasulu-Kalluru',
  },
  {
    name: 'Srinivas Chowdhary',
    role: 'Frontend Developer',
    avatar:
      'https://avatars.githubusercontent.com/u/203217952?s=400&u=8269c0a25e46dfe521e73bf8909dce3c3523701b&v=4',
    linkedin: 'https://www.linkedin.com/in/kamma-srinivasulu-450214281/',
    github: 'https://github.com/k-srinivas-chowdhary-03',
  },
];

export default function TeamSection() {
  return (
    <section className="pt-5 px-2 max-w-8xl mx-auto">
      {/* Heading Section */}
      <div className="text-center mb-8 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1EB8F3] to-[#0059FF] mb-2 tracking-tight">
          Meet Our Team
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, idx) => (
          <div
            key={member.name}
            className="relative rounded-2xl bg-[#132039] shadow-lg flex flex-col items-center px-10 pt-8 pb-7 w-[280px] min-h-[340px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            style={{
              boxShadow: '0 2px 16px 0 rgba(32,120,244,0.06)',
            }}
          >
            <div className="relative mb-6">
              <div className="rounded-full border-4 border-transparent hover:border-[#1EB8F3] transition-colors duration-300 overflow-hidden shadow-lg w-32 h-32 mx-auto bg-white">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full border-4 border-[#1EB8F3]/20"
                />
              </div>
            </div>
            <div className="text-white text-2xl font-extrabold mb-1 text-center">
              {member.name}
            </div>
            <div className="text-lg text-cyan-400 font-semibold italic mb-5 text-center">
              {member.role}
            </div>
            <div className="flex justify-center gap-5 mt-auto">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-200 transition-all text-xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-200 transition-all text-xl"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
