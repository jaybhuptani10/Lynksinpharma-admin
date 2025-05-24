import React from "react";
import axios from "axios";
const AddnewService = ({
  newService,
  setNewService,
  setIsAddModalOpen,
  handleAddService,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Add New Service</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1">Description (one per line)</label>
            <textarea
              className="w-full p-2 border rounded"
              value={newService.description.join("\n")}
              onChange={(e) =>
                setNewService({
                  ...newService,
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
              value={newService.process.join("\n")}
              onChange={(e) =>
                setNewService({
                  ...newService,
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
              value={newService.benefits.join("\n")}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  benefits: e.target.value.split("\n"),
                })
              }
              placeholder="Enter each benefit on a new line"
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
              onClick={handleAddService}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              disabled={!newService.name.trim()}
            >
              Add Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddnewService;
