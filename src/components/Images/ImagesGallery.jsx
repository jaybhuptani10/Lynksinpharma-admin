import React from "react";
import { Plus, Pencil, Trash2, X, Check, Upload } from "lucide-react";
const ImagesGallery = ({ images, handleEdit, handleDelete }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">
        Your Images ({images.length})
      </h3>

      {images.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No images yet. Add your first image!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div
              key={image._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={image.image}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium">{image.title}</h4>
                <p className="text-sm text-gray-500 truncate">{image.alt}</p>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(image)}
                    className="p-2 text-gray-600 hover:text-blue-600"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(image._id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagesGallery;
