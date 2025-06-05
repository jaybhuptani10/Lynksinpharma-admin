import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  Check,
  Trash2,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

const BlogCommentsTab = ({ blogId, isAdmin = false }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    if (blogId) {
      setLoading(true);
      setError("");
      // Fetch comments for the given blogId
      axios
        .get(`/blog/${blogId}/comments`)
        .then((res) => {
          // Ensure comments is always an array
          setComments(Array.isArray(res.data) ? res.data : []);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch comments.");
          setComments([]);
          setLoading(false);
        });
    }
  }, [blogId]);

  // Approve a comment (admin only)
  const approveComment = (commentId) => {
    setActionLoading((prev) => ({ ...prev, [commentId]: "approving" }));

    // Simulate API call
    setTimeout(() => {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, approved: true } : comment
        )
      );
      setActionLoading((prev) => ({ ...prev, [commentId]: null }));
    }, 500);
  };

  // Delete a comment (admin only)
  const deleteComment = (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    setActionLoading((prev) => ({ ...prev, [commentId]: "deleting" }));

    // Simulate API call
    setTimeout(() => {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      setActionLoading((prev) => ({ ...prev, [commentId]: null }));
    }, 500);
  };

  // Filter comments based on admin view preferences
  const filteredComments =
    showPendingOnly && isAdmin
      ? comments.filter((comment) => !comment.approved)
      : comments;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (!blogId) {
    return (
      <div className="p-4 text-center text-gray-500">
        <MessageCircle className="mx-auto mb-2 h-8 w-8" />
        <p>Select a blog to view comments</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          Comments
        </h2>

        {isAdmin && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPendingOnly(!showPendingOnly)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                showPendingOnly
                  ? "bg-orange-100 text-orange-700 border border-orange-200"
                  : "bg-gray-100 text-gray-700 border border-gray-200"
              }`}
            >
              {showPendingOnly ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              {showPendingOnly ? "Show All" : "Pending Only"}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading comments...</p>
        </div>
      ) : filteredComments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MessageCircle className="mx-auto mb-2 h-12 w-12 opacity-50" />
          <p className="text-lg">
            {showPendingOnly ? "No pending comments" : "No comments yet"}
          </p>
          <p className="text-sm">
            {showPendingOnly
              ? "All comments have been reviewed"
              : "Be the first to leave a comment!"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`border rounded-lg p-4 transition-all ${
                comment.approved
                  ? "border-green-200 bg-green-50"
                  : "border-orange-200 bg-orange-50"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">
                      {comment.author_name || "Anonymous"}
                    </h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        comment.approved
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {comment.approved ? "Approved" : "Pending"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {comment.author_email && (
                      <span className="mr-3">{comment.author_email}</span>
                    )}
                    <span>{formatDate(comment.created_at)}</span>
                  </p>
                </div>

                {isAdmin && (
                  <div className="flex items-center gap-2">
                    {!comment.approved && (
                      <button
                        onClick={() => approveComment(comment.id)}
                        disabled={actionLoading[comment.id] === "approving"}
                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors text-sm"
                      >
                        <Check className="h-4 w-4" />
                        {actionLoading[comment.id] === "approving"
                          ? "Approving..."
                          : "Approve"}
                      </button>
                    )}

                    <button
                      onClick={() => deleteComment(comment.id)}
                      disabled={actionLoading[comment.id] === "deleting"}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                      {actionLoading[comment.id] === "deleting"
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                )}
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-gray-800 whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredComments.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Showing {filteredComments.length} of {comments.length} comments
            {isAdmin && showPendingOnly && (
              <span className="ml-1">(pending only)</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogCommentsTab;
