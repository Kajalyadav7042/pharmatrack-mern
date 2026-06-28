import React from "react";

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">

      <div>

        <p className="text-gray-500">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

      </div>

      <div
        className={`text-4xl ${color}`}
      >
        {icon}
      </div>

    </div>
  );
}

export default StatCard;