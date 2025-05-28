import React, { useState } from "react";
import { Check, X } from "lucide-react";

const initialBlogs = [
  {
    id: 1,
    title: "How to Learn React Fast",
    excerpt: "A quick guide to mastering React in record time...",
    author: "Jane Doe",
    date: "2025-05-18",
    coverimage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=400",
    category: "Programming",
    status: "pending",
  },
  {
    id: 2,
    title: "Understanding Data Structures",
    excerpt: "Data structures are the backbone of efficient code...",
    author: "John Smith",
    date: "2025-05-15",
    coverimage:
      "https://images.unsplash.com/photo-1640163561346-7778a2edf353?q=80&w=400",
    category: "Computer Science",
    status: "pending",
  },
];

const BlogsTab = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [search, setSearch] = useState("");

  const handleApprove = (id) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id ? { ...blog, status: "approved" } : blog
      )
    );
  };

  const handleCancel = (id) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id ? { ...blog, status: "cancelled" } : blog
      )
    );
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.author.toLowerCase().includes(search.toLowerCase()) ||
      blog.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Approve Blogs</h2>
        <input
          type="text"
          placeholder="Search by title, author, or category..."
          className="p-2 border rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Cover</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Excerpt</th>
              <th className="py-2 px-4 border">Author</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="py-2 px-4 border">
                    <img
                      src={blog.coverimage}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border font-medium">{blog.title}</td>
                  <td className="py-2 px-4 border text-sm text-gray-600 max-w-xs truncate">
                    {blog.excerpt}
                  </td>
                  <td className="py-2 px-4 border">{blog.author}</td>
                  <td className="py-2 px-4 border">{blog.date}</td>
                  <td className="py-2 px-4 border">{blog.category}</td>
                  <td className="py-2 px-4 border">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        blog.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : blog.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    {blog.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(blog.id)}
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                          title="Approve"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => handleCancel(blog.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-4 text-center">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogsTab;
