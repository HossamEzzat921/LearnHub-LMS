import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { mockCourses } from '@/data/mockData';
import { usePurchase } from '@/context/PurchaseContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, ChevronDown, ChevronUp, Play, CheckCircle, 
  Lock, Bookmark, Share2, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CourseLearn = () => {
  const { id } = useParams();
  const { isPurchased } = usePurchase();
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const course = mockCourses.find(c => c.id === id);

  // Check if course exists
  if (!course) {
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

  // Check if course is purchased - if not, redirect to course details
  if (!isPurchased(id || '')) {
    return <Navigate to={`/courses/${id}`} replace />;
  }

  // Set first lesson as default
  if (!currentLesson && course.sections.length > 0 && course.sections[0].lessons.length > 0) {
    setCurrentLesson(course.sections[0].lessons[0].id);
    setExpandedSections([course.sections[0].id]);
  }

  const currentLessonData = course.sections
    .flatMap(s => s.lessons)
    .find(l => l.id === currentLesson);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const completedLessons = course.sections
    .flatMap(s => s.lessons)
    .filter(l => l.isCompleted).length;
  const totalLessons = course.sections
    .flatMap(s => s.lessons).length;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  const Sidebar = () => (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Link to={`/courses/${course.id}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm">Back to course</span>
        </Link>
        <h2 className="font-display font-semibold mt-3 line-clamp-2">{course.title}</h2>
      </div>

      {/* Progress */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between text-sm mb-2">
          <span>Your progress</span>
          <span className="font-medium">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {course.sections.map((section) => (
          <div key={section.id} className="border-b border-border">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2 text-left">
                {expandedSections.includes(section.id) ? (
                  <ChevronUp className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 flex-shrink-0" />
                )}
                <span className="font-medium text-sm">{section.title}</span>
              </div>
            </button>

            <AnimatePresence>
              {expandedSections.includes(section.id) && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  {section.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => !lesson.isLocked && setCurrentLesson(lesson.id)}
                      disabled={lesson.isLocked}
                      className={`w-full p-3 pl-10 flex items-center gap-3 text-left text-sm transition-colors ${
                        currentLesson === lesson.id 
                          ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                          : 'hover:bg-muted/50'
                      } ${lesson.isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {lesson.isCompleted ? (
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      ) : lesson.isLocked ? (
                        <Lock className="h-4 w-4 flex-shrink-0" />
                      ) : (
                        <Play className="h-4 w-4 flex-shrink-0" />
                      )}
                      <span className="line-clamp-2">{lesson.title}</span>
                      <span className="ml-auto text-muted-foreground text-xs">{lesson.duration}</span>
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
      <div className={`hidden lg:block transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-0'}`}>
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
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
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
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <span className="font-medium text-sm truncate">
              {currentLessonData?.title || 'Select a lesson'}
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
            <div className="text-center text-white/80">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-colors">
                <Play className="h-10 w-10" />
              </div>
              <p className="text-lg font-medium">{currentLessonData?.title}</p>
              <p className="text-sm text-white/60 mt-2">Click to play video</p>
            </div>

            {/* Video controls placeholder */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="h-1 bg-white/20 rounded-full mb-3">
                <div className="h-full w-1/3 bg-primary rounded-full" />
              </div>
              <div className="flex items-center justify-between text-white text-sm">
                <span>5:23 / 15:00</span>
                <span>{currentLessonData?.duration}</span>
              </div>
            </div>
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
