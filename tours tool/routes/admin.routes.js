const router = require("express").Router();
const adminController = require("../app/controller/admin.controller");
const authAdmin = require("../app/middleware/admin.auth");
router.post("/register", adminController.addAdmin);
router.post("/add", authAdmin, adminController.addFlight);
router.post("/login", adminController.login);
module.exports = router;
