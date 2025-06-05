import React, { useState, useEffect } from "react";
import {
  Check,
  X,
  Search,
  Trash2,
  Eye,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";
import axios from "axios";

const BlogsTab = () => {
  const [approvedBlogs, setApprovedBlogs] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [approvedSearch, setApprovedSearch] = useState("");
  const [pendingSearch, setPendingSearch] = useState("");
  const [loadingApproved, setLoadingApproved] = useState(true);
  const [loadingPending, setLoadingPending] = useState(true);
  const [expandedComments, setExpandedComments] = useState({});
  const [blogComments, setBlogComments] = useState({});
  const [loadingComments, setLoadingComments] = useState({});

  useEffect(() => {
    // Fetch approved blogs from public endpoint
    const fetchApprovedBlogs = async () => {
      setLoadingApproved(true);
      try {
        const res = await axios.get("/blog");
        let blogs = res.data.data.docs;
        console.log("Fetched approved blogs:", blogs);
        if (!Array.isArray(blogs)) blogs = [];
        setApprovedBlogs(blogs);
      } catch (err) {
        setApprovedBlogs([]);
      }
      setLoadingApproved(false);
    };

    // Fetch all blogs from admin endpoint
    const fetchPendingBlogs = async () => {
      setLoadingPending(true);
      try {
        const res = await axios.get("/blog/admin", {
          withCredentials: true,
        });
        console.log("Fetched pending blogs:", res.data);
        const pending = (res.data.data || []).filter(
          (blog) => !blog.approved && !blog.cancelled
        );
        console.log("Filtered pending blogs:", pending);
        setPendingBlogs(pending);
      } catch (err) {
        setPendingBlogs([]);
      }
      setLoadingPending(false);
    };

    fetchApprovedBlogs();
    fetchPendingBlogs();
  }, []);

  const fetchBlogComments = async (blogId) => {
    if (blogComments[blogId]) return; // Already fetched

    setLoadingComments((prev) => ({ ...prev, [blogId]: true }));
    try {
      const res = await axios.get(`/comment/admin/post/${blogId}`, {
        withCredentials: true,
      });
      setBlogComments((prev) => ({
        ...prev,
        [blogId]: res.data.data || [],
      }));
    } catch (err) {
      console.error("Error fetching comments:", err);
      setBlogComments((prev) => ({
        ...prev,
        [blogId]: [],
      }));
    }
    setLoadingComments((prev) => ({ ...prev, [blogId]: false }));
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`/blog/admin/${id}`, {}, { withCredentials: true });

      // Move blog from pending to approved
      const approvedBlog = pendingBlogs.find((blog) => blog._id === id);
      if (approvedBlog) {
        setPendingBlogs(pendingBlogs.filter((blog) => blog._id !== id));
        setApprovedBlogs([
          ...approvedBlogs,
          { ...approvedBlog, approved: true },
        ]);
      }
    } catch (err) {
      console.error("Error approving blog:", err);
    }
  };

  const handleDelete = async (id, isApproved = false) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`/blog/admin/${id}`, { withCredentials: true });

      if (isApproved) {
        setApprovedBlogs(approvedBlogs.filter((blog) => blog._id !== id));
      } else {
        setPendingBlogs(pendingBlogs.filter((blog) => blog._id !== id));
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleApproveComment = async (commentId, blogId) => {
    try {
      await axios.patch(
        `/comment/admin/${commentId}`,
        {},
        { withCredentials: true }
      );

      // Update the comment in the state
      setBlogComments((prev) => ({
        ...prev,
        [blogId]: prev[blogId].map((comment) =>
          comment._id === commentId ? { ...comment, approved: true } : comment
        ),
      }));
    } catch (err) {
      console.error("Error approving comment:", err);
    }
  };

  const handleDeleteComment = async (commentId, blogId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      await axios.delete(`/comment/admin/${commentId}`, {
        withCredentials: true,
      });

      // Remove the comment from the state
      setBlogComments((prev) => ({
        ...prev,
        [blogId]: prev[blogId].filter((comment) => comment._id !== commentId),
      }));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const toggleComments = (blogId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));

    if (!expandedComments[blogId]) {
      fetchBlogComments(blogId);
    }
  };

  const filteredApprovedBlogs = approvedBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(approvedSearch.toLowerCase()) ||
      (blog.category || "").toLowerCase().includes(approvedSearch.toLowerCase())
  );

  const filteredPendingBlogs = pendingBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(pendingSearch.toLowerCase()) ||
      (blog.category || "").toLowerCase().includes(pendingSearch.toLowerCase())
  );

  // Helper to format date
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const SearchInput = ({ placeholder, value, onChange }) => (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 w-80"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  const CommentsSection = ({ blogId, comments, loading }) => {
    const pendingComments = comments.filter((comment) => !comment.approved);
    const approvedComments = comments.filter((comment) => comment.approved);

    return (
      <div className="mt-4 bg-gray-50 rounded-lg p-4">
        <div className="space-y-4">
          {/* Pending Comments */}
          {pendingComments.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                Pending Comments ({pendingComments.length})
              </h4>
              <div className="space-y-2">
                {pendingComments.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-white rounded-lg p-3 border-l-4 border-amber-400"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {comment.user?.name || comment.name || "Anonymous"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {comment.content || comment.comment}
                        </p>
                      </div>
                      <div className="flex gap-1 ml-3">
                        <button
                          onClick={() =>
                            handleApproveComment(comment._id, blogId)
                          }
                          className="inline-flex items-center justify-center w-7 h-7 bg-emerald-500 hover:bg-emerald-600 text-white rounded transition-colors duration-200"
                          title="Approve Comment"
                        >
                          <Check size={12} />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteComment(comment._id, blogId)
                          }
                          className="inline-flex items-center justify-center w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-200"
                          title="Delete Comment"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approved Comments */}
          {approvedComments.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                Approved Comments ({approvedComments.length})
              </h4>
              <div className="space-y-2">
                {approvedComments.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-white rounded-lg p-3 border-l-4 border-emerald-400"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {comment.user?.name || comment.name || "Anonymous"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {comment.content || comment.comment}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteComment(comment._id, blogId)}
                        className="inline-flex items-center justify-center w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-200 ml-3"
                        title="Delete Comment"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <span className="text-sm text-gray-500">Loading comments...</span>
            </div>
          )}

          {!loading && comments.length === 0 && (
            <div className="text-center py-4">
              <MessageCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm text-gray-500">No comments yet</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const BlogTable = ({
    blogs,
    loading,
    actionType = "pending", // "pending" or "approved"
  }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Cover
              </th>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Excerpt
              </th>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-0">
            {loading ? (
              <tr>
                <td colSpan="6" className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                    <span className="text-gray-500">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <React.Fragment key={blog._id}>
                  <tr
                    className={`hover:bg-gray-50 transition-colors duration-150 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    } ${
                      expandedComments[blog._id]
                        ? "border-b-0"
                        : "border-b border-gray-200"
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="relative group">
                        <img
                          src={
                            blog.images?.[0] ||
                            "https://via.placeholder.com/64x64?text=No+Image"
                          }
                          alt={blog.title}
                          className="w-16 h-16 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <Eye className="text-white w-5 h-5" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-900 text-sm leading-tight max-w-xs">
                        {blog.title}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-600 max-w-xs">
                        <p className="line-clamp-2">{blog.exerpt}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {blog.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-500">
                        {formatDate(blog.updatedAt)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleComments(blog._id)}
                          className="inline-flex items-center justify-center w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                          title="View Comments"
                        >
                          {expandedComments[blog._id] ? (
                            <ChevronUp size={16} />
                          ) : (
                            <MessageCircle size={16} />
                          )}
                        </button>
                        {actionType === "pending" ? (
                          <>
                            <button
                              onClick={() => handleApprove(blog._id)}
                              className="inline-flex items-center justify-center w-9 h-9 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                              title="Approve"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(blog._id, false)}
                              className="inline-flex items-center justify-center w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                              title="Reject"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleDelete(blog._id, true)}
                            className="inline-flex items-center justify-center w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {expandedComments[blog._id] && (
                    <tr
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      } border-b border-gray-200`}
                    >
                      <td colSpan="6" className="px-6 pb-4">
                        <CommentsSection
                          blogId={blog._id}
                          comments={blogComments[blog._id] || []}
                          loading={loadingComments[blog._id]}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <span className="text-gray-500 font-medium">
                      No blogs found
                    </span>
                    <span className="text-gray-400 text-sm mt-1">
                      Try adjusting your search criteria
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Blog Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and moderate your blog content and comments
          </p>
        </div>

        {/* Published Blogs Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                Published Blogs
                <span className="ml-3 text-sm font-normal text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                  {filteredApprovedBlogs.length}
                </span>
              </h2>
            </div>
            <SearchInput
              placeholder="Search published blogs..."
              value={approvedSearch}
              onChange={setApprovedSearch}
            />
          </div>
          <BlogTable
            blogs={filteredApprovedBlogs}
            loading={loadingApproved}
            actionType="approved"
          />
        </div>

        {/* Pending Approval Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                Pending Approval
                <span className="ml-3 text-sm font-normal text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                  {filteredPendingBlogs.length}
                </span>
              </h2>
            </div>
            <SearchInput
              placeholder="Search pending blogs..."
              value={pendingSearch}
              onChange={setPendingSearch}
            />
          </div>
          <BlogTable
            blogs={filteredPendingBlogs}
            loading={loadingPending}
            actionType="pending"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogsTab;
