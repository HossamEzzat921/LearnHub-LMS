import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { mockCourses } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { usePurchase } from '@/context/PurchaseContext';
import VodafoneCashModal from '@/components/payment/VodafoneCashModal';
import { 
  Star, Users, Clock, BookOpen, Play, ChevronDown, ChevronUp, 
  Lock, CheckCircle, ShoppingCart, Award, Globe, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { isPurchased, purchaseCourse } = usePurchase();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const course = mockCourses.find(c => c.id === id);
  const coursePurchased = user?.role === 'student' && isPurchased(id || '');

  if (!course) {
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

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleBuyCourse = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/courses/${id}` } } });
      return;
    }
    // Open Vodafone Cash payment modal
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    purchaseCourse(id || '');
    setShowPaymentModal(false);
  };

  const handleStartLearning = () => {
    navigate(`/course/${id}/learn`);
  };

  const totalLessons = course.sections.reduce((acc, section) => acc + section.lessons.length, 0);

  return (
    <Layout>
      {/* Vodafone Cash Payment Modal */}
      <VodafoneCashModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={course.price}
        courseName={course.title}
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
                  {course.category}
                </span>
                <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">
                  {course.title}
                </h1>
                <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold">{course.rating}</span>
                    <span className="opacity-80">rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-5 w-5" />
                    <span>{(course.studentsCount / 1000).toFixed(0)}k students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-5 w-5" />
                    <span>{course.lessonsCount} lessons</span>
                  </div>
                </div>

                <p className="mt-6 opacity-90">
                  Created by <span className="font-semibold">{course.instructor}</span>
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
                    src={course.image} 
                    alt={course.title}
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
                    <span className="font-display font-bold text-3xl">${course.price}</span>
                    {course.originalPrice && (
                      <span className="text-muted-foreground line-through text-lg">
                        ${course.originalPrice}
                      </span>
                    )}
                    {course.originalPrice && (
                      <span className="px-2 py-1 bg-accent text-accent-foreground rounded text-sm font-medium">
                        {Math.round((1 - course.price / course.originalPrice) * 100)}% off
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

      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="lg:max-w-3xl">
            <h2 className="font-display font-bold text-2xl mb-6">Course Content</h2>
            <p className="text-muted-foreground mb-6">
              {course.sections.length} sections • {totalLessons} lessons • {course.duration} total length
            </p>

            <div className="space-y-3">
              {course.sections.map((section) => (
                <div 
                  key={section.id}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-4 flex items-center justify-between bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {expandedSections.includes(section.id) ? (
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
                    {expandedSections.includes(section.id) && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="divide-y divide-border">
                          {section.lessons.map((lesson) => (
                            <div 
                              key={lesson.id}
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
                                <span className={lesson.isCompleted ? 'text-primary' : ''}>
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
