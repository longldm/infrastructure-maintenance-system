export interface IGetUserInfoResponse {
    code: number;
    result: {
        id: string,
        username: string,
        firstName: string,
        lastName: string,
        dob: string,
        roles: [{
            name: string,
            description: string
            permissions: string[]
        }]
    }
}

export interface IUser {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    dob: string,
    role: {
        id: number, // 0 - reporter | 1 - manager | 2 - supervisor | 3 - admin
        name: string,
        description: string
        permissions: string[]
    }
}