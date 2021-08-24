export class Validation {
    validated(prop) {
        return prop && prop!='' && typeof(prop) != undefined;
    }
}