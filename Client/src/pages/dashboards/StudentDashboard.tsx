import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { usePurchase } from "@/context/PurchaseContext";
import {
  mockCourses,
  mockStudentProgress,
  mockSavedVideos,
} from "@/data/mockData";
import { mockAssignments, Assignment } from "@/data/assignmentsData";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import DashboardSidebar, {
  SidebarItem,
} from "@/components/dashboard/DashboardSidebar";
import {
  BookOpen,
  Play,
  Clock,
  Bookmark,
  ArrowRight,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import AssignmentCard from "@/components/assignments/AssignmentCard";
import UploadAssignmentModal from "@/components/assignments/UploadAssignmentModal";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";

const sidebarItems: SidebarItem[] = [
  { id: "courses", label: "My Courses", icon: BookOpen },
  { id: "assignments", label: "Assignments", icon: FileText },
];

const StudentDashboard = () => {
  const user = useSelector(selectCurrentUser);

  const [courses, setCourses] = useState([]);
  const getCourses = async () => {
    try {
      const { data } = await axios.get(`/enrollments/students/${user.id}`);

      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);

  const { purchasedCourses } = usePurchase();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const location = useLocation();
  const activeTab =
    location.pathname
      .replace(`/student/${user.id}/dashboard`, "")
      .replace(/^\//, "") || "courses";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const enrolledCourses = mockCourses.filter((c) =>
    purchasedCourses.includes(c.id),
  );
  const studentAssignments = mockAssignments.filter((a) =>
    purchasedCourses.includes(a.courseId),
  );

  const stats = [
    {
      label: "Enrolled Courses",
      value: enrolledCourses.length,
      icon: BookOpen,
      color: "bg-student",
    },
    { label: "Lessons Completed", value: 24, icon: Play, color: "bg-primary" },
    { label: "Hours Learned", value: "18.5", icon: Clock, color: "bg-accent" },
    {
      label: "Assignments",
      value: studentAssignments.length,
      icon: FileText,
      color: "bg-teacher",
    },
  ];

  const handleDownload = (assignment: Assignment) => {
    toast.success(`Downloading: ${assignment.title}.pdf`);
  };

  const handleUpload = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setUploadModalOpen(true);
  };

  const handleSubmitAssignment = (data: {
    title: string;
    description: string;
    file: File | null;
  }) => {
    toast.success("Assignment submitted successfully!");
    setUploadModalOpen(false);
    setSelectedAssignment(null);
  };
  console.log(courses);
  const BASE_URL = "http://localhost:3500/";
  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display font-bold text-3xl mb-2">
              Welcome back, {user?.name?.split(" ")[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Continue your learning journey where you left off.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-5 card-shadow"
              >
                <div
                  className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}
                >
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div className="font-display font-bold text-2xl">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar + Content */}
          <div className="flex gap-6">
            <DashboardSidebar
              items={sidebarItems}
              basePath="/student/dashboard"
            />

            <div className="flex-1 min-w-0">
              {activeTab === "courses" && (
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-display font-semibold text-xl">
                        Current Courses
                      </h2>
                      <Link to={`/student/${user.id}/courses`}>
                        <Button variant="ghost" size="sm" className="gap-1">
                          View All <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {courses.map((course, index) => {
                        const progress =
                          mockStudentProgress.find(
                            (p) => p.courseId === course.id,
                          )?.progress || 0;
                        return (
                          <motion.div
                            key={course.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link to={`/student/${user?.id}/learn`}>
                              <div className="bg-card rounded-xl p-4 card-shadow hover:card-shadow-hover transition-all flex gap-4 group">
                                <img
                                  src={`${BASE_URL}uploads/${course.course.thumbnail}`}
                                  alt={course.title}
                                  className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                    {course.course.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mb-3">
                                    {course.course.title}
                                  </p>
                                  <div className="flex items-center gap-3">
                                    <Progress
                                      value={progress}
                                      className="h-2 flex-1"
                                    />
                                    <span className="text-sm font-medium">
                                      {progress}%
                                    </span>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  className="hero-gradient text-primary-foreground self-center"
                                >
                                  <Play className="h-4 w-4" />
                                </Button>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                      {courses.length === 0 && (
                        <div className="bg-card rounded-xl p-8 text-center card-shadow">
                          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="font-medium mb-2">No courses yet</h3>
                          <p className="text-muted-foreground mb-4">
                            Start your learning journey today!
                          </p>
                          <Link to="/courses">
                            <Button className="hero-gradient text-primary-foreground">
                              Browse Courses
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-display font-semibold text-xl">
                        Saved Videos
                      </h2>
                      <Bookmark className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="bg-card rounded-xl card-shadow divide-y divide-border">
                      {courses.map((video, index) => (
                        <motion.div
                          key={`${video.id}-${index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-muted rounded-lg">
                              <Play className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-sm line-clamp-1">
                                {video.course.title}
                              </p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {video.course.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "assignments" && (
                <div className="grid lg:grid-cols-2 gap-4">
                  {studentAssignments.length > 0 ? (
                    studentAssignments.map((assignment, index) => (
                      <motion.div
                        key={assignment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <AssignmentCard
                          assignment={assignment}
                          onDownload={handleDownload}
                          onUpload={handleUpload}
                          userRole="student"
                        />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-2 bg-card rounded-xl p-8 text-center card-shadow">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">No assignments yet</h3>
                      <p className="text-muted-foreground">
                        Assignments from your courses will appear here.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <UploadAssignmentModal
        isOpen={uploadModalOpen}
        onClose={() => {
          setUploadModalOpen(false);
          setSelectedAssignment(null);
        }}
        onSubmit={handleSubmitAssignment}
        mode="student"
        assignmentTitle={selectedAssignment?.title}
      />
    </Layout>
  );
};

export default StudentDashboard;
