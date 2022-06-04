const userModel = require("../database/model/user.model");
const path = require("path");
const fs = require("fs");
class User {
  static addUser = async (req, res) => {
    try {
      const user = new userModel(req.body);
      await user.save();
      res.status(200).send({
        AppReq: true,
        data: user,
        message: "you sign successful",
      });
    } catch (e) {
      res.status(500).send({
        AppReq: false,
        error: e.message,
        message: "add user problem",
      });
    }
  };
  static allUser = async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).send({
        AppReq: true,
        data: users,
      });
    } catch (e) {
      res.status(500).send({
        AppReq: false,
        Error: e,
        message: "error in get data",
      });
    }
  };
  static delteUser = async (req, res) => {
    try {
      console.log(req.params.id);
      const user = await userModel.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send({
          AppReq: false,
          data: {},
          message: "user not found ",
        });
      }
      res.status(200).send({
        AppReq: true,
        data: user,
        message: "user Data deleted ",
      });
    } catch (e) {
      res.status(500).send({
        AppReq: false,
        Error: e,
        message: "error delte data",
      });
    }
  };
  static singleUser = async (req, res) => {
    try {
      console.log(req.params.id);
      const user = await userModel.findById(req.params.id);
      if (!user) {
        return res.status(404).send({
          AppReq: false,
          data: {},
          message: "user not found ",
        });
      }
      res.status(200).send({
        AppReq: true,
        data: user,
        message: "user Data deleted ",
      });
    } catch (e) {
      res.status(500).send({
        AppReq: false,
        Error: e,
        message: "error delte data",
      });
    }
  };
  static userMe = async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (!user) {
        return res.status(404).send({
          AppReq: false,
          data: {},
          message: "user not found ",
        });
      }
      res.status(200).send({
        AppReq: true,
        data: user,
        message: "user Data  ",
      });
    } catch (e) {
      res.status(500).send({
        AppReq: false,
        Error: e,
        message: "user dont have data",
      });
    }
  };
  static login = async (req, res) => {
    try {
      const user = await userModel.login(req.body.email, req.body.password);
      if (!user) throw new Error("Erorr in login");
      const token = await user.gToken();
      res.status(200).send({
        apiReq: true,
        data: { user, token },
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
  static logOut = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((singleToken) => {
        return singleToken.token != req.token;
      });
      await req.user.save();
      res.status(200).send({
        apiStatus: true,
        message: "logged out",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e.message,
        message: "error on logout",
      });
    }
  };
  static reqFlight = async (req, res) => {
    try {
      const user = req.user;
      res.status(200).send({
        AppReq: true,
        data: user,
        message: "user Data deleted ",
      });
    } catch (e) {
      res.status(500).send({
        AppReq: false,
        Error: e,
        message: "error delte data",
      });
    }
  };
  static uploadImg = async (req, res) => {
    try {
      const ext = path.extname(req.file.originalname).toLocaleLowerCase();
      fs.rename(req.file.path, req.file.path + ext, () => {});
      req.user.image = req.file.path + ext;
      await req.user.save();
      res.send({
        AppReq: true,
        data: req.user,
        message: "user Upload IMG ",
      });
    } catch (e) {
      res.status(200).send({
        AppReq: false,
        Error: e,
        message: "error in UPLOAD",
      });
    }
  };
  uploadImg;
}
module.exports = User;
