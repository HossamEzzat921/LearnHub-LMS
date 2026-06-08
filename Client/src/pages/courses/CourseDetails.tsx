import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { mockCourses } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { usePurchase } from "@/context/PurchaseContext";
import VodafoneCashModal from "@/components/payment/VodafoneCashModal";
import {
  Star,
  Users,
  Clock,
  BookOpen,
  Play,
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle,
  ShoppingCart,
  Award,
  Globe,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCourse } from "@/api/course/getCourse";
import { Course } from "@/types/Course";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import axios from "axios";
import { toast } from "sonner";

const CourseDetails = () => {
  const user = useSelector(selectCurrentUser);
  console.log(user);
  const BASE_URL = "http://localhost:3500/";
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<Course | null>(null);
  const navigate = useNavigate();
  // const { isAuthenticated, user } = useAuth();
  const { isPurchased, purchaseCourse } = usePurchase();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showStudentOnlyModal, setShowStudentOnlyModal] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      const data = await getCourse(courseId);
      setCourseData(data);
      // Set the first lesson's video as default if it exists
    };
    fetchCourse();
  }, [courseId]);

  const coursePurchased =
    user?.role === "Student" && isPurchased(courseId || "");

  if (!courseData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link to="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  const handleBuyCourse = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (user.role !== "Student") {
      setShowStudentOnlyModal(true);
      return;
    }

    setShowPaymentModal(true);
  };
  const handleEnroll = async () => {
    // 1. Not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    // 2. Not student
    if (user.role !== "Student") {
      navigate("/unauthorized");
      return;
    }

    // 3. Enroll API
    try {
      await axios.post(`/enrollments/courses/${courseId}/enroll`, {
        studentId: user?.id,
      });

      toast.success("Enrolled successfully");
      navigate(`/student/${user?.id}/dashboard`);
    } catch (err) {
      console.error(err);
    }
  };
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const handlePaymentSuccess = () => {
    //  purchaseCourse(courseId || '');
    handleEnroll();
    setShowPaymentModal(false);
  };

  const handleStartLearning = () => {
    navigate(`/course/${courseId}/learn`);
  };

  // const totalLessons = course.sections.reduce((acc, section) => acc + section.lessons.length, 0);
  console.log(courseData);
  return (
    <Layout>
      {/* Vodafone Cash Payment Modal */}
      <VodafoneCashModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={courseData.price}
        courseName={courseData.title}
      />

      {/* Hero Section */}
      <section className="hero-gradient py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2 text-primary-foreground">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="inline-block px-3 py-1 bg-primary-foreground/20 rounded-full text-sm mb-4">
                  {courseData.category}
                </span>
                <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">
                  {courseData.title}
                </h1>
                <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl">
                  {courseData.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold">{courseData.rating}</span>
                    <span className="opacity-80">rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-5 w-5" />6
                    {/* <span>{(courseData.studentsCount / 1000).toFixed(0)}k students</span> */}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5" />
                    <span>{courseData.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-5 w-5" />
                    <span>{courseData.lessonsCount} lessons</span>
                  </div>
                </div>

                <p className="mt-6 opacity-90">
                  Created by{" "}
                  <span className="font-semibold">{courseData.teacher}</span>
                </p>
              </motion.div>
            </div>

            {/* Purchase Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-video relative">
                  <img
                    src={`${BASE_URL}uploads/${courseData.thumbnail}`}
                    alt={courseData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm cursor-pointer hover:bg-white/30 transition-colors">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-display font-bold text-3xl">
                      ${courseData.price}
                    </span>
                    {courseData.price && (
                      <span className="text-muted-foreground line-through text-lg">
                        ${courseData.price}
                      </span>
                    )}
                    {courseData.price && (
                      <span className="px-2 py-1 bg-accent text-accent-foreground rounded text-sm font-medium">
                        {Math.round(
                          (1 - courseData.price / courseData.price) * 100,
                        )}
                        % off
                      </span>
                    )}
                  </div>

                  {coursePurchased ? (
                    <Button
                      className="w-full hero-gradient text-primary-foreground mb-3 gap-2"
                      onClick={handleStartLearning}
                    >
                      <Play className="h-4 w-4" />
                      Continue Learning
                    </Button>
                  ) : (
                    <>
                      <Button
                        className="w-full hero-gradient text-primary-foreground mb-3 gap-2"
                        onClick={handleBuyCourse}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Buy Now with Vodafone Cash
                      </Button>
                      <Button variant="outline" className="w-full">
                        Add to Wishlist
                      </Button>
                    </>
                  )}
                  {showLoginModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl p-6 w-[400px] text-center">
                        <h2 className="text-xl font-bold mb-3">
                          Login Required
                        </h2>

                        <p className="text-gray-600 mb-6">
                          You must log in before purchasing a course.
                        </p>

                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => setShowLoginModal(false)}
                            className="px-4 py-2 border rounded-lg"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={() =>
                              navigate("/login", {
                                state: {
                                  from: {
                                    pathname: `/courses/${courseId}`,
                                  },
                                },
                              })
                            }
                            className="px-4 py-2 bg-primary text-white rounded-lg"
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {showStudentOnlyModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl p-6 w-[400px] text-center">
                        <h2 className="text-xl font-bold mb-3">
                          Access Restricted
                        </h2>

                        <p className="text-gray-600 mb-6">
                          Only students can purchase and enroll in courses.
                        </p>

                        <button
                          onClick={() => setShowStudentOnlyModal(false)}
                          className="px-4 py-2 bg-primary text-white rounded-lg"
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* 
      Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="lg:max-w-3xl">
            <h2 className="font-display font-bold text-2xl mb-6">
              Course Content
            </h2>
            <p className="text-muted-foreground mb-6">
              {courseData.courseCurriculum.length} sections • total length
            </p>

            <div className="space-y-3">
              {courseData.courseCurriculum.map((section) => (
                <div
                  key={section._id}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(section._id)}
                    className="w-full p-4 flex items-center justify-between bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {expandedSections.includes(section._id) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                      <span className="font-medium">{section.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {section.lessons.length} lessons
                    </span>
                  </button>

                  <AnimatePresence>
                    {expandedSections.includes(section._id) && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="divide-y divide-border">
                          {section.lessons.map((lesson) => (
                            <div
                              key={lesson._id}
                              className="p-4 pl-12 flex items-center justify-between hover:bg-muted/50"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.isCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-primary" />
                                ) : !coursePurchased ? (
                                  <Lock className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <Play className="h-5 w-5 text-muted-foreground" />
                                )}
                                <span
                                  className={
                                    lesson.isCompleted ? "text-primary" : ""
                                  }
                                >
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CourseDetails;
