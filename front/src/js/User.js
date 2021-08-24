import { Validation } from "./Validation.js";

export class User extends Validation {
    constructor(data) {
        super();
        this.firstName = (data && data.firstName) ? data.firstName: null;
        this.lastName = (data && data.lastName)? data.lastName : null;
        this.email = (data && data.email)? data.email : null;
    }
    static validateGetData() {
        let data = localStorage.getItem("user");
        data = JSON.parse(data);
        let user = new User(data);
        if(user.validatedFields()) {
            return {
                FirstName: user.firstName,
                LastName: user.lastName,
                Email: user.email
            }
        }else {
            console.dir("Validation failed");
            return false;
        }
    }

    validatedFields() {
        let validated = true;
        let fields = ["firstName", "lastName", "email"];
        for(let i=0; i<fields.length; i++) {
            let field = fields[i];
            if(!this.validated(field))
                validated = false;
                break;
        }
        return validated;
    }   
}