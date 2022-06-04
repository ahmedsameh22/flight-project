const jwt = require("jsonwebtoken");
const admins = require("../database/model/admin.model");
const authAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("bearer ", "");
    const idAdmin = jwt.verify(token, process.env.KEY);
    const admin = await admins.findOne({
      _id: idAdmin._id,
      "tokens.token": token,
    });

    if (!admin) throw new Error();
    req.token = token;
    next();
  } catch (e) {
    res.status(500).send({
      message: " admin Not Authration",
    });
  }
};
module.exports = authAdmin;
