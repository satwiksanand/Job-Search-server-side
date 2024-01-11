export default class ApplicantModel {
  constructor(_name, _email, _contact, _resumepath) {
    this.applicantId = Date.now();
    this.name = _name;
    this.email = _email;
    this.contact = _contact;
    this.resumePath = _resumepath;
  }
}
