const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchame = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required to register "],
      minLength: [10, " Length is less then 10"],
      maxLength: [60, " Length is more then 60"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "email is required to register "],
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("invaild email");
      },
    },
    gender: {
      type: String,
      trim: true,
      tolowercase: true,
      required: [true, "name is required to register "],
      enum: { values: ["male", "female"], message: "{VALUE} is not supported" },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "required password"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "phone is required to register "],
      validate(value) {
        if (!validator.isMobilePhone(value, "ar-EG"))
          throw new Error("invaild phone number");
      },
    },
    tokens: [
      {
        token: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
    requested: {
      days: {
        type: Number,
        required: true,
      },
      to: {
        type: String,
        trim: true,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
    },

    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
    },
  },
  {
    timstemps: true,
  }
);
userSchame.pre("save", async function () {
  const userData = this;
  if (userData.isModified("password")) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
});
userSchame.methods.toJSON = function () {
  const userData = this.toObject();
  delete userData.password;
  delete userData.__v;
  return userData;
};
userSchame.statics.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Error in login");
  const isvalid = await bcrypt.compare(password, user.password);
  if (!isvalid) throw new Error("Error in login");
  return user;
};
userSchame.methods.gToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const User = mongoose.model("User", userSchame);
module.exports = User;
