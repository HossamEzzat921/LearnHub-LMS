export const deleteSection = async ({ sectionId, courseId }) => {
 
  try {
    const res = await fetch(`http://localhost:3500/sections`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sectionId, courseId }),
    });
    return res;
  } catch (err) {
    console.error("Delete failed", err);
  }
};
