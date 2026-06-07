export const updateLesson = async (lessonId: string, updatedData: any) => {
  try {
    const res = await fetch(`http://localhost:3500/lessons`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ lessonId, ...updatedData }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update lesson");
    }

    const updatedLesson = await res.json();

    return updatedLesson;
  } catch (err) {
    console.error("Update error:", err);
    return false;
  }
};
