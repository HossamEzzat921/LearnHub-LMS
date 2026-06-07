import { createSection } from "../../api";

import SectionHeader from "./SectionHeader";
import type { Section } from "../../types/Section";
import { useCourseContext } from "./useCourseContext";
import Lessons from "./Lessons";

const Curriculm = () => {
  const { courseId, sections, setSections, setCourseData } =
    useCourseContext();

  const handleAddSection = async () => {
    try {
      const newSection = await createSection({ courseId });

      setSections((prev) =>
        [...prev, newSection].sort((a, b) => a.order - b.order),
      );

      // 2. Update the parent courseData object
      setCourseData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,

          courseCurriculum: [...(prev.courseCurriculum || []), newSection],
        };
      });
    } catch (error) {
      console.error("Error creating section:", error);
    }
  };
 
  if (!courseId) return <div>Loading Sections details...</div>;

  return (
    <div className="bg-white rounded-xl p-6 shadow-soft space-y-4 border border-light-gray mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-video text-teal text-lg mt-1.5"></i>
          <h2 className="font-plus font-semibold text-2xl leading-6 text-dark">
            Course Curriculum
          </h2>
        </div>
        <button
          type="button"
          onClick={handleAddSection}
          className="flex items-center gap-2 h-10 px-4 py-2 bg-cream border border-light-gray hover:bg-orange hover:text-white transition-all text-dark text-sm leading-5 font-medium rounded-lg"
        >
          <i className="fa-solid fa-plus text-sm"></i>
          <span>Add Section</span>
        </button>
      </div>

      <div className="space-y-4">
        {sections.map((sec: Section) => (
          <div
            key={sec._id}
            className="border border-light-gray rounded-lg overflow-hidden"
          >
            {/* Section Header */}
            <SectionHeader section={sec} />

            {/* Lessons List */}

            <div className="p-4 space-y-2">
              <Lessons lessons={sec.lessons || []} sectionId={sec._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Curriculm;
