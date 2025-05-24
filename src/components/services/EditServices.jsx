import React from "react";

const EditServices = ({
  currentService,
  setCurrentService,
  handleUpdateService,
  setIsEditModalOpen,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Edit Service</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={currentService.name}
              onChange={(e) =>
                setCurrentService({
                  ...currentService,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block mb-1">Description (one per line)</label>
            <textarea
              className="w-full p-2 border rounded"
              value={
                Array.isArray(currentService.description)
                  ? currentService.description.join("\n")
                  : currentService.description
              }
              onChange={(e) =>
                setCurrentService({
                  ...currentService,
                  description: e.target.value.split("\n"),
                })
              }
              placeholder="Enter each paragraph on a new line"
            />
          </div>
          <div>
            <label className="block mb-1">Process (one per line)</label>
            <textarea
              className="w-full p-2 border rounded"
              value={
                Array.isArray(currentService.process)
                  ? currentService.process.join("\n")
                  : currentService.process
              }
              onChange={(e) =>
                setCurrentService({
                  ...currentService,
                  process: e.target.value.split("\n"),
                })
              }
              placeholder="Enter each process step on a new line"
            />
          </div>
          <div>
            <label className="block mb-1">Benefits (one per line)</label>
            <textarea
              className="w-full p-2 border rounded"
              value={
                Array.isArray(currentService.benefits)
                  ? currentService.benefits.join("\n")
                  : currentService.benefits
              }
              onChange={(e) =>
                setCurrentService({
                  ...currentService,
                  benefits: e.target.value.split("\n"),
                })
              }
              placeholder="Enter each benefit on a new line"
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
              onClick={handleUpdateService}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              disabled={!currentService.name.trim()}
            >
              Update Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditServices;
