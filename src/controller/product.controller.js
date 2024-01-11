import JobsModel from "../model/jobs.model.js";

//! this controller is being used only for the purpose of rendering the views and in order to do operations on the data the jobs controller and the user controller is used.

export default class ProductController {
  getLanding(req, res) {
    res.render("landingPage");
  }

  getUpdateForm(req, res) {
    const job = JobsModel.findJob(req.params.id);
    res.render("updateJob", { job: job });
  }

  getJobs(req, res) {
    const jobs = JobsModel.getAllJobs();
    res.render("job-listing", { jobs: jobs });
  }

  getSpecificJob(req, res) {
    const id = req.params.id;
    const job = JobsModel.findJob(id);
    res.render("job-details", {
      job: job,
      userEmail: req.session.userEmail ? req.session.userEmail : false,
    });
  }
}
