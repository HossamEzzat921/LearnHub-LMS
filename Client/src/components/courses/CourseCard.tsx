import { Link } from 'react-router-dom';
import { Course } from '@/data/mockData';
import { Star, Users, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface CourseCardProps {
  course: Course;
  index?: number;
}

const CourseCard = ({ course, index = 0 }: CourseCardProps) => {
   const BASE_URL = "http://localhost:3500/";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/courses/${course._id}`}>
        <div className="bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 group">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <img 
              src={`${BASE_URL}uploads/${course.thumbnail}`}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium">
                {course.category}
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-semibold">
                {course.level}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-display font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-3">
              {course.instructor}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium text-foreground">{course.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{(course.studentsCount / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl">${course.price}</span>
                {course.originalPrice && (
                  <span className="text-muted-foreground line-through text-sm">
                    ${course.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <BookOpen className="h-4 w-4" />
                <span>{course.lessonsCount} lessons</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
