type GetCourseProps = {
  courseId: string | undefined;
};
export  const createSection = async ({ courseId }:GetCourseProps) => {
   

    try {
    
      const res = await fetch(`http://localhost:3500/sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course: courseId }),
      });

      if (!res.ok) throw new Error("Failed to create section");

      const newSection = await res.json();
      return newSection
    
      
    } catch (err) {
      console.error("Error:", err);
    }
  };