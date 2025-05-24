import React from "react";

const DeleteServices = ({
  currentService,
  setIsDeleteModalOpen,
  handleDeleteService,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Delete Service</h3>
        <p>
          Are you sure you want to delete "{currentService.name}"? This action
          cannot be undone.
        </p>
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteService}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteServices;
