import JobsModel from "../model/jobs.model.js";

export default class JobsController {
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

  postApplicant(req, res) {
    const { name, email, contact } = req.body;
    const resumePath = "resumes/" + req.file.filename;
    const id = req.params.id;
    console.log(name, email, contact, resumePath, id);
    JobsModel.addApplicant(id, name, email, contact, resumePath);
    res.redirect("/jobs");
  }

  createJobs(req, res) {}

  updateJobs(req, res) {
    //?we will be receiving some of the data's from the form using the method post.
    JobsModel.updateJob(req.params.id, req.body);
    res.redirect("/jobs");
  }

  deleteJobs(req, res) {
    JobsModel.deleteJob(req.params.id);
    res.redirect("/jobs");
  }

  getJobApplicants(req, res) {
    const job = JobsModel.findJob(req.params.id);
    console.log(job);
    res.render("applicant-listing", { applicants: job.applicants, id: job.id });
  }

  manageJobs(req, res) {}
}
