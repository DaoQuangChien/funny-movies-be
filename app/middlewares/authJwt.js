const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const verifyToken = (req, res, next) => {
  const token = req.headers["access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = {
  verifyToken,
};
