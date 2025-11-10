'use client';
import React, { useState, useEffect, useRef, JSX } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { db, storage } from '../../FirebaseConfig';
import { useAuth } from '../context/AuthContext';
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaTimes,
  FaFileUpload,
  FaUser,
  FaEnvelope,
  FaCode,
  FaPalette,
  FaCloud,
  FaDatabase,
  FaMobile,
  FaShieldAlt,
  FaChartLine,
  FaCogs,
  FaLaptopCode,
  FaSync,
  FaEye
} from 'react-icons/fa';
import Link from 'next/link';
import toast from 'react-hot-toast';

type Job = {
  id: string;
  title: string;
  type: string;
  shortDesc: string;
  description: string;
  requirements: string[];
  location: string;
  postedAt: Date; // normalized to Date in code
  department?: string;
  experience?: string;
  salaryRange?: string;
};

const jobIcons: { [key: string]: JSX.Element } = {
  'Frontend Developer': <FaCode className="text-white text-xl" />,
  'Backend Developer': <FaDatabase className="text-white text-xl" />,
  'Full Stack Developer': <FaLaptopCode className="text-white text-xl" />,
  'UI/UX Designer': <FaPalette className="text-white text-xl" />,
  'DevOps Engineer': <FaCloud className="text-white text-xl" />,
  'Data Scientist': <FaChartLine className="text-white text-xl" />,
  'Mobile Developer': <FaMobile className="text-white text-xl" />,
  'Security Engineer': <FaShieldAlt className="text-white text-xl" />,
  'Software Engineer': <FaCogs className="text-white text-xl" />,
  'Product Manager': <FaBriefcase className="text-white text-xl" />,
  'Project Manager': <FaBriefcase className="text-white text-xl" />,
  'default': <FaBriefcase className="text-white text-xl" />
};

function safeToDate(input: any): Date {
  try {
    if (!input) return new Date();
    if (typeof input?.toDate === 'function') return input.toDate(); // Firestore Timestamp
    if (typeof input === 'number') return new Date(input);           // epoch ms
    if (typeof input === 'string') {
      const d = new Date(input);
      return isNaN(d.getTime()) ? new Date() : d;
    }
    return new Date();
  } catch {
    return new Date();
  }
}

function getTimeAgo(date?: Date): string {
  if (!date || isNaN(date.getTime())) return 'Unknown';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  if (diffMs < 60000) return 'just now';
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
}

const getJobIcon = (jobTitle: string) => jobIcons[jobTitle] || jobIcons.default;

// --- Friendly Firestore error mapper (toast messages)
function getFriendlyFirestoreError(err: any): string {
  const code = err?.code || '';
  const message = String(err?.message || '');

  if (code === 'permission-denied' || message.includes('Missing or insufficient permissions')) {
    if (message.includes('userEmail')) return 'Invalid email format.';
    if (message.includes('userName')) return 'Name must be at least 3 characters.';
    if (message.includes('resumeUrl')) return 'Resume upload missing. Please re-upload and try again.';
    if (message.includes('appliedAt')) return 'Internal timestamp missing. Please retry.';
    return 'Request blocked by security rules. Check your details and try again.';
  }

  if (code === 'resource-exhausted') return 'Too many requests. Please wait and try again.';
  if (code === 'unavailable') return 'Service temporarily unavailable. Please try again.';
  if (code === 'deadline-exceeded') return 'Network timed out. Please try again.';
  return 'Something went wrong. Please try again.';
}

export default function OpenPositions() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [displayJobs, setDisplayJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    coverLetter: '',
    resume: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // anti-spam (30s cooldown)
  const lastSubmitRef = useRef<number>(0);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const jobsQuery = query(collection(db, 'jobs'), orderBy('postedAt', 'desc'));
        const snap = await getDocs(jobsQuery);
        const jobsData: Job[] = snap.docs.map((doc) => {
          const data = doc.data() as any;
          return {
            id: doc.id,
            ...(data as Omit<Job, 'id' | 'postedAt'>),
            postedAt: safeToDate(data?.postedAt),
          } as Job;
        });
        setJobs(jobsData);
        setDisplayJobs(jobsData.slice(0, 9));
      } catch (error: any) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to load job positions.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setShowForm(false);
    // prefill
    if (user) {
      setForm((prev) => ({
        ...prev,
        fullName: user.displayName || '',
        email: user.email || '',
      }));
    }
  };

  const handleApplyClick = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setSelectedJob(null);
    setShowForm(false);
    setForm({
      fullName: '',
      email: '',
      coverLetter: '',
      resume: null,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, resume: e.target.files?.[0] ?? null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) {
      toast.error('Please select a job before applying.');
      return;
    }

    setSubmitting(true);

    // 30s anti-spam
    const now = Date.now();
    if (now - lastSubmitRef.current < 30_000) {
      toast.error('Please wait 30 seconds before submitting again.');
      setSubmitting(false);
      return;
    }

    // Client-side validations
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!form.fullName.trim() || form.fullName.trim().length < 3) {
      toast.error('Please enter your full name (min 3 characters).');
      setSubmitting(false);
      return;
    }
    if (!emailRegex.test(form.email)) {
      toast.error('Please enter a valid email address.');
      setSubmitting(false);
      return;
    }
    if (!form.resume) {
      toast.error('Please upload your resume.');
      setSubmitting(false);
      return;
    }
    const ext = form.resume.name.split('.').pop()?.toLowerCase();
    const allowed = ['pdf', 'doc', 'docx'];
    if (!ext || !allowed.includes(ext)) {
      toast.error('Resume must be a PDF, DOC, or DOCX.');
      setSubmitting(false);
      return;
    }
    if (form.resume.size > 5 * 1024 * 1024) {
      toast.error('Resume is too large. Maximum size is 5MB.');
      setSubmitting(false);
      return;
    }

    try {
      const fileRef = storageRef(
        storage,
        `appliedApplications/resumes/${selectedJob.id}_${Date.now()}_${form.resume.name}`
      );
      await uploadBytes(fileRef, form.resume);
      const resumeUrl = await getDownloadURL(fileRef);

      await addDoc(collection(db, 'appliedApplications'), {
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        userId: user?.uid || 'anonymous',
        userName: form.fullName.trim(),
        userEmail: form.email.trim(),
        coverLetter: form.coverLetter,
        resumeUrl,
        resumeName: form.resume.name,
        appliedAt: serverTimestamp(),
        applicationStatus: 'submitted',
        source: user ? 'logged_in' : 'guest',
      });

      toast.success('Application submitted successfully!');
      lastSubmitRef.current = now;

      // reset and close
      setForm({
        fullName: '',
        email: '',
        coverLetter: '',
        resume: null,
      });
      setShowForm(false);
      setSelectedJob(null);
    } catch (err: any) {
      console.error('Application submission error:', err);
      toast.error(getFriendlyFirestoreError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const getJobDescription = (job: Job) =>
    job.shortDesc || (job.description ? job.description.substring(0, 150) + '...' : '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {loading && (
        <div className="text-center py-12">
          <div className="flex items-center justify-center gap-3">
            <FaSync className="w-6 h-6 text-blue-600 animate-spin" />
            <span className="text-lg text-gray-600">Loading positions...</span>
          </div>
        </div>
      )}

      {!loading && (
        <>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {displayJobs.map((job) => (
              <div
                key={job.id}
                className="relative group bg-white cursor-pointer rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full"
                onClick={() => handleJobClick(job)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg">
                      {getJobIcon(job.title)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2 leading-tight">
                        {job.title}
                      </h3>
                      <span className="inline-block mt-3 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaClock className="text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{getTimeAgo(job.postedAt)}</span>
                    </div>
                    {job.experience && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <FaBriefcase className="text-purple-500 flex-shrink-0" />
                        <span className="text-sm font-medium">{job.experience}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 mb-6">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {getJobDescription(job)}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <button
                      className="w-full group/btn bg-white border border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-6 py-3 rounded-xl font-semibold shadow-sm transition-all duration-300 hover:shadow-md flex items-center justify-center gap-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJobClick(job);
                      }}
                    >
                      <span className="font-semibold">View Position</span>
                      <FaArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {jobs.length >= 9 && (
            <div className="text-center mt-12">
              <Link
                href="/open-positions"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <FaEye className="w-5 h-5" />
                View All Positions
                <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <p className="text-gray-600 mt-3 text-sm">
                Discover all available opportunities in our careers section
              </p>
            </div>
          )}
        </>
      )}

      {/* Modal (toast-only UX; no inline success/error) */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg">
                    {getJobIcon(selectedJob.title)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {showForm ? 'Apply for Position' : selectedJob?.title}
                    </h2>
                    {!showForm && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {selectedJob?.type}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          {selectedJob?.location}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {getTimeAgo(selectedJob?.postedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  aria-label="Close"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedJob && !showForm && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements?.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-600">
                          <span className="mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={handleApplyClick}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                  >
                    Apply for This Position
                  </button>
                </div>
              )}

              {selectedJob && showForm && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaUser className="inline w-4 h-4 mr-2 text-gray-400" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaEnvelope className="inline w-4 h-4 mr-2 text-gray-400" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      name="coverLetter"
                      value={form.coverLetter}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Tell us why you're the perfect candidate..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaFileUpload className="inline w-4 h-4 mr-2 text-gray-400" />
                      Resume Upload *
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                      className="w-full text-gray-700 bg-white border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Accepted formats: PDF, DOC, DOCX (Max: 5MB)
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting Application...
                      </div>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
