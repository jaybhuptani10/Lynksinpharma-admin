import React from "react";
import { Plus, Pencil, Trash2, X, Check, Upload } from "lucide-react";
const AddImage = ({
  newImage,
  handleAddInputChange,
  handleFileChange,
  setShowAddForm,
  handleAddImage,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="font-medium text-lg mb-4">Add New Image</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={newImage.title}
            onChange={handleAddInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alt Text
          </label>
          <input
            type="text"
            name="alt"
            value={newImage.alt}
            onChange={handleAddInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image File
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              {newImage.previewUrl ? (
                <div className="relative w-full h-full">
                  <img
                    src={newImage.previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    Click to upload or drag and drop
                  </p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setShowAddForm(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddImage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddImage;
