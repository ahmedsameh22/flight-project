const mongoose = require("mongoose");
const flightSchame = mongoose.Schema(
  {
    from: {
      type: String,
      trim: true,
      default: "Egypt",
    },
    to: {
      type: String,
      trim: true,
      required: true,
      min: ["2022-06-2", "date is not correct"],
      max: ["2026-05-23", "date is not correct"],
    },
    startDate: {
      type: Date,
      required: true,
      min: ["2022-06-2", "date is not correct"],
      max: ["2026-05-23", "date is not correct"],
    },
    endDate: {
      type: Date,
      required: true,
    },
    fightNum: {
      type: Number,
      default: Date.now(),
    },
    price: {
      type: Number,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
  },
  {
    timstemps: true,
  }
);

const Flight = mongoose.model("Flight", flightSchame);
module.exports = Flight;
