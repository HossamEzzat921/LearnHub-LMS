import { useState } from "react";
import { addLesson, deleteSection, updateSection } from "../../api";
import { useCourseContext } from "./useCourseContext";
import type { Section } from "../../types/Section";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";

const SectionHeader = ({ section }: { section: Section }) => {
  const {
    courseId,
    setSections,
    editingSectionId,
    setEditingSectionId,
    setCourseData,
  } = useCourseContext();
  const [editTitle, setEditTitle] = useState("");
  const [editOrder, setEditOrder] = useState<number>(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!editTitle.trim()) return "Title is required";
    if (editOrder < 0) return "Order must be 0 or greater";
    return "";
  };
  const handleDeleteSection = async (sectionId: string) => {
    try {
      const res = await deleteSection({ sectionId, courseId });
      if (!res?.ok) throw new Error("Delete failed");

      // 1. Update local sections list
      setSections((prev) => prev.filter((s) => s._id !== sectionId));

      // 2. Update parent courseData
      setCourseData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          courseCurriculum: prev.courseCurriculum.filter(
            (s) => s._id !== sectionId,
          ),
        };
      });
    } catch (err) {
      console.error(err);
    }
  };
  const handleUpdateSection = async (sectionId: string) => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const updatedSection = await updateSection({
        sectionId,
        title: editTitle,
        order: editOrder,
      });

      setSections((prev) =>
        prev
          .map((s) => (s._id === sectionId ? updatedSection : s))
          .sort((a, b) => a.order - b.order),
      );
      setEditingSectionId(null);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleAddLesson = async (sectionId: string) => {
    try {
      const newLesson = await addLesson(sectionId);

      const updateWithLesson = (prev: Section[]) =>
        prev.map((section) =>
          section._id === sectionId
            ? { ...section, lessons: [...(section.lessons || []), newLesson] }
            : section,
        );

      // Update both states
      setSections(updateWithLesson);
      setCourseData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          courseCurriculum: updateWithLesson(prev.courseCurriculum || []),
        };
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-muted/50 p-4 flex items-center gap-3">
      <div className="flex items-center gap-3 flex-1">
        {editingSectionId === section._id ? (
          <div className="flex flex-col gap-2 w-full max-w-md">
            {/* Inputs */}
            <div className="flex gap-2">
              <input
                type="number"
                className="w-16 px-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={editOrder}
                onChange={(e) => setEditOrder(Number(e.target.value))}
              />
              <input
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Section title"
                autoFocus
              />
            </div>

            {/* Error */}
            {error && <span className="text-red-500 text-xs">{error}</span>}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdateSection(section._id)}
                disabled={loading}
                className="px-3 py-1.5 bg-teal-600 text-white text-xs rounded-lg hover:bg-teal-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => setEditingSectionId(null)}
                className="px-3 py-1.5 bg-gray-100 text-xs rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between  w-full group">
            <div className="flex gap-2 ">
              <h2 className="font-medium text-sm">{section.title}</h2>
            </div>

            <div className="flex items-center  group-hover:opacity-100 transition  ">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAddLesson(section._id)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Lesson
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setEditingSectionId(section._id);
                  setEditTitle(section.title);
                  setEditOrder(section.order);
                }}
                className="text-foreground hover:hero-gradient hover:text-primary-foreground"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteSection(section._id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
