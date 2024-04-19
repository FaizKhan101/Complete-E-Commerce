function isEmpty(value) {
  return !value || value.trim() === "";
}

function userDetailsAreValid(email, password, name, street, postal, city) {
  return (
    email &&
    email.includes("@") &&
    password &&
    password.trim().length > 5 &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function emailIsConfirmed(email, confirmEmail) {
    return email === confirmEmail
}

module.exports = {
    userDetailsAreValid: userDetailsAreValid,
    emailIsConfirmed: emailIsConfirmed
};
