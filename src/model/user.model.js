//!this is model and not a middleware so the function inside the class will not have request and the response object.

export default class UserModel {
  constructor(_name, _email, _password) {
    this.id = Date.now();
    this.name = _name;
    this.email = _email;
    this.password = _password;
  }

  //*function to get all the user.
  static getUsers() {
    return users;
  }

  //*function to add a new user.
  static addUser({ name, email, password }) {
    const newUser = new UserModel(name, email, password);
    users.push(newUser);
  }

  //*function ot confirm login, basically will check if the user exist in the users array.
  static isValidUser({ email, password }) {
    return users.find(
      (user) => user.email == email && user.password == password
    );
  }
}

const users = [new UserModel("test", "test@gmail.com", "test")];
