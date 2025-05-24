import React from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
const UpdateTestimonial = ({
  form,
  handleInputChange,
  handleFileChange,
  handleCancel,
  editId,
  handleUpdate,
  handleAdd,
}) => {
  return (
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
          <label className="block text-sm font-medium mb-1">Designation</label>
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
  );
};

export default UpdateTestimonial;
