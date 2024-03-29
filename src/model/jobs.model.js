import ApplicantModel from "./applicant.model.js";
import { v4 as uuidv4 } from "uuid";

//todo during the first rendering both the jobs element are rendered almost instantly so they get the same id which prevents the second element display page to not load properly.

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
    this.id = _id ? _id : uuidv4();
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
  static addJob(
    jobCategory,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    applyBy,
    skillsRequired,
    openings,
    jobPosted,
    applicants = []
  ) {
    const newJob = new JobsModel(
      false,
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      applyBy,
      skillsRequired,
      openings,
      jobPosted,
      applicants
    );
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
    const job = JobsModel.findJob(id);
    JobsModel.deleteJob(id);
    jobs.push(
      new JobsModel(
        id,
        newData.jobCategory,
        newData.jobDesignation,
        newData.jobLocation,
        newData.companyName,
        newData.salary,
        newData.applyBy,
        newData.skillsRequired,
        newData.openings,
        job.jobPosted,
        job.applicants
      )
    );
  }

  //?adding a new applicant to the job;
  static addApplicant(jobId, name, email, contact, resumePath) {
    //?i will find the specific job and the id for the last applicant.
    jobs.map((job, ind) => {
      if (job.id == jobId) {
        job.applicants.push(
          new ApplicantModel(name, email, contact, resumePath)
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
    1,
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
    2,
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
