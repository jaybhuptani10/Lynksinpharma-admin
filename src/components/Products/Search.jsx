import React from "react";
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
const SearchBar = ({
  searchTerm,
  setSearchTerm,
  stockFilter,
  setStockFilter,
  filteredProducts,
}) => {
  return (
    <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, catalog, or CAS number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            >
              <option value="all">All Products</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>

          <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
            {filteredProducts.length} products
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
