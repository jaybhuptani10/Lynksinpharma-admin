import React, { useState } from "react";
import {
  X,
  Plus,
  Settings,
  Eye,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const AddnewService = ({
  newService,
  setNewService,
  setIsAddModalOpen,
  handleAddService,
}) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!newService.name?.trim()) {
      newErrors.name = "Service name is required";
    }

    if (
      !newService.description?.length ||
      newService.description.every((desc) => !desc.trim())
    ) {
      newErrors.description = "At least one description is required";
    }

    if (
      !newService.process?.length ||
      newService.process.every((proc) => !proc.trim())
    ) {
      newErrors.process = "At least one process step is required";
    }

    if (
      !newService.benefits?.length ||
      newService.benefits.every((benefit) => !benefit.trim())
    ) {
      newErrors.benefits = "At least one benefit is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await handleAddService();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding service:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Settings },
    { id: "description", label: "Description", icon: Eye },
    { id: "process", label: "Process", icon: ArrowRight },
    { id: "benefits", label: "Benefits", icon: CheckCircle },
  ];

  const getFieldCount = (field) => {
    return newService[field]?.filter((item) => item.trim()).length || 0;
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-bold">Add New Service</h3>
            </div>
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const hasContent =
                tab.id === "basic"
                  ? !!newService.name?.trim()
                  : getFieldCount(tab.id) > 0;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${
                    isActive
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                  {hasContent && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                      {tab.id === "basic" ? "✓" : getFieldCount(tab.id)}
                    </span>
                  )}
                  {errors[tab.id] && (
                    <AlertCircle className="w-4 h-4 ml-2 text-red-500" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-h-96 overflow-y-auto">
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  }`}
                  value={newService.name || ""}
                  onChange={(e) =>
                    setNewService({ ...newService, name: e.target.value })
                  }
                  placeholder="Enter service name..."
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
                <p className="text-sm text-blue-700">
                  After entering the service name, use the tabs above to add
                  detailed information about your service.
                </p>
              </div>
            </div>
          )}

          {activeTab === "description" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Description *
                  <span className="text-gray-500 font-normal ml-2">
                    ({getFieldCount("description")} items)
                  </span>
                </label>
                <textarea
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.description ? "border-red-300" : "border-gray-300"
                  }`}
                  rows="8"
                  value={newService.description?.join("\n") || ""}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      description: e.target.value
                        .split("\n")
                        .filter((line) => line.trim()),
                    })
                  }
                  placeholder="Enter each feature or description point on a new line:&#10;&#10;• Comprehensive data analysis&#10;• Custom dashboard development&#10;• Statistical modeling&#10;• Business intelligence implementation"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.description}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  💡 Tip: Each line will become a separate description point
                  with bullet styling.
                </p>
              </div>
            </div>
          )}

          {activeTab === "process" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Process Steps *
                  <span className="text-gray-500 font-normal ml-2">
                    ({getFieldCount("process")} steps)
                  </span>
                </label>
                <textarea
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.process ? "border-red-300" : "border-gray-300"
                  }`}
                  rows="8"
                  value={newService.process?.join("\n") || ""}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      process: e.target.value
                        .split("\n")
                        .filter((line) => line.trim()),
                    })
                  }
                  placeholder="Enter each process step on a new line:&#10;&#10;Initial consultation and requirement gathering&#10;Data audit and assessment&#10;Solution design and architecture planning&#10;Implementation and testing&#10;Training and knowledge transfer"
                />
                {errors.process && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.process}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  💡 Tip: Steps will be automatically numbered in the display
                  order.
                </p>
              </div>
            </div>
          )}

          {activeTab === "benefits" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Key Benefits *
                  <span className="text-gray-500 font-normal ml-2">
                    ({getFieldCount("benefits")} benefits)
                  </span>
                </label>
                <textarea
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.benefits ? "border-red-300" : "border-gray-300"
                  }`}
                  rows="8"
                  value={newService.benefits?.join("\n") || ""}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      benefits: e.target.value
                        .split("\n")
                        .filter((line) => line.trim()),
                    })
                  }
                  placeholder="Enter each benefit on a new line:&#10;&#10;Improved decision-making with data-driven insights&#10;Increased operational efficiency&#10;Cost reduction through optimization&#10;Enhanced competitive advantage&#10;Better customer understanding"
                />
                {errors.benefits && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.benefits}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  💡 Tip: Benefits will be displayed with checkmark icons for
                  visual appeal.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {Object.keys(errors).length > 0 && (
                <span className="text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Please fix the errors above
                </span>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !newService.name?.trim()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddnewService;
