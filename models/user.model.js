const bcrypt = require("bcryptjs");

const db = require("../data/database");

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    return db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }

  static getUserWithSameEmail(email) {
    return db.getDb().collection("users").findOne({ email: email })
  }

  static hasMatchedPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
  }
}


module.exports = User