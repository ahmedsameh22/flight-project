const router = require("express").Router();
const auth = require("../app/middleware/auth");
const authAdmin = require("../app/middleware/admin.auth");
const userController = require("../app/controller/user.controller");
const upload = require("../app/middleware/upload-img");
router.post("/register", userController.addUser);
router.get("/alluser", authAdmin, userController.allUser);
router.get("/delete/:id", authAdmin, userController.delteUser);
router.get("/single/:id", authAdmin, userController.singleUser);
router.get("/me", auth, userController.userMe);
router.post("/login", userController.login);
router.get("/logout", auth, userController.logOut);
router.post("/reqflight", auth, userController.reqFlight);
router.post(
  "/uploadimg",
  auth,
  upload.single("profileImg"),
  userController.uploadImg
);

module.exports = router;
