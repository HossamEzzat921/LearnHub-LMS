import React, { useState } from "react";

import SideBarItems from "./SideBarItems";

import DashLogo from "./DashLogo";
import Logout from "./Logout";
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  FileText,
  LayoutDashboard,
  UserCheck,
} from "lucide-react";

const SidebarContext = React.createContext({});
const Sidebar = () => {
  const user = useSelector(selectCurrentUser);
  const navItems = [
    { name: "Dashboard", path: `/teacher/${user.id}/dashboard`, icon: LayoutDashboard },

    { name: "My Courses", path: `/teacher/${user.id}/courses`, icon: BookOpen },
    {
      name: "Enrollments",
      path: `/teacher/${user.id}/enrollments`,
      icon: UserCheck,
    },
    {
      name: "Assignments",
      path: `/teacher/${user.id}/assignments`,
      icon: FileText,
    },
  ];
  // small sceen
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  // large screen
  const [expanded, setExpanded] = useState(true);
  const toggleExpand = () => {
    return setExpanded((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{ open, expanded, toggleOpen, toggleExpand }}
    >
      {/* overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden"
          onClick={toggleOpen}
        />
      )}
      <div
        className={`fixed  bg-white w-64  ${!expanded ? "lg:w-20" : "lg:w-64"}  min-h-screen shadow duration-300 transition-all z-50 ${
          open ? "translate-x-0" : "-translate-x-64"
        } lg:translate-x-0 lg:static`}
      >
        <aside className="relative min-h-screen lg:h-full flex flex-col justify-between">
          {/* arrow left for large screen */}
          <ArrowLeft
            size={18}
            className={`hidden  lg:block hero-gradient w-7 h-7 text-primary-foreground text-3xl rounded-full absolute -right-3.5  top-20 border  cursor-pointer ${!expanded && "rotate-180 "}  `}
            onClick={toggleExpand}
          />
          <button
            className={` lg:hidden   text-3xl  absolute -right-10 md:-right-14  top-4 cursor-pointer  ${!open ? "rotate-360 duration-500 transition-all" : ""}`}
            onClick={toggleOpen}
          >
            <span className={open ? "hidden" : ""}>☰</span>
          </button>
          <div>
            {/* Tob  Logo */}
            <DashLogo />

            {/* Nav Items */}
            <SideBarItems>
              {navItems.map((item) => (
                <div key={item.name}>
                  <SidebarItem item={item} />
                </div>
              ))}
            </SideBarItems>
          </div>
          {/*  bottom  log out */}
          <Logout />
        </aside>
      </div>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
export { SidebarContext };
