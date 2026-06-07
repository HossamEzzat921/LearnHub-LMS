import { useState } from "react";
import { deleteLesson, updateLesson } from "../../api";
import { useCourseContext } from "./useCourseContext";
import type { Lesson } from "../../types/Lesson";
import type { Section } from "../../types/Section";
import { Modal } from "../../components/modal";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const getEmbedUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);

    // youtube.com/watch?v=
    if (parsedUrl.hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // youtu.be/
    if (parsedUrl.hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.slice(1);

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return null;
  } catch {
    return null;
  }
};

const LessonItem = ({
  lesson,
  sectionId,
}: {
  lesson: Lesson;
  sectionId: string;
}) => {
  const [formData, setFormData] = useState({
    title: lesson.title,
    videoUrl: lesson.videoUrl || "",
    content: lesson.content || "",
    order: lesson.order,
  });
  const embedUrl = getEmbedUrl(formData.videoUrl);
  const [openModal, setOpenModal] = useState(false);
  const { setSections, setCourseData } = useCourseContext();
  const handleDeleteLesson = async (lessonId: string, sectionId: string) => {
    try {
      const deletedLesson = await deleteLesson(lessonId, sectionId);

      if (!deletedLesson) {
        throw new Error("Deletion failed");
      }

      // 1. Define the update logic to reuse for both states
      const updateSectionsList = (prevSections: Section[]) =>
        prevSections.map((s) =>
          s._id === sectionId
            ? { ...s, lessons: s.lessons.filter((l) => l._id !== lessonId) }
            : s,
        );

      // 2. Update the local UI sections state
      setSections((prev) => updateSectionsList(prev));

      // 3. Update the global courseData state
      setCourseData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          courseCurriculum: updateSectionsList(prev.courseCurriculum || []),
        };
      });
    } catch (error) {
      console.error("Error deleting lesson:", error);
      // Optional: Add a toast notification for the user here
    }
  };
  const handleUpdateLesson = async (
    lessonId: string,
    sectionId: string,
    formData,
  ) => {
    const updatedLesson = await updateLesson(lessonId, formData);
    setSections((prev) =>
      prev.map((s) =>
        s._id === sectionId
          ? {
              ...s,
              lessons: s.lessons
                .map((l) => (l._id === lessonId ? updatedLesson : l))
                .sort((a, b) => a.order - b.order),
            }
          : s,
      ),
    );

    setOpenModal(false);
  };

  return (
    <div className="bg-muted/50 p-4 flex items-center  justify-between gap-3 border border-border rounded-lg overflow-hidden">
      {openModal ? (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div className="space-y-3 mt-8">
            <input
              className="w-full border p-2 rounded text-sm"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Lesson Title"
            />
            <input
              className="w-full border p-2 rounded text-sm"
              value={formData.videoUrl}
              type="url"
              onChange={(e) =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
              placeholder="Video URL (YouTube/Vimeo)"
            />

            {embedUrl && (
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <iframe
                  className="w-full h-full"
                  src={embedUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Lesson Video"
                />
              </div>
            )}

            <textarea
              className="w-full border p-2 rounded text-sm"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Lesson Content/Text"
            />
            <div className="flex gap-2">
             

              <Button
                type="submit"
                className="hero-gradient text-primary-foreground"
                onClick={() =>
                  handleUpdateLesson(lesson._id, sectionId, formData)
                }
              >
                Save
              </Button>
               <Button variant="outline" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      ) : (
        <div className="w-full flex justify-between items-center group">
          <div className="flex items-center gap-3">
            <i className="fa-regular fa-circle-play text-gray-400"></i>
            <span className="text-sm font-medium text-dark">
              {formData.title}
            </span>
          </div>
          <div className="flex items-center px-1.5 group-hover:opacity-100 transition  ">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenModal(true)}
              className="text-foreground hover:hero-gradient hover:text-primary-foreground"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteLesson(lesson._id, sectionId)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonItem;
