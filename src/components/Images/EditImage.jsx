import React from "react";

const EditImage = ({
  selectedImage,
  setSelectedImage,
  setShowEditForm,
  handleSaveEdit,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="font-medium text-lg mb-4">Edit Image</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={selectedImage.title}
            onChange={(e) =>
              setSelectedImage({ ...selectedImage, title: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alt Text
          </label>
          <input
            type="text"
            value={selectedImage.alt}
            onChange={(e) =>
              setSelectedImage({ ...selectedImage, alt: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Image
          </label>
          <div className="border border-gray-200 rounded-lg p-2 bg-white">
            <img
              src={selectedImage.image}
              alt={selectedImage.image}
              className="max-h-40 mx-auto object-contain"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => {
              setShowEditForm(false);
              setSelectedImage(null);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditImage;
