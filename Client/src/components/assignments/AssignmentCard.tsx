import { Assignment } from '@/data/assignmentsData';
import { Button } from '@/components/ui/button';
import { Download, Upload, CheckCircle, Clock, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface AssignmentCardProps {
  assignment: Assignment;
  onDownload: (assignment: Assignment) => void;
  onUpload: (assignment: Assignment) => void;
  userRole: 'student' | 'teacher';
}

const AssignmentCard = ({ assignment, onDownload, onUpload, userRole }: AssignmentCardProps) => {
  const getStatusBadge = () => {
    switch (assignment.status) {
      case 'pending':
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-xs font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        );
      case 'submitted':
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-medium flex items-center gap-1">
            <Upload className="h-3 w-3" />
            Submitted
          </span>
        );
      case 'graded':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Graded: {assignment.grade}%
          </span>
        );
    }
  };

  const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status === 'pending';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
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
        {getStatusBadge()}
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {assignment.description}
      </p>

      <div className="flex items-center justify-between text-sm mb-4">
        <span className="text-muted-foreground">
          Due: <span className={isOverdue ? 'text-red-500 font-medium' : ''}>{assignment.dueDate}</span>
        </span>
        <span className="text-muted-foreground">By: {assignment.teacherName}</span>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-1"
          onClick={() => onDownload(assignment)}
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        {userRole === 'student' && assignment.status === 'pending' && (
          <Button
            size="sm"
            className="flex-1 gap-1 hero-gradient text-primary-foreground"
            onClick={() => onUpload(assignment)}
          >
            <Upload className="h-4 w-4" />
            Submit Answer
          </Button>
        )}
      </div>

      {assignment.status === 'graded' && assignment.feedback && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">Teacher Feedback:</p>
          <p className="text-sm text-green-600 dark:text-green-300">{assignment.feedback}</p>
        </div>
      )}
    </motion.div>
  );
};

export default AssignmentCard;
