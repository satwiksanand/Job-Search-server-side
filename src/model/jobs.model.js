import ApplicantModel from "./applicant.model.js";

export default class JobsModel {
  constructor(
    _id,
    _jobcategory,
    _jobdesignation,
    _joblocation,
    _companyname,
    _salary,
    _applyby,
    _skills,
    _openings,
    _jobposted,
    _applicants = []
  ) {
    this.id = _id ? _id : Date.now();
    this.jobCategory = _jobcategory;
    this.jobDesignation = _jobdesignation;
    this.jobLocation = _joblocation;
    this.companyName = _companyname;
    this.salary = _salary;
    this.applyBy = _applyby;
    this.skillsRequired = _skills;
    this.openings = _openings;
    this.jobPosted = _jobposted;
    this.applicants = _applicants;
  }

  //?function for creating a new job;
  static addJob({
    _jobcategory,
    _jobdesignation,
    _joblocation,
    _companyname,
    _salary,
    _applyby,
    _skills,
    _openings,
    _jobposted,
    _applicants = [],
  }) {
    const newJob = new JobsModel({
      _jobcategory,
      _jobdesignation,
      _joblocation,
      _companyname,
      _salary,
      _applyby,
      _skills,
      _openings,
      _jobposted,
      _applicants,
    });
    jobs.push(newJob);
  }

  //?retreiving all the jobs;
  static getAllJobs() {
    return jobs;
  }

  //?finding a job by it's id;
  static findJob(id) {
    return jobs.find((job) => job.id == id);
  }

  //?updating a job;
  //todo incomplete becuase i don't know the fields that will change when updating a particular job.
  static updateJob(id, newData) {
    //? here we will find and update the contents of the job in question.
    JobsModel.deleteJob(id);
    jobs.push(
      new JobsModel(
        newData.id,
        newData.jobCategory,
        newData.jobDesignation,
        newData.jobLocation,
        newData.companyName,
        newData.salary,
        newData.applyBy,
        newData.skillsRequired,
        newData.openings,
        newData.jobPosted,
        newData.applicants
      )
    );
  }

  //?adding a new applicant to the job;
  static addApplicant(jobId, { name, email, contact, path }) {
    //?i will find the specific job and the id for the last applicant.
    jobs.map((job, ind) => {
      if (job.id == jobId) {
        job.applicants.push(
          new ApplicantModel(
            job.applicants.length + 1,
            name,
            email,
            contact,
            path
          )
        );
      }
    });
  }

  //?retrieving all the applicants for a job;
  static getApplicants(jobId) {
    const job = jobs.filter((job) => job.id == jobId);
    return job ? job.applicants : [];
  }

  //?deleting a job with a specific id;
  static deleteJob(jobId) {
    const index = jobs.findIndex((job) => job.id == jobId);
    if (index != -1) {
      jobs.splice(index, 1);
    }
  }
}

const jobs = [
  new JobsModel(
    false,
    "Tech",
    "SDE",
    "Indore",
    "Funksuk Wangru",
    "24-36lpa",
    "12-12-12",
    ["React", "Nodejs", "MongoDB", "Express", "HTML", "Javascript"],
    21,
    0,
    []
  ),
  new JobsModel(
    false,
    "Tech",
    "FrontEnd Developer",
    "Surat",
    "Juspay",
    "12-36lpa",
    "35-12-12",
    ["React", "Nodejs", "MongoDB", "Express", "HTML"],
    21,
    0,
    []
  ),
];
