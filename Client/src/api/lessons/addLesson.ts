export const addLesson = async (sectionId: string) => {
    try {
      const res = await fetch(`http://localhost:3500/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: sectionId }), // Your backend handles title/order defaults
      });

      if (!res.ok) throw new Error("Failed to add lesson");
      const newLesson = await res.json();

   return newLesson
     
    } catch (err) {
      console.error(err);
    }
  };