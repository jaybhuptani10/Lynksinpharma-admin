import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "../Searchbar";
import ServiceTable from "./ServiceTable";
import AddnewService from "./AddnewService";
import EditServices from "./EditServices";
import DeleteServices from "./DeleteServices";

const ServicesTab = () => {
  const [services, setServices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newService, setNewService] = useState({
    name: "",
    description: [""],
    process: [""],
    benefits: [""],
  });

  // Fetch services from /web/services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/web/services");
        // If the API returns an array directly
        if (Array.isArray(response.data.data)) {
          setServices(response.data.data);
        } else if (Array.isArray(response.data)) {
          setServices(response.data);
        } else if (response.data && Array.isArray(response.data.services)) {
          setServices(response.data.services);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    fetchServices();
  }, []);

  // Handler for adding a new service (local only, not sent to backend)
  const handleAddService = async () => {
    try {
      await axios.post(
        "/web/services",
        {
          title: newService.name,
          description: newService.description,
          process: newService.process,
          benefits: newService.benefits,
        },
        { withCredentials: true }
      );
      alert("Service added successfully!");
      setIsAddModalOpen(false);
      // Optionally, refetch services here
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add service. Please try again."
      );
    }
    setIsAddModalOpen(false);
  };

  // Handler for updating a service (API call)
  const handleUpdateService = async () => {
    try {
      await axios.put(
        "/web/services",
        {
          id: currentService._id,
          title: currentService.name,
          description: currentService.description,
          process: currentService.process,
          benefits: currentService.benefits,
        },
        { withCredentials: true }
      );
      setServices(
        services.map((service) =>
          service._id === currentService._id ? currentService : service
        )
      );
      setIsEditModalOpen(false);
      alert("Service updated successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update service. Please try again."
      );
    }
  };

  // Handler for deleting a service (API call)
  const handleDeleteService = async () => {
    try {
      await axios.delete(`/web/service/${currentService._id}`, {
        withCredentials: true,
      });
      setServices(
        services.filter((service) => service._id !== currentService._id)
      );
      setIsDeleteModalOpen(false);
      alert("Service deleted successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete service. Please try again."
      );
    }
  };

  // ...existing code...

  // Filter services based on search term
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(service.description) &&
        service.description
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
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
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Services Table */}
      <ServiceTable
        filteredServices={filteredServices}
        setCurrentService={setCurrentService}
        setIsEditModalOpen={setIsEditModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        searchTerm={searchTerm}
      />

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <AddnewService
          newService={newService}
          setNewService={setNewService}
          setIsAddModalOpen={setIsAddModalOpen}
          handleAddService={handleAddService}
        />
      )}

      {/* Edit Service Modal */}
      {isEditModalOpen && currentService && (
        <EditServices
          currentService={currentService}
          setCurrentService={setCurrentService}
          handleUpdateService={handleUpdateService}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentService && (
        <DeleteServices
          currentService={currentService}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleDeleteService={handleDeleteService}
        />
      )}
    </div>
  );
};

export default ServicesTab;
