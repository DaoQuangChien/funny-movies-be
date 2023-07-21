const db = require("../models");
const User = db.user;

const checkDuplicateEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const checkEmptyFields = (req, res, next) => {
  let errMesseages = [];
  const isEmailEmpty = !req.body.email || !req.body.email.length;
  const isPasswordEmpty = !req.body.password || !req.body.password.length;

  if (isEmailEmpty) {
    errMesseages = [...errMesseages, "Failed! Email is required!"];
  }
  if (isPasswordEmpty) {
    errMesseages = [...errMesseages, "Failed! Password is required!"];
  }
  if (errMesseages.length) {
    res.status(400).send({ message: errMesseages.join("\n") });
    return;
  }
  next();
};

module.exports = {
  checkDuplicateEmail,
  checkEmptyFields,
};
