import { z } from "zod";

const userSchema = z.object({
  role: z.string().optional(),
  username: z.string().min(4, "Title must be at least 4 characters"),
//  email:z.string().min(1,"Email Is Required"),
 password:z.string().min(6,"password at least 8 char")
 
});
type userType = z.infer<typeof userSchema>;

export { userSchema, type userType };
