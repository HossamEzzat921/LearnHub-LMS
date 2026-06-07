 export const updateSection = async ({sectionId,title,order}) => {
    try {
      const res = await fetch(`http://localhost:3500/sections`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionId, title, order }), 
      });
  if (!res?.ok) throw new Error("updated failed");
     return res.json()
    } catch (err) {
      console.error("Update failed", err);
    }
  };