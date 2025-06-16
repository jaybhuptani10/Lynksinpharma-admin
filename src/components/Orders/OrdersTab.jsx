import React, { useState, useEffect } from "react";
import {
  Edit,
  Save,
  X,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";
import axios from "axios";

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [tempStatus, setTempStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusTypes = ["pending", "accepted", "shipped", "delivered"];

  const statusConfig = {
    pending: {
      icon: Clock,
      color: "text-yellow-600 bg-yellow-50",
      label: "Pending",
    },
    accepted: {
      icon: Package,
      color: "text-blue-600 bg-blue-50",
      label: "Accepted",
    },
    shipped: {
      icon: Truck,
      color: "text-purple-600 bg-purple-50",
      label: "Shipped",
    },
    delivered: {
      icon: CheckCircle,
      color: "text-green-600 bg-green-50",
      label: "Delivered",
    },
  };

  // Replace mock data with real API call
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/order", { withCredentials: true });
        console.log("Fetched orders:", res.data.data);
        setOrders(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  const handleEditOrder = (order) => {
    setEditingOrder(order.orderId);
    setTempStatus(order.status);
  };

  // Update order status via API
  const handleSaveOrder = async (orderId) => {
    try {
      await axios.post(
        "/order/update-status",
        { orderId, status: tempStatus },
        { withCredentials: true }
      );
      setOrders(
        orders.map((order) =>
          order.orderId === orderId ? { ...order, status: tempStatus } : order
        )
      );
      setEditingOrder(null);
      setTempStatus("");
    } catch (err) {
      alert("Failed to update order status.");
    }
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
    setTempStatus("");
  };

  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) => {
        const orderId = order?.orderId || "";
        const customerName = order?.customerName || "";
        const customerEmail = order?.customerEmail || "";
        const matchesSearch =
          orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
    : [];

  const getStatusBadge = (status) => {
    const config = statusConfig[status];
    const IconComponent = config.icon;
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        <IconComponent className="w-4 h-4 mr-1" />
        {config.label}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Orders Management
          </h1>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search Orders
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by Order ID, Customer Name, or Email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:w-48">
              <label
                htmlFor="status-filter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filter by Status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                {statusTypes.map((status) => (
                  <option key={status} value={status}>
                    {statusConfig[status].label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items & Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr
                    key={order?._id || Math.random()}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          #
                          {order?._id
                            ? String(order._id).slice(-8)
                            : "--------"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order?.createdAt.split("T")[0] || "-"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order?.user.name || "-"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order?.user.email || "-"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">
                          {Array.isArray(order.items) ? order.items.length : 0}{" "}
                          item
                          {Array.isArray(order.items) &&
                          order.items.length !== 1
                            ? "s"
                            : ""}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          $
                          {typeof order.total === "number"
                            ? order.total.toFixed(2)
                            : "0.00"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {Array.isArray(order.items)
                            ? order.items.join(", ")
                            : "-"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingOrder === order.orderId ? (
                        <select
                          value={tempStatus}
                          onChange={(e) => setTempStatus(e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {statusTypes.map((status) => (
                            <option key={status} value={status}>
                              {statusConfig[status].label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        getStatusBadge(order.status)
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingOrder === order.orderId ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSaveOrder(order.orderId)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditOrder(order)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              alert(
                                `Viewing details for order ${order.orderId}`
                              )
                            }
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No orders found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No orders have been placed yet"}
            </p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {statusTypes.map((status) => {
            const count = orders.filter(
              (order) => order.status === status
            ).length;
            const config = statusConfig[status];
            const IconComponent = config.icon;
            return (
              <div key={status} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${config.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {config.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrdersTab;
