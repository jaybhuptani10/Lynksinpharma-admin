import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-600 mx-auto"></div>
          <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-blue-300 animate-pulse mx-auto"></div>
        </div>
        <p className="mt-6 text-slate-600 font-medium">
          Loading applications...
        </p>
      </div>
    </div>
  );
};

export default Loading;
