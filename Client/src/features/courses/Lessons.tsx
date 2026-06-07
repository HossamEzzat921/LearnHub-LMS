import type { Lesson } from "../../types/Lesson";
import LessonItem from "./LessonItem";
type LessonsProps = {
  lessons: Lesson[] | [];
  sectionId: string;
};
const Lessons = ({ lessons, sectionId }: LessonsProps) => {
  const hasLessons = lessons?.length > 0;
  return (
    <div>
      {hasLessons ? (
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <LessonItem
              key={lesson._id}
              lesson={lesson}
              sectionId={sectionId}
            />
          ))}
        </div>
      ) : (
        <p className="text-center p-4">No Lessons Added Yet !</p>
      )}
    </div>
  );
};

export default Lessons;
