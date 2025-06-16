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
const ProductsGrid = ({ filteredProducts, openModal, deleteProduct }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <div
          key={product._id}
          className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          {/* Image Section */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {product.Image ? (
              <img
                src={product.Image}
                alt={product.ChemicalName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Beaker className="w-16 h-16 text-gray-300" />
              </div>
            )}

            {/* Stock Status Badge */}
            <div
              className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                product.inStock
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            {/* Action Buttons Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button
                onClick={() => openModal(product)}
                className="p-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors shadow-lg"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="p-3 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors shadow-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
              {product.ChemicalName}
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Catalog:</span>
                <span className="font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                  {product.CatelogNumber}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">CAS:</span>
                <span className="font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                  {product.CASNumber}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">MW:</span>
                <span className="font-semibold text-gray-900">
                  {product.MolecularWeight} g/mol
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
