'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../FirebaseConfig'; // Firebase setup

export default function LoginModal({ isOpen, onClose }) {
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register views

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (fullName, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Save full name to user profile if necessary
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="
            bg-gradient-to-br from-[#12172A] via-[#192146] to-[#1A233A] text-white rounded-2xl shadow-2xl p-0 max-w-3xl w-full flex flex-col md:flex-row relative overflow-hidden border border-cyan-900
          "
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
        >
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Left Section: Blog Logo & Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 md:px-8 md:py-12 bg-gradient-to-tl from-fuchsia-800/60 to-cyan-900/40 border-b md:border-b-0 md:border-r border-gray-700">
            <div className="mb-4 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg border-4 border-cyan-400 bg-white flex items-center justify-center">
              <img
                src="/assets/ERRTEKNALOZY.jpg"
                alt="Talent with Us Blog Logo"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold mb-2 text-cyan-300 tracking-wide drop-shadow-lg text-center">
              Talent With Us Blog
            </h1>
            <p className="text-center text-gray-300 mb-4 text-sm md:text-base">
              Unlock insights, tips, and the latest trends from the world of
              technology, development, and creative digital solutions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-cyan-700/80 text-cyan-100 tracking-wide">
                #Tech
              </span>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-fuchsia-700/80 text-fuchsia-100 tracking-wide">
                #Inspiration
              </span>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white tracking-wide">
                #Digital
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              By continuing, you agree to our{' '}
              <a href="#" className="text-cyan-400 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-cyan-400 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            {error && (
              <p className="text-red-400 text-center mt-4 mb-0 px-3 py-1 rounded bg-red-900/60 text-sm">
                {error}
              </p>
            )}
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 w-full bg-white text-cyan-800 font-semibold py-2 rounded-lg shadow hover:bg-cyan-100 transition-all mt-8"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </div>

          {/* Right Section: Auth Form */}
          <div className="w-full md:w-1/2 pl-0 pr-0 md:pr-8 py-8 md:py-12 flex flex-col justify-center md:ml-5">
            <div className="rounded-xl p-6 md:p-8 shadow-lg w-full max-w-sm mx-auto">
              {isRegistering ? (
                <>
                  <h2 className="text-lg md:text-xl font-bold mb-4 text-white text-center">
                    Create your account
                  </h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fullName = e.target.fullName.value;
                      const email = e.target.email.value;
                      const password = e.target.password.value;
                      handleRegister(fullName, email, password);
                    }}
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        placeholder="Your full name"
                        className="w-full px-4 py-2 mt-1 border border-gray-600 rounded-md bg-[#212542] text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        className="w-full px-4 py-2 mt-1 border border-gray-600 rounded-md bg-[#212542] text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Your password"
                        className="w-full px-4 py-2 mt-1 border border-gray-600 rounded-md bg-[#212542] text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold py-2 rounded-md hover:from-cyan-600 hover:to-fuchsia-600 transition-all"
                    >
                      Register
                    </button>
                  </form>
                  <p className="text-sm text-gray-400 mt-6 text-center">
                    Already have an account?{' '}
                    <span
                      onClick={() => setIsRegistering(false)}
                      className="text-cyan-400 hover:underline cursor-pointer font-semibold"
                    >
                      Login
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-lg md:text-xl font-bold mb-4 text-white text-center">
                    Welcome back!
                  </h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const email = e.target.email.value;
                      const password = e.target.password.value;
                      handleEmailLogin(email, password);
                    }}
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        className="w-full px-4 py-2 mt-1 border border-gray-600 rounded-md bg-[#212542] text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Your password"
                        className="w-full px-4 py-2 mt-1 border border-gray-600 rounded-md bg-[#212542] text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold py-2 rounded-md hover:from-cyan-600 hover:to-fuchsia-600 transition-all"
                    >
                      Login
                    </button>
                  </form>
                  <p className="text-sm text-gray-400 mt-6 text-center">
                    Don’t have an account?{' '}
                    <span
                      onClick={() => setIsRegistering(true)}
                      className="text-cyan-400 hover:underline cursor-pointer font-semibold"
                    >
                      Register
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
      {/* Hide scroll bar on modal for better mobile UX */}
      <style jsx global>{`
        @media (max-width: 767px) {
          .fixed.inset-0 {
            align-items: flex-start !important;
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
            overflow-y: auto !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
