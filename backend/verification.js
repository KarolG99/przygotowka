const expressjwt = require("express-jwt");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const jwtCheck = expressjwt({
      secret: "mysecretkey",
      algorithms: ["RS256"],
    });
  } catch {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
