const User = require("../models/user.model");

exports.getSignup = (req, res, next) => {
  res.render("customer/auth/signup");
};

exports.postSignup = async (req, res, next) => {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  await user.signup()

  res.redirect("/login")
};

exports.getLogin = (req, res, next) => {
    res.render("customer/auth/login")
};
