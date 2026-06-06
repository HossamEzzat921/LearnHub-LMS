// Mock data for assignments system

export interface Assignment {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: string;
  uploadedAt: string;
  teacherId: string;
  teacherName: string;
  fileUrl: string; // Mock PDF URL
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
}

export interface StudentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  fileUrl: string;
  status: 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
}

// Mock assignments uploaded by teachers
export const mockAssignments: Assignment[] = [
  {
    id: 'a1',
    courseId: '1',
    courseName: 'Complete Web Development Bootcamp',
    title: 'HTML & CSS Portfolio Project',
    description: 'Create a personal portfolio website using HTML and CSS. Include at least 3 pages with navigation, images, and responsive design.',
    dueDate: '2024-02-15',
    uploadedAt: '2024-01-20',
    teacherId: '3',
    teacherName: 'Dr. Angela Yu',
    fileUrl: '/assignments/html-css-project.pdf',
    status: 'pending',
  },
  {
    id: 'a2',
    courseId: '1',
    courseName: 'Complete Web Development Bootcamp',
    title: 'JavaScript Functions Exercise',
    description: 'Complete the JavaScript exercises focusing on functions, scope, and closures.',
    dueDate: '2024-02-20',
    uploadedAt: '2024-01-25',
    teacherId: '3',
    teacherName: 'Dr. Angela Yu',
    fileUrl: '/assignments/js-functions.pdf',
    status: 'submitted',
  },
  {
    id: 'a3',
    courseId: '3',
    courseName: 'UI/UX Design Masterclass',
    title: 'Wireframe Design Assignment',
    description: 'Design wireframes for a mobile app using Figma. Include at least 5 screens with user flow.',
    dueDate: '2024-02-18',
    uploadedAt: '2024-01-22',
    teacherId: '4',
    teacherName: 'Daniel Scott',
    fileUrl: '/assignments/wireframe-design.pdf',
    status: 'graded',
    grade: 92,
    feedback: 'Excellent work! Your wireframes show great understanding of user flow.',
  },
];

// Mock student submissions
export const mockSubmissions: StudentSubmission[] = [
  {
    id: 's1',
    assignmentId: 'a2',
    studentId: '1',
    studentName: 'Alex Johnson',
    submittedAt: '2024-02-10',
    fileUrl: '/submissions/alex-js-functions.pdf',
    status: 'submitted',
  },
  {
    id: 's2',
    assignmentId: 'a3',
    studentId: '1',
    studentName: 'Alex Johnson',
    submittedAt: '2024-02-12',
    fileUrl: '/submissions/alex-wireframes.pdf',
    status: 'graded',
    grade: 92,
    feedback: 'Excellent work! Your wireframes show great understanding of user flow.',
  },
];

// Get assignments for a student based on their purchased courses
export const getStudentAssignments = (purchasedCourseIds: string[]): Assignment[] => {
  return mockAssignments.filter(a => purchasedCourseIds.includes(a.courseId));
};

// Get assignments created by a teacher
export const getTeacherAssignments = (teacherId: string): Assignment[] => {
  return mockAssignments.filter(a => a.teacherId === teacherId);
};

// Get submissions for a specific assignment
export const getAssignmentSubmissions = (assignmentId: string): StudentSubmission[] => {
  return mockSubmissions.filter(s => s.assignmentId === assignmentId);
};
