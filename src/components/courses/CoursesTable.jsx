import React, { useState } from "react";
import { Edit2, Trash2, Eye, ChevronDown, ChevronRight } from "lucide-react";

const CoursesTable = ({
  filteredCourses,
  setCurrentCourse,
  setIsEditModalOpen,
  setIsDeleteModalOpen,
  searchTerm,
}) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (courseId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedRows(newExpanded);
  };

  const coursesToDisplay = filteredCourses || [];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Mobile Card View */}
      <div className="block lg:hidden">
        {coursesToDisplay.length > 0 ? (
          <div className="space-y-4 p-4">
            {coursesToDisplay.map((course) => (
              <div
                key={course._id || course.id}
                className="bg-gray-50 rounded-lg p-4 border"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {course.heading}
                    </p>
                  </div>
                  {course.coverImage && (
                    <img
                      src={course.coverImage}
                      alt="Course cover"
                      className="w-16 h-12 object-cover rounded ml-3"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div>
                    <span className="font-medium text-gray-700">Price:</span>
                    <span className="text-green-600 font-semibold ml-1">
                      ₹
                      {typeof course.price === "number"
                        ? course.price.toLocaleString()
                        : (Number(course.price) || 0).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Mode:</span>
                    <span className="ml-1">{course.mode}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Duration:</span>
                    <span className="ml-1">{course.duration} hrs</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {course.description}
                </p>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => toggleRowExpansion(course._id || course.id)}
                    className="text-blue-600 text-sm font-medium flex items-center"
                  >
                    {expandedRows.has(course._id || course.id) ? (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronRight className="w-4 h-4 mr-1" />
                        Show More
                      </>
                    )}
                  </button>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setCurrentCourse(course);
                        setIsEditModalOpen(true);
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setCurrentCourse(course);
                        setIsDeleteModalOpen(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>

                {expandedRows.has(course._id || course.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    {course.deliverables && course.deliverables.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Deliverables:
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {course.deliverables.map((d, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {course.tools && course.tools.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Tools:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {course.tools.map((t, i) => (
                            <span
                              key={i}
                              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {course.modules && course.modules.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Modules:
                        </h4>
                        <div className="space-y-2">
                          {course.modules.map((m, i) => (
                            <div
                              key={i}
                              className="bg-white p-3 rounded border"
                            >
                              <h5 className="font-medium text-sm text-gray-900">
                                {m.title}
                              </h5>
                              {m.topics && m.topics.length > 0 && (
                                <ul className="mt-2 text-xs text-gray-600 space-y-1">
                                  {m.topics.map((topic, j) => (
                                    <li key={j} className="flex items-start">
                                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                      {topic}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-2">
              <Eye className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-600">No courses found.</p>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-1">
                Try adjusting your search.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price & Mode
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cover
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coursesToDisplay.length > 0 ? (
              coursesToDisplay.map((course) => (
                <React.Fragment key={course._id || course.id}>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {course.title}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {course.heading}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-3">
                          {course.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-green-600 mb-1">
                        ₹
                        {typeof course.price === "number"
                          ? course.price.toLocaleString()
                          : (Number(course.price) || 0).toLocaleString()}
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {course.mode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {course.duration} hours
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          toggleRowExpansion(course._id || course.id)
                        }
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                      >
                        {expandedRows.has(course._id || course.id) ? (
                          <>
                            <ChevronDown className="w-4 h-4 mr-1" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronRight className="w-4 h-4 mr-1" />
                            Show Details
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      {course.coverImage && (
                        <img
                          src={course.coverImage}
                          alt="Course cover"
                          className="w-20 h-14 object-cover rounded-lg shadow-sm"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setCurrentCourse(course);
                            setIsEditModalOpen(true);
                          }}
                          className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-md text-sm flex items-center transition-colors"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setCurrentCourse(course);
                            setIsDeleteModalOpen(true);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm flex items-center transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>

                  {expandedRows.has(course._id || course.id) && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {course.deliverables &&
                            course.deliverables.length > 0 && (
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Deliverables
                                </h4>
                                <ul className="space-y-2">
                                  {course.deliverables.map((d, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start text-sm text-gray-600"
                                    >
                                      <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                      {d}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {course.tools && course.tools.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">
                                Tools & Resources
                              </h4>
                              <div className="space-y-2">
                                {course.tools.map((t, i) => (
                                  <span
                                    key={i}
                                    className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {course.modules && course.modules.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">
                                Course Modules
                              </h4>
                              <div className="space-y-3">
                                {course.modules.map((m, i) => (
                                  <div
                                    key={i}
                                    className="bg-white p-4 rounded-lg border"
                                  >
                                    <h5 className="font-medium text-sm text-gray-900 mb-2">
                                      {m.title}
                                    </h5>
                                    {m.topics && m.topics.length > 0 && (
                                      <ul className="space-y-1">
                                        {m.topics.map((topic, j) => (
                                          <li
                                            key={j}
                                            className="flex items-start text-xs text-gray-600"
                                          >
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                            {topic}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Eye className="w-16 h-16 mx-auto" />
                  </div>
                  <p className="text-lg text-gray-600 mb-2">No courses found</p>
                  {searchTerm && (
                    <p className="text-sm text-gray-500">
                      Try adjusting your search term: "
                      <span className="font-medium">{searchTerm}</span>"
                    </p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesTable;
