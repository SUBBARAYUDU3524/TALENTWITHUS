import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiGlobe } from 'react-icons/fi';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="flex justify-center py-14 md:py-10  rounded-3xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl bg-white/80 backdrop-blur-lg border border-cyan-100 shadow-2xl rounded-3xl p-10 md:p-16 flex flex-col items-center text-center"
      >
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#1EB8F3] via-[#00AEEF] to-[#0059FF] text-transparent bg-clip-text">
          Let’s Build Something Amazing Together
        </h2>

        <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
          Have a project, idea, or digital challenge? 
          <span className="font-semibold text-[#00AEEF]"> Let’s collaborate</span> 
          and transform your vision into reality. Our team is ready to help you grow and succeed.
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
          {/* Card Template */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-[#E9F9FF] p-6 rounded-2xl border border-cyan-100 shadow-md flex flex-col items-center gap-3 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#1EB8F3]/20 to-[#00AEEF]/20 rounded-full flex items-center justify-center text-2xl">
              <FiMail className="text-[#1EB8F3]" />
            </div>
            <h3 className="text-lg font-semibold text-cyan-800">Email</h3>
            <a
              href="mailto:info@talentwithus.com"
              className="text-base text-cyan-900 underline hover:text-[#1EB8F3] transition-colors duration-300"
            >
              info@talentwithus.com
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-[#E9F9FF] p-6 rounded-2xl border border-cyan-100 shadow-md flex flex-col items-center gap-3 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#00AEEF]/20 to-[#0059FF]/20 rounded-full flex items-center justify-center text-2xl">
              <FiPhone className="text-[#0059FF]" />
            </div>
            <h3 className="text-lg font-semibold text-cyan-800">Call</h3>
            <a
              href="tel:+919812345678"
              className="text-base text-cyan-900 underline hover:text-[#0059FF] transition-colors duration-300"
            >
              +91-9812345678
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-[#E9F9FF] p-6 rounded-2xl border border-cyan-100 shadow-md flex flex-col items-center gap-3 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#1EB8F3]/20 to-[#0059FF]/20 rounded-full flex items-center justify-center text-2xl">
              <FiGlobe className="text-[#00AEEF]" />
            </div>
            <h3 className="text-lg font-semibold text-cyan-800">Website</h3>
            <a
              href="https://www.talentwithus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-cyan-900 underline hover:text-[#00AEEF] transition-colors duration-300"
            >
              www.talentwithus.com
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
