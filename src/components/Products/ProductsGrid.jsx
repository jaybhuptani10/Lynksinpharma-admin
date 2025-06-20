import React from "react";
import { Edit2, Trash2, Beaker } from "lucide-react";

const ProductsGrid = ({ filteredProducts, openModal, deleteProduct }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {filteredProducts.map((product) => (
        <div
          key={product._id}
          className="group bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-500 transform hover:-translate-y-1"
        >
          {/* Image Section */}
          <div className="relative aspect-square bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden">
            {product.Image ? (
              <img
                src={product.Image}
                alt={product.ChemicalName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative">
                  <Beaker className="w-20 h-20 text-gray-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-100 to-transparent rounded-full blur-xl opacity-30"></div>
                </div>
              </div>
            )}

            {/* Stock Status Badge */}
            <div
              className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                product.inStock
                  ? "bg-emerald-500 text-white border border-emerald-400"
                  : "bg-red-500 text-white border border-red-400"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            {/* Action Buttons Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6 gap-3">
              <button
                onClick={() => openModal(product)}
                className="p-3 bg-white text-blue-600 rounded-2xl hover:bg-blue-50 hover:scale-110 transition-all duration-200 shadow-xl border border-white"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="p-3 bg-white text-red-600 rounded-2xl hover:bg-red-50 hover:scale-110 transition-all duration-200 shadow-xl border border-white"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                {product.ChemicalName}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Catalog
                </span>
                <span className="font-mono text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                  {product.CatelogNumber}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">CAS</span>
                <span className="font-mono text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                  {product.CASNumber}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Molecular Weight
                </span>
                <span className="text-sm font-bold text-gray-900 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 rounded-lg border border-blue-200">
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
