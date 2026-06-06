import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Camera, GraduationCap, BookOpen, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useAuth();

  const roleConfig = {
    student: { label: 'Student', icon: User, color: 'bg-student' },
    parent: { label: 'Parent', icon: Users, color: 'bg-parent' },
    teacher: { label: 'Teacher', icon: BookOpen, color: 'bg-teacher' },
  };

  const currentRole = user?.role ? roleConfig[user.role] : roleConfig.student;

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display font-bold text-3xl mb-8">Profile Settings</h1>

            {/* Profile Card */}
            <div className="bg-card rounded-2xl card-shadow overflow-hidden">
              {/* Header */}
              <div className="hero-gradient p-8 text-center relative">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-display font-bold text-primary">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-muted transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="font-display font-bold text-2xl text-primary-foreground mt-4">
                  {user?.name || 'User'}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className={`px-3 py-1 ${currentRole.color} text-white rounded-full text-sm font-medium flex items-center gap-1`}>
                    <currentRole.icon className="h-4 w-4" />
                    {currentRole.label}
                  </span>
                </div>
              </div>

              {/* Form */}
              <div className="p-6 md:p-8">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="firstName"
                          defaultValue={user?.name?.split(' ')[0] || ''}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="lastName"
                          defaultValue={user?.name?.split(' ')[1] || ''}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email || ''}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Account Type</Label>
                    <div className="mt-2 p-4 bg-muted/50 rounded-xl flex items-center gap-4">
                      <div className={`p-3 ${currentRole.color} rounded-lg`}>
                        <currentRole.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{currentRole.label} Account</p>
                        <p className="text-sm text-muted-foreground">
                          {user?.role === 'student' && 'Access courses and track your learning progress'}
                          {user?.role === 'parent' && 'Monitor your children\'s learning journey'}
                          {user?.role === 'teacher' && 'Create and manage courses, view analytics'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <Button className="hero-gradient text-primary-foreground">
                      Save Changes
                    </Button>
                    <Button variant="outline">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-8 bg-destructive/5 border border-destructive/20 rounded-xl p-6">
              <h3 className="font-display font-semibold text-destructive mb-2">Danger Zone</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
