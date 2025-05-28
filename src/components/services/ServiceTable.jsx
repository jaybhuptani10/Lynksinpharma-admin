import React, { useState } from "react";
import {
  Edit2,
  Trash2,
  Eye,
  ChevronDown,
  ChevronRight,
  Settings,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const ServiceTable = ({
  filteredServices,
  setCurrentService,
  setIsEditModalOpen,
  setIsDeleteModalOpen,
  searchTerm,
}) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (serviceId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedRows(newExpanded);
  };

  const servicesToDisplay = filteredServices || [];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Mobile Card View */}
      <div className="block lg:hidden">
        {servicesToDisplay.length > 0 ? (
          <div className="space-y-4 p-4">
            {servicesToDisplay.map((service) => (
              <div
                key={service._id}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Settings className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="font-bold text-lg text-gray-900">
                        {service.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    Overview
                  </h4>
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    {service.description && service.description.length > 0 && (
                      <ul className="space-y-1">
                        {service.description.slice(0, 2).map((desc, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-sm text-gray-600"
                          >
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {desc}
                          </li>
                        ))}
                        {service.description.length > 2 &&
                          !expandedRows.has(service._id) && (
                            <li className="text-sm text-blue-600 font-medium">
                              +{service.description.length - 2} more...
                            </li>
                          )}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => toggleRowExpansion(service._id)}
                    className="text-blue-600 text-sm font-medium flex items-center bg-blue-100 px-3 py-1.5 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {expandedRows.has(service._id) ? (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronRight className="w-4 h-4 mr-1" />
                        View Details
                      </>
                    )}
                  </button>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setCurrentService(service);
                        setIsEditModalOpen(true);
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center transition-colors shadow-sm"
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setCurrentService(service);
                        setIsDeleteModalOpen(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center transition-colors shadow-sm"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>

                {expandedRows.has(service._id) && (
                  <div className="mt-4 pt-4 border-t border-blue-200 space-y-4">
                    {service.description && service.description.length > 2 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Complete Description:
                        </h4>
                        <div className="bg-white rounded-lg p-3 border border-blue-100">
                          <ul className="space-y-2">
                            {service.description.map((desc, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-sm text-gray-600"
                              >
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {desc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {service.process && service.process.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <ArrowRight className="w-4 h-4 mr-1" />
                          Process
                        </h4>
                        <div className="bg-white rounded-lg p-3 border border-blue-100">
                          <ol className="space-y-2">
                            {service.process.map((proc, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-sm text-gray-600"
                              >
                                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  {idx + 1}
                                </span>
                                {proc}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}

                    {service.benefits && service.benefits.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Benefits
                        </h4>
                        <div className="bg-white rounded-lg p-3 border border-blue-100">
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-sm text-gray-600"
                              >
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Settings className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-lg text-gray-600 mb-2">No services found</p>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-1">
                Try adjusting your search.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Service Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Overview
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {servicesToDisplay.length > 0 ? (
              servicesToDisplay.map((service) => (
                <React.Fragment key={service._id}>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Settings className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">
                            {service.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-sm">
                        {service.description &&
                          service.description.length > 0 && (
                            <ul className="space-y-1">
                              {service.description
                                .slice(0, 2)
                                .map((desc, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start text-sm text-gray-600"
                                  >
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                    {desc}
                                  </li>
                                ))}
                              {service.description.length > 2 && (
                                <li className="text-sm text-blue-600 font-medium">
                                  +{service.description.length - 2} more
                                  features...
                                </li>
                              )}
                            </ul>
                          )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleRowExpansion(service._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        {expandedRows.has(service._id) ? (
                          <>
                            <ChevronDown className="w-4 h-4 mr-1" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronRight className="w-4 h-4 mr-1" />
                            View Details
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setCurrentService(service);
                            setIsEditModalOpen(true);
                          }}
                          className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg text-sm flex items-center transition-colors shadow-sm"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setCurrentService(service);
                            setIsDeleteModalOpen(true);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm flex items-center transition-colors shadow-sm"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>

                  {expandedRows.has(service._id) && (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-6 bg-gradient-to-r from-blue-50 to-indigo-50"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Complete Description */}
                          {service.description &&
                            service.description.length > 0 && (
                              <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                  <Eye className="w-4 h-4 mr-2 text-blue-600" />
                                  Service Features
                                </h4>
                                <ul className="space-y-2">
                                  {service.description.map((desc, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start text-sm text-gray-600"
                                    >
                                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                      {desc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {/* Process */}
                          {service.process && service.process.length > 0 && (
                            <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <ArrowRight className="w-4 h-4 mr-2 text-blue-600" />
                                Process Steps
                              </h4>
                              <ol className="space-y-2">
                                {service.process.map((proc, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start text-sm text-gray-600"
                                  >
                                    <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-medium">
                                      {idx + 1}
                                    </span>
                                    {proc}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          )}

                          {/* Benefits */}
                          {service.benefits && service.benefits.length > 0 && (
                            <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                Key Benefits
                              </h4>
                              <ul className="space-y-2">
                                {service.benefits.map((benefit, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start text-sm text-gray-600"
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Settings className="w-16 h-16 mx-auto" />
                  </div>
                  <p className="text-lg text-gray-600 mb-2">
                    No services found
                  </p>
                  {searchTerm && (
                    <p className="text-sm text-gray-500">
                      Try adjusting your search term: "
                      <span className="font-medium">{searchTerm}</span>"
                    </p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTable;
