
import { Toaster as Sonner } from "@/components/ui/sonner";

import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


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
import TeacherLayout from "./features/teacher/teacherLayout";
import CreateCourse from "./pages/courses/CreateCourse";
import TeacherCourses from "./pages/courses/TeacherCourses";
import EditCourse from "./pages/courses/EditCourse";
import Assignment from "./features/teacher/Assignment";
import Enrollments from "./features/teacher/Enrollments";



const App = () => (
  
    
      
       
          
        
          <BrowserRouter>
  <Sonner />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              <Route element={<PersistLogin />}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
              
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
                    <Route path="enrollments" element={<Enrollments />} />
                    <Route path="assignments" element={<Assignment />} />
                    <Route
                      path="courses/edit/:courseId"
                      element={<EditCourse />}
                    />
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
       
      
 
);

export default App;
