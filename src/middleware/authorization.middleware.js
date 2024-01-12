const auth = (req, res, next) => {
  if (req.session.userEmail) {
    next();
  } else {
    return res.render("404Page", { userEmail: false });
  }
};

export default auth;
