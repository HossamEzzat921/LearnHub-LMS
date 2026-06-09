import React, { useContext } from "react";
import { SidebarContext } from "./Sidebar";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const DashLogo = () => {
  const { expanded, toggleOpen, open } = useContext(SidebarContext);
  return (
    <div className="px-6  py-6 flex justify-between border-b border-gray-200">
       <Link to="/" className="flex items-center gap-3  group">
                     <div className="p-2.5 rounded-xl hero-gradient shadow-lg transition-transform group-hover:scale-110">
                       <BookOpen className="h-5 w-5 text-white" />
                     </div>
                     <span className={`font-display font-bold text-2xl tracking-tight text-gray-900 dark:text-white ${!expanded && "lg:scale-0"}`}>
                       LearnHub
                     </span>
                   </Link>
     
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
