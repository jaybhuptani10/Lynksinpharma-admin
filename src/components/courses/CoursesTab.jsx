import React, { useState, useEffect } from "react";
import Searchbar from "../Searchbar";
import CoursesTable from "./CoursesTable";
import AddCourses from "./AddCourses";
import EditCourses from "./EditCourses";
import axios from "axios";

const CoursesTab = () => {
  const [courses, setCourses] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCourse, setNewCourse] = useState({
    title: "",
    heading: "",
    description: "",
    price: 0,
    mode: "",
    duration: 0,
    deliverables: [""],
    tools: [""],
    modules: [{ title: "", topics: [""] }],
    coverImage: "",
  });

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/web/courses");
        if (Array.isArray(response.data.data)) {
          setCourses(response.data.data);
        } else if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else if (response.data && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Handler for adding a new course
  const handleAddCourse = async () => {
    try {
      // Ensure correct types and filter out empty values
      const payload = {
        ...newCourse,
        price: Number(newCourse.price),
        duration: Number(newCourse.duration),
        deliverables: newCourse.deliverables.filter((d) => d && d.trim()),
        tools: newCourse.tools.filter((t) => t && t.trim()),
        modules: newCourse.modules.map((m) => ({
          title: m.title,
          topics: m.topics.filter((t) => t && t.trim()),
        })),
      };
      await axios.post("/web/courses", payload, { withCredentials: true });
      const response = await axios.get("/web/courses");
      setCourses(response.data.data || response.data.courses || response.data);
      setNewCourse({
        title: "",
        heading: "",
        description: "",
        price: 0,
        mode: "",
        duration: 0,
        deliverables: [""],
        tools: [""],
        modules: [{ title: "", topics: [""] }],
        coverImage: "",
      });
      setIsAddModalOpen(false);
      alert("Course added successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add course. Please try again."
      );
    }
  };

  // Handler for updating a course
  const handleUpdateCourse = async () => {
    try {
      await axios.put(
        "/web/courses",
        { ...currentCourse, id: currentCourse._id },
        { withCredentials: true }
      );
      const response = await axios.get("/web/courses");
      setCourses(response.data.data || response.data.courses || response.data);
      setIsEditModalOpen(false);
      alert("Course updated successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update course. Please try again."
      );
    }
  };

  // Handler for deleting a course
  const handleDeleteCourse = async () => {
    try {
      await axios.delete(`/web/course/${currentCourse._id}`, {
        withCredentials: true,
      });
      const response = await axios.get("/web/courses");
      setCourses(response.data.data || response.data.courses || response.data);
      setIsDeleteModalOpen(false);
      alert("Course deleted successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete course. Please try again."
      );
    }
  };

  // Filter courses based on search term
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Courses</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add New Course
        </button>
      </div>
      {/* Search Bar */}
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Courses Table */}
      <CoursesTable
        filteredCourses={filteredCourses}
        setCurrentCourse={setCurrentCourse}
        setIsEditModalOpen={setIsEditModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        searchTerm={searchTerm}
      />
      {/* Add Course Modal */}
      {isAddModalOpen && (
        <AddCourses
          newCourse={newCourse}
          setNewCourse={setNewCourse}
          setIsAddModalOpen={setIsAddModalOpen}
          handleAddCourse={handleAddCourse}
        />
      )}
      {/* Edit Course Modal */}
      {isEditModalOpen && currentCourse && (
        <EditCourses
          currentCourse={currentCourse}
          setCurrentCourse={setCurrentCourse}
          setIsEditModalOpen={setIsEditModalOpen}
          handleUpdateCourse={handleUpdateCourse}
        />
      )}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Delete Course</h3>
            <p>
              Are you sure you want to delete "{currentCourse.title}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCourse}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesTab;
