const router = require("express").Router();
const authUser = require("../app/middleware/auth");
const authAdmin = require("../app/middleware/admin.auth");
const flightController = require("../app/controller/flight.controller");
const auth = require("../app/middleware/auth");
router.get("/allflight", flightController.allFlight);
router.get("/book/:ticketID", authUser, flightController.bookTikcet);
router.get("/showticket/:ticketID", auth, flightController.showticket);
router.post("/edit/:ticketID", authAdmin, flightController.editTikcet);
router.get("/delete/:ticketID", authAdmin, flightController.deleteTikcet);

module.exports = router;
