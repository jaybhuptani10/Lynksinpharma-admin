import React, { useState } from "react";

const ServicesTab = () => {
  // Sample initial services data
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Web Development",
      description: "Full stack web development services",
      duration: "2-4 weeks",
      price: 1499.99,
    },
    {
      id: 2,
      name: "UI/UX Design",
      description: "Professional user interface design",
      duration: "1-2 weeks",
      price: 899.99,
    },
    {
      id: 3,
      name: "SEO Optimization",
      description: "Search engine optimization services",
      duration: "Ongoing",
      price: 499.99,
    },
  ]);

  // State for form visibility and current service
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // State for new service data
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    duration: "",
    price: 0,
  });

  // Handler for adding a new service
  const handleAddService = () => {
    const serviceToAdd = {
      ...newService,
      id: services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1,
      price: parseFloat(newService.price),
    };

    setServices([...services, serviceToAdd]);
    setNewService({ name: "", description: "", duration: "", price: 0 });
    setIsAddModalOpen(false);
  };

  // Handler for updating a service
  const handleUpdateService = () => {
    setServices(
      services.map((service) =>
        service.id === currentService.id
          ? { ...currentService, price: parseFloat(currentService.price) }
          : service
      )
    );
    setIsEditModalOpen(false);
  };

  // Handler for deleting a service
  const handleDeleteService = () => {
    setServices(services.filter((service) => service.id !== currentService.id));
    setIsDeleteModalOpen(false);
  };

  // Filter services based on search term
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Services</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add New Service
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search services..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Duration</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <tr key={service.id}>
                  <td className="py-2 px-4 border">{service.name}</td>
                  <td className="py-2 px-4 border">{service.description}</td>
                  <td className="py-2 px-4 border">{service.duration}</td>
                  <td className="py-2 px-4 border">
                    ${service.price.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setCurrentService(service);
                          setIsEditModalOpen(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setCurrentService(service);
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
                  No services found.{" "}
                  {searchTerm && "Try adjusting your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Service Modal */}
      {isAddModalOpen && (
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
                <label className="block mb-1">Description</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
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
                  value={newService.duration}
                  onChange={(e) =>
                    setNewService({ ...newService, duration: e.target.value })
                  }
                  placeholder="e.g., 2-4 weeks, Ongoing"
                />
              </div>
              <div>
                <label className="block mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full p-2 border rounded"
                  value={newService.price}
                  onChange={(e) =>
                    setNewService({ ...newService, price: e.target.value })
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
      )}

      {/* Edit Service Modal */}
      {isEditModalOpen && currentService && (
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
                <label className="block mb-1">Description</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={currentService.description}
                  onChange={(e) =>
                    setCurrentService({
                      ...currentService,
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
                  value={currentService.duration}
                  onChange={(e) =>
                    setCurrentService({
                      ...currentService,
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
                  value={currentService.price}
                  onChange={(e) =>
                    setCurrentService({
                      ...currentService,
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
                  onClick={handleUpdateService}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Update Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Delete Service</h3>
            <p>
              Are you sure you want to delete "{currentService.name}"? This
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
                onClick={handleDeleteService}
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

export default ServicesTab;
