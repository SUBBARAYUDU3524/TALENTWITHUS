'use client';
import React, { useState, useContext, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { db, storage } from '../../FirebaseConfig';
import { useAuth } from '../context/AuthContext';

type Job = {
  id: string;
  title: string;
  type: string;
  shortDesc: string;
  description: string;
  requirements: string[];
};

export default function OpenPositions() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    coverLetter: '',
    resume: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch jobs from Firestore ("jobs" collection)
  useEffect(() => {
    const fetchJobs = async () => {
      const snap = await getDocs(collection(db, 'jobs'));
      setJobs(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Job, 'id'>),
        }))
      );
    };
    fetchJobs();
  }, []);

  // Open modal for job details
  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setShowForm(false);
    setSuccess('');
    setError('');
  };

  // Open application form
  const handleApplyClick = () => {
    setShowForm(true);
    setSuccess('');
    setError('');
  };

  // Close modal
  const handleClose = () => {
    setSelectedJob(null);
    setShowForm(false);
    setForm({
      coverLetter: '',
      resume: null,
    });
    setSuccess('');
    setError('');
  };

  // Form input handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, resume: e.target.files?.[0] ?? null });
  };

  // Handle application submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess('');
    setError('');

    if (!user) {
      setError('You must be logged in to apply.');
      setSubmitting(false);
      return;
    }
    if (!form.resume) {
      setError('Please upload your resume.');
      setSubmitting(false);
      return;
    }

    try {
      // Upload resume to Firebase Storage
      const fileRef = storageRef(
        storage,
        `appliedApplications/resumes/${selectedJob!.id}_${
          user.uid
        }_${Date.now()}_${form.resume.name}`
      );
      await uploadBytes(fileRef, form.resume);
      const resumeUrl = await getDownloadURL(fileRef);

      // Store application in Firestore under 'appliedApplications'
      await addDoc(collection(db, 'appliedApplications'), {
        jobId: selectedJob!.id,
        jobTitle: selectedJob!.title,
        userId: user.uid,
        userName: user.displayName || '',
        userEmail: user.email || '',
        coverLetter: form.coverLetter,
        resumeUrl,
        resumeName: form.resume.name,
        appliedAt: serverTimestamp(),
      });

      setSuccess('Your application has been submitted! Thank you.');
      setSubmitting(false);
      setForm({ coverLetter: '', resume: null });
      setShowForm(false);
      setSelectedJob(null);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="relative group bg-gradient-to-br cursor-pointer from-[#162544] via-[#1e2a44] to-[#14223c] rounded-3xl p-8 shadow-2xl border border-cyan-700 transition hover:scale-[1.035] hover:shadow-cyan-400/40 min-h-[240px] flex flex-col gap-3 overflow-hidden"
            onClick={() => handleJobClick(job)}
          >
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none hidden lg:block"></div>

            <h3 className="text-2xl font-bold text-cyan-300 mb-1 flex items-center gap-2 drop-shadow">
              <span className="w-7 h-7 flex items-center justify-center bg-cyan-900/50 rounded-full text-lg shadow">
                💼
              </span>
              {job.title}
            </h3>

            <span className="bg-cyan-800 text-cyan-200 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow mb-2">
              {job.type}
            </span>

            <p className="mb-3 text-gray-200 text-base leading-relaxed line-clamp-3">
              {job.shortDesc}
            </p>

            <button
              className="mt-auto cursor-pointer bg-gradient-to-r from-cyan-700 to-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition drop-shadow-lg outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleJobClick(job);
              }}
            >
              View More & Apply
            </button>
          </div>
        ))}
      </div>

      {(selectedJob || success || error) && (
        <div className="fixed inset-0 z-50  backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-[#14223c]/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-cyan-700 max-w-lg w-full relative p-8 animate-fade-in text-gray-300">
            <button
              className="absolute top-4 right-5 text-3xl text-cyan-400 hover:text-cyan-600 transition focus:outline-none cursor-pointer focus:ring-2 focus:ring-cyan-400 rounded"
              onClick={handleClose}
              aria-label="Close"
            >
              &times;
            </button>

            {selectedJob && !showForm && (
              <div>
                <h3 className="text-3xl font-bold mb-2 text-cyan-400 drop-shadow-lg">
                  {selectedJob.title}
                </h3>
                <span className="bg-cyan-900 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold mb-5 inline-block shadow-inner">
                  {selectedJob.type}
                </span>
                <p className="mb-4 leading-relaxed">
                  {selectedJob.description}
                </p>
                <h4 className="font-semibold text-cyan-300 mb-3 border-b border-cyan-700 pb-2">
                  Requirements:
                </h4>
                <ul className="pl-6 list-disc text-gray-300 text-sm mb-6 space-y-1">
                  {selectedJob.requirements.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
                {user ? (
                  <button
                    className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 cursor-pointer hover:to-blue-700 transition text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-400"
                    onClick={handleApplyClick}
                  >
                    Apply Now
                  </button>
                ) : (
                  <div className="text-center cursor-pointer text-sm text-cyan-300 font-semibold">
                    Please log in to apply
                  </div>
                )}
              </div>
            )}

            {selectedJob && showForm && (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 mt-4"
                encType="multipart/form-data"
              >
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">
                  Apply for {selectedJob.title}
                </h3>
                {[
                  {
                    label: 'Name',
                    type: 'text',
                    value: user?.displayName || '',
                    disabled: true,
                  },
                  {
                    label: 'Email',
                    type: 'email',
                    value: user?.email || '',
                    disabled: true,
                  },
                ].map(({ label, type, value, disabled }) => (
                  <div key={label}>
                    <label className="block mb-1 font-medium">{label}</label>
                    <input
                      type={type}
                      value={value}
                      disabled={disabled}
                      className="w-full px-4 py-3 rounded-lg bg-[#101828] border border-cyan-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                ))}
                <div>
                  <label className="block mb-1 font-medium">Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    value={form.coverLetter}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-[#101828] border border-cyan-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="Why are you a great fit for this role?"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Resume (PDF, DOC, DOCX)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="w-full text-white bg-[#101828] border border-cyan-700 rounded-lg py-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition focus:outline-none focus:ring-4 focus:ring-cyan-400 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}

            {success && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="text-green-400 text-lg font-bold mb-4 drop-shadow">
                  ✓ Application Submitted
                </div>
                <div className="text-gray-300 mb-4 text-center">{success}</div>
                <button
                  onClick={handleClose}
                  className="mt-3 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-full text-white font-semibold transition shadow focus:outline-none focus:ring-4 focus:ring-cyan-400"
                >
                  Close
                </button>
              </div>
            )}
          </div>
          <style jsx>{`
            .animate-fade-in {
              animation: fadeIn 0.22s ease-out forwards;
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
        </div>
      )}
    </div>
  );
}
