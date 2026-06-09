import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  BookOpen,
  Users,
  Star,
  DollarSign,
  Plus,
  TrendingUp,
  Upload,
  Video,
  FileText,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import UploadAssignmentModal from "@/components/assignments/UploadAssignmentModal";

import { toast } from "sonner";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { MyCourses } from "@/features/teacher";
import { getTeacherCourses } from "@/api/course/getTeacherCourses";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getTeacherCourses(user.id);
        setMyCourses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const location = useLocation();
  const activeTab =
    location.pathname.replace("/teacher/dashboard", "").replace(/^\//, "") ||
    "courses";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const stats = [
    {
      label: "Total Courses",
      value: myCourses?.length,
      icon: BookOpen,
      color: "bg-teacher",
    },
    {
      label: "Total Students",
      value: "2,140",
      icon: Users,
      color: "bg-primary",
    },
    { label: "Avg. Rating", value: "4.85", icon: Star, color: "bg-yellow-500" },
    { label: "Revenue", value: "$21.4K", icon: DollarSign, color: "bg-accent" },
  ];

  const handleUploadAssignment = (data: {
    title: string;
    description: string;
    file: File | null;
  }) => {
    toast.success(`Assignment "${data.title}" published successfully!`);
    setUploadModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-teal-700" />
      </div>
    );
  }
  if (myCourses?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto px-4 pt-20 pb-5 text-center "
        >
          <div>
            <h1 className="font-display font-bold text-3xl mb-2">
              Welcome, Mr <span className="capitalize"> {user?.username}</span>!
              👨‍🏫
            </h1>
            <p className="text-muted-foreground">
              Manage your courses and connect with your students.
            </p>
          </div>
        </motion.div>

        <Button onClick={() => navigate(`/teacher/${user?.id}/create-course`)}>
          <Plus className="h-4 w-4" />
          Create New Course
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="font-display font-bold text-3xl mb-2">
                Welcome, Mr{" "}
                <span className="capitalize"> {user?.username}</span>! 👨‍🏫
              </h1>
              <p className="text-muted-foreground">
                Manage your courses and connect with your students.
              </p>
            </div>

            <Button
              onClick={() => navigate(`/teacher/${user?.id}/create-course`)}
            >
              <Plus className="h-4 w-4" />
              Create New Course
            </Button>
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
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="font-display font-semibold text-xl mb-4">
                  Your Courses
                </h2>

                <MyCourses classname="space-y-4" myCourses={myCourses} />
              </div>

              <div>
                <h2 className="font-display font-semibold text-xl mb-4">
                  Quick Upload
                </h2>
                <div className="bg-card rounded-xl p-6 card-shadow">
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center mb-4">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop files here
                    </p>
                    <Button variant="outline" size="sm">
                      Browse Files
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <Video className="h-4 w-4 text-primary" />
                      Upload Video
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={() => setUploadModalOpen(true)}
                    >
                      <FileText className="h-4 w-4 text-accent" />
                      Upload Assignment (PDF)
                    </Button>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-display font-semibold mb-4">
                    This Month
                  </h3>
                  <div className="bg-card rounded-xl p-5 card-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">
                        New Enrollments
                      </span>
                      <div className="flex items-center gap-1 text-teacher">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-bold">+234</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Revenue</span>
                      <div className="flex items-center gap-1 text-teacher">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-bold">+$3,450</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">New Reviews</span>
                      <span className="font-bold">+18</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UploadAssignmentModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSubmit={handleUploadAssignment}
        mode="teacher"
      />
    </div>
  );
};

export default TeacherDashboard;
