import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Play,
  CheckCircle,
  Bookmark,
  Share2,
  Menu,
  X,
  Layout,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { getCourse } from "@/api/course/getCourse";
import { Course } from "@/types/Course";

const CourseLearn = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);

        const data = await getCourse(id);
        setCourseData(data);
        if (
          data.courseCurriculum?.length > 0 &&
          data.courseCurriculum[0].lessons?.length > 0
        ) {
          setCurrentLesson(data.courseCurriculum[0].lessons[0]._id);
          setExpandedSections([data.courseCurriculum[0]._id]);
        }
      } catch (error) {
        console.error(error);
        setCourseData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-10 w-10 animate-spin text-teal-700" />
        </div>
      </Layout>
    );
  }
  // Check if course exists
  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link to="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentLessonData = courseData?.courseCurriculum
    ?.flatMap((section) => section.lessons)
    ?.find((lesson) => lesson._id === currentLesson);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };
  const totalLessons =
    courseData?.courseCurriculum?.flatMap((s) => s.lessons).length || 0;

  const completedLessons = 0;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const Sidebar = () => (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Link
          to={`/courses/${courseData._id}`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm">Back to course</span>
        </Link>
        <h2 className="font-display font-semibold mt-3 line-clamp-2">
          {courseData.title}
        </h2>
      </div>

      {/* Progress */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between text-sm mb-2">
          <span>Your progress</span>
          <span className="font-medium">{progressPercent}%</span>
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {courseData.courseCurriculum.map((section) => (
          <div key={section._id} className="border-b border-border">
            <button
              onClick={() => toggleSection(section._id)}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2 text-left">
                {expandedSections.includes(section._id) ? (
                  <ChevronUp className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 flex-shrink-0" />
                )}
                <span className="font-medium text-sm">{section.title}</span>
              </div>
            </button>

            <AnimatePresence>
              {expandedSections.includes(section._id) && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  {section.lessons.map((lesson) => (
                    <button
                      key={lesson._id}
                      onClick={() => setCurrentLesson(lesson._id)}
                      className={`w-full p-3 pl-10 flex items-center gap-3 text-left text-sm transition-colors ${
                        currentLesson === lesson._id
                          ? "bg-primary/10 text-primary border-l-2 border-primary"
                          : "hover:bg-muted/50"
                      } `}
                    >
                      <Play className="h-4 w-4 flex-shrink-0" />

                      <span className="line-clamp-2">{lesson.title}</span>
                      <span className="ml-auto text-muted-foreground text-xs">
                        {lesson.duration}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block transition-all duration-300 ${sidebarOpen ? "w-80" : "w-0"}`}
      >
        {sidebarOpen && <Sidebar />}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-80"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="h-14 border-b border-border flex items-center justify-between px-4 bg-card">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex p-2 hover:bg-muted rounded-lg"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <span className="font-medium text-sm truncate">
              {currentLessonData?.title || "Select a lesson"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Video Player */}
        <div className="flex-1 bg-black flex items-center justify-center">
          <div className="w-full max-w-5xl aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
            {/* Placeholder for video */}
            {currentLessonData?.videoUrl ? (
              <iframe
                className="w-full h-full"
                src={getYoutubeEmbedUrl(currentLessonData.videoUrl)}
                title={currentLessonData.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="text-white">No video available</div>
            )}

            {/* Video controls placeholder */}
          </div>
        </div>

        {/* Lesson Actions */}
        <div className="p-4 border-t border-border bg-card">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Button variant="outline" disabled>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button className="hero-gradient text-primary-foreground">
              Mark as Complete
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline">
              Next
              <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearn;
