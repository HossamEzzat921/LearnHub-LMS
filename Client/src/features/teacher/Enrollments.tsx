import { useEffect, useState } from "react";
import {
  EnrollmentRequest,
  mockEnrollmentRequests,
} from "@/data/enrollmentData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  Filter,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectCurrentUser } from "../auth/authSlice";

const Enrollments = () => {
  const user = useSelector(selectCurrentUser);

  const [enrollments, setEnrollments] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getEnrollmentsData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/enrollments/teacher/${user?.id}/enrollments`,
        );

        setEnrollments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getEnrollmentsData();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-teal-700" />
      </div>
    );
  }
  if (enrollments?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto px-4 pt-20 pb-5 text-center "
        >
          <div>
            <h1 className="font-display font-bold text-3xl mb-2">
              Welcome, Mr <span className="capitalize"> {user?.username}</span>!
              👨‍🏫
            </h1>

            <h3 className="text-lg font-semibold">No Enrollment Requests</h3>
            <p className="text-muted-foreground mt-2">
              New enrollment requests from students will appear here.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="font-display font-semibold text-xl">
          Enrollment Requests
        </h2>
        {enrollments?.length > 0 && (
          <Button className="hero-gradient text-primary-foreground gap-2 w-fit">
            <UserCheck className="h-4 w-4" />
            Approve All ({enrollments?.length})
          </Button>
        )}
      </div>

      {/* Requests List */}
      {enrollments.length > 0 ? (
        <div className="bg-card rounded-xl card-shadow overflow-hidden mt-6">
          <div className="divide-y divide-border">
            {enrollments.map((request, index) => (
              <motion.div
                key={request._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center shrink-0">
                    <span className="font-medium text-sm">
                      {request.student.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium">{request.student.username}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {request.student.email}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 text-sm">
                  <p className="font-medium">{request.course.title}</p>
                  <p className="text-muted-foreground">
                    Vodafone Cash ${request.course.price}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Requested:{request.enrolledAt.split("T")[0]}
                  </p>
                </div>
                <div>
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-300 bg-green-50 dark:bg-green-950 dark:border-green-800 gap-1"
                  >
                    <CheckCircle className="h-3 w-3" />
                    Approved
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-xl p-8 text-center card-shadow"></div>
      )}
    </div>
  );
};

export default Enrollments;
