const bookingCtrl = require("../controllers/bookingCtrl");
const router = require("express").Router();

router.post("/createBooking", bookingCtrl.createBooking);
router.get("/booking/:id", bookingCtrl.getBookingById);
router.put("/updateBooking/:id", bookingCtrl.updateBooking);
router.post('/create-checkout-session', bookingCtrl.getCheckoutSession);
router.put('/updateBooking/:id', bookingCtrl.updateBookingStatus);

module.exports = router;
