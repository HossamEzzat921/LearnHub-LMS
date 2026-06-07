export const deleteCourse = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await fetch(`http://localhost:3500/courses/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      
    } catch (err) {
      console.error(err);
    }
  };