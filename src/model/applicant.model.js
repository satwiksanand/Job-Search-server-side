export default class ApplicantModel {
  constructor({ _id, _name, _email, _contact, _resumepath }) {
    this.applicantId = _id;
    this.name = _name;
    this.email = _email;
    this.contact = _contact;
    this.resumePath = _resumepath;
  }
}
