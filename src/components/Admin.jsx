import React, { useState, useEffect } from "react";
import {
  Wrench,
  ArrowLeft,
  Settings,
  MessageSquare,
  Mail,
  Users,
  FileText,
} from "lucide-react";
import ContactUsTab from "./Contact/ContactUsTab";
import axios from "axios";
import Products from "./Products/Products";
import OrdersTab from "./Orders/OrdersTab";
import UserProfileTab from "./UserProfile/UserProfileTab";

const DashboardCard = ({
  title,
  count,
  description,
  icon,
  onManage,
  bgColor = "bg-white",
}) => {
  return (
    <div
      className={`${bgColor} rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
          {icon}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-3xl font-bold text-gray-900 mb-1">{count}</h3>
        <p className="text-gray-500 text-sm">Total {description}</p>
      </div>

      <button
        onClick={onManage}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg py-3 px-4 font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Manage {title}
      </button>
    </div>
  );
};

const AdminPanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalContacts: 0,
  });

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleManage = (section) => {
    setActivePage(section);
  };

  useEffect(() => {
    console.log("Fetching stats...");
    // Fetch real stats from backend (update endpoint as needed)
    const fetchStats = async () => {
      try {
        const res = await axios.get("/admin/stats", {
          withCredentials: true,
        });
        console.log("Fetched stats:", res.data.data);
        setStats(res.data.data);
      } catch (err) {
        // Optionally handle error, fallback to zeros
        setStats({
          totalProducts: 0,
          totalOrders: 0,
          totalUsers: 0,
          totalContacts: 0,
        });
      }
    };

    fetchStats();
  }, []);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Settings },
    { id: "products", label: "Products", icon: Wrench },
    { id: "orders", label: "Orders", icon: FileText },
    { id: "contact-forms", label: "Contact Forms", icon: Mail },
    { id: "user-profile", label: "User Profile", icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-16" : "w-64"
        } bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 ease-in-out shadow-2xl`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-700">
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="text-white p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft
              size={20}
              className={`transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <nav className="mt-6 px-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center p-3 mb-1 rounded-lg transition-all duration-200 ${
                  activePage === item.id
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-slate-700"
                }`}
              >
                <div className="flex items-center">
                  <IconComponent size={20} />
                  {!collapsed && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="p-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {activePage === "dashboard"
                ? "Dashboard"
                : navigationItems.find((item) => item.id === activePage)
                    ?.label || "Dashboard"}
            </h1>
            {/* <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium">
              View Website
            </button> */}
          </div>
        </header>

        {/* Dashboard Content */}
        {activePage === "dashboard" && (
          <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard
                  title="Products"
                  count={stats.totalProducts}
                  description="products"
                  icon={<Wrench size={24} className="text-purple-600" />}
                  onManage={() => handleManage("products")}
                />
                <DashboardCard
                  title="Orders"
                  count={stats.totalOrders}
                  description="orders"
                  icon={<FileText size={24} className="text-indigo-600" />}
                  onManage={() => handleManage("orders")}
                />
                <DashboardCard
                  title="Users"
                  count={stats.totalUsers}
                  description="users"
                  icon={<Users size={24} className="text-pink-600" />}
                  onManage={() => handleManage("user-profile")}
                />
                <DashboardCard
                  title="Contact Forms"
                  count={stats.totalContacts}
                  description="form submissions"
                  icon={<Mail size={24} className="text-teal-600" />}
                  onManage={() => handleManage("contact-forms")}
                />
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for new tab components */}
        {activePage === "products" && (
          <div className="p-6">
            <Products />
          </div>
        )}
        {activePage === "orders" && (
          <div className="p-6">
            <OrdersTab />
          </div>
        )}
        {activePage === "contact-forms" && <ContactUsTab />}
        {activePage === "user-profile" && <UserProfileTab />}
      </div>
    </div>
  );
};

export default AdminPanel;
