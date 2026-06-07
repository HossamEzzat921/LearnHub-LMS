require("dotenv").config()
const express = require("express")

const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const {logEvents , logger } = require('./middleware/logger')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')
const sectionRoutes = require('./routes/sectionRoutes')
const lessonRoutes = require("./routes/lessonRoutes")
const authRoutes = require("./routes/authRoutes")
const enrollmentRoutes = require('./routes/enrollmentRoutes')
const assignmentRoutes = require('./routes/assignmentRoutes')


const PORT = process.env.PORT || 3500

connectDB()
app.use(logger)

app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))



// ROUTES
app.use('/auth' , authRoutes)
app.use('/users', userRoutes)
app.use('/courses', courseRoutes)
app.use('/sections', sectionRoutes)
app.use('/lessons', lessonRoutes)
app.use('/enrollments', enrollmentRoutes)
app.use('./assignments' , assignmentRoutes)


app.use(errorHandler)


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
