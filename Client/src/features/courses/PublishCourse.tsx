import { useEffect, useState } from "react";
import { useCourseContext } from "./useCourseContext";
import axios from "axios";

const PublishCourse = () => {
  const { courseData: course, setCourseData } = useCourseContext();
  const [isPublished, setIsPublished] = useState(
    course?.status === "published",
  );
  const [isLoading, setIsLoading] = useState(false);

  const hasSections = course && course.courseCurriculum.length > 0;
  const hasLessons =
    hasSections &&
    course.courseCurriculum.some(
      (section) => section.lessons && section.lessons.length > 0,
    );

  const canPublish = hasSections && hasLessons;
  // AUTO-REVERT LOGIC:
  // If the course was published but no longer meets requirements, force it to draft.
  useEffect(() => {
   const forceDraft = async () => {
  if (!canPublish && isPublished && course?._id) {
    setIsLoading(true);

    try {
      await axios.patch(`/courses/${course._id}`, {
        status: "draft",
        isPublished: false,
      });

      setIsPublished(false);

      setCourseData((prev: any) =>
        prev
          ? {
              ...prev,
              status: "draft",
              isPublished: false,
            }
          : prev,
      );
    } catch (error) {
      console.error("Auto-revert failed:", error);
    } finally {
      setIsLoading(false);
    }
  }
};
    forceDraft();
  }, [canPublish, isPublished, course?._id, setCourseData]);
 const handleToggle = async () => {
  if (!course?._id) return;

  const newStatus = !isPublished;
  setIsLoading(true);

  try {
    await axios.patch(`/courses/${course._id}`, {
      status: newStatus ? "published" : "draft",
      isPublished: newStatus,
    });

    setIsPublished(newStatus);

    setCourseData((prev) =>
      prev
        ? {
            ...prev,
            status: newStatus ? "published" : "draft",
            isPublished: newStatus,
          }
        : prev,
    );
  } catch (error) {
    console.error("Error updating course:", error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div>
      <div>
        <div
          className={`relative inline-block w-11 h-5 ${isLoading ? "opacity-50" : ""}`}
        >
          <input
            checked={isPublished}
            onChange={handleToggle}
            disabled={!canPublish}
            id="switch-component"
            type="checkbox"
            className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-teal-500 cursor-pointer transition-colors duration-300"
          />
          <label
            htmlFor="switch-component"
            className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
          ></label>
        </div>
        {!canPublish && (
          <p className="text-red-500 text-lg">
            Cannot publish: Course must have at least one section with at least
            one lesson.
          </p>
        )}
      </div>
    </div>
  );
};

export default PublishCourse;
