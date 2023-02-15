import { CustomError } from "./custom-error";


export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super('Not auhorized')
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);

    }

    serializeErrors() {
        return [{ message : 'Not auhorized'}];
    }
}