
'use client';
import React, { useState, useEffect, JSX } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  where,
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
  FaShieldAlt ,
  FaChartLine,
  FaCogs,
  FaLaptopCode,
  FaFilter,
  FaSearch,
  FaSync
} from 'react-icons/fa';
import { HiBuildingOffice } from 'react-icons/hi2';


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
const jobIcons: { [key: string]: JSX.Element } = {
  'Frontend Developer': <FaCode className="text-white text-xl" />,
  'Backend Developer': <FaDatabase className="text-white text-xl" />,
  'Full Stack Developer': <FaLaptopCode className="text-white text-xl" />,
  'UI/UX Designer': <FaPalette className="text-white text-xl" />,
  'DevOps Engineer': <FaCloud className="text-white text-xl" />,
  'Data Scientist': <FaChartLine className="text-white text-xl" />,
  'Mobile Developer': <FaMobile className="text-white text-xl" />,
  'Security Engineer': <FaShieldAlt  className="text-white text-xl" />,
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

// Filter types
type FilterState = {
  search: string;
  jobType: string;
  location: string;
  department: string;
  experience: string;
};

export default function OpenPositions() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
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
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    jobType: '',
    location: '',
    department: '',
    experience: ''
  });

  // Fetch jobs from Firestore
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
        setFilteredJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load job positions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Apply filters whenever filters or jobs change
  useEffect(() => {
    const applyFilters = () => {
      let result = jobs;

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter(job => 
          job.title?.toLowerCase().includes(searchLower) ||
          job.shortDesc?.toLowerCase().includes(searchLower) ||
          job.description?.toLowerCase().includes(searchLower) ||
          job.requirements?.some(req => req.toLowerCase().includes(searchLower))
        );
      }

      // Job type filter
      if (filters.jobType) {
        result = result.filter(job => job.type === filters.jobType);
      }

      // Location filter
      if (filters.location) {
        result = result.filter(job => 
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      // Department filter
      if (filters.department) {
        result = result.filter(job => job.department === filters.department);
      }

      // Experience filter
      if (filters.experience) {
        result = result.filter(job => job.experience === filters.experience);
      }

      setFilteredJobs(result);
    };

    applyFilters();
  }, [filters, jobs]);

  // Get unique values for filter dropdowns
  const jobTypes = [...new Set(jobs.map(job => job.type))];
  const locations = [...new Set(jobs.map(job => job.location))];
  const departments = [...new Set(jobs.map(job => job.department).filter(Boolean))];
  const experiences = [...new Set(jobs.map(job => job.experience).filter(Boolean))];

  // Filter handlers
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      jobType: '',
      location: '',
      department: '',
      experience: ''
    });
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Filters Section */}
  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
        <FaFilter className="w-5 h-5 text-white" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Find Your Perfect Role</h2>
        <p className="text-sm text-gray-600 mt-1">Filter through our opportunities</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
        <span className="text-sm font-semibold text-blue-700">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'Position' : 'Positions'} Available
        </span>
      </div>
      <button
        onClick={clearFilters}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <FaTimes className="w-4 h-4" />
        Clear Filters
      </button>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
    {/* Search Filter */}
    <div className="lg:col-span-2">
      <label className="block text-sm font-semibold text-gray-800 mb-3">
        <FaSearch className="inline w-4 h-4 mr-2 text-blue-500" />
        Search Opportunities
      </label>
      <div className="relative">
        <input
          type="text"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          placeholder="Job title, skills, or keywords..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
    </div>

    {/* Job Type Filter */}
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-3">
        <FaBriefcase className="inline w-4 h-4 mr-2 text-green-500" />
        Job Type
      </label>
      <div className="relative">
        <select
          value={filters.jobType}
          onChange={(e) => handleFilterChange('jobType', e.target.value)}
          className="w-full appearance-none pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md cursor-pointer"
        >
          <option value="">All Types</option>
          {jobTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    {/* Location Filter */}
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-3">
        <FaMapMarkerAlt className="inline w-4 h-4 mr-2 text-red-500" />
        Location
      </label>
      <div className="relative">
        <select
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="w-full appearance-none pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md cursor-pointer"
        >
          <option value="">All Locations</option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    {/* Department Filter */}
    {departments.length > 0 && (
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          <HiBuildingOffice className="inline w-4 h-4 mr-2 text-purple-500" />
          Department
        </label>
        <div className="relative">
          <select
            value={filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
            className="w-full appearance-none pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md cursor-pointer"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    )}
  </div>

  {/* Second Row for Additional Filters */}
  {(experiences.length > 0) && (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Experience Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            <FaChartLine className="inline w-4 h-4 mr-2 text-orange-500" />
            Experience Level
          </label>
          <div className="relative">
            <select
              value={filters.experience}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
              className="w-full appearance-none pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md cursor-pointer"
            >
              <option value="">All Levels</option>
              {experiences.map(exp => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        <div className="md:col-span-3 flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">Active Filters:</span>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full border border-blue-200">
                Search: {filters.search}
                <button
                  onClick={() => handleFilterChange('search', '')}
                  className="hover:text-blue-900 transition-colors"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.jobType && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full border border-green-200">
                Type: {filters.jobType}
                <button
                  onClick={() => handleFilterChange('jobType', '')}
                  className="hover:text-green-900 transition-colors"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.location && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full border border-red-200">
                Location: {filters.location}
                <button
                  onClick={() => handleFilterChange('location', '')}
                  className="hover:text-red-900 transition-colors"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.department && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full border border-purple-200">
                Department: {filters.department}
                <button
                  onClick={() => handleFilterChange('department', '')}
                  className="hover:text-purple-900 transition-colors"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.experience && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full border border-orange-200">
                Experience: {filters.experience}
                <button
                  onClick={() => handleFilterChange('experience', '')}
                  className="hover:text-orange-900 transition-colors"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )}
</div>

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
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredJobs.map((job) => (
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
      )}

      {/* Empty State */}
      {!loading && filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBriefcase className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Positions Found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or search terms.</p>
          <button
            onClick={clearFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Modal - Rest of the modal code remains the same */}
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