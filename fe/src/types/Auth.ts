export interface ILogInResponse {
    code: number;
    result: {
        token: string;
        authenticated: boolean;
    }
}