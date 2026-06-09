import { getTeacherCourses } from "@/api/course/getTeacherCourses";
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { MyCourses } from "@/features/teacher";
import { motion } from "framer-motion";
import { Loader2, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TeacherCourses = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          setLoading(true);
          const data = await getTeacherCourses(user.id);
          setMyCourses(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCourses();
    }, []);
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-10 w-10 animate-spin text-teal-700" />
        </div>
      );
    }
  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="font-display font-bold text-3xl mb-2">My Courses</h1>
        </div>

        <Button onClick={() => navigate(`/teacher/${user?.id}/create-course`)}>
          <Plus className="h-4 w-4" />
          Create New Course
        </Button>
      </motion.div>

      <MyCourses classname="grid lg:grid-cols-2 gap-6" myCourses={myCourses}/>
    </div>
  );
};

export default TeacherCourses;
