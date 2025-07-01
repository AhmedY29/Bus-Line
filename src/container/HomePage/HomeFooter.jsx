import React from "react";

function HomeFooter() {
  return (
    <div className="bg-[#122031] py-5 flex flex-wrap justify-between items-center px-4 w-full">
      <div className="w-1/2">
        <div className="w-full flex justify-start items-center gap-2">
          <img src="logoPng.png" alt="Logo" className="h-10 w-10" />
          <span className="text-white text-lg font-semibold">Bus Line</span>
        </div>
      </div>
    </div>
  );
}

export default HomeFooter;
