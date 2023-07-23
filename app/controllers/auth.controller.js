const secretKey = process.env.SECRET_KEY;
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signJwt = (id) =>
  jwt.sign({ id }, secretKey, {
    expiresIn: 86400, // 24 hours
  });
const signup = async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  try {
    await user.save();
    const token = signJwt(user.id);

    res.status(200).send({
      id: user._id,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    const token = signJwt(user.id);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    res.status(200).send({
      id: user._id,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

module.exports = {
  signup,
  signin,
};
