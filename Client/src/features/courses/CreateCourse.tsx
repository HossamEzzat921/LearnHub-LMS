import { useNavigate } from "react-router-dom";
import { createCourse } from "../../api";
import type { courseType } from "../../validations/coureseSchema";
import CreateCourseForm from "./CreateCourseForm";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";



const CreateCourse = () => {
   const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const handleCreateCourse = async (data: courseType) => {
    try {
      const result = await createCourse(data);

      if (result) {
        navigate(`/teacher/${user.id}/courses`);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section className="container mx-auto max-w-4xl">
      {/* intro */}
      <div className="flex flex-col gap-4 md:flex-row justify-between items-center my-12">
        <div className="flex gap-2 items-center">
          <div className="w-9 h-9 hover:bg-orange cursor-pointer hover:text-white transition-all rounded-lg flex items-center justify-center">
            <a href="http://127.0.0.1:5501/pages/teacher-courses.html">
              <i className="fa-solid fa-arrow-down text-base rotate-90"></i>
            </a>
          </div>
          <div>
            <h3 className="font-plus font-bold text-2xl leading-8 text-dark">
              Create New Course
            </h3>
            <p className="font-normal text-base leading-6">
              Fill in the details to create your course
            </p>
          </div>
        </div>
      </div>
      
      <CreateCourseForm onSubmit={handleCreateCourse} />
    </section>
  );
};

export default CreateCourse;
