import React, { useState } from "react";
import {
  X,
  Settings,
  FileText,
  Zap,
  CheckCircle,
  Plus,
  Minus,
} from "lucide-react";

const EditServices = ({
  currentService,
  setCurrentService,
  handleUpdateService,
  setIsEditModalOpen,
}) => {
  const [activeTab, setActiveTab] = useState("basic");

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Settings },
    { id: "details", label: "Details", icon: FileText },
    { id: "process", label: "Process", icon: Zap },
    { id: "benefits", label: "Benefits", icon: CheckCircle },
  ];

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Service Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter service name..."
          value={currentService.name}
          onChange={(e) =>
            setCurrentService({
              ...currentService,
              name: e.target.value,
            })
          }
        />
        {!currentService.name.trim() && (
          <p className="text-sm text-red-500 mt-1">Service name is required</p>
        )}
      </div>
    </div>
  );

  const renderArrayField = (fieldName, displayName, icon, placeholder) => {
    const items = Array.isArray(currentService[fieldName])
      ? currentService[fieldName]
      : currentService[fieldName]
      ? [currentService[fieldName]]
      : [""];

    const updateItems = (newItems) => {
      setCurrentService({
        ...currentService,
        [fieldName]: newItems.filter((item) => item.trim() !== ""),
      });
    };

    const Icon = icon;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Icon className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">{displayName}</h3>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex gap-3">
              <textarea
                rows={2}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder={placeholder}
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
                  updateItems(newItems.length ? newItems : [""]);
                }}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center self-start mt-1"
                disabled={items.length === 1}
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => updateItems([...items, ""])}
            className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add {displayName.slice(0, -1)}
          </button>
        </div>
      </div>
    );
  };

  const renderDetails = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <FileText className="inline w-4 h-4 mr-1" />
          Service Description
        </label>
        <div className="text-sm text-gray-600 mb-3">
          Provide detailed information about your service. Each paragraph should
          be on a separate line.
        </div>
        <textarea
          rows={6}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Enter service description... (one paragraph per line)"
          value={
            Array.isArray(currentService.description)
              ? currentService.description.join("\n")
              : currentService.description || ""
          }
          onChange={(e) =>
            setCurrentService({
              ...currentService,
              description: e.target.value
                .split("\n")
                .filter((line) => line.trim() !== ""),
            })
          }
        />
        <div className="text-xs text-gray-500 mt-1">
          Tip: Press Enter to create a new paragraph
        </div>
      </div>
    </div>
  );

  const renderProcess = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Service Process
          </h3>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          Outline the steps involved in delivering your service. Each step
          should be clear and actionable.
        </div>

        <div className="space-y-3">
          {(Array.isArray(currentService.process)
            ? currentService.process
            : currentService.process
            ? [currentService.process]
            : [""]
          ).map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold mt-1">
                {i + 1}
              </div>
              <textarea
                rows={2}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder={`Step ${
                  i + 1
                }: Describe what happens in this step...`}
                value={step}
                onChange={(e) => {
                  const process = Array.isArray(currentService.process)
                    ? [...currentService.process]
                    : currentService.process
                    ? [currentService.process]
                    : [""];
                  process[i] = e.target.value;
                  setCurrentService({
                    ...currentService,
                    process: process.filter((item) => item.trim() !== ""),
                  });
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const process = Array.isArray(currentService.process)
                    ? [...currentService.process]
                    : currentService.process
                    ? [currentService.process]
                    : [""];
                  const newProcess = process.filter((_, idx) => idx !== i);
                  setCurrentService({
                    ...currentService,
                    process: newProcess.length ? newProcess : [""],
                  });
                }}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center self-start mt-1"
                disabled={
                  (Array.isArray(currentService.process)
                    ? currentService.process.length
                    : 1) === 1
                }
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              const process = Array.isArray(currentService.process)
                ? [...currentService.process]
                : currentService.process
                ? [currentService.process]
                : [];
              setCurrentService({
                ...currentService,
                process: [...process, ""],
              });
            }}
            className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Process Step
          </button>
        </div>
      </div>
    </div>
  );

  const renderBenefits = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Service Benefits
          </h3>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          Highlight the key benefits and value propositions of your service.
        </div>

        <div className="space-y-3">
          {(Array.isArray(currentService.benefits)
            ? currentService.benefits
            : currentService.benefits
            ? [currentService.benefits]
            : [""]
          ).map((benefit, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center mt-1">
                <CheckCircle className="w-4 h-4" />
              </div>
              <textarea
                rows={2}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Describe a key benefit of your service..."
                value={benefit}
                onChange={(e) => {
                  const benefits = Array.isArray(currentService.benefits)
                    ? [...currentService.benefits]
                    : currentService.benefits
                    ? [currentService.benefits]
                    : [""];
                  benefits[i] = e.target.value;
                  setCurrentService({
                    ...currentService,
                    benefits: benefits.filter((item) => item.trim() !== ""),
                  });
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const benefits = Array.isArray(currentService.benefits)
                    ? [...currentService.benefits]
                    : currentService.benefits
                    ? [currentService.benefits]
                    : [""];
                  const newBenefits = benefits.filter((_, idx) => idx !== i);
                  setCurrentService({
                    ...currentService,
                    benefits: newBenefits.length ? newBenefits : [""],
                  });
                }}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center self-start mt-1"
                disabled={
                  (Array.isArray(currentService.benefits)
                    ? currentService.benefits.length
                    : 1) === 1
                }
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              const benefits = Array.isArray(currentService.benefits)
                ? [...currentService.benefits]
                : currentService.benefits
                ? [currentService.benefits]
                : [];
              setCurrentService({
                ...currentService,
                benefits: [...benefits, ""],
              });
            }}
            className="w-full px-4 py-3 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Benefit
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <h2 className="text-2xl font-bold">Edit Service</h2>
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
                className={`flex-1 px-4 py-4 flex items-center justify-center gap-2 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === "basic" && renderBasicInfo()}
          {activeTab === "details" && renderDetails()}
          {activeTab === "process" && renderProcess()}
          {activeTab === "benefits" && renderBenefits()}
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
            onClick={handleUpdateService}
            disabled={!currentService.name.trim()}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 font-medium shadow-lg"
          >
            Update Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditServices;
