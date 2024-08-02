const Tour = require("../models/tourModel")
const cloudinary = require("cloudinary").v2


const tourCtrl = {
    createTour: async (req, res) => {
        try {
            const { title, details, location, price, expect } = req.body
            let { img } = req.body

            const newTour = new Tour({title, details, img, location, price, expect})

            if(img) {
                const uploadRes = await cloudinary.uploader.upload(img)
                img = uploadRes.secure_url
            }

            await newTour.save()
            return res.status(201).json(newTour)
        } catch (error) {
            res.status(500).json({ error: error.message })
            console.log("Error", error.message)
        }
    },

    getAllTour: async (req, res) => {
        try {
            const tour = await Tour.find({}).sort({ createdAt: -1 })
            
            res.status(200).json({tour})            
        } catch (error) {
            res.status(500).json({ error: error.message })
            console.log("Error", error.message)
        }
    },

    getTourById: async (req, res) => {
        try {
            const tour = await Tour.findById(req.params.id)
            if (!tour) return res.status(404).json({ error: "Tour not found" });
            res.status(200).json({ tour });
        } catch (error) {
            res.status(500).json({ error: error.message })
            console.log("Error", error.message)
        }
    },

    updateTour: async (req, res) => {
        const { title, details, location, price, expect } = req.body;
        const tour = req.tour; // req.tour is populated by the middleware
    
        try {
            // Update the tour with the new values
            tour.title = title || tour.title;
            tour.details = details || tour.details;
            tour.location = location || tour.location;
            tour.price = price || tour.price;
            tour.expect = expect || tour.expect
    
            // Save the updated tour
            const updatedTour = await tour.save();
            res.status(200).json(updatedTour);
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log("Error", error.message);
        }
    }
}

module.exports = tourCtrl