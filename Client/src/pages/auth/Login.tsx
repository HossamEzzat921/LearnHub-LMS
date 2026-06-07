import { Link } from "react-router-dom";

import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

import LoginForm from "@/features/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo - المحدث باسم LearnHub وأيقونة الكتاب */}
          <Link to="/" className="flex items-center gap-3 mb-8 group">
            <div className="p-2.5 rounded-xl hero-gradient shadow-lg transition-transform group-hover:scale-110">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
              Learn<span className="text-primary-600">Hub</span>
            </span>
          </Link>

          <h1 className="font-display font-bold text-3xl mb-2">
            Welcome back!
          </h1>
          <p className="text-muted-foreground mb-8">
            Sign in to continue your learning journey
          </p>

          <LoginForm />

          <p className="text-center mt-6 text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 hero-gradient" />
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200"
          alt="Students collaborating"
          className="w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-primary-foreground">
            <h2 className="font-display font-bold text-4xl mb-4">
              Continue Your Journey
            </h2>
            <p className="text-xl opacity-90 max-w-md">
              Pick up where you left off and achieve your learning goals today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
