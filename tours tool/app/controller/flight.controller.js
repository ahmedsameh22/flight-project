const flightModel = require("../database/model/flight.model");
const userModel = require("../database/model/user.model");

class flight {
  static allFlight = async (req, res) => {
    try {
      const flights = await flightModel.find();
      res.status(200).send({
        AppReq: true,
        data: flights,
      });
    } catch (e) {
      res.status(500).send({
        AppReq: false,
        Error: e,
        message: "error in get data",
      });
    }
  };
  static bookTikcet = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.user._id });
      if (user.flightId == req.params.ticketID)
        throw new Error("this user have this ticket");
      const oLdFlight = await flightModel.findOne({ _id: user.flightId });
      if (oLdFlight) {
        oLdFlight.sets = ++oLdFlight.sets;
        await oLdFlight.save();
      }
      user.flightId = req.params.ticketID;
      await user.save();
      const flight = await flightModel.findOne({ _id: req.params.ticketID });
      flight.sets = --flight.sets;
      await flight.save();
      const flights = await flightModel.find();

      res.status(200).send({
        ApiReq: true,
        ticketID: req.params.ticketID,
        flight: flights,
        message: "you are booking your ticket ",
      });
    } catch (e) {
      res.status(200).send({
        ApiReq: false,
        Error: "error in bookink ticket",
        message: e.message,
      });
    }
  };
  static editTikcet = async (req, res) => {
    try {
      const flight = await flightModel.findOne({ _id: req.params.ticketID });
      const notEdit = ["fightNum", "from", "__v"];
      for (const props in req.body) {
        if (!notEdit.includes(props)) flight[props] = req.body[props];
      }

      await flight.save();
      res.status(200).send({
        AppReq: true,
        ticket: flight,
        message: "you are edit  ticket ",
      });
    } catch (e) {
      res.status(500).send({
        AppReq: false,
        Error: e.message,
        message: "error in Edit ticket",
      });
    }
  };
  static deleteTikcet = async (req, res) => {
    try {
      const flight = await flightModel.findByIdAndDelete(req.params.ticketID);
      if (!flight) throw new Error("no tikcet have this id ");
      res.status(200).send({
        AppReq: true,
        ticket: [],
        message: "you are delete  ticket ",
      });
    } catch (e) {
      res.status(500).send({
        AppReq: false,
        Error: e.message,
        message: "error in delete ticket",
      });
    }
  };
  static showticket = async (req, res) => {
    try {
      const flight = await flightModel.findById(req.params.ticketID);
      if (!flight) throw new Error("no tikcet have this id ");
      res.status(200).send({
        AppReq: true,
        ticket: flight,
        message: "you are show your  ticket ",
      });
    } catch (e) {
      res.status(500).send({
        AppReq: false,
        Error: e.message,
        message: "error in delete ticket",
      });
    }
  };
}
module.exports = flight;
