import { LoginInput, RegisterInput } from '../types/AuthType';
export const validateRegisterInput = (registerInput: RegisterInput) => {
    if (registerInput.username.length < 3)
        return {
            message: 'Invalid username',
            error: [
                { field: 'username', message: 'Length must greater than 2 characters' }
            ]
        }
    if (!registerInput.email.includes('@'))
        return {
            message: 'Invalid email',
            error: [
                { field: 'email', message: 'Email must include @ symbol' }
            ]
        }
    if (registerInput.username.includes('@'))
        return {
            message: 'Invalid username',
            error: [
                { field: 'username', message: 'Username cannot includes @' }
            ]
        }
    if (registerInput.password.length < 3)
        return {
            message: 'Invalid password',
            error: [
                { field: 'password', message: 'Length must greater than 2 characters' }
            ]
        }
    return null;
}
export const validateLoginInput = (loginInput: LoginInput) => {
    if (loginInput.usernameOrEmail.length < 3)
        return {
            message: 'Invalid username',
            error: [
                { field: 'usernameOrEmail', message: 'Length must greater than 2 characters' }
            ]
        }
    if (loginInput.password.length < 3)
        return {
            message: 'Invalid password',
            error: [
                { field: 'password', message: 'Length must greater than 2 characters' }
            ]
        }
    return null;
}