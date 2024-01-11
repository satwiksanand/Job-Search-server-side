import JobsModel from "../model/jobs.model.js";

export default class JobsController {
  postApplicant(req, res) {
    const { name, email, contact } = req.body;
    const resumePath = "resume/" + req.file.filename;
    const id = req.params.id;
    JobsModel.addApplicant(id, { name, email, contact, resumePath });
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

  manageJobs(req, res) {}
}
