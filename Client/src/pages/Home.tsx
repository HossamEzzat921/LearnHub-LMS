import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import CourseCard from '@/components/courses/CourseCard';
import { mockCourses } from '@/data/mockData';
import { ArrowRight, Play, Users, Award, BookOpen, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getAllCourses } from '@/api/course/getAllCourses';

const Home = () => {
  const [coursesData,setCoursesData] = useState([])
  useEffect(()=>{
    const fetchCourses = async () => {
      const data = await getAllCourses();
     setCoursesData(data)
      }
    
    fetchCourses();
  },[])
  const featuredCourses = coursesData && coursesData.slice(0, 6);

  const stats = [
    { icon: Users, label: 'Students', value: '500K+' },
    { icon: BookOpen, label: 'Courses', value: '1,200+' },
    { icon: Award, label: 'Instructors', value: '200+' },
  ];

  const benefits = [
    'Lifetime access to course content',
    'Certificate of completion',
    'Learn at your own pace',
    'Mobile and desktop access',
  ];
console.log(coursesData)
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display font-extrabold text-4xl md:text-6xl text-primary-foreground mb-6 leading-tight"
              >
                Learn Without Limits, Grow Without Boundaries
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto"
              >
                Access thousands of expert-led courses in programming, design, business, and more. 
                Start your learning journey today.
              </motion.p>
             <motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="flex flex-col sm:flex-row gap-4 justify-center"
>
  <Link to="/courses">
   <Button 
  size="lg" 
  className="bg-white hover:bg-white/90 gap-2 w-full sm:w-auto font-bold shadow-lg border-none"
  style={{ color: 'hsl(220 20% 15%)' }} 
>
  Explore Courses
  <ArrowRight className="h-5 w-5" style={{ color: 'hsl(220 20% 15%)' }} />
</Button>
  </Link>

<Button 
  size="lg" 
  variant="outline" 
  className="bg-white border-white text-black hover:bg-primary hover:text-white hover:border-primary gap-2 w-full sm:w-auto font-bold transition-all duration-300"
  style={{ color: 'black' }} 
  onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
  onMouseLeave={(e) => (e.currentTarget.style.color = 'black')}
>
  <Play className="h-5 w-5" />
  Watch Demo
</Button>
</motion.div>
            </div>
          </div>
          
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        {/* Stats Bar */}
        <div className="bg-card shadow-lg relative z-10 -mt-8 mx-4 md:mx-auto md:max-w-4xl rounded-2xl">
          <div className="grid grid-cols-3 divide-x divide-border">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="py-6 px-4 text-center"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-display font-bold text-2xl">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-2">
                Featured Courses
              </h2>
              <p className="text-muted-foreground">
                Learn from the best instructors in the industry
              </p>
            </div>
            <Link to="/courses">
              <Button variant="outline" className="hidden md:flex gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {featuredCourses?.map((course, index) => (
  <CourseCard key={course._id} course={course} index={index} />
            ))}
          </div>

          <Link to="/courses" className="md:hidden">
            <Button variant="outline" className="w-full mt-6 gap-2">
              View All Courses
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
                Why Learn with EduLearn?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                We provide world-class education accessible to everyone. 
                Our platform is designed to help you succeed with practical, 
                real-world skills.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              <Link to="/signup">
                <Button size="lg" className="mt-8 hero-gradient text-primary-foreground hover:opacity-90">
                  Get Started Free
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                alt="Students learning together"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-2xl">98%</div>
                    <div className="text-muted-foreground text-sm">Success Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="hero-gradient rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl text-primary-foreground mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of students who are already advancing their careers with EduLearn.
              </p>
              <Link to="/signup">
                <Button size="lg" className="bg-card text-foreground hover:bg-card/90">
                  Create Free Account
                </Button>
              </Link>
            </motion.div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full -translate-x-1/2 translate-y-1/2" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
