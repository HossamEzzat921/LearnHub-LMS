import { z } from "zod";

const courseSchema = z.object({
  teacher: z.string(),
  title: z.string().min(4, "Title must be at least 4 characters"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  level: z.string().min(1, "Level is required"),
  price: z.number().min(1, "Price is required"),
  thumbnail: z
    .any()
    .refine((val) => {
      // If it's a string (from DB), it's valid
      if (typeof val === "string") return true;
      // If it's a FileList (from input), check the type
      if (val instanceof FileList && val.length > 0) {
        return val[0].type.startsWith("image/");
      }
      return true; // Optional or no file selected
    }, "Only image files are allowed")
    .optional(),
});
type courseType = z.infer<typeof courseSchema>;

export { courseSchema, type courseType };
