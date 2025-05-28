import React, { useState } from "react";
import {
  X,
  Plus,
  Minus,
  Upload,
  Book,
  Clock,
  DollarSign,
  Monitor,
  Package,
  Settings,
} from "lucide-react";

const EditCourses = ({
  currentCourse,
  setCurrentCourse,
  setIsEditModalOpen,
  handleUpdateCourse,
}) => {
  const [activeTab, setActiveTab] = useState("basic");

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Book },
    { id: "content", label: "Content", icon: Package },
    { id: "media", label: "Media", icon: Upload },
  ];

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Course Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter course title..."
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Course Heading
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter course heading..."
            value={currentCourse.heading}
            onChange={(e) =>
              setCurrentCourse({
                ...currentCourse,
                heading: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>
        <textarea
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Describe your course..."
          value={currentCourse.description}
          onChange={(e) =>
            setCurrentCourse({
              ...currentCourse,
              description: e.target.value,
            })
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <DollarSign className="inline w-4 h-4 mr-1" />
            Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="0.00"
            value={currentCourse.price}
            onChange={(e) =>
              setCurrentCourse({
                ...currentCourse,
                price: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Monitor className="inline w-4 h-4 mr-1" />
            Mode
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={currentCourse.mode}
            onChange={(e) =>
              setCurrentCourse({
                ...currentCourse,
                mode: e.target.value,
              })
            }
          >
            <option value="">Select mode...</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Clock className="inline w-4 h-4 mr-1" />
            Duration (hours)
          </label>
          <input
            type="number"
            min="0"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="0"
            value={currentCourse.duration}
            onChange={(e) =>
              setCurrentCourse({
                ...currentCourse,
                duration: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );

  const renderArrayField = (fieldName, displayName, items, updateItems) => (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">
        {displayName}
      </h4>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder={`Enter ${displayName.toLowerCase().slice(0, -1)}...`}
              value={item}
              onChange={(e) => {
                const newItems = [...items];
                newItems[i] = e.target.value;
                updateItems(newItems);
              }}
            />
            <button
              type="button"
              onClick={() => {
                const newItems = items.filter((_, idx) => idx !== i);
                updateItems(newItems);
              }}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => updateItems([...items, ""])}
          className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add {displayName.slice(0, -1)}
        </button>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      {renderArrayField(
        "deliverables",
        "Deliverables",
        currentCourse.deliverables,
        (newItems) =>
          setCurrentCourse({ ...currentCourse, deliverables: newItems })
      )}

      {renderArrayField("tools", "Tools", currentCourse.tools, (newItems) =>
        setCurrentCourse({ ...currentCourse, tools: newItems })
      )}

      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Course Modules
        </h4>
        <div className="space-y-4">
          {currentCourse.modules.map((module, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Module Title"
                  value={module.title}
                  onChange={(e) => {
                    const modules = [...currentCourse.modules];
                    modules[i].title = e.target.value;
                    setCurrentCourse({ ...currentCourse, modules });
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const modules = currentCourse.modules.filter(
                      (_, idx) => idx !== i
                    );
                    setCurrentCourse({ ...currentCourse, modules });
                  }}
                  className="ml-3 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>

              <div className="pl-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Topics
                </label>
                <div className="space-y-2">
                  {module.topics.map((topic, j) => (
                    <div key={j} className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Topic name..."
                        value={topic}
                        onChange={(e) => {
                          const modules = [...currentCourse.modules];
                          modules[i].topics[j] = e.target.value;
                          setCurrentCourse({ ...currentCourse, modules });
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const modules = [...currentCourse.modules];
                          modules[i].topics = modules[i].topics.filter(
                            (_, idx) => idx !== j
                          );
                          setCurrentCourse({ ...currentCourse, modules });
                        }}
                        className="px-2 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const modules = [...currentCourse.modules];
                      modules[i].topics.push("");
                      setCurrentCourse({ ...currentCourse, modules });
                    }}
                    className="w-full px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add Topic
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setCurrentCourse({
                ...currentCourse,
                modules: [
                  ...currentCourse.modules,
                  { title: "", topics: [""] },
                ],
              })
            }
            className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Module
          </button>
        </div>
      </div>
    </div>
  );

  const renderMedia = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Upload className="inline w-4 h-4 mr-1" />
          Cover Image URL
        </label>
        <input
          type="url"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="https://example.com/image.jpg"
          value={currentCourse.coverImage}
          onChange={(e) =>
            setCurrentCourse({
              ...currentCourse,
              coverImage: e.target.value,
            })
          }
        />
      </div>

      {currentCourse.coverImage && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Preview
          </label>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <img
              src={currentCourse.coverImage}
              alt="Course cover preview"
              className="max-w-full h-48 object-cover rounded-lg mx-auto"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h2 className="text-2xl font-bold">Edit Course</h2>
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === "basic" && renderBasicInfo()}
          {activeTab === "content" && renderContent()}
          {activeTab === "media" && renderMedia()}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateCourse}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-lg"
          >
            Update Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourses;
