import { createSection } from "../../api";

import SectionHeader from "./SectionHeader";
import type { Section } from "../../types/Section";
import { useCourseContext } from "./useCourseContext";
import Lessons from "./Lessons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const Curriculm = () => {
  const { courseId, sections, setSections, setCourseData } = useCourseContext();

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          Course Curriculum
        </CardTitle>
        <Button
          onClick={handleAddSection}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Section
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.map((sec: Section) => (
          <div
            key={sec._id}
            className="border border-border rounded-lg overflow-hidden"
          >
            {/* Section Header */}
            <SectionHeader section={sec} />

            {/* Lessons List */}

            <div className="p-4 space-y-2">
              <Lessons lessons={sec.lessons || []} sectionId={sec._id} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Curriculm;
