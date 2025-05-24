import React from "react";

const ServiceTable = ({
  filteredServices,
  setCurrentService,
  setIsEditModalOpen,
  setIsDeleteModalOpen,
  searchTerm,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Process</th>
            <th className="py-2 px-4 border">Benefits</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <tr key={service._id}>
                <td className="py-2 px-4 border font-semibold">
                  {service.name}
                </td>
                <td className="py-2 px-4 border">
                  <ul className="list-disc pl-4">
                    {Array.isArray(service.description) &&
                      service.description.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                  </ul>
                </td>
                <td className="py-2 px-4 border">
                  <ul className="list-disc pl-4">
                    {Array.isArray(service.process) &&
                      service.process.map((proc, idx) => (
                        <li key={idx}>{proc}</li>
                      ))}
                  </ul>
                </td>
                <td className="py-2 px-4 border">
                  <ul className="list-disc pl-4">
                    {Array.isArray(service.benefits) &&
                      service.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                  </ul>
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
                No services found. {searchTerm && "Try adjusting your search."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
