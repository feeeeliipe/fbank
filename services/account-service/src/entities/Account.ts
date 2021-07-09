export class Account {

    private _id: string;
    private _customerName: string;
    private _customerWage: number;
    private _password: string;

    constructor(id: string, customerName: string, customerWage: number, password: string) {
        this._id = id;
        this._customerName = customerName;
        this._customerWage = customerWage;
        this._password = password;
    }

    get id(): string {
        return this._id;
    }

    get customerName(): string {
        return this._customerName;
    }

    get customerWage(): number {
        return this._customerWage
    }

    get password(): string {
        return this._password;
    }

}