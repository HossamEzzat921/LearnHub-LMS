import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { mockLinkedStudents } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import DashboardSidebar, { SidebarItem } from '@/components/dashboard/DashboardSidebar';
import { Users, TrendingUp, BookOpen, Bell, Plus, Eye, Activity } from 'lucide-react';
import { motion } from 'framer-motion';


const sidebarItems: SidebarItem[] = [
  { id: 'students', label: 'Linked Students', icon: Users },
  { id: 'activity', label: 'Recent Activity', icon: Activity },
];

const ParentDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const activeTab = location.pathname.replace('/parent/dashboard', '').replace(/^\//, '') || 'students';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const stats = [
    { label: 'Linked Students', value: mockLinkedStudents.length, icon: Users, color: 'bg-parent' },
    { label: 'Active Courses', value: 5, icon: BookOpen, color: 'bg-primary' },
    { label: 'Avg. Progress', value: '57%', icon: TrendingUp, color: 'bg-accent' },
    { label: 'Notifications', value: 3, icon: Bell, color: 'bg-destructive' },
  ];

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
              Welcome, {user?.name?.split(' ')[0]}! 👨‍👩‍👧
            </h1>
            <p className="text-muted-foreground">
              Monitor your children's learning progress and achievements.
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
            <DashboardSidebar items={sidebarItems} basePath="/parent/dashboard" />

            <div className="flex-1 min-w-0">
              {activeTab === 'students' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-semibold text-xl">Linked Students</h2>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Plus className="h-4 w-4" />
                      Add Student
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mockLinkedStudents.map((student, index) => (
                      <motion.div
                        key={student.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card rounded-xl p-6 card-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-parent/20 rounded-full flex items-center justify-center">
                              <span className="text-2xl font-display font-bold text-parent">{student.name.charAt(0)}</span>
                            </div>
                            <div>
                              <h3 className="font-display font-semibold text-lg">{student.name}</h3>
                              <p className="text-muted-foreground text-sm">{student.grade}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-muted/50 rounded-lg p-3 text-center">
                            <div className="font-display font-bold text-xl">{student.courses}</div>
                            <div className="text-xs text-muted-foreground">Courses</div>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-3 text-center">
                            <div className="font-display font-bold text-xl">{student.progress}%</div>
                            <div className="text-xs text-muted-foreground">Avg. Progress</div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Overall Progress</span>
                            <span className="font-medium">{student.progress}%</span>
                          </div>
                          <Progress value={student.progress} className="h-2" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div>
                  <h2 className="font-display font-semibold text-xl mb-4">Recent Activity</h2>
                  <div className="bg-card rounded-xl card-shadow divide-y divide-border">
                    {[
                      { student: 'Emma', action: 'completed lesson', item: 'HTML Basics', time: '2 hours ago' },
                      { student: 'Liam', action: 'started course', item: 'Math for Kids', time: '5 hours ago' },
                      { student: 'Emma', action: 'earned certificate', item: 'CSS Fundamentals', time: 'Yesterday' },
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-parent/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-parent">{activity.student.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">{activity.student}</span>
                              {' '}{activity.action}{' '}
                              <span className="font-medium">{activity.item}</span>
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ParentDashboard;
