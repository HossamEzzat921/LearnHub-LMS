import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/data/mockData';
import { GraduationCap, User, Users, BookOpen, ArrowRight, Mail, Lock, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { id: 'student' as UserRole, label: 'Student', icon: User, color: 'bg-student', description: 'Access courses and track learning' },
    { id: 'parent' as UserRole, label: 'Parent', icon: Users, color: 'bg-parent', description: 'Monitor your child\'s progress' },
    { id: 'teacher' as UserRole, label: 'Teacher', icon: BookOpen, color: 'bg-teacher', description: 'Create and sell courses' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setIsLoading(true);
    try {
      await signup(name, email, password, selectedRole);
      navigate(`/${selectedRole}/dashboard`);
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 hero-gradient" />
        <img 
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200"
          alt="Online learning"
          className="w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-primary-foreground">
            <h2 className="font-display font-bold text-4xl mb-4">
              Start Your Learning Adventure
            </h2>
            <p className="text-xl opacity-90 max-w-md">
              Join millions of learners and unlock your full potential with our expert-led courses.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
           <Link to="/" className="flex items-center gap-3 mb-8 group">
            <div className="p-2.5 rounded-xl hero-gradient shadow-lg transition-transform group-hover:scale-110">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
              Learn <span className="text-primary-600">Hub</span>
            </span>
          </Link>

          <h1 className="font-display font-bold text-3xl mb-2">Create an account</h1>
          <p className="text-muted-foreground mb-8">Start your learning journey today</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <Label className="text-base mb-3 block">I want to join as</Label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      selectedRole === role.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className={`p-2 ${role.color} rounded-lg w-fit mx-auto mb-2`}>
                      <role.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="font-medium text-sm">{role.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative mt-1">
                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full hero-gradient text-primary-foreground hover:opacity-90 gap-2"
              disabled={!selectedRole || isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-center mt-6 text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
