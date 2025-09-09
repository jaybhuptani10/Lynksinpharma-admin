import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  Eye,
  Calendar,
  User,
  Mail,
  Phone,
  FileText,
  ChevronDown,
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
  Download,
  ExternalLink,
} from "lucide-react";
import Loading from "./Loading";
import Error from "./Error";
import StatsCard from "./StatsCard";
import SearchFilter from "./Search";
import ApplicationsGrid from "./ApplicationsGrid";
import DetailModal from "./DetailModal";

const JobApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const statusOptions = ["applied", "interview", "offered", "rejected"];
  const statusColors = {
    applied: "bg-blue-50 text-blue-700 border-blue-200",
    interview: "bg-amber-50 text-amber-700 border-amber-200",
    offered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
  };

  const statusIcons = {
    applied: Clock,
    interview: Users,
    offered: CheckCircle,
    rejected: X,
  };

  // Get admin token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("adminToken");
  };

  // Fetch all applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/career/applications", {
          withCredentials: true,
        });
        // Defensive: Accept both response.data.data and response.data.message as arrays
        if (Array.isArray(response.data.data)) {
          setApplications(response.data.data);
        } else if (Array.isArray(response.data.message)) {
          setApplications(response.data.message);
        } else {
          setApplications([]);
        }
        console.log(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Filter applications based on search and status
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.careerId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get status counts for stats
  const statusCounts = statusOptions.reduce((acc, status) => {
    acc[status] = applications.filter((app) => app.status === status).length;
    return acc;
  }, {});

  // Update application status
  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      setUpdatingStatus(true);
      setError(null);
      await axios.put(
        `/career/applications/${applicationId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId || app.id === applicationId
            ? { ...app, status: newStatus }
            : app
        )
      );
      if (
        selectedApplication &&
        (selectedApplication._id === applicationId ||
          selectedApplication.id === applicationId)
      ) {
        setSelectedApplication((prev) => ({ ...prev, status: newStatus }));
      }
      // Show success message briefly
      const successMsg = document.createElement("div");
      successMsg.className =
        "fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2";
      successMsg.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Status updated successfully`;
      document.body.appendChild(successMsg);
      setTimeout(() => {
        if (document.body.contains(successMsg)) {
          document.body.removeChild(successMsg);
        }
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update application status"
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  const openModal = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApplication(null);
    document.body.style.overflow = "unset";
  };

  const handleViewResume = (resumeUrl) => {
    window.open(resumeUrl, "_blank");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Job Applications
              </h1>
              <p className="text-slate-600 mt-1">
                Manage and review all job applications
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCard
            statusIcons={statusIcons}
            statusOptions={statusOptions}
            statusCounts={statusCounts}
            statusColors={statusColors}
          />
        </div>

        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Applications Count */}
        <div className="mb-6">
          <p className="text-slate-600 font-medium">
            Showing{" "}
            <span className="text-blue-600 font-bold">
              {filteredApplications.length}
            </span>{" "}
            of{" "}
            <span className="text-slate-900 font-bold">
              {applications.length}
            </span>{" "}
            applications
          </p>
        </div>

        {/* Applications Grid */}
        <ApplicationsGrid
          filteredApplications={filteredApplications}
          statusIcons={statusIcons}
          openModal={openModal}
          updateApplicationStatus={updateApplicationStatus}
          statusOptions={statusOptions}
          statusColors={statusColors}
          updatingStatus={updatingStatus}
        />

        {/* Empty State */}
        {filteredApplications.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              No applications found
            </h3>
            <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
              {applications.length === 0
                ? "No job applications have been submitted yet. Check back later for new applications."
                : "No applications match your current search and filter criteria. Try adjusting your filters."}
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Detail Modal */}
      {showModal && selectedApplication && (
        <DetailModal
          selectedApplication={selectedApplication}
          handleViewResume={handleViewResume}
          statusColors={statusColors}
          updateApplicationStatus={updateApplicationStatus}
          statusOptions={statusOptions}
          updatingStatus={updatingStatus}
          closeModal={closeModal}
          statusIcons={statusIcons}
        />
      )}
    </div>
  );
};

export default JobApplication;
