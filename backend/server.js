require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieparser = require("cookie-parser")
const cloudinary = require("cloudinary").v2
const tourRoutes = require("./routes/tourRoutes")
const userRoutes = require("./routes/userRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const bodyParser = require('body-parser');
const path = require("path")

const app = express()

app.use(express.json())
app.use(cookieparser())

app.use(bodyParser.json());

app.use("/api/tours", tourRoutes)
app.use("/api/users", userRoutes)
app.use("/api/booking", bookingRoutes)

const PORT = process.env.PORT || 5000

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const connectDB = async (req, res) => {
    try {
        const connect = await mongoose.connect("mongodb+srv://jobir:jobir@cluster0.jtfl7ia.mongodb.net/", {})
        console.log(`MongoDB is connected: ${connect.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

connectDB()

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`)
})