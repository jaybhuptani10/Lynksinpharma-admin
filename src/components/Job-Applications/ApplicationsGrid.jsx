import React from "react";
import { Mail, Phone, MapPin, Calendar, Eye } from "lucide-react";
const ApplicationsGrid = ({
  filteredApplications,
  statusIcons,
  openModal,
  updateApplicationStatus,
  statusOptions,
  statusColors,
  updatingStatus,
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {filteredApplications.map((application) => {
        const StatusIcon = statusIcons[application.status];
        return (
          <div
            key={application._id || application.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors duration-200 truncate">
                    {application.name}
                  </h3>
                  <p className="text-slate-600 font-medium truncate">
                    {application.careerId?.title ||
                      application.position ||
                      application.title}
                  </p>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${
                    statusColors[application.status]
                  } whitespace-nowrap`}
                >
                  <StatusIcon className="w-3 h-3" />
                  {application.status.charAt(0).toUpperCase() +
                    application.status.slice(1)}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-slate-600 group/item hover:text-blue-600 transition-colors duration-200">
                  <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span className="truncate text-sm">{application.email}</span>
                </div>
                {application.phone && (
                  <div className="flex items-center text-slate-600 group/item hover:text-blue-600 transition-colors duration-200">
                    <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">{application.phone}</span>
                  </div>
                )}
                {(application.location || application.careerId?.location) && (
                  <div className="flex items-center text-slate-600 group/item hover:text-blue-600 transition-colors duration-200">
                    <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="text-sm truncate">
                      {application.location || application.careerId?.location}
                    </span>
                  </div>
                )}
                <div className="flex items-center text-slate-500">
                  <Calendar className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span className="text-sm">
                    Applied{" "}
                    {new Date(
                      application.appliedDate || application.createdAt
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => openModal(application)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <select
                  value={application.status}
                  onChange={(e) =>
                    updateApplicationStatus(
                      application._id || application.id,
                      e.target.value
                    )
                  }
                  disabled={updatingStatus}
                  className="px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50 font-medium bg-slate-50 hover:bg-white transition-all duration-200"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationsGrid;
