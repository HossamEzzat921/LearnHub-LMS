export type User = {
    username: { type: String, required: true, unique: true },
     email?: { type: String },
    password: { type: String, required: true },
   
    active?: { type: Boolean , default:true },
    role?: {
        type: String,
        enum: ["Student", "Teacher", "Parent", "Admin"],
        default: "student",
        required: true
    }


}


