import { Button } from '@/components/ui/button'
import { selectCurrentUser } from '@/features/auth/authSlice'
import { MyCourses } from '@/features/teacher'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import React from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const TeacherCourses = () => {
   const user = useSelector(selectCurrentUser);
   const navigate = useNavigate()
  return (
    
    <div className="">
       <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="font-display font-bold text-3xl mb-2">
                   My Courses
              </h1>
              
            </div>

            <Button
              onClick={() => navigate(`/teacher/${user?.id}/create-course`)}
            >
              <Plus className="h-4 w-4" />
              Create New Course
            </Button>
          </motion.div>
        
        
          <MyCourses classname="grid lg:grid-cols-2 gap-6"/>
        
        </div>
  )
}

export default TeacherCourses