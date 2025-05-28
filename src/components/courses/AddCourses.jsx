import React, { useState } from "react";
import {
  X,
  Plus,
  Trash2,
  BookOpen,
  Clock,
  DollarSign,
  Monitor,
  Package,
  Settings,
} from "lucide-react";

const AddCourses = ({
  newCourse,
  setNewCourse,
  setIsAddModalOpen,
  handleAddCourse,
}) => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { title: "Basic Info", icon: BookOpen },
    { title: "Content", icon: Package },
    { title: "Details", icon: Settings },
  ];

  const handleNext = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const handlePrev = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  const canProceed = () => {
    switch (activeSection) {
      case 0:
        return (
          newCourse.title.trim() &&
          newCourse.heading.trim() &&
          newCourse.description.trim()
        );
      case 1:
        return (
          newCourse.deliverables.some((d) => d.trim()) &&
          newCourse.tools.some((t) => t.trim())
        );
      case 2:
        return newCourse.price >= 0 && newCourse.duration > 0;
      default:
        return true;
    }
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Course Title *
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter course title"
            value={newCourse.title}
            onChange={(e) =>
              setNewCourse({ ...newCourse, title: e.target.value })
            }
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Course Heading *
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter course heading"
            value={newCourse.heading}
            onChange={(e) =>
              setNewCourse({ ...newCourse, heading: e.target.value })
            }
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Describe your course..."
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <DollarSign className="inline w-4 h-4 mr-1" />
            Price
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="0.00"
            value={newCourse.price}
            onChange={(e) =>
              setNewCourse({ ...newCourse, price: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Clock className="inline w-4 h-4 mr-1" />
            Duration (hours)
          </label>
          <input
            type="number"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter duration"
            value={newCourse.duration}
            onChange={(e) =>
              setNewCourse({ ...newCourse, duration: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Monitor className="inline w-4 h-4 mr-1" />
            Mode
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={newCourse.mode}
            onChange={(e) =>
              setNewCourse({ ...newCourse, mode: e.target.value })
            }
          >
            <option value="">Select mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="https://example.com/image.jpg"
            value={newCourse.coverImage}
            onChange={(e) =>
              setNewCourse({ ...newCourse, coverImage: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Deliverables
        </label>
        <div className="space-y-3">
          {newCourse.deliverables.map((d, i) => (
            <div key={i} className="flex gap-3">
              <input
                type="text"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={`Deliverable ${i + 1}`}
                value={d}
                onChange={(e) => {
                  const deliverables = [...newCourse.deliverables];
                  deliverables[i] = e.target.value;
                  setNewCourse({ ...newCourse, deliverables });
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const deliverables = newCourse.deliverables.filter(
                    (_, idx) => idx !== i
                  );
                  setNewCourse({ ...newCourse, deliverables });
                }}
                className="px-3 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setNewCourse({
                ...newCourse,
                deliverables: [...newCourse.deliverables, ""],
              })
            }
            className="flex items-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors border border-blue-200"
          >
            <Plus className="w-4 h-4" />
            Add Deliverable
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Tools & Technologies
        </label>
        <div className="space-y-3">
          {newCourse.tools.map((t, i) => (
            <div key={i} className="flex gap-3">
              <input
                type="text"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={`Tool ${i + 1}`}
                value={t}
                onChange={(e) => {
                  const tools = [...newCourse.tools];
                  tools[i] = e.target.value;
                  setNewCourse({ ...newCourse, tools });
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const tools = newCourse.tools.filter((_, idx) => idx !== i);
                  setNewCourse({ ...newCourse, tools });
                }}
                className="px-3 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setNewCourse({ ...newCourse, tools: [...newCourse.tools, ""] })
            }
            className="flex items-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors border border-blue-200"
          >
            <Plus className="w-4 h-4" />
            Add Tool
          </button>
        </div>
      </div>
    </div>
  );

  const renderModules = () => (
    <div className="space-y-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Course Modules
      </label>
      <div className="space-y-4">
        {newCourse.modules.map((m, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl p-6 bg-gray-50"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Module {i + 1}
              </h4>
              <button
                type="button"
                onClick={() => {
                  const modules = newCourse.modules.filter(
                    (_, idx) => idx !== i
                  );
                  setNewCourse({ ...newCourse, modules });
                }}
                className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors text-sm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mb-4"
              placeholder="Module Title"
              value={m.title}
              onChange={(e) => {
                const modules = [...newCourse.modules];
                modules[i].title = e.target.value;
                setNewCourse({ ...newCourse, modules });
              }}
            />

            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Topics
            </label>
            <div className="space-y-3">
              {m.topics.map((topic, j) => (
                <div key={j} className="flex gap-3">
                  <input
                    type="text"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    placeholder={`Topic ${j + 1}`}
                    value={topic}
                    onChange={(e) => {
                      const modules = [...newCourse.modules];
                      modules[i].topics[j] = e.target.value;
                      setNewCourse({ ...newCourse, modules });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const modules = [...newCourse.modules];
                      modules[i].topics = modules[i].topics.filter(
                        (_, idx) => idx !== j
                      );
                      setNewCourse({ ...newCourse, modules });
                    }}
                    className="px-3 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const modules = [...newCourse.modules];
                  modules[i].topics.push("");
                  setNewCourse({ ...newCourse, modules });
                }}
                className="flex items-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors border border-blue-200"
              >
                <Plus className="w-4 h-4" />
                Add Topic
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setNewCourse({
              ...newCourse,
              modules: [...newCourse.modules, { title: "", topics: [""] }],
            })
          }
          className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Module
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Add New Course</h2>
              <p className="text-blue-100">Create your course content</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                      index <= activeSection
                        ? "bg-white text-blue-600"
                        : "bg-white/20 text-white/60"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      index <= activeSection ? "text-white" : "text-white/60"
                    }`}
                  >
                    {section.title}
                  </span>
                  {index < sections.length - 1 && (
                    <div
                      className={`w-8 h-0.5 mx-4 ${
                        index < activeSection ? "bg-white" : "bg-white/20"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto min-h-0">
          {activeSection === 0 && renderBasicInfo()}
          {activeSection === 1 && renderContent()}
          {activeSection === 2 && renderModules()}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-200 px-6 py-6 bg-white">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={activeSection === 0}
              className="flex items-center px-5 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent rounded-xl font-medium transition-all duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <div className="flex space-x-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-3 border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow"
              >
                Cancel
              </button>

              {activeSection < sections.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 disabled:transform-none"
                >
                  Next Step
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleAddCourse}
                  disabled={!newCourse.title.trim()}
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 disabled:transform-none"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Course
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourses;
