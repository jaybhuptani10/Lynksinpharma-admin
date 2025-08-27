import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Trash2,
  Edit3,
  MapPin,
  GraduationCap,
  Clock,
  Users,
} from "lucide-react";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/career", { withCredentials: true });
        // Defensive: Accept both res.data.data and res.data.message as arrays
        if (Array.isArray(res.data.data)) {
          setJobs(res.data.data);
        } else if (Array.isArray(res.data.message)) {
          setJobs(res.data.message);
        } else {
          setJobs([]);
        }
      } catch (err) {
        setJobs([]);
      }
    };
    fetchJobs();
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    location: "",
    degree: "",
    experience: "",
    skills: "",
    responsibilities: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      overview: "",
      location: "",
      degree: "",
      experience: "",
      skills: "",
      responsibilities: "",
    });
    setEditingJob(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.title ||
      !formData.overview ||
      !formData.location ||
      !formData.degree ||
      !formData.experience ||
      !formData.skills ||
      !formData.responsibilities
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const jobData = {
      title: formData.title,
      overview: formData.overview,
      location: formData.location,
      degree: formData.degree,
      experience: formData.experience,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill),
      responsibilities: formData.responsibilities
        .split("\n")
        .filter((resp) => resp.trim()),
    };

    try {
      if (editingJob) {
        // Update job
        const res = await axios.put(`/career/${editingJob._id}`, jobData, {
          withCredentials: true,
        });
        setJobs((prev) =>
          prev.map((job) => (job._id === editingJob._id ? res.data.data : job))
        );
      } else {
        // Add job
        const res = await axios.post("/career", jobData, {
          withCredentials: true,
        });
        setJobs((prev) => [...prev, res.data.data]);
      }
      resetForm();
    } catch (err) {
      alert("Failed to save job. Please try again.");
    }
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title,
      overview: job.overview,
      location: job.location,
      degree: job.degree,
      experience: job.experience,
      skills: Array.isArray(job.skills) ? job.skills.join(", ") : "",
      responsibilities: Array.isArray(job.responsibilities)
        ? job.responsibilities.join("\n")
        : "",
    });
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?"))
      return;
    try {
      await axios.delete(`/career/${id}`, { withCredentials: true });
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      alert("Failed to delete job. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Career Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage job postings and career opportunities
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add New Job
            </button>
          </div>
        </div>

        {/* Add/Edit Job Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {editingJob ? "Edit Job Posting" : "Add New Job Posting"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Overview *
                </label>
                <textarea
                  name="overview"
                  value={formData.overview}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Degree *
                  </label>
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Required *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Skills (comma-separated) *
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  required
                  placeholder="Designing and synthesizing new organic molecules"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsibilities (one per line) *
                </label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="The work involves developing and optimizing synthetic routes, process development, scale-up, and troubleshooting. "
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                >
                  {editingJob ? "Update Job" : "Add Job"}
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Job Listings */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Current Job Postings ({jobs.length})
            </h2>
          </div>

          {Array.isArray(jobs) && jobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No job postings yet
              </h3>
              <p className="text-gray-600">
                Start by adding your first job posting to attract talent.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {Array.isArray(jobs) &&
                jobs.map((job) => (
                  <div
                    key={job._id || job.id}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{job.overview}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <GraduationCap size={16} />
                            {job.degree}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            {job.experience}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(job)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit job"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(job._id || job.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete job"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Required Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(job.skills) &&
                          job.skills.length > 0 ? (
                            job.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400">
                              No skills listed
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Key Responsibilities
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {Array.isArray(job.responsibilities) &&
                          job.responsibilities.length > 0 ? (
                            job.responsibilities.map((resp, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <span className="text-blue-600 mt-1">•</span>
                                {resp}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-400">
                              No responsibilities listed
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Careers;
