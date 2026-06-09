import { Link, Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const TeacherLayout = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="bg-cream min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Area */}
      <div className="flex-1">
        <div className="">
          <header className="bg-white py-4">
            <div className="lg:container mx-auto px-4 md:px-8 flex lg:justify-between  ">
              <Link to={`/teacher/${user.id}/dashboard`}>
                {" "}
                <h3 className="text-2xl font-bold mx-auto lg:mx-0">
                  Dashboard
                </h3>
                {/* Profile */}
              </Link>
              <div>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4 uppercase" />
                    <span className="capitalize"> {user?.username}</span>
                  </Button>
                </Link>
              </div>
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
