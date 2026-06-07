const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");


// @desc Get all users
// @route GET /users
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  
  if (!users?.length) {
    return res.status(400).json({ message: "NoUsers found !" });
  }
  res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private

const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, role ,email ,phone ,parentphone,parent,children} = req.body;
  //  || !Array.isArray(roles) || !roles.length  i remove from validation so the user not required to enter role
  if (!username || !password || !role ) {
    return res.status(400).json({ message: "All Fields are required." });
  }

  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "this user name is reserved" });
  }
  const hashedPwd = await bcrypt.hash(password, 10);
  
  

});

// @desc Update user
// @route patch /users
// @access Private
const getUser = asyncHandler(async (req, res) => {
  const { id} = req.body;
  if ( !id ) {
    return res
      .status(400)
      .json({ message: "ID is required" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
 
 
res.json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, password, role, active } = req.body;
  if (
    !username ||
    !id ||
   
    !role||
    typeof active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }
  user.username = username;
  user.active = active;
  user.role = role;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
});

// @desc Delete user
// @route delete /users
// @access Private

const deleteUser = asyncHandler(async (req, res) => {
  const {id} = req.body
  if(!id){
  return res.status(400).json({ message: 'User ID Required' })
  }
  const user = await User.findById({id}).exec()
  if(!user){
    return res.status(400).json({ message: 'User not found' })
  }


      const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
});

module.exports = {
  getAllUsers,
  deleteUser,
  updateUser,
  createNewUser,
  getUser
};