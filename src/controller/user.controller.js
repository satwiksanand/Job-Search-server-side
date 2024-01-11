//todo the user controller will handle the user's registration, login and logout.
//! controller directly interacts with the user so it needs the access the request and response object.

import UserModel from "../model/user.model.js";

export default class UserController {
  registerUser(req, res) {
    //? I am expecting the user details is checked using the middleware first.
    const { name, email, password } = req.body;
    UserModel.addUser({ name, email, password });
    //? i am not rendering anything for now.
    res.redirect("/");
  }

  login(req, res) {
    //? here basically we will check if the user exists in the user model.
    const { email, password } = req.body;
    const user = UserModel.isValidUser({ email, password });
    if (!user) {
      return res.render("404Page");
    }
    req.session.userEmail = email;
    res.redirect("/jobs");
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  }
}
