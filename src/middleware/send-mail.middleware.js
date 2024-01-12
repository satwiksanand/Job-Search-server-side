import nodemailer from "nodemailer";

//? sending a email can be visualized as setting up a route from the sender's email to the receiver's email which is transporter in this case, it takes two properties service: the type of email service that we are using like gmail, and the auth: basically the authorization details like email and password.

const SendEmailEasily = async (req, res, next) => {
  const { email, name } = req.body;
  //creating a transporter.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sanandsatwik421@gmail.com",
      pass: "yylrbsycqwjzgyzp",
    },
  });

  const mailOption = {
    from: "sanandsatwik421@gmail.com",
    to: `${email}`,
    subject: "Welcome to Easily!",
    text: `Welcome ${name} to the Easily Family, apply to jobs and internship in a easy way!`,
  };

  //sending the mail
  try {
    await transporter.sendMail(mailOption);
    console.log("Mail sent successfully");
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/404");
  }
};

export default SendEmailEasily;
