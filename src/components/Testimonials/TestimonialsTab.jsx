import React, { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import UpdateTestimonial from "./UpdateTestimonial";
import axios from "axios";

const TestimonialsTab = () => {
  const [testimonials, setTestimonials] = useState([]);
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

  // Fetch testimonials from API on mount
  React.useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("/about/testimonials");
        if (Array.isArray(response.data.data)) {
          setTestimonials(response.data.data);
        } else if (Array.isArray(response.data)) {
          setTestimonials(response.data);
        } else if (response.data && Array.isArray(response.data.testimonials)) {
          setTestimonials(response.data.testimonials);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

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

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("designation", form.designation);
      formData.append("content", form.content);
      if (form.file) {
        formData.append("image", form.file); // must match multer's expected key
      }

      await axios.post("/about/testimonials/add", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // After success: fetch again
      const response = await axios.get("/about/testimonials");
      if (Array.isArray(response.data.data)) {
        setTestimonials(response.data.data);
      } else if (Array.isArray(response.data)) {
        setTestimonials(response.data);
      } else if (response.data && Array.isArray(response.data.testimonials)) {
        setTestimonials(response.data.testimonials);
      }

      setForm({
        name: "",
        designation: "",
        content: "",
        image: "",
        file: null,
        previewUrl: null,
      });
      setShowForm(false);
      alert("Testimonial added successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add testimonial. Please try again."
      );
    }
  };

  const handleEdit = (testimonial) => {
    setEditId(testimonial._id || testimonial.id);
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

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("designation", form.designation);
      formData.append("content", form.content);

      if (form.file) {
        formData.append("image", form.file); // New file selected
      } else {
        formData.append("image", form.image); // Existing image URL
      }

      await axios.put(`/about/testimonials/update/${editId}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Refetch testimonials (same as before)
      const response = await axios.get("/about/testimonials");
      const data =
        response.data?.data ??
        response.data?.testimonials ??
        (Array.isArray(response.data) ? response.data : []);
      setTestimonials(data);

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
      alert("Testimonial updated successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update testimonial. Please try again."
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await axios.delete(`/about/testimonials/delete/${id}`, {
          withCredentials: true,
        });
        // Refetch testimonials
        const response = await axios.get("/about/testimonials");
        if (Array.isArray(response.data.data)) {
          setTestimonials(response.data.data);
        } else if (Array.isArray(response.data)) {
          setTestimonials(response.data);
        } else if (response.data && Array.isArray(response.data.testimonials)) {
          setTestimonials(response.data.testimonials);
        }
        alert("Testimonial deleted successfully!");
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Failed to delete testimonial. Please try again."
        );
      }
    }
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
        <UpdateTestimonial
          form={form}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleCancel={handleCancel}
          editId={editId}
          handleUpdate={handleUpdate}
          handleAdd={handleAdd}
        />
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t._id || t.id}
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
              {t._id && (
                <button
                  onClick={() => handleDelete(t._id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsTab;
