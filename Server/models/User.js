const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String ,unique: true},
    password: { type: String, required: true },
   
    active: { type: Boolean , default:true },
    role: {
        type: String,
        enum: ["Student", "Teacher", "Parent", "Admin"],
        default: "student",
        required: true
    },

//  phone: { type: String },
    // parentphone: { type: String },

    // parent: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },

    // children: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }]

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)