import React, { useState, useEffect } from "react";
import { Image, BookOpen, Wrench, ArrowLeft, Settings } from "lucide-react";
import ImagesTab from "./Images/ImagesTab";
import ServicesTab from "./services/ServicesTab";
import CoursesTab from "./courses/CoursesTab";
import BlogsTab from "./BlogsTab";
import TestimonialsTab from "./Testimonials/TestimonialsTab";

const DashboardCard = ({ title, count, description, icon, onManage }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">{title}</h2>
        {icon}
      </div>

      <div className="mb-6">
        <h3 className="text-3xl font-bold">{count}</h3>
        <p className="text-gray-500">Total {description}</p>
      </div>

      <button
        onClick={onManage}
        className="w-full border border-gray-300 rounded-lg py-3 px-4 text-center hover:bg-gray-50"
      >
        Manage {title}
      </button>
    </div>
  );
};

const AdminPanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [stats, setStats] = useState({ images: 0, courses: 0, services: 0 });

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleManage = (section) => {
    setActivePage(section);
  };

  useEffect(() => {
    // Simulate fetching data for counts
    const fetchStats = async () => {
      const imagesCount = 3; // Replace with actual logic to fetch images count
      const coursesCount = 3; // Replace with actual logic to fetch courses count
      const servicesCount = 3; // Replace with actual logic to fetch services count

      setStats({
        images: imagesCount,
        courses: coursesCount,
        services: servicesCount,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-16" : "w-64"
        } bg-blue-900 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 flex items-center justify-between">
          {!collapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button onClick={toggleSidebar} className="text-white p-1">
            <ArrowLeft
              size={20}
              className={`transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <nav className="mt-6">
          <button
            onClick={() => setActivePage("dashboard")}
            className={`w-full flex items-center p-4 ${
              activePage === "dashboard" ? "bg-blue-800" : "hover:bg-blue-800"
            }`}
          >
            <div className="flex items-center">
              <Settings size={20} />
              {!collapsed && <span className="ml-4">Dashboard</span>}
            </div>
          </button>

          <button
            onClick={() => setActivePage("images")}
            className={`w-full flex items-center p-4 ${
              activePage === "images" ? "bg-blue-800" : "hover:bg-blue-800"
            }`}
          >
            <div className="flex items-center">
              <Image size={20} />
              {!collapsed && <span className="ml-4">Images</span>}
            </div>
          </button>

          <button
            onClick={() => setActivePage("courses")}
            className={`w-full flex items-center p-4 ${
              activePage === "courses" ? "bg-blue-800" : "hover:bg-blue-800"
            }`}
          >
            <div className="flex items-center">
              <BookOpen size={20} />
              {!collapsed && <span className="ml-4">Courses</span>}
            </div>
          </button>

          <button
            onClick={() => setActivePage("services")}
            className={`w-full flex items-center p-4 ${
              activePage === "services" ? "bg-blue-800" : "hover:bg-blue-800"
            }`}
          >
            <div className="flex items-center">
              <Wrench size={20} />
              {!collapsed && <span className="ml-4">Services</span>}
            </div>
          </button>

          <button
            onClick={() => setActivePage("blogs")}
            className={`w-full flex items-center p-4 ${
              activePage === "blogs" ? "bg-blue-800" : "hover:bg-blue-800"
            }`}
          >
            <div className="flex items-center">
              <BookOpen size={20} />
              {!collapsed && <span className="ml-4">Blogs</span>}
            </div>
          </button>

          <button
            onClick={() => setActivePage("testimonials")}
            className={`w-full flex items-center p-4 ${
              activePage === "testimonials"
                ? "bg-blue-800"
                : "hover:bg-blue-800"
            }`}
          >
            <div className="flex items-center">
              <BookOpen size={20} />
              {!collapsed && <span className="ml-4">Testimonials</span>}
            </div>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium">Dashboard</h1>
            <button className="px-4 py-2 text-blue-900 hover:underline">
              View Website
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        {activePage === "dashboard" && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard
                title="Images"
                count={stats.images}
                description="images"
                icon={<Image size={24} />}
                onManage={() => handleManage("images")}
              />
              <DashboardCard
                title="Courses"
                count={stats.courses}
                description="courses"
                icon={<BookOpen size={24} />}
                onManage={() => handleManage("courses")}
              />
              <DashboardCard
                title="Services"
                count={stats.services}
                description="services"
                icon={<Wrench size={24} />}
                onManage={() => handleManage("services")}
              />
            </div>
          </div>
        )}

        {/* Tab Components */}
        {activePage === "images" && <ImagesTab />}
        {activePage === "courses" && <CoursesTab />}
        {activePage === "services" && <ServicesTab />}
        {activePage === "blogs" && <BlogsTab />}
        {activePage === "testimonials" && <TestimonialsTab />}
      </div>
    </div>
  );
};

export default AdminPanel;
