const User = require("../models/user.model");
const authUtil = require("../util/authentication")

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

  await user.signup();

  res.redirect("/login");
};

exports.getLogin = (req, res, next) => {
  res.render("customer/auth/login");
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const existingUser = await User.getUserWithSameEmail(email);

  if (!existingUser) {
    res.redirect("/login");
    return;
  }

  const passwordMatched = await User.hasMatchedPassword(
    password,
    existingUser.password
  );

  if (!passwordMatched) {
    res.redirect("/login");
    return;
  }

  authUtil.createUserSession(req, existingUser, () => {
    res.redirect("/")
  })
};

exports.postLogout = (req, res, next) => {
  authUtil.destroyUserAuthSession(req)
  res.redirect("/login")
}