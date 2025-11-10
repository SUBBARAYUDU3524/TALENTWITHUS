"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import Image from "next/image";

export default function LoginModal({ isOpen, onClose }) {
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (fullName, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal */}
          <motion.div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Logo */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full border border-gray-200 shadow-sm flex items-center justify-center bg-white">
                <Image
                  src="/talent-with-us-logo copy.png"
                  width={60}
                  height={60}
                  alt="Talent With Us Logo"
                />
              </div>
              <h2 className="text-xl font-semibold mt-3 text-gray-900">
                Talent With Us
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Innovation • Technology • Growth
              </p>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              {isRegistering ? "Create Your Account" : "Welcome Back"}
            </h3>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 transition mb-4"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                className="w-5 h-5"
                alt="Google"
              />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <span className="flex-1 h-px bg-gray-200"></span>
              <span className="text-xs text-gray-500">OR</span>
              <span className="flex-1 h-px bg-gray-200"></span>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-500 bg-red-50 border border-red-200 text-sm rounded-md p-2 mb-3 text-center">
                {error}
              </p>
            )}

            {/* Auth Forms */}
            {isRegistering ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegister(
                    e.target.fullName.value,
                    e.target.email.value,
                    e.target.password.value
                  );
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-medium transition"
                >
                  Register
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEmailLogin(
                    e.target.email.value,
                    e.target.password.value
                  );
                }}
                className="space-y-4"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-medium transition"
                >
                  Login
                </button>
              </form>
            )}

            {/* Switch */}
            <p className="text-sm text-gray-600 mt-4 text-center">
              {isRegistering ? (
                <>
                  Already have an account?{" "}
                  <span
                    className="text-blue-600 cursor-pointer hover:underline font-medium"
                    onClick={() => setIsRegistering(false)}
                  >
                    Login
                  </span>
                </>
              ) : (
                <>
                  Don{`'`}t have an account?{" "}
                  <span
                    className="text-blue-600 cursor-pointer hover:underline font-medium"
                    onClick={() => setIsRegistering(true)}
                  >
                    Register
                  </span>
                </>
              )}
            </p>

            {/* Terms */}
            <p className="text-[11px] text-gray-400 mt-6 text-center">
              By continuing, you agree to our Terms & Privacy Policy.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
