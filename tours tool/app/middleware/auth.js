const jwt = require("jsonwebtoken");
const users = require("../database/model/user.model");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("bearer ", "");
    const idUser = jwt.verify(token, process.env.KEY);

    const user = await users.findOne({
      _id: idUser._id,
      "tokens.token": token,
    });
    if (!user) throw new Error();
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    console.log(e);
    res.status(200).send({
      message: "Not Authration",
    });
  }
};
module.exports = auth;
