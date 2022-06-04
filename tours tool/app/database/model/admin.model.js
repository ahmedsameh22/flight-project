const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminSchame = mongoose.Schema(
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
    tokens: [
      {
        token: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
  },
  {
    timstemps: true,
  }
);
adminSchame.pre("save", async function () {
  const adminData = this;
  if (adminData.isModified("password")) {
    adminData.password = await bcrypt.hash(adminData.password, 10);
  }
});
adminSchame.methods.toJSON = function () {
  const adminData = this.toObject();
  delete adminData.password;
  delete adminData.__v;
  return adminData;
};
adminSchame.statics.login = async (email, password) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error("Error in login");
  const isvalid = await bcrypt.compare(password, admin.password);
  if (!isvalid) throw new Error("Error in login");
  return admin;
};
adminSchame.methods.gToken = async function () {
  const admin = this;
  const token = jwt.sign({ _id: admin._id }, process.env.KEY);
  console.log(token);
  admin.tokens = admin.tokens.concat({ token });
  await admin.save();
  return token;
};

const Admin = mongoose.model("Admin", adminSchame);
module.exports = Admin;
