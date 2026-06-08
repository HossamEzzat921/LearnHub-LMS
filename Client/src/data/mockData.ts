// Mock data for the educational platform

export type UserRole = 'Student' | 'Parent' | 'Teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  rating: number;
  studentsCount: number;
  duration: string;
  lessonsCount: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  sections: CourseSection[];
}

export interface CourseSection {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted?: boolean;
  isLocked?: boolean;
}

export interface StudentProgress {
  courseId: string;
  progress: number;
  lastAccessed: string;
}

// Mock Users
export const mockUsers: User[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'Student' },
  { id: '2', name: 'Sarah Miller', email: 'sarah@example.com', role: 'Parent' },
  { id: '3', name: 'Dr. James Wilson', email: 'james@example.com', role: 'Teacher' },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    _id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course. Build real-world projects and become a full-stack developer.',
    instructor: 'Dr. Angela Yu',
    price: 89.99,
    originalPrice: 199.99,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    rating: 4.8,
    studentsCount: 245000,
    duration: '65 hours',
    lessonsCount: 450,
    category: 'Development',
    level: 'Beginner',
    sections: [
      {
        id: 's1',
        title: 'Getting Started with HTML',
        lessons: [
          { id: 'l1', title: 'Introduction to Web Development', duration: '15:00', isCompleted: true },
          { id: 'l2', title: 'HTML Basics', duration: '25:00', isCompleted: true },
          { id: 'l3', title: 'HTML Forms and Inputs', duration: '30:00', isCompleted: false },
        ],
      },
      {
        id: 's2',
        title: 'CSS Fundamentals',
        lessons: [
          { id: 'l4', title: 'CSS Selectors', duration: '20:00', isLocked: true },
          { id: 'l5', title: 'Box Model Explained', duration: '25:00', isLocked: true },
          { id: 'l6', title: 'Flexbox Layout', duration: '35:00', isLocked: true },
        ],
      },
      {
        id: 's3',
        title: 'JavaScript Essentials',
        lessons: [
          { id: 'l7', title: 'Variables and Data Types', duration: '30:00', isLocked: true },
          { id: 'l8', title: 'Functions and Scope', duration: '40:00', isLocked: true },
          { id: 'l9', title: 'DOM Manipulation', duration: '45:00', isLocked: true },
        ],
      },
    ],
  },
  {
    _id: '2',
    title: 'Data Science & Machine Learning',
    description: 'Master Python, pandas, NumPy, Matplotlib, and machine learning algorithms. Perfect for aspiring data scientists.',
    instructor: 'Jose Portilla',
    price: 94.99,
    originalPrice: 189.99,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    rating: 4.7,
    studentsCount: 180000,
    duration: '42 hours',
    lessonsCount: 280,
    category: 'Data Science',
    level: 'Intermediate',
    sections: [
      {
        id: 's1',
        title: 'Python Fundamentals',
        lessons: [
          { id: 'l1', title: 'Python Setup', duration: '10:00' },
          { id: 'l2', title: 'Data Types', duration: '25:00' },
        ],
      },
    ],
  },
  {
    _id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Learn user interface and user experience design from scratch. Create stunning designs in Figma.',
    instructor: 'Daniel Scott',
    price: 79.99,
    originalPrice: 149.99,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    rating: 4.9,
    studentsCount: 95000,
    duration: '28 hours',
    lessonsCount: 180,
    category: 'Design',
    level: 'Beginner',
    sections: [
      {
        id: 's1',
        title: 'Design Principles',
        lessons: [
          { id: 'l1', title: 'Introduction to Design', duration: '15:00' },
          { id: 'l2', title: 'Color Theory', duration: '30:00' },
        ],
      },
    ],
  },
  {
    _id: '4',
    title: 'Digital Marketing Strategy',
    description: 'Comprehensive guide to SEO, social media marketing, email marketing, and paid advertising.',
    instructor: 'Brad Traversy',
    price: 69.99,
    originalPrice: 129.99,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    rating: 4.6,
    studentsCount: 120000,
    duration: '35 hours',
    lessonsCount: 220,
    category: 'Marketing',
    level: 'Beginner',
    sections: [
      {
        id: 's1',
        title: 'Marketing Basics',
        lessons: [
          { id: 'l1', title: 'What is Digital Marketing', duration: '20:00' },
        ],
      },
    ],
  },
  {
    _id: '5',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps for iOS and Android using React Native and Expo.',
    instructor: 'Maximilian Schwarzmüller',
    price: 99.99,
    originalPrice: 219.99,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    rating: 4.8,
    studentsCount: 85000,
    duration: '48 hours',
    lessonsCount: 320,
    category: 'Development',
    level: 'Intermediate',
    sections: [
      {
        id: 's1',
        title: 'React Native Basics',
        lessons: [
          { id: 'l1', title: 'Getting Started', duration: '20:00' },
        ],
      },
    ],
  },
  {
    _id: '6',
    title: 'Photography Fundamentals',
    description: 'Master your camera and learn professional photography techniques for stunning images.',
    instructor: 'Phil Ebiner',
    price: 59.99,
    originalPrice: 119.99,
    thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
    rating: 4.7,
    studentsCount: 150000,
    duration: '22 hours',
    lessonsCount: 140,
    category: 'Photography',
    level: 'Beginner',
    sections: [
      {
        id: 's1',
        title: 'Camera Basics',
        lessons: [
          { id: 'l1', title: 'Understanding Your Camera', duration: '25:00' },
        ],
      },
    ],
  },
];

// Mock student progress
export const mockStudentProgress: StudentProgress[] = [
  { courseId: '1', progress: 35, lastAccessed: '2024-01-15' },
  { courseId: '3', progress: 72, lastAccessed: '2024-01-14' },
];

// Mock purchased courses for student
export const mockPurchasedCourses = ['1', '3'];

// Mock saved videos
export const mockSavedVideos = [
  { id: 'l1', courseId: '1', title: 'Introduction to Web Development', courseName: 'Complete Web Development Bootcamp' },
  { id: 'l2', courseId: '1', title: 'HTML Basics', courseName: 'Complete Web Development Bootcamp' },
  { id: 'l1', courseId: '3', title: 'Introduction to Design', courseName: 'UI/UX Design Masterclass' },
];

// Mock linked students for parent
export const mockLinkedStudents = [
  { id: '1', name: 'Emma Johnson', grade: '8th Grade', avatar: '', courses: 3, progress: 68 },
  { id: '2', name: 'Liam Johnson', grade: '5th Grade', avatar: '', courses: 2, progress: 45 },
];

// Mock teacher courses
export const mockTeacherCourses = [
  { id: '1', title: 'Advanced JavaScript', students: 1250, rating: 4.8, revenue: 12500 },
  { id: '2', title: 'React Masterclass', students: 890, rating: 4.9, revenue: 8900 },
];
