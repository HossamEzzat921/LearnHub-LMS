const express = require('express')
const router = express.Router()
const {getAllUsers,deleteUser, updateUser, createNewUser, getUser} = require("../controllers/usersController")


router.route('/')
.get(getAllUsers)
.post(createNewUser)
.patch(updateUser)
.delete(deleteUser)

router.route('/:id')
.get(getUser)

module.exports = router