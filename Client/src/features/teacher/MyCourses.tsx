import React from "react";

import {
  DollarSign,
  MoreVertical,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

const MyCourses = ({ classname ,myCourses}) => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const content = myCourses?.map((course, index) => (
    <motion.div
      key={course._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-xl p-5 card-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-display font-semibold text-lg">{course.title}</h3>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-bold">
              {/* {course.students.toLocaleString()} */}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">Students</span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="h-4 w-4 text-yellow-500" />
            {/* <span className="font-bold">{course.rating}</span> */}
          </div>
          <span className="text-xs text-muted-foreground">Rating</span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <DollarSign className="h-4 w-4 text-teacher" />
            <span className="font-bold">
              {/* ${(course.revenue / 1000).toFixed(1)}K */}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">Revenue</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 gap-1">
          <TrendingUp className="h-4 w-4" />
          Analytics
        </Button>
        <Button
          size="sm"
          className="flex-1 gap-1 hero-gradient text-primary-foreground"
          onClick={() =>
            navigate(`/teacher/${user?.id}/courses/edit/${course._id}`)
          }
        >
          Edit Course
        </Button>
      </div>
    </motion.div>
  ));
  return <div className={classname}>{content}</div>;
};

export default MyCourses;
