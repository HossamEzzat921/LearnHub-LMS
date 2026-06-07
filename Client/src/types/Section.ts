import type { Lesson } from "./Lesson";

export type Section = {
  _id: string;
  title: string;
  order: number;
  course:string;
  lessons: Lesson[]; // Nesting the lessons here
};