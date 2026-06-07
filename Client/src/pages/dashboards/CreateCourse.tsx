import { Link, useNavigate } from "react-router-dom";
import { createCourse } from "../../api";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { CreateCourseForm } from "@/features/teacher";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CreateCourse = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const handleCreateCourse = async (data) => {
    try {
      const result = await createCourse(data);
      toast.success("Course Created successfully!");
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
          <Link
            to={`/teacher/${user?.id}/courses`}
            className="hover:bg-accent hover:text-accent-foreground h-8 w-8 inline-flex 
            items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
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
