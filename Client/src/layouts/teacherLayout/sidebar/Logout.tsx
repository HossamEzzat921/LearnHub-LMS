import { useContext } from "react";

import { SidebarContext } from "./Sidebar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/api/auth/logout";
import { logOut } from "@/features/auth/authSlice";
import { LogOut } from "lucide-react";

const Logout = () => {
  const { expanded } = useContext(SidebarContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // clear cookie on server

      dispatch(logOut({})); // clear Redux state

      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-6   py-6 flex  border-t border-gray-200">
      <button
        onClick={handleLogout}
        className="w-full relative group   flex items-center justify-center  gap-2 h-10   py-2 text-base font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all rounded-md"
      >
        <span className="text-lg flex items-center justify-center p-0 ">
          {" "}
          <LogOut className=" rotate-180" />
        </span>
        <span
          className={`${!expanded && "lg:scale-0"} duration-300 overflow-hidden transition-all `}
        >
          Logout
        </span>
        {!expanded && (
          <div
            className={`
                
                  absolute left-full  rounded-md px-2 py-1 ml-8  hero-gradient text-primary-foreground text-sm invisible opacity-20 -translate-x-3  transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
               
          `}
          >
            Logout
          </div>
        )}
      </button>
    </div>
  );
};

export default Logout;
