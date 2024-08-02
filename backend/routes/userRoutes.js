const userCtrl = require("../controllers/userCtrl")

const router = require("express").Router()

router.post("/signup", userCtrl.createUser)
router.post("/login", userCtrl.loginUser)

module.exports = router