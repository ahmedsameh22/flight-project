const flightModel = require("../database/model/flight.model");
const adminModel = require("../database/model/admin.model");
class admin {
  static addAdmin = async (req, res) => {
    try {
      const user = new adminModel(req.body);
      await user.save();
      res.status(200).send({
        AppReq: true,
        data: user,
        message: "you sign successful",
      });
    } catch (e) {
      res.status(500).send({
        AppReq: false,
        data: e,
        message: "add admin problem",
      });
    }
  };
  static addFlight = async (req, res) => {
    try {
      const flight = new flightModel(req.body);
      await flight.save();
      res.status(200).send({
        APIREQ: true,
        flight: flight,
      });
    } catch (e) {
      res.status(500).send({
        APIREQ: false,
        error: e.message,
      });
    }
  };
  static login = async (req, res) => {
    try {
      const admin = await adminModel.login(req.body.email, req.body.password);
      if (!admin) throw new Error("Erorr in login");
      const token = await admin.gToken();
      res.status(200).send({
        apiReq: true,
        data: { admin, token, role: "admin" },
        message: "login success",
      });
    } catch (e) {
      res.status(200).send({
        apiReq: false,
        data: {},
        message: e.message,
      });
    }
  };
}
module.exports = admin;
