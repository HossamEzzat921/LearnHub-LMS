import { getCourse } from "@/api/course/getCourse";
import { updateCourse } from "@/api/course/updateCourse";
import Tabs from "@/components/tabs/Tabs";
import { Curriculm, PublishCourse, UpdateCourseForm } from "@/features/teacher";
import { CourseContext } from "@/features/teacher/useCourseContext";
import { Course } from "@/types/Course";
import { Section } from "@/types/Section";
import { courseType } from "@/validations/coureseSchema";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const EditCourse = () => {
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState<Course | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await getCourse(courseId);
        setCourseData(data);
        if (data) {
          setSections(data.courseCurriculum);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleUpdateCourse = async (data: courseType) => {
    try {
      const result = await updateCourse(data, courseId);

      if (result) {
        setCourseData(result);
        toast.success("Course Updated successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-teal-700" />
      </div>
    );
  }
  const tabs = [
    {
      label: "  Edit Course",
      icon: "📚",

      content: (
        <div>
          {" "}
          <UpdateCourseForm onSubmit={handleUpdateCourse} />
        </div>
      ),
    },
    {
      label: "Course Curriculum",
      icon: "📝",

      content: (
        <div>
          {" "}
          <Curriculm />
        </div>
      ),
    },
    {
      label: "Publish",
      icon: "⚙️",
      content: (
        <div>
          <PublishCourse />
        </div>
      ),
    },
  ];

  return (
    <CourseContext.Provider
      value={{
        courseId,
        sections,
        setSections,
        editingSectionId,
        setEditingSectionId,
        courseData,
        setCourseData,
      }}
    >
      <section className="container mx-auto max-w-4xl">
        <Tabs tabs={tabs} />
      </section>
    </CourseContext.Provider>
  );
};

export default EditCourse;
export { CourseContext };
