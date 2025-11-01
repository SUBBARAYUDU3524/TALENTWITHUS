// 'use client';
// import React, { useState, useContext, useEffect } from 'react';
// import {
//   collection,
//   getDocs,
//   addDoc,
//   serverTimestamp,
// } from 'firebase/firestore';
// import {
//   ref as storageRef,
//   uploadBytes,
//   getDownloadURL,
// } from 'firebase/storage';
// import { db, storage } from '../../FirebaseConfig';
// import { useAuth } from '../context/AuthContext';

// type Job = {
//   id: string;
//   title: string;
//   type: string;
//   shortDesc: string;
//   description: string;
//   requirements: string[];
// };

// export default function OpenPositions() {
//   const { user } = useAuth();

//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const [showForm, setShowForm] = useState(false);
//   const [form, setForm] = useState({
//     coverLetter: '',
//     resume: null as File | null,
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');

//   // Fetch jobs from Firestore ("jobs" collection)
//   useEffect(() => {
//     const fetchJobs = async () => {
//       const snap = await getDocs(collection(db, 'jobs'));
//       setJobs(
//         snap.docs.map((doc) => ({
//           id: doc.id,
//           ...(doc.data() as Omit<Job, 'id'>),
//         }))
//       );
//     };
//     fetchJobs();
//   }, []);

//   // Open modal for job details
//   const handleJobClick = (job: Job) => {
//     setSelectedJob(job);
//     setShowForm(false);
//     setSuccess('');
//     setError('');
//   };

//   // Open application form
//   const handleApplyClick = () => {
//     setShowForm(true);
//     setSuccess('');
//     setError('');
//   };

//   // Close modal
//   const handleClose = () => {
//     setSelectedJob(null);
//     setShowForm(false);
//     setForm({
//       coverLetter: '',
//       resume: null,
//     });
//     setSuccess('');
//     setError('');
//   };

//   // Form input handlers
//   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, resume: e.target.files?.[0] ?? null });
//   };

//   // Handle application submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setSuccess('');
//     setError('');

//     if (!form.resume) {
//       setError('Please upload your resume.');
//       setSubmitting(false);
//       return;
//     }

//     try {
//       // Upload resume to Firebase Storage
//       const fileRef = storageRef(
//         storage,
//         `appliedApplications/resumes/${selectedJob!.id}_${
//           user.uid
//         }_${Date.now()}_${form.resume.name}`
//       );
//       await uploadBytes(fileRef, form.resume);
//       const resumeUrl = await getDownloadURL(fileRef);

//       // Store application in Firestore under 'appliedApplications'
//       await addDoc(collection(db, 'appliedApplications'), {
//         jobId: selectedJob!.id,
//         jobTitle: selectedJob!.title,
//         userId: user.uid,
//         userName: user.displayName || '',
//         userEmail: user.email || '',
//         coverLetter: form.coverLetter,
//         resumeUrl,
//         resumeName: form.resume.name,
//         appliedAt: serverTimestamp(),
//       });

//       setSuccess('Your application has been submitted! Thank you.');
//       setSubmitting(false);
//       setForm({ coverLetter: '', resume: null });
//       setShowForm(false);
//       setSelectedJob(null);
//     } catch (err) {
//       setError('Failed to submit application. Please try again.');
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <div className="grid md:grid-cols-3 gap-8">
//         {jobs.map((job) => (
//           <div
//             key={job.id}
//             className="relative group bg-gradient-to-br cursor-pointer from-[#162544] via-[#1e2a44] to-[#14223c] rounded-3xl p-8 shadow-2xl border border-cyan-700 transition hover:scale-[1.035] hover:shadow-cyan-400/40 min-h-[240px] flex flex-col gap-3 overflow-hidden"
//             onClick={() => handleJobClick(job)}
//           >
//             <div className="absolute -top-8 -right-8 w-28 h-28 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none hidden lg:block"></div>

//             <h3 className="text-2xl font-bold text-cyan-300 mb-1 flex items-center gap-2 drop-shadow">
//               <span className="w-7 h-7 flex items-center justify-center bg-cyan-900/50 rounded-full text-lg shadow">
//                 💼
//               </span>
//               {job.title}
//             </h3>

//             <span className="bg-cyan-800 text-cyan-200 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow mb-2">
//               {job.type}
//             </span>

//             <p className="mb-3 text-gray-200 text-base leading-relaxed line-clamp-3">
//               {job.shortDesc}
//             </p>

//             <button
//               className="mt-auto cursor-pointer bg-gradient-to-r from-cyan-700 to-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition drop-shadow-lg outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleJobClick(job);
//               }}
//             >
//               View More & Apply
//             </button>
//           </div>
//         ))}
//       </div>

//       {(selectedJob || success || error) && (
//         <div className="fixed inset-0 z-50  backdrop-blur-sm flex items-center justify-center px-4">
//           <div className="bg-[#14223c]/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-cyan-700 max-w-lg w-full relative p-8 animate-fade-in text-gray-300">
//             <button
//               className="absolute top-4 right-5 text-3xl text-cyan-400 hover:text-cyan-600 transition focus:outline-none cursor-pointer focus:ring-2 focus:ring-cyan-400 rounded"
//               onClick={handleClose}
//               aria-label="Close"
//             >
//               &times;
//             </button>

//             {selectedJob && !showForm && (
//               <div>
//                 <h3 className="text-3xl font-bold mb-2 text-cyan-400 drop-shadow-lg">
//                   {selectedJob.title}
//                 </h3>
//                 <span className="bg-cyan-900 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold mb-5 inline-block shadow-inner">
//                   {selectedJob.type}
//                 </span>
//                 <p className="mb-4 leading-relaxed">
//                   {selectedJob.description}
//                 </p>
//                 <h4 className="font-semibold text-cyan-300 mb-3 border-b border-cyan-700 pb-2">
//                   Requirements:
//                 </h4>
//                 <ul className="pl-6 list-disc text-gray-300 text-sm mb-6 space-y-1">
//                   {selectedJob.requirements.map((req) => (
//                     <li key={req}>{req}</li>
//                   ))}
//                 </ul>
                
//                   <button
//                     className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 cursor-pointer hover:to-blue-700 transition text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-400"
//                     onClick={handleApplyClick}
//                   >
//                     Apply Now
//                   </button>
                
//               </div>
//             )}

//             {selectedJob && showForm && (
//               <form
//                 onSubmit={handleSubmit}
//                 className="space-y-5 mt-4"
//                 encType="multipart/form-data"
//               >
//                 <h3 className="text-2xl font-bold mb-3 text-cyan-400">
//                   Apply for {selectedJob.title}
//                 </h3>
//                 {[
//                   {
//                     label: 'Name',
//                     type: 'text',
//                     value: user?.displayName || '',
//                     disabled: true,
//                   },
//                   {
//                     label: 'Email',
//                     type: 'email',
//                     value: user?.email || '',
//                     disabled: true,
//                   },
//                 ].map(({ label, type, value, disabled }) => (
//                   <div key={label}>
//                     <label className="block mb-1 font-medium">{label}</label>
//                     <input
//                       type={type}
//                       value={value}
//                       disabled={disabled}
//                       className="w-full px-4 py-3 rounded-lg bg-[#101828] border border-cyan-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                     />
//                   </div>
//                 ))}
//                 <div>
//                   <label className="block mb-1 font-medium">Cover Letter</label>
//                   <textarea
//                     name="coverLetter"
//                     value={form.coverLetter}
//                     onChange={handleInputChange}
//                     rows={4}
//                     className="w-full px-4 py-3 rounded-lg bg-[#101828] border border-cyan-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                     placeholder="Why are you a great fit for this role?"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 font-medium">
//                     Resume (PDF, DOC, DOCX)
//                   </label>
//                   <input
//                     type="file"
//                     accept=".pdf,.doc,.docx"
//                     onChange={handleFileChange}
//                     required
//                     className="w-full text-white bg-[#101828] border border-cyan-700 rounded-lg py-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                   />
//                 </div>
//                 {error && <div className="text-red-500 text-sm">{error}</div>}
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="w-full py-3 mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition focus:outline-none focus:ring-4 focus:ring-cyan-400 disabled:opacity-50"
//                 >
//                   {submitting ? 'Submitting...' : 'Submit Application'}
//                 </button>
//               </form>
//             )}

//             {success && (
//               <div className="flex flex-col items-center justify-center py-8">
//                 <div className="text-green-400 text-lg font-bold mb-4 drop-shadow">
//                   ✓ Application Submitted
//                 </div>
//                 <div className="text-gray-300 mb-4 text-center">{success}</div>
//                 <button
//                   onClick={handleClose}
//                   className="mt-3 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-full text-white font-semibold transition shadow focus:outline-none focus:ring-4 focus:ring-cyan-400"
//                 >
//                   Close
//                 </button>
//               </div>
//             )}
//           </div>
//           <style jsx>{`
//             .animate-fade-in {
//               animation: fadeIn 0.22s ease-out forwards;
//             }
//             @keyframes fadeIn {
//               from {
//                 opacity: 0;
//                 transform: scale(0.97);
//               }
//               to {
//                 opacity: 1;
//                 transform: scale(1);
//               }
//             }
//           `}</style>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';
import React, { useState, useEffect, JSX } from 'react';
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
  FaCheck,
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

type Job = {
  id: string;
  title: string;
  type: string;
  shortDesc: string;
  description: string;
  requirements: string[];
  location: string;
  postedAt: Date;
  department?: string;
  experience?: string;
  salaryRange?: string;
};

// Job-specific icons mapping
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

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs} hr${diffHrs > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
}

// Function to get job-specific icon
const getJobIcon = (jobTitle: string) => {
  return jobIcons[jobTitle] || jobIcons.default;
};

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
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch jobs from Firestore and sort by postedAt (newest first)
useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const jobsQuery = query(
          collection(db, 'jobs'),
          orderBy('postedAt', 'desc')
        );
        const snap = await getDocs(jobsQuery);
        const jobsData = snap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...(data as Omit<Job, 'id' | 'postedAt'>),
            postedAt: data.postedAt?.toDate?.() || new Date(),
          } as Job;
        });
        setJobs(jobsData);
        
        // Always show only latest 9 jobs, regardless of total count
        setDisplayJobs(jobsData.slice(0, 9));
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load job positions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);


  // Open modal for job details
  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setShowForm(false);
    setSuccess('');
    setError('');
    // Pre-fill form with user data if available
    if (user) {
      setForm(prev => ({
        ...prev,
        fullName: user.displayName || '',
        email: user.email || ''
      }));
    }
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
      fullName: '',
      email: '',
      coverLetter: '',
      resume: null,
    });
    setSuccess('');
    setError('');
  };

  // Form input handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    // Validation
    if (!form.fullName.trim()) {
      setError('Please enter your full name.');
      setSubmitting(false);
      return;
    }

    if (!form.email.trim()) {
      setError('Please enter your email address.');
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
        `appliedApplications/resumes/${selectedJob!.id}_${Date.now()}_${form.resume.name}`
      );
      await uploadBytes(fileRef, form.resume);
      const resumeUrl = await getDownloadURL(fileRef);

      // Store application in Firestore under 'appliedApplications'
      await addDoc(collection(db, 'appliedApplications'), {
        jobId: selectedJob!.id,
        jobTitle: selectedJob!.title,
        userId: user?.uid || 'anonymous',
        userName: form.fullName,
        userEmail: form.email,
        coverLetter: form.coverLetter,
        resumeUrl,
        resumeName: form.resume.name,
        appliedAt: serverTimestamp(),
        applicationStatus: 'submitted',
        source: user ? 'logged_in' : 'guest'
      });

      setSuccess('Your application has been submitted successfully! We will review your application and get back to you soon.');
      setSubmitting(false);
      setForm({
        fullName: '',
        email: '',
        coverLetter: '',
        resume: null,
      });
      setShowForm(false);
    } catch (err) {
      console.error('Application submission error:', err);
      setError('Failed to submit application. Please try again.');
      setSubmitting(false);
    }
  };

  // Get description from Firebase data
  const getJobDescription = (job: Job) => {
    return job.shortDesc || job.description.substring(0, 150) + '...';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="flex items-center justify-center gap-3">
            <FaSync className="w-6 h-6 text-blue-600 animate-spin" />
            <span className="text-lg text-gray-600">Loading positions...</span>
          </div>
        </div>
      )}

      {/* Jobs Grid */}
      {!loading && (
        <>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {displayJobs.map((job) => (
              <div
                key={job.id}
                className="relative group bg-white cursor-pointer rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full"
                onClick={() => handleJobClick(job)}
              >
                {/* Background Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Top Border Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header with Job-specific Icon and Title */}
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

                  {/* Meta Information */}
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

                  {/* Description from Firebase */}
                  <div className="flex-1 mb-6">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {getJobDescription(job)}
                    </p>
                  </div>

                  {/* CTA Button */}
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

          {/* View All Button - Show only if there are more than 6 jobs */}
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

      {/* Empty State */}
      {!loading && displayJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBriefcase className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Positions Available</h3>
          <p className="text-gray-600 mb-4">We do not have any open positions at the moment. Please check back later.</p>
          <Link
            href="/careers"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Back to Careers
          </Link>
        </div>
      )}

      {/* Modal */}
      {(selectedJob || success || error) && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg">
                    {selectedJob && getJobIcon(selectedJob.title)}
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
                          {getTimeAgo(selectedJob?.postedAt!)}
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

            {/* Modal Content */}
            <div className="p-6">
              {selectedJob && !showForm && !success && (
                <div className="space-y-6">
                  {/* Job Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-600">
                          <FaCheck className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Apply Button */}
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
                    {/* Name Field */}
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

                    {/* Email Field */}
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

                  {/* Cover Letter */}
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
                      placeholder="Tell us why you're the perfect candidate for this role and what excites you about this opportunity..."
                    />
                  </div>

                  {/* Resume Upload */}
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

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
                      <FaTimes className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  )}

                  {/* Submit Button */}
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

              {success && (
                <div className="text-center py-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                    <FaCheck className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {success}
                  </p>
                  <button
                    onClick={handleClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}