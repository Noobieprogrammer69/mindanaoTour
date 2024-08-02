const tourCtrl = require("../controllers/tourCtrl")
const tourMiddleware = require("../middlewares/tourMiddleware")

const router = require("express").Router()

router.param('id', tourMiddleware)

router.post("/createTour", tourCtrl.createTour)
router.get("/getTours", tourCtrl.getAllTour)
router.get("/tour/:id", tourCtrl.getTourById)
router.put("/updateTour/:id", tourCtrl.updateTour)

module.exports = router