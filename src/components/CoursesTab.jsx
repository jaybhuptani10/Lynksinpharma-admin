import React, { useState } from "react";

const CoursesTab = () => {
  // Sample initial courses data
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to React",
      description: "Learn the basics of React",
      duration: "8 weeks",
      price: 2000,
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Deep dive into JS concepts",
      duration: "10 weeks",
      price: 3000,
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description: "Learn design principles",
      duration: "6 weeks",
      price: 2000,
    },
  ]);

  // State for form visibility and current course
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // State for new course data
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    duration: "",
    price: 0,
  });

  // Handler for adding a new course
  const handleAddCourse = () => {
    const courseToAdd = {
      ...newCourse,
      id: courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1,
      price: parseFloat(newCourse.price),
    };

    setCourses([...courses, courseToAdd]);
    setNewCourse({ title: "", description: "", duration: "", price: 0 });
    setIsAddModalOpen(false);
  };

  // Handler for updating a course
  const handleUpdateCourse = () => {
    setCourses(
      courses.map((course) =>
        course.id === currentCourse.id
          ? { ...currentCourse, price: parseFloat(currentCourse.price) }
          : course
      )
    );
    setIsEditModalOpen(false);
  };

  // Handler for deleting a course
  const handleDeleteCourse = () => {
    setCourses(courses.filter((course) => course.id !== currentCourse.id));
    setIsDeleteModalOpen(false);
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
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Duration</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td className="py-2 px-4 border">{course.title}</td>
                  <td className="py-2 px-4 border">{course.description}</td>
                  <td className="py-2 px-4 border">{course.duration}</td>
                  <td className="py-2 px-4 border">
                    {course.price.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setCurrentCourse(course);
                          setIsEditModalOpen(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setCurrentCourse(course);
                          setIsDeleteModalOpen(true);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  No courses found. {searchTerm && "Try adjusting your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add New Course</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Duration</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newCourse.duration}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, duration: e.target.value })
                  }
                  placeholder="e.g., 8 weeks"
                />
              </div>
              <div>
                <label className="block mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full p-2 border rounded"
                  value={newCourse.price}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, price: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCourse}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  disabled={!newCourse.title.trim()}
                >
                  Add Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {isEditModalOpen && currentCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Course</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={currentCourse.title}
                  onChange={(e) =>
                    setCurrentCourse({
                      ...currentCourse,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={currentCourse.description}
                  onChange={(e) =>
                    setCurrentCourse({
                      ...currentCourse,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Duration</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={currentCourse.duration}
                  onChange={(e) =>
                    setCurrentCourse({
                      ...currentCourse,
                      duration: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full p-2 border rounded"
                  value={currentCourse.price}
                  onChange={(e) =>
                    setCurrentCourse({
                      ...currentCourse,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateCourse}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Update Course
                </button>
              </div>
            </div>
          </div>
        </div>
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
