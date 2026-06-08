import type { Section } from "./Section";

export type Course = {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: "beginner"| "advanced"; // Using string literals for better type safety

  thumbnail: string;
  price: number;

  teacher:{
    _id:string,username:string,email:string
  }; // Usually an ID or a User object
  isPublished: boolean;
  status: "draft"| "published";
  
  // This links your Course to its Sections
  courseCurriculum: Section[]; 
};