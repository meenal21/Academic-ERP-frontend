// making a model student to share the same datastructure

// we used _rollNumber because we want backing field, and getter/ setter does not go into the infinite loop
export default class Student{
    constructor(data) {
        this._rollNumber = data.rollNumber,
        this._firstName = data.firstName,
        this._lastName = data.lastName,
        this._email = data.email,
        this._photographPath = data.photographPath,
        this._cgpa = data.cgpa,
        this._domain = data.domain,
        this._totalCredits = data.totalCredits,
        this._graduationYear = data.graduationYear,
        this._specialisation = data.specialisation;
        this._placement_id = data.placement_id;
        this._educationList = data.educationList;
    }
    // when you refer - this.fullname - you essentially call get fullName() 
    get fullName() {
        return `${this._firstName} ${this._lastName}`;
    }

    // do I need setter - for updating the values

    toPayLoad(){
        return {
            rollNumber: this._rollNumber,
            firstName: this._firstName,
            lastName: this._lastName,
            email: this._email,
            cgpa: this._cgpa,
            totalCredits: this._totalCredits,
            photographPath: this._photographPath,
            domain: this._domain,
            graduationYear: this._graduationYear,
            specialisation :this._specialisation,
            placement_id :this._placement_id,
            educationList : this._educationList
        };
    }

}