export type Lesson = {
  _id: string;
  title: string;
  videoUrl?: string; // Optional depending on content type
  content?: string;  // For text-based lessons
  duration: number;  // In seconds or minutes
  order: number;
}