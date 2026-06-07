import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Course } from "../../types/Course";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";



const CoursesList = () => {
  const user = useSelector(selectCurrentUser);
  console.log(user.id);
  const [courses, setCourses] = useState([]);

  
  const getCourses = async () => {
  if (!user?.id) return;

  try {
    const { data } = await axios.get(
      `/courses/teacher/${user.id}`
    );

    setCourses(data);
  } catch (error) {
    console.error(error);
  }
};
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="">
      <div className="">
        <h2 className="font-plus font-semibold text-xl text-dark leading-7 mb-8">
          Your Courses
        </h2>
        <div className=" grid lg:grid-cols-2 gap-8 space-y-4">
          {courses?.map((course: Course) => (
            <div className="bg-white rounded-xl p-6 shadow-soft space-y-5">
              <div className="flex justify-between">
                <h3 className="font-plus font-semibold text-lg text-dark leading-7">
                  {course.title}
                </h3>
                <Link
                  to={`${course._id}`}
                  className=" flex items-center justify-center gap-2 h-9 px-3 py-2 text-sm font-medium text-white bg-linear-to-r from-teal to-dark-teal leading-5 rounded-xl"
                >
                  <span>View</span>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2 items-center">
                  <div className="flex gap-1 items-center">
                    <i className="fa-solid fa-user-group text-gray-400 text-lg"></i>
                    <span className="font-bold text-base leading-6 text-dark">
                      1,250
                    </span>
                  </div>
                  <p className="font-normal text-xs leading-4">Studens</p>
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <div className="flex gap-1 items-center">
                    <i className="fa-regular fa-star text-orange text-lg"></i>
                    <span className="font-bold text-base leading-6 text-dark">
                      1,250
                    </span>
                  </div>
                  <p className="font-normal text-xs leading-4">Rating</p>
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <div className="flex gap-1 items-center">
                    <span className="text-green font-semibold text-xl">$</span>
                    <span className="font-bold text-base leading-6 text-dark">
                      $12.5k
                    </span>
                  </div>
                  <p className="font-normal text-xs leading-4">Revenue</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="w-full flex items-center justify-center gap-2 h-9 px-3 py-2 text-sm font-medium bg-cream border border-light-gray hover:bg-orange hover:text-white transition-all text-dark leading-5 rounded-xl">
                  <span>Delete Course</span>
                </button>
                <Link
                  to={`edit/${course._id}`}
                  className="w-full flex items-center justify-center gap-2 h-9 px-3 py-2 text-sm font-medium text-white bg-linear-to-r from-teal to-dark-teal leading-5 rounded-xl"
                >
                  <span>Edit Course</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesList;
