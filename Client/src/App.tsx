import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PurchaseProvider } from "@/context/PurchaseContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Courses from "./pages/courses/Courses";
import CourseDetails from "./pages/courses/CourseDetails";
import CourseLearn from "./pages/courses/CourseLearn";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import ParentDashboard from "./pages/dashboards/ParentDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import TeacherLayout from "./layouts/teacherLayout";
import CreateCourse from "./pages/dashboards/CreateCourse";
import TeacherCourses from "./pages/dashboards/TeacherCourses";
import EditCourse from "./pages/dashboards/EditCourse";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PurchaseProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<PersistLogin />}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:courseId" element={<CourseDetails />} />

                {/* Protected Course Learning */}

                {/* Student Dashboard */}
                <Route element={<RequireAuth allowedRoles={["Student"]} />}>
                  <Route path="/student/:id/*" element={<StudentDashboard />} />
                  <Route path="/course/:id/learn" element={<CourseLearn />} />
                </Route>
                {/* Parent Dashboard */}
                {/* Student Dashboard */}
                <Route element={<RequireAuth allowedRoles={["Parent"]} />}>
                  <Route
                    path="/parent/dashboard/*"
                    element={<ParentDashboard />}
                  />
                  {/* <Route path="courses" element={<StudentCourses />} /> */}
                </Route>

                {/* Protected Routes ONLY for Teachers */}
                <Route element={<RequireAuth allowedRoles={["Teacher"]} />}>
                  <Route path="/teacher/:id" element={<TeacherLayout />}>
                    <Route path="dashboard" element={<TeacherDashboard />} />
                    <Route path="create-course" element={<CreateCourse />} />
                    <Route path="courses" element={<TeacherCourses />} />
                    <Route
                      path="courses/edit/:courseId"
                      element={<EditCourse />}
                    />
                    {/* 
<Route path="enrollments" element={<Enrollments />} />
<Route path="assignments" element={<Assignment />} />
<Route path="courses/:courseId" element={<Course />} />
*/}
                  </Route>
                </Route>
                {/* Profile */}
                <Route path="/profile" element={<Profile />} />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route
                path="/unauthorized"
                element={<div>You do not have access to this page.</div>}
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PurchaseProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
