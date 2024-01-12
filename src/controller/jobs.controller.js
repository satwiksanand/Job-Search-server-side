import JobsModel from "../model/jobs.model.js";

export default class JobsController {
  getLanding(req, res) {
    res.render("landingPage", {
      userEmail: req.session.userEmail ? req.session.userEmail : false,
    });
  }

  getUpdateForm(req, res) {
    const job = JobsModel.findJob(req.params.id);
    res.render("updateJob", {
      job: job,
      userEmail: req.session.userEmail ? req.session.userEmail : false,
    });
  }

  getJobs(req, res) {
    const jobs = JobsModel.getAllJobs();
    res.render("job-listing", {
      jobs: jobs,
      userEmail: req.session.userEmail ? req.session.userEmail : false,
    });
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
    JobsModel.addApplicant(id, name, email, contact, resumePath);
    res.redirect("/jobs");
  }

  createJobs(req, res) {
    const {
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      applyBy,
      skillsRequired,
      openings,
    } = req.body;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const jobPosted = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    let skillsArray;

    if (!Array.isArray(skillsRequired)) {
      skillsArray = [skillsRequired];
    }

    JobsModel.addJob(
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      applyBy,
      skillsArray,
      openings,
      jobPosted
    );
    res.redirect("/jobs");
  }

  updateJobs(req, res) {
    //?we will be receiving some of the data's from the form using the method post.
    JobsModel.updateJob(req.params.id, req.body);
    res.redirect(`/jobs/${req.params.id}`);
  }

  deleteJobs(req, res) {
    JobsModel.deleteJob(req.params.id);
    res.redirect("/jobs");
  }

  getJobApplicants(req, res) {
    const job = JobsModel.findJob(req.params.id);
    res.render("applicant-listing", {
      applicants: job.applicants,
      id: job.id,
      userEmail: req.session.userEmail ? req.session.userEmail : false,
    });
  }

  getLogin(req, res) {
    res.render("login", { userEmail: null });
  }

  getNewJob(req, res) {
    res.render("newJob", {
      userEmail: req.session.userEmail ? req.session.userEmail : null,
    });
  }

  getApplicant(req, res) {
    const jobId = req.params.id;
    const appId = req.params.appId;
    const job = JobsModel.findJob(jobId);
    const applicant = job.applicants.find((val) => val.id == appId);
    if (applicant) {
      res.render("applicant-details", {
        userEmail: req.session.userEmail ? req.session.userEmail : null,
        applicant: applicant,
      });
    } else {
      res.redirect("/404");
    }
  }

  getErrorPage(req, res) {
    res.render("404Page", {
      userEmail: req.session.userEmail ? req.session.userEmail : null,
    });
  }
}
