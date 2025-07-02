import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Package,
  Search,
  Filter,
  Eye,
  Beaker,
  FlaskConical,
} from "lucide-react";
import axios from "axios";
import SearchBar from "./Search";
import ProductsGrid from "./ProductsGrid";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [formData, setFormData] = useState({
    ChemicalName: "",
    CatelogNumber: "",
    CASNumber: "",
    MolecularWeight: "",
    inStock: true,
    image: "",
  });

  React.useEffect(() => {
    // Fetch all products from backend
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/product", { withCredentials: true });
        // Defensive: If response is not an array, fallback to []

        setProducts(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);
  console.log(products);
  const resetForm = () => {
    setFormData({
      ChemicalName: "",
      CatelogNumber: "",
      CASNumber: "",
      MolecularWeight: "",
      inStock: true,
      image: "",
    });
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        ChemicalName: product.ChemicalName,
        CatelogNumber: product.CatelogNumber,
        CASNumber: product.CASNumber,
        MolecularWeight: product.MolecularWeight,
        inStock: product.inStock,
        image: product.image,
      });
    } else {
      setEditingProduct(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add or update product (POST/PUT)
  const handleSubmit = async () => {
    if (
      !formData.ChemicalName.trim() ||
      !formData.CatelogNumber.trim() ||
      !formData.CASNumber.trim() ||
      !formData.MolecularWeight
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const data = new FormData();
    data.append("ChemicalName", formData.ChemicalName);
    data.append("CatelogNumber", formData.CatelogNumber);
    data.append("CASNumber", formData.CASNumber);
    data.append("MolecularWeight", formData.MolecularWeight);
    data.append("inStock", formData.inStock);
    if (formData.image && typeof formData.image !== "string") {
      data.append("Image", formData.image);
    }

    try {
      if (editingProduct) {
        // Update product
        await axios.put(`/product/${editingProduct._id}`, data, {
          withCredentials: true,
        });
      } else {
        // Add product
        await axios.post("/product", data, {
          withCredentials: true,
        });
      }
      // Refresh products
      const res = await axios.get("/product", { withCredentials: true });
      setProducts(res.data);
      closeModal();
    } catch (err) {
      alert("Failed to save product. Please check your input and try again.");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/product/${id}`, { withCredentials: true });
        setProducts((prev) => prev.filter((product) => product.id !== id));
      } catch (err) {
        alert("Failed to delete product.");
      }
    }
  };

  // Handle file input for image
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Fix: Defensive for products not being an array
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const matchesSearch =
          product.ChemicalName?.toLowerCase().includes(
            searchTerm.toLowerCase()
          ) ||
          product.CatelogNumber?.toLowerCase().includes(
            searchTerm.toLowerCase()
          ) ||
          product.CASNumber?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStock =
          stockFilter === "all" ||
          (stockFilter === "inStock" && product.inStock) ||
          (stockFilter === "outOfStock" && !product.inStock);

        return matchesSearch && matchesStock;
      })
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <FlaskConical className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Chemical Laboratory
                </h1>
                <p className="text-gray-600 text-sm">
                  Manage your chemical inventory
                </p>
              </div>
            </div>

            <button
              onClick={() => openModal()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add New Product
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Bar */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
          filteredProducts={filteredProducts}
        />
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <ProductsGrid
            filteredProducts={filteredProducts}
            openModal={openModal}
            deleteProduct={deleteProduct}
          />
        ) : (
          <div className="text-center py-16">
            <div className="mb-6">
              <FlaskConical className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {products.length === 0
                  ? "No products yet"
                  : "No products found"}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {products.length === 0
                  ? "Start building your chemical inventory by adding your first product"
                  : "Try adjusting your search terms or filters to find what you're looking for"}
              </p>
            </div>
            {products.length === 0 && (
              <button
                onClick={() => openModal()}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Add Your First Product
              </button>
            )}
          </div>
        )}
        {/* Enhanced Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Chemical Name *
                    </label>
                    <input
                      type="text"
                      name="ChemicalName"
                      value={formData.ChemicalName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      placeholder="e.g., Sodium Chloride"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Catalog Number *
                      </label>
                      <input
                        type="text"
                        name="CatelogNumber"
                        value={formData.CatelogNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                        placeholder="SC-001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CAS Number *
                      </label>
                      <input
                        type="text"
                        name="CASNumber"
                        value={formData.CASNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                        placeholder="7647-14-5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Molecular Weight (g/mol) *
                    </label>
                    <input
                      type="number"
                      name="MolecularWeight"
                      value={formData.MolecularWeight}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      placeholder="58.44"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Image *
                    </label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Stock Status
                      </label>
                      <p className="text-xs text-gray-500">
                        Is this product currently available?
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="inStock"
                        checked={formData.inStock}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-medium shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
