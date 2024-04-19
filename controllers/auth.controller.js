const User = require("../models/user.model");
const authUtil = require("../util/authentication");

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

  try {
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
};

exports.getLogin = (req, res, next) => {
  res.render("customer/auth/login");
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let existingUser;
  try {
    existingUser = await User.getUserWithSameEmail(email);
  } catch (error) {
    next(error)
    next
  }

  if (!existingUser) {
    res.redirect("/login");
    return;
  }
  let passwordMatched

  try {
    passwordMatched = await User.hasMatchedPassword(password,
      existingUser.password
    )
  } catch (error) {
    next(error)
    return
  }
    ;

  if (!passwordMatched) {
    res.redirect("/login");
    return;
  }

  authUtil.createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
};

exports.postLogout = (req, res, next) => {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
};
