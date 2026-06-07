import React, { useContext } from "react";
import { SidebarContext } from "./Sidebar";

const DashLogo = () => {
  const { expanded, toggleOpen, open } = useContext(SidebarContext);
  return (
    <div className="px-6  py-6 flex justify-between border-b border-gray-200">
      <div className="text-xl font-bold flex gap-2">
        {" "}
        <span>📊</span>
        <span className={`${!expanded && "lg:scale-0"} text-teal duration-300`}>
          Logo
        </span>
      </div>
      <button
        className={`lg:hidden  ${open ? "rotate-360 duration-500 transition-all" : ""}`}
        onClick={toggleOpen}
      >
        ✕
      </button>
    </div>
  );
};

export default DashLogo;
