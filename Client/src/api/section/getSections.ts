type GetCourseProps = {
  courseId: String | undefined;
};

export async function getSections({ courseId }:GetCourseProps) {
  try {
    const res = await fetch(`http://localhost:3500/sections/${courseId}`);
    if (!res.ok) throw new Error("Failed TO Get Sections");
    const result = await res.json()
    return result
  } catch (err) {
    console.error(err);
  }
}
