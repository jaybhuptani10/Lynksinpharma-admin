import React, { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const initialTestimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    designation: "Software Engineer",
    content: "This platform helped me upskill and land my dream job!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Bob Smith",
    designation: "Data Scientist",
    content: "Great resources and community support.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const TestimonialsTab = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    content: "",
    image: "",
    file: null,
    previewUrl: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleAdd = () => {
    const newId =
      testimonials.length > 0
        ? Math.max(...testimonials.map((t) => t.id)) + 1
        : 1;
    setTestimonials([
      ...testimonials,
      {
        id: newId,
        name: form.name,
        designation: form.designation,
        content: form.content,
        image:
          form.previewUrl ||
          form.image ||
          "https://randomuser.me/api/portraits/lego/1.jpg",
      },
    ]);
    setForm({
      name: "",
      designation: "",
      content: "",
      image: "",
      file: null,
      previewUrl: null,
    });
    setShowForm(false);
  };

  const handleEdit = (testimonial) => {
    setEditId(testimonial.id);
    setForm({
      name: testimonial.name,
      designation: testimonial.designation,
      content: testimonial.content,
      image: testimonial.image,
      file: null,
      previewUrl: testimonial.image,
    });
    setShowForm(true);
  };

  const handleUpdate = () => {
    setTestimonials(
      testimonials.map((t) =>
        t.id === editId
          ? {
              ...t,
              name: form.name,
              designation: form.designation,
              content: form.content,
              image: form.previewUrl || form.image,
            }
          : t
      )
    );
    setEditId(null);
    setForm({
      name: "",
      designation: "",
      content: "",
      image: "",
      file: null,
      previewUrl: null,
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({
      name: "",
      designation: "",
      content: "",
      image: "",
      file: null,
      previewUrl: null,
    });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Testimonials</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setForm({
              name: "",
              designation: "",
              content: "",
              image: "",
              file: null,
              previewUrl: null,
            });
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 max-w-xl mx-auto">
          <h3 className="font-medium text-lg mb-4">
            {editId ? "Edit" : "Add"} Testimonial
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {(form.previewUrl || form.image) && (
                <img
                  src={form.previewUrl || form.image}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded mt-2"
                />
              )}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 flex items-center gap-1"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={editId ? handleUpdate : handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={
                  !form.name.trim() ||
                  !form.designation.trim() ||
                  !form.content.trim()
                }
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white border rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-20 h-20 object-cover rounded-full mb-3 border"
            />
            <h4 className="font-semibold text-lg">{t.name}</h4>
            <p className="text-sm text-gray-500 mb-2">{t.designation}</p>
            <p className="text-center text-gray-700 mb-4">"{t.content}"</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(t)}
                className="p-2 text-gray-600 hover:text-blue-600"
                title="Edit"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="p-2 text-gray-600 hover:text-red-600"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsTab;
