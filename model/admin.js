const admindata = [];

module.exports = class admin {
  constructor(name, email, password, role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  save() {
    admindata.push(this);
  }

  static
};
