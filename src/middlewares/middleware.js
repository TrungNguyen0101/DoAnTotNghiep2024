const jwt = require("jsonwebtoken");
const { errorCode } = require("../responses/response");

/**
 * Hàm xử lý exception toàn hệ thống
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleExceptionMiddleware(req, res, next) {
  try{
    next()
  }
  catch(err){
    return errorCode(res, err)
  }
}

function authMiddleware(req, res, next) {
  var token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["Authorization"];

  // decode token
  if (!token) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }

  // verifies secret
  jwt.verify(token, "doangiasu", function (err, decoded) {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // if everything is good, save to request for use in other routes
    req.decoded = decoded;
    req.currentUser = decoded;
    next();
  });
}

module.exports = { handleExceptionMiddleware, authMiddleware };
