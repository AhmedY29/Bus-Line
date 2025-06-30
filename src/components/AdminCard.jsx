import React from "react";

function AdminCard({
  icon,
  title,
  count,
  iconBgColor = "bg-blue-50",
  iconColor = "text-blue-500",
}) {
  const IconComponent = icon;

  return (
    <div className="flex items-center bg-white rounded-lg shadow-md gap-4 pl-4 h-35 w-full">
      <div
        className={`flex justify-center items-center ${iconBgColor} h-15 w-15 md:w-12 md:h-12 lg:h-15 lg:w-15 rounded-2xl`}
      >
        <IconComponent
          className={`${iconColor} text-4xl md:text-3xl lg:text-4xl`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-xl lg:text-2xl text-neutral-500">
          {title}
        </h1>
        <h1 className="text-neutral-900 text-3xl md:text-2xl lg:text-3xl font-bold">
          {count}
        </h1>
      </div>
    </div>
  );
}

export default AdminCard;
