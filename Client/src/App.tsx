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
import CreateCourse from "./pages/dashboards/CreateCourse";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

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
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              
              {/* Protected Course Learning */}
              <Route 
                path="/course/:id/learn" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <CourseLearn />
                  </ProtectedRoute>
                } 
              />
              
              {/* Student Dashboard */}
              <Route 
                path="/student/dashboard/*" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Parent Dashboard */}
              <Route 
                path="/parent/dashboard/*" 
                element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <ParentDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Teacher Dashboard */}
              <Route 
                path="/teacher/dashboard/*" 
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Create Course */}
              <Route 
                path="/teacher/create-course" 
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <CreateCourse />
                  </ProtectedRoute>
                } 
              />
              
              {/* Profile */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PurchaseProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
