import { v4 as uuidv4 } from "uuid";

export default class ApplicantModel {
  constructor(_name, _email, _contact, _resumepath, _id = false) {
    this.applicantId = _id ? _id : uuidv4();
    this.name = _name;
    this.email = _email;
    this.contact = _contact;
    this.resumePath = _resumepath;
  }
}
