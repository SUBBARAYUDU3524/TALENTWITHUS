'use client';

import { motion } from 'framer-motion';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { useState } from 'react';

export default function ApplyModal({ open, onClose }) {
  if (!open) return null;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    skills: "",
    experience: "",
    portfolio: "",
    resume: "",
    message: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    setLoading(true);

    try {
      await addDoc(collection(db, "talentApplications"), {
        ...form,
        submittedAt: new Date(),
      });

      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);

    } catch (error) {
      console.error("Error submitting form", error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 w-full max-w-4xl rounded-3xl p-10 border border-gray-700 overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Join Talent Partnership Program
        </h2>

        {success ? (
          <div className="text-green-400 text-center py-6 text-xl">
            🎉 Application Submitted Successfully!
          </div>
        ) : (
          <>
            {/* --------------- TWO COLUMN LAYOUT --------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Left Column */}
              <div className="space-y-4">
                <input
                  name="name"
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700"
                />

                <input
                  name="email"
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700"
                />

                <input
                  name="phone"
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700"
                />

                <select
                  name="role"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700"
                >
                  <option value="">Select Role</option>
                  <option>Developer</option>
                  <option>Designer</option>
                  <option>AI/ML Enthusiast</option>
                  <option>Student</option>
                  <option>Agency</option>
                  <option>Freelancer</option>
                </select>

                <input
                  name="portfolio"
                  onChange={handleChange}
                  placeholder="Portfolio / GitHub URL"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700"
                />

                <input
                  name="resume"
                  onChange={handleChange}
                  placeholder="Resume Link (GDrive / URL)"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700"
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <textarea
                  name="skills"
                  onChange={handleChange}
                  placeholder="Skills / Technologies (React, Node, AI, Python, Figma...)"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 h-28"
                />

                <textarea
                  name="experience"
                  onChange={handleChange}
                  placeholder="Experience (e.g., 1 Year React, 6 Months ML...)"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 h-20"
                />

                <textarea
                  name="message"
                  onChange={handleChange}
                  placeholder="Tell us about yourself, goals & why you want to join..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 h-36"
                />
              </div>

            </div>

            {/* Submit Button */}
            <button
              onClick={submitForm}
              className="w-full py-3 mt-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="mt-6 text-gray-400 hover:text-white text-center w-full text-sm"
        >
          Close
        </button>

      </motion.div>
    </div>
  );
}
