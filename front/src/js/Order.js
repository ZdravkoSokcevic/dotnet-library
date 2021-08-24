import { Validation } from "./Validation.js";

export class Order extends Validation {
    constructor(data) {
        super();
        this.user = (data && data.user) ? data.user: null;
        this.book = (data && data.book)? data.book : null;
    }
    static validateGetData() {
        let data = localStorage.getItem("order");
        data = JSON.parse(data);
        let order = new Order(data);
        if(order.validatedFields()) {
            let forms = window.forms || {}
            if(forms.orderForm)
            {
                let data = {
                    UserId: forms.orderForm.userId.value,
                    BookId: forms.orderForm.bookId.value
                }
                return data;
            }else {
                return {}
            }
        }else {
            console.dir("Validation failed");
            return false;
        }
    }

    validatedFields() {
        let validated = true;
        let fields = ["user", "book"];
        for(let i=0; i<fields.length; i++) {
            let field = fields[i];
            if(!this.validated(field))
                validated = false;
                break;
        }
        return validated;
    }
}