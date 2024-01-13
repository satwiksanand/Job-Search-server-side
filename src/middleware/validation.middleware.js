import { body, validationResult } from "express-validator";

export const validateData = async (req, res, next) => {
  const rules = [
    body("jobCategory")
      .notEmpty()
      .withMessage("The job category cannot be empty"),
    body("jobLocation").notEmpty().withMessage("Job Location cannot be empty"),
    body("companyName")
      .notEmpty()
      .withMessage("The company name cannot be empty!"),
    body("salary").notEmpty().withMessage("salary cannot be empty"),
    body("applyBy")
      .notEmpty()
      .withMessage("last date to apply cannot be empty"),
    body("skillsRequired")
      .notEmpty()
      .withMessage("required skills cannot be empty"),
    body("openings")
      .notEmpty()
      .withMessage("Number of Openings should not be empty")
      .custom((value) => !isNaN(parseFloat(value)))
      .withMessage("Number of Openings should be a valid number")
      .isFloat({ gt: 0 })
      .withMessage("Number of Openings should be a positive number!"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    res.render("newJob", {
      userEmail: req.session.userEmail ? req.session.userEmail : null,
      errors: errors.array()[0].msg,
    });
  }

  next();
};
