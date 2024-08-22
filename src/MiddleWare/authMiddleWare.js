const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authMiddleWare = (req, res, next) => {
  const token = req.headers?.authorization?.split("Bearer ")[1];
  console.log(req.headers);

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "the authentication",
        status: err,
      });
    }
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "the authentication",
        status: "ERROR",
      });
    }
  });
};

const authUserMiddleWare = (req, res, next) => {
  //Cho user bình thường có thể xem được trang cá nhân của mình
  const token = req.headers?.authorization?.split("Bear ")[1];
  const userId = req.params.id;

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "the authentication",
        status: err,
      });
    }
    // const { payload } = user;
    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "the authentication",
        status: "ERROR",
      });
    }
  });
};
function getTokenInHeader(header) {
  return header.cookie?.split('=')[1]
}
module.exports = { authMiddleWare, authUserMiddleWare };
