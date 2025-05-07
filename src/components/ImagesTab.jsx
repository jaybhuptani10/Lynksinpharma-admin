import React, { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Upload } from "lucide-react";

const ImagesTab = () => {
  // Sample initial images data
  const [images, setImages] = useState([
    {
      id: 1,
      title: "Banner Image",
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Website banner",
    },
    {
      id: 2,
      title: "Product Showcase",
      url: "https://images.unsplash.com/photo-1640163561346-7778a2edf353?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Product display",
    },
    {
      id: 3,
      title: "Team Photo",
      url: "https://images.unsplash.com/photo-1638202677704-b74690bb8fa9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Our team",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newImage, setNewImage] = useState({
    title: "",
    alt: "",
    file: null,
  });

  // Function to handle image deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      setImages(images.filter((image) => image.id !== id));
    }
  };

  // Function to open edit form for an image
  const handleEdit = (image) => {
    setSelectedImage({ ...image });
    setShowEditForm(true);
    setShowAddForm(false);
  };

  // Function to save edited image
  const handleSaveEdit = () => {
    setImages(
      images.map((img) => (img.id === selectedImage.id ? selectedImage : img))
    );
    setShowEditForm(false);
    setSelectedImage(null);
  };

  // Function to handle add form input changes
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewImage({
      ...newImage,
      [name]: value,
    });
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    // In a real app, you would handle file upload to a server
    // Here we're just creating a temporary URL for preview
    const file = e.target.files[0];
    if (file) {
      setNewImage({
        ...newImage,
        file: file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  // Function to add a new image
  const handleAddImage = (e) => {
    e.preventDefault();

    // In a real app, you would upload the file to a server
    // and get back a URL to store
    const newId =
      images.length > 0 ? Math.max(...images.map((img) => img.id)) + 1 : 1;

    const newImageObj = {
      id: newId,
      title: newImage.title,
      alt: newImage.alt,
      url: newImage.previewUrl || "/api/placeholder/800/600", // Use placeholder if no file selected
    };

    setImages([...images, newImageObj]);
    setNewImage({ title: "", alt: "", file: null, previewUrl: null });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 p-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Images</h2>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowEditForm(false);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {showAddForm ? <X size={16} /> : <Plus size={16} />}
          {showAddForm ? "Cancel" : "Add Image"}
        </button>
      </div>

      {/* Add Image Form */}
      {showAddForm && (
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
      )}

      {/* Edit Image Form */}
      {showEditForm && selectedImage && (
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
                  src={selectedImage.url}
                  alt={selectedImage.alt}
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
      )}

      {/* Images Gallery */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">
          Your Images ({images.length})
        </h3>

        {images.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">
              No images yet. Add your first image!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={image.url}
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
                      onClick={() => handleDelete(image.id)}
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
    </div>
  );
};

export default ImagesTab;
