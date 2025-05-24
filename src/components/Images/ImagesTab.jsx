import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, X, Check, Upload } from "lucide-react";
import AddImage from "./AddImage";
import EditImage from "./EditImage";
import ImagesGallery from "./ImagesGallery";

const ImagesTab = () => {
  const [images, setImages] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newImage, setNewImage] = useState({
    title: "",
    alt: "",
    file: null,
  });

  // Fetch images from API on mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/web/images");
        // If the API returns an array directly
        if (Array.isArray(response.data.data)) {
          setImages(response.data.data);
        } else if (Array.isArray(response.data)) {
          setImages(response.data);
        } else if (response.data && Array.isArray(response.data.images)) {
          setImages(response.data.images);
        }
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };
    fetchImages();
  }, []);

  // Function to update an image (API call)
  const handleSaveEdit = async () => {
    try {
      const { _id, title, alt, date } = selectedImage;
      await axios.put(
        "/web/images",
        {
          id: _id,
          title,
          description: alt,
          date: date || undefined,
        },
        { withCredentials: true }
      );
      // Refetch images after update
      const response = await axios.get("/web/images");
      if (Array.isArray(response.data.data)) {
        setImages(response.data.data);
      } else if (Array.isArray(response.data)) {
        setImages(response.data);
      } else if (response.data && Array.isArray(response.data.images)) {
        setImages(response.data.images);
      }
      setShowEditForm(false);
      setSelectedImage(null);
      alert("Image updated successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update image. Please try again."
      );
    }
  };

  // Function to handle image deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await axios.delete(`/web/image/${id}`, { withCredentials: true });
        // Refetch images after deletion
        const response = await axios.get("/web/images");
        if (Array.isArray(response.data.data)) {
          setImages(response.data.data);
        } else if (Array.isArray(response.data)) {
          setImages(response.data);
        } else if (response.data && Array.isArray(response.data.images)) {
          setImages(response.data.images);
        }
        alert("Image deleted successfully!");
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Failed to delete image. Please try again."
        );
      }
    }
  };

  // Function to open edit form for an image
  const handleEdit = (image) => {
    setSelectedImage({ ...image });
    setShowEditForm(true);
    setShowAddForm(false);
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
    const file = e.target.files[0];
    if (file) {
      setNewImage({
        ...newImage,
        file: file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  // Function to add a new image (API call)
  const handleAddImage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("images", newImage.file);
      formData.append("titles", newImage.title);
      formData.append("descriptions", newImage.alt);
      // Optionally add date if needed: formData.append("date", new Date().toISOString());
      await axios.post("/web/images", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image added successfully!");
      setShowAddForm(false);
      setNewImage({ title: "", alt: "", file: null, previewUrl: null });
      // Refetch images after adding
      const response = await axios.get("/web/images");
      if (Array.isArray(response.data.data)) {
        setImages(response.data.data);
      } else if (Array.isArray(response.data)) {
        setImages(response.data);
      } else if (response.data && Array.isArray(response.data.images)) {
        setImages(response.data.images);
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add image. Please try again."
      );
    }
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
        <AddImage
          newImage={newImage}
          handleAddInputChange={handleAddInputChange}
          handleFileChange={handleFileChange}
          setShowAddForm={setShowAddForm}
          handleAddImage={handleAddImage}
        />
      )}
      {/* Edit Image Form */}
      {showEditForm && selectedImage && (
        <EditImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setShowEditForm={setShowEditForm}
          handleSaveEdit={handleSaveEdit}
        />
      )}
      {/* Images Gallery */}
      <ImagesGallery
        images={images}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ImagesTab;
