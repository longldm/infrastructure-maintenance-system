export interface IAccount {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    role: string;
}

export interface ICreateAccountPayload {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    role: string;
}

export interface ICreateAccountResponse {
    code: number;
    message: string;
    result: IAccount;
}

export interface IUpdateAccountPayload {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    role: string;
}

export interface IUpdateAccountResponse {
    code: number;
    message: string;
    result: IAccount;
}

export interface IDeleteAccountPayload {
    id: number;
}

export interface IDeleteAccountResponse {
    code: number;
    message: string;
}