import React from "react";
import {
  User,
  Mail,
  Phone,
  FileText,
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  CheckCircle,
  AlertCircle,
  Users,
  TrendingUp,
  Clock,
  X,
  ExternalLink,
} from "lucide-react";

const DetailModal = ({
  selectedApplication,
  statusIcons,
  statusColors,
  closeModal,
  handleViewResume,
  updateApplicationStatus,

  statusOptions,
  updatingStatus,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform animate-in slide-in-from-bottom-4 duration-300">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 border-b border-slate-200">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  {selectedApplication.name}
                </h2>
                <p className="text-slate-600 text-lg font-medium">
                  {selectedApplication.careerId?.title ||
                    selectedApplication.position ||
                    selectedApplication.title}
                </p>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border mt-2 ${
                    statusColors[selectedApplication.status]
                  }`}
                >
                  {React.createElement(
                    statusIcons[selectedApplication.status],
                    { className: "w-4 h-4" }
                  )}
                  {selectedApplication.status.charAt(0).toUpperCase() +
                    selectedApplication.status.slice(1)}
                </div>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">
            <div className="grid gap-8">
              {/* Contact Information */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-slate-700 bg-white p-3 rounded-xl border border-blue-100">
                    <Mail className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                    <span className="font-medium">
                      {selectedApplication.email}
                    </span>
                  </div>
                  {selectedApplication.phone && (
                    <div className="flex items-center text-slate-700 bg-white p-3 rounded-xl border border-blue-100">
                      <Phone className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                      <span className="font-medium">
                        {selectedApplication.phone}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Information */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  Job Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-emerald-100">
                    <span className="text-slate-500 text-sm font-medium">
                      Position
                    </span>
                    <p className="font-bold text-slate-900 mt-1">
                      {selectedApplication.jobTitle ||
                        selectedApplication.position}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-emerald-100">
                    <span className="text-slate-500 text-sm font-medium">
                      Applied Date
                    </span>
                    <p className="font-bold text-slate-900 mt-1">
                      {new Date(
                        selectedApplication.appliedDate ||
                          selectedApplication.createdAt
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {(selectedApplication.location ||
                    selectedApplication.careerId?.location) && (
                    <div className="bg-white p-4 rounded-xl border border-emerald-100">
                      <span className="text-slate-500 text-sm font-medium">
                        Location
                      </span>
                      <p className="font-bold text-slate-900 mt-1 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        {selectedApplication.location ||
                          selectedApplication.careerId?.location}
                      </p>
                    </div>
                  )}
                  {selectedApplication.experience && (
                    <div className="bg-white p-4 rounded-xl border border-emerald-100">
                      <span className="text-slate-500 text-sm font-medium">
                        Experience
                      </span>
                      <p className="font-bold text-slate-900 mt-1">
                        {selectedApplication.experience} years
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Resume Section */}
              {selectedApplication.resume && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    Resume
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        handleViewResume(selectedApplication.resume)
                      }
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Resume
                    </button>
                  </div>
                </div>
              )}

              {/* Additional sections with improved styling */}
              {(selectedApplication.degree ||
                selectedApplication.education) && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    Education
                  </h3>
                  <p className="text-slate-700 bg-purple-50 p-4 rounded-xl border border-purple-100 font-medium">
                    {selectedApplication.degree ||
                      selectedApplication.education}
                  </p>
                </div>
              )}

              {selectedApplication.skills &&
                selectedApplication.skills.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <Code className="w-4 h-4 text-white" />
                      </div>
                      Skills & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedApplication.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Status Update Section */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  Update Application Status
                </h3>
                <select
                  value={selectedApplication.status}
                  onChange={(e) =>
                    updateApplicationStatus(
                      selectedApplication._id || selectedApplication.id,
                      e.target.value
                    )
                  }
                  disabled={updatingStatus}
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50 font-medium text-lg bg-white shadow-sm"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                {updatingStatus && (
                  <p className="text-amber-600 font-medium mt-3 flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                    Updating status...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
