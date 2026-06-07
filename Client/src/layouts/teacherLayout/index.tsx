import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Profile from "@/components/profile/Profile";




const TeacherLayout = () => {
  

  return (
    <div className="bg-cream min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Area */}
      <div className="flex-1">
        <div className="">
          <header className="bg-white py-4">
            <div className="lg:container mx-auto px-4 md:px-8 flex lg:justify-between  ">
              <h1 className="text-2xl font-bold mx-auto lg:mx-0">Dashboard</h1>
              {/* Profile */}
              <Profile />
             
            </div>
          </header>

          <main className="lg:container  mx-auto  px-4 my-12 md:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default TeacherLayout;
