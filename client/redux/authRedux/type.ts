
export interface LoginInput {
    usernameOrEmail: string;
    password: string;
}

export interface RegisterInput {
    username: string;
    email: string;
    password: string;
}

export interface IMe {
    id: string;
    username: string;
    email: string;
    address?: string;
    phone?: string;
    password: string;
    avatar: string;
    tokenVersion: string;
}

export class ResponseAuth implements IResponse {
    code!: number;
    success!: boolean;
    message?: string;
    user?: IMe;
    error?: FieldError[]
    accessToken?: string;
    refreshToken?: string;
}

export interface InputUpdateUser {
    name: string
    email: string
    address: string
    phone: string;
    image?: File
}
