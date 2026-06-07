export const deleteLesson = async (lessonId: string, sectionId: string) => {
    if (!window.confirm("Delete this lesson?")) return;
    try {
      const res = await fetch(`http://localhost:3500/lessons`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, sectionId }),
      });

      return res.ok
    } catch (err) {
      console.error(err);
    }
  };