import express from "express";
import EjsLayouts from "express-ejs-layouts";
import path from "path";
import JobsController from "./src/controller/jobs.controller.js";
import { uploadFile } from "./src/middleware/resume-upload.middleware.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import UserController from "./src/controller/user.controller.js";
import auth from "./src/middleware/authorization.middleware.js";
import SendEmailEasily from "./src/middleware/send-mail.middleware.js";
import { setLastVisit } from "./src/middleware/lastVisit.middleware.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(EjsLayouts);

//* we use static function for the folders that we want to be easily accesible from the user's browser.
app.use(express.static("public"));
app.use(express.static(path.join(path.resolve(), "public", "resumes")));
app.use(express.static(path.join(path.resolve(), "src", "views")));
app.use(express.static(path.join(path.resolve(), "src", "styles")));
app.use(cookieParser());
app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
//? this line here is important to basically access the date sent on submitting the form.
app.use(express.urlencoded({ extended: true }));
app.use(setLastVisit);

//?creating the instances;
const jobsController = new JobsController();
const userController = new UserController();

//^ Auth Routes;
//! all okay here
app.get("/", jobsController.getLanding);
app.get("/login", jobsController.getLogin);
app.post("/login", userController.login);
app.post("/register", SendEmailEasily, userController.registerUser);
app.post("/logout", userController.logout);

//^ jobs routes
app.get("/jobs", jobsController.getJobs);
app.get("/postJob", auth, jobsController.getNewJob);
app.post("/jobs", auth, jobsController.createJobs);
app.get("/jobs/:id/", jobsController.getSpecificJob);
app.put("/jobs/:id", auth, jobsController.updateJobs);
app.delete("/jobs/:id", auth, jobsController.deleteJobs);

//^ applying to a specific job listing.
app.post(
  "/apply/:id",
  uploadFile.single("resume"),
  jobsController.postApplicant
);

//^ routes for updating the job listing:
app.get("/jobs/:id/update", auth, jobsController.getUpdateForm);
app.post("/jobs/:id/update", auth, jobsController.updateJobs);

//^ routes for deleting a specific job by id.
app.get("/jobs/:id/delete", auth, jobsController.deleteJobs);

//^ routes for managing the applicants for a job.
app.get("/jobs/:id/applicants", auth, jobsController.getJobApplicants);
app.post("/jobs/:id/applicants", auth, jobsController.postApplicant);
//todo these three routes.

//! haven't applied the correct route plus i don't know how to make a put or delete request right now.
app.get("/jobs/:id/applicants/:appId", auth, jobsController.getApplicant);
app.put("/jobs/:id/applicants/:appId", auth, jobsController.getApplicant);
app.delete("/jobs/:id/applicants/:appId", auth, jobsController.getApplicant);

//^ routes to render the error page.
app.get("/404", jobsController.getErrorPage);

//^ started listening the server.
app.listen(3200, () => {
  console.log("server is listening at port 3200!");
});
