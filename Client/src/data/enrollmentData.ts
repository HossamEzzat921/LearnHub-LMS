// Mock data for enrollment/access requests

export interface EnrollmentRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseName: string;
  requestedAt: string;
  paymentMethod: string;
  paymentAmount: number;
  status: 'pending' | 'approved' | 'rejected';
}

export const mockEnrollmentRequests: EnrollmentRequest[] = [
  {
    id: 'er1',
    studentId: 's1',
    studentName: 'Ahmed Hassan',
    studentEmail: 'ahmed@example.com',
    courseId: '1',
    courseName: 'Advanced JavaScript',
    requestedAt: '2024-02-01',
    paymentMethod: 'Vodafone Cash',
    paymentAmount: 89.99,
    status: 'pending',
  },
  {
    id: 'er2',
    studentId: 's2',
    studentName: 'Sara Mohamed',
    studentEmail: 'sara@example.com',
    courseId: '1',
    courseName: 'Advanced JavaScript',
    requestedAt: '2024-02-02',
    paymentMethod: 'Vodafone Cash',
    paymentAmount: 89.99,
    status: 'pending',
  },
  {
    id: 'er3',
    studentId: 's3',
    studentName: 'Omar Ali',
    studentEmail: 'omar@example.com',
    courseId: '2',
    courseName: 'React Masterclass',
    requestedAt: '2024-01-30',
    paymentMethod: 'Bank Transfer',
    paymentAmount: 94.99,
    status: 'pending',
  },
  {
    id: 'er4',
    studentId: 's4',
    studentName: 'Nour Ibrahim',
    studentEmail: 'nour@example.com',
    courseId: '1',
    courseName: 'Advanced JavaScript',
    requestedAt: '2024-01-28',
    paymentMethod: 'Vodafone Cash',
    paymentAmount: 89.99,
    status: 'approved',
  },
  {
    id: 'er5',
    studentId: 's5',
    studentName: 'Youssef Khaled',
    studentEmail: 'youssef@example.com',
    courseId: '2',
    courseName: 'React Masterclass',
    requestedAt: '2024-01-25',
    paymentMethod: 'Bank Transfer',
    paymentAmount: 94.99,
    status: 'rejected',
  },
];
