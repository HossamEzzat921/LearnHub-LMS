import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "./Sidebar";

const SidebarItem = ({ item }) => {
  const { expanded, open } = useContext(SidebarContext);
  console.log(open);
  return (
    <NavLink
      to={item.path}
      end
      className={({ isActive }) =>
        `
    flex items-center gap-3 px-3 py-2 rounded-xl mt-2.5
    transition-all duration-200 group relative
   ${
     isActive
       ? "bg-teal-50 text-teal font-semibold shadow-sm"
       : "hover:bg-gray-100 text-gray-600"
   }
  `
      }
    >
      <span className="text-xl ">
        {" "}
        <item.icon className="h-5 w-5 shrink-0" />
      </span>
      <span
        className={`${!expanded && open && "lg:scale-0"} duration-300 overflow-hidden transition-all `}
      >
        {item.name}
      </span>
      {!expanded && (
        <div
          className={`
                
                  absolute left-full  rounded-md px-2 py-1 ml-6  hero-gradient text-primary-foreground text-sm invisible opacity-20 -translate-x-3 
                  transition-all group-hover:visible group-hover:opacity-100  group-hover:z-999 group-hover:translate-x-0
               z-50
          `}
        >
          {item.name}
        </div>
      )}
    </NavLink>
  );
};

export default React.memo(SidebarItem);
