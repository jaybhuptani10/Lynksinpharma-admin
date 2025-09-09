import React from "react";

const StatsCard = ({
  statusIcons,
  statusOptions,
  statusCounts,
  statusColors,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statusOptions.map((status) => {
        const StatusIcon = statusIcons[status];
        return (
          <div
            key={status}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium capitalize">
                  {status}
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {statusCounts[status] || 0}
                </p>
              </div>
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusColors[status]}`}
              >
                <StatusIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCard;
