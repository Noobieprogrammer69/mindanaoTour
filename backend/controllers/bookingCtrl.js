const Booking = require("../models/bookingModel");
const Tour = require("../models/tourModel");
const stripe = require("stripe")("sk_test_51PgjUUJfUZpVZVsR0xBsKwmH3tQYd9hCG5tk1rWgbbn2X7GSegaYl3D44Rhp5abAK57C9ZRbNs9plgCET0GFHsk600SXQCt7A1");
const mongoose = require("mongoose")
const { sendBookingInformation } = require("../services/emailService")

const bookingCtrl = {
  createBooking: async (req, res) => {
  
  const { tourId, firstName, lastName, email, country, streetAddress, city, state, postalCode } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      console.error('Invalid tourId', { tourId });
      return res.status(400).json({ message: 'Invalid tourId' });
    }

    const tour = await Tour.findById(tourId);

    const newBooking = new Booking({
      tourId,
      firstName,
      lastName,
      email,
      country,
      streetAddress,
      city,
      state,
      postalCode,
    });

    await newBooking.save();

    await sendBookingInformation(email, newBooking, tour);

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  },

  getBookingById: async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) return res.status(404).json({ error: "Booking not found" });
      res.status(200).json({ booking });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("Error", error.message);
    }
  },

  updateBooking: async (req, res) => {
    try {
      const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!booking) return res.status(404).json({ error: "Booking not found" });
      res.status(200).json({ booking });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("Error", error.message);
    }
  },
  getCheckoutSession: async (req, res) => {
    try {
      const { tourId, bookingId } = req.body;
  
      const tour = await Tour.findById(tourId);
      if (!tour) {
        console.error('Tour not found for tourId:', tourId);
        return res.status(404).json({ error: "Tour not found" });
      }
  
      console.log('Tour found:', tour);
  
      const imageUrl = typeof tour.img === 'string' ? tour.img : '';
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                images: [imageUrl],
                name: tour.title,
                description: tour.details,
              },
              unit_amount: tour.price * 100,
            },
            quantity: 1,
          }
        ],
        success_url: "https://mindanaotour-7j57.onrender.com/success?bookingId=${bookingId}",
        cancel_url: "https://mindanaotour-7j57.onrender.com/cancel",
      });
  
      res.json({ id: session.id });
    } catch (e) {
      console.error('Error in getCheckoutSession:', e.message, e);
      res.status(500).json({ error: e.message });
    }
  }, 
  updateBookingStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { paymentStatus } = req.body;
  
      const booking = await Booking.findByIdAndUpdate(
        id,
        { paymentStatus },
        { new: true }
      );
  
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = bookingCtrl;
