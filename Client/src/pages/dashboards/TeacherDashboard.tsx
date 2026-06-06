import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { mockTeacherCourses } from '@/data/mockData';
import { mockAssignments, mockSubmissions } from '@/data/assignmentsData';
import { Button } from '@/components/ui/button';
import DashboardSidebar, { SidebarItem } from '@/components/dashboard/DashboardSidebar';
import { 
  BookOpen, Users, Star, DollarSign, Plus, 
  TrendingUp, MoreVertical, Upload, Video, FileText,
  Download, CheckCircle, Clock, UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import UploadAssignmentModal from '@/components/assignments/UploadAssignmentModal';
import EnrollmentRequestsTab from '@/components/enrollments/EnrollmentRequestsTab';
import { toast } from 'sonner';

const sidebarItems: SidebarItem[] = [
  { id: 'courses', label: 'My Courses', icon: BookOpen },
  { id: 'assignments', label: 'Assignments', icon: FileText },
  { id: 'submissions', label: 'Submissions', icon: Upload },
  { id: 'enrollments', label: 'Enrollments', icon: UserCheck },
];

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const location = useLocation();
  const activeTab = location.pathname.replace('/teacher/dashboard', '').replace(/^\//, '') || 'courses';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const stats = [
    { label: 'Total Courses', value: mockTeacherCourses.length, icon: BookOpen, color: 'bg-teacher' },
    { label: 'Total Students', value: '2,140', icon: Users, color: 'bg-primary' },
    { label: 'Avg. Rating', value: '4.85', icon: Star, color: 'bg-yellow-500' },
    { label: 'Revenue', value: '$21.4K', icon: DollarSign, color: 'bg-accent' },
  ];

  const handleUploadAssignment = (data: { title: string; description: string; file: File | null }) => {
    toast.success(`Assignment "${data.title}" published successfully!`);
    setUploadModalOpen(false);
  };

  const handleDownloadSubmission = (studentName: string) => {
    toast.success(`Downloading submission from ${studentName}...`);
  };

  return (
    <Layout>
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
                Welcome, {user?.name}! 👨‍🏫
              </h1>
              <p className="text-muted-foreground">
                Manage your courses and connect with your students.
              </p>
            </div>
            <Button 
              className="hero-gradient text-primary-foreground gap-2 w-fit"
              onClick={() => navigate('/teacher/create-course')}
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
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div className="font-display font-bold text-2xl">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar + Content */}
          <div className="flex gap-6">
            <DashboardSidebar items={sidebarItems} basePath="/teacher/dashboard" />

            <div className="flex-1 min-w-0">
              {activeTab === 'courses' && (
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h2 className="font-display font-semibold text-xl mb-4">Your Courses</h2>
                    <div className="space-y-4">
                      {mockTeacherCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-card rounded-xl p-5 card-shadow"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="font-display font-semibold text-lg">{course.title}</h3>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="font-bold">{course.students.toLocaleString()}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">Students</span>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="font-bold">{course.rating}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">Rating</span>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <DollarSign className="h-4 w-4 text-teacher" />
                                <span className="font-bold">${(course.revenue / 1000).toFixed(1)}K</span>
                              </div>
                              <span className="text-xs text-muted-foreground">Revenue</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 gap-1">
                              <TrendingUp className="h-4 w-4" />
                              Analytics
                            </Button>
                            <Button size="sm" className="flex-1 gap-1 hero-gradient text-primary-foreground">
                              Edit Course
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display font-semibold text-xl mb-4">Quick Upload</h2>
                    <div className="bg-card rounded-xl p-6 card-shadow">
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center mb-4">
                        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop files here</p>
                        <Button variant="outline" size="sm">Browse Files</Button>
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <Video className="h-4 w-4 text-primary" />
                          Upload Video
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setUploadModalOpen(true)}>
                          <FileText className="h-4 w-4 text-accent" />
                          Upload Assignment (PDF)
                        </Button>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-display font-semibold mb-4">This Month</h3>
                      <div className="bg-card rounded-xl p-5 card-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-muted-foreground">New Enrollments</span>
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
              )}

              {activeTab === 'assignments' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-semibold text-xl">Published Assignments</h2>
                    <Button className="hero-gradient text-primary-foreground gap-2" onClick={() => setUploadModalOpen(true)}>
                      <Plus className="h-4 w-4" />
                      New Assignment
                    </Button>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-4">
                    {mockAssignments.map((assignment, index) => (
                      <motion.div
                        key={assignment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card rounded-xl p-5 card-shadow border border-border"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{assignment.title}</h3>
                              <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Due: {assignment.dueDate}</span>
                          <span className="text-muted-foreground">
                            {mockSubmissions.filter(s => s.assignmentId === assignment.id).length} submissions
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'submissions' && (
                <div className="space-y-4">
                  <h2 className="font-display font-semibold text-xl mb-4">Student Submissions</h2>
                  {mockSubmissions.length > 0 ? (
                    <div className="bg-card rounded-xl card-shadow overflow-hidden">
                      <div className="divide-y divide-border">
                        {mockSubmissions.map((submission, index) => {
                          const assignment = mockAssignments.find(a => a.id === submission.assignmentId);
                          return (
                            <motion.div
                              key={submission.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-4 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                                  <span className="font-medium text-sm">
                                    {submission.studentName.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium">{submission.studentName}</p>
                                  <p className="text-sm text-muted-foreground">{assignment?.title || 'Assignment'}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <p className="text-sm text-muted-foreground">Submitted: {submission.submittedAt}</p>
                                  {submission.status === 'graded' ? (
                                    <span className="text-sm text-green-600 flex items-center gap-1">
                                      <CheckCircle className="h-3 w-3" />
                                      Graded: {submission.grade}%
                                    </span>
                                  ) : (
                                    <span className="text-sm text-yellow-600 flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      Pending Review
                                    </span>
                                  )}
                                </div>
                                <Button variant="outline" size="sm" onClick={() => handleDownloadSubmission(submission.studentName)}>
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-card rounded-xl p-8 text-center card-shadow">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">No submissions yet</h3>
                      <p className="text-muted-foreground">Student submissions will appear here.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'enrollments' && <EnrollmentRequestsTab />}
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
    </Layout>
  );
};

export default TeacherDashboard;
