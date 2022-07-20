import { createToken } from '../utils/auth';
import { validateLoginInput, validateRegisterInput } from './../utils/validateInputUser';
import { User } from './../entities/User';
import { InputUpdateUser, RegisterInput, ResponseAuth, ResponseRefreshToken } from '../types/AuthType';
import { Request, Response } from "express"
import argon2 from 'argon2'
import { LoginInput } from '../types/AuthType';
import { Secret, verify } from 'jsonwebtoken';
import { UserAuthPayload } from 'src/types/UserPayloadAuth';
export class UserController {
    async register(req: Request, res: Response): Promise<Response<ResponseAuth>> {
        try {
            const { username, email, password } = <RegisterInput>req.body;

            const validate = validateRegisterInput({ username, email, password })

            if (validate !== null) return res.status(401).json({
                code: 401,
                success: false,
                ...validate
            })
            const existingUser = await User.findOne({
                where: [
                    { username },
                    { email }
                ]
            });
            if (existingUser) return res.status(401).json({
                code: 401,
                success: false,
                message: 'Duplicated username or email ',
                error: [
                    {
                        field: existingUser.username === username ? 'username' : 'email',
                        message: `${existingUser.username === username ? 'username' : 'email'} already exists`
                    }
                ]
            })
            const hashPassword = await argon2.hash(password);
            const newUser = User.create({
                username,
                password: hashPassword,
                email,
            })
            await User.save(newUser);

            return res.status(200).json({
                code: 200,
                success: true,
                message: 'Create User Successfully',
                user: { ...newUser, password: '' },
                accessToken: createToken('accessToken', newUser),
                refreshToken: createToken('refreshToken', newUser)
            })
        } catch (error) {
            return res.status(501).json({
                code: 501,
                success: false,
                message: `Error Server ${error.message} `,
            })
        }

    }
    async login(req: Request, res: Response): Promise<Response<ResponseAuth>> {
        try {

            const { usernameOrEmail, password } = <LoginInput>req.body;

            const validate = validateLoginInput({ usernameOrEmail, password });

            if (validate !== null) return res.status(401).json({
                code: 401,
                success: false,
                ...validate
            });

            const existingUser = await User.findOne({
                where: [
                    { username: usernameOrEmail },
                    { email: usernameOrEmail }
                ]
            });
            if (!existingUser) return res.status(401).json({
                code: 401,
                success: false,
                message: 'Incorrect username or email ',
                error: [
                    {
                        field: 'usernameOrEmail',
                        message: `Username or email is wrong`
                    }
                ]
            })
            const isPasswordValid = await argon2.verify(existingUser.password, password);
            if (!isPasswordValid) return res.status(401).json({
                code: 401,
                success: false,
                message: 'Incorrect Password ',
                error: [
                    {
                        field: 'password',
                        message: `Password is wrong`
                    }
                ]
            })
            return res.status(200).json({
                code: 200,
                success: true,
                message: 'Login successfully',
                user: { ...existingUser, password: '' },
                accessToken: createToken('accessToken', existingUser),
                refreshToken: createToken('refreshToken', existingUser)
            })

        } catch (error) {
            return res.status(501).json({
                code: 501,
                success: false,
                message: `Error Server ${error.message} `,
            })
        }
    }
    async refreshToken(req: Request, res: Response): Promise<Response<ResponseRefreshToken>> {
        try {
            const authHeader = req.header('RefreshToken');
            const refreshToken = authHeader?.split(' ')[1];
            if (!refreshToken) return res.status(401).json({
                code: 401,
                success: false,
                message: 'Do not have refresh token in cookie'
            });
            const decodedUser = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret) as UserAuthPayload;

            const existingUser = await User.findOne({ where: { id: decodedUser.userId } });
            if (!existingUser || existingUser.tokenVersion !== decodedUser.tokenVersion) return res.status(401).json({
                code: 401,
                success: false,
                message: 'Refresh Token incorrect'
            });
            return res.status(200).json({
                code: 200,
                success: true,
                message: 'Refresh Token Successfully',
                accessToken: createToken('accessToken', existingUser),
                refreshToken: createToken('refreshToken', existingUser),
            })

        } catch (error) {
            return res.status(501).json({
                code: 501,
                success: false,
                message: `Error Internal Server ${error.message}`,
            })
        }
    }
    async me(_req: Request, res: Response): Promise<Response<ResponseAuth>> {
        try {
            const { userId } = res.locals;
            if (userId) {
                const existingUser = await User.findOne({ where: { id: userId } });
                if (!existingUser) return res.status(401).json({
                    code: 401,
                    success: false,
                    message: 'User do not existing',
                    error: [
                        {
                            field: 'user',
                            message: `Do not find user`
                        }
                    ]
                })
                return res.status(200).json({
                    code: 200,
                    success: true,
                    message: 'Query me successfully',
                    user: { ...existingUser, password: '' },
                    accessToken: createToken('accessToken', existingUser),
                    refreshToken: createToken('refreshToken', existingUser),
                })
            }
            return res.status(401).json({
                code: 401,
                success: false,
                message: 'Do not find user',
            })

        } catch (error) {
            return res.status(501).json({
                code: 501,
                success: false,
                message: `Error Internal Server ${error.message}`,
            })
        }
    }
    async logout(_req: Request, res: Response): Promise<Response<ResponseAuth>> {
        try {
            const { userId } = res.locals;
            if (userId) {
                const existingUser = await User.findOne({ where: { id: userId } });
                if (!existingUser) return res.status(401).json({
                    code: 401,
                    success: false,
                    message: 'User do not existing',
                    error: [
                        {
                            field: 'user',
                            message: `Do not find user`
                        }
                    ]
                })
                existingUser.tokenVersion += 1;
                await existingUser.save()
                return res.status(200).json({
                    code: 200,
                    success: true,
                    message: 'Logout successfully',
                })
            }
            return res.status(401).json({
                code: 401,
                success: false,
                message: 'Do not find user',
            })

        } catch (error) {
            return res.status(501).json({
                code: 501,
                success: false,
                message: `Error Internal Server ${error.message}`,
            })
        }
    }
    async update(req: Request, res: Response): Promise<Response<ResponseAuth>> {
        try {
            const { userId } = res.locals;
            const { name, address, email, phone } = <InputUpdateUser>req.body;
            const existingUser = await User.findOne({ where: { id: userId } })
            if (!existingUser) return res.status(401).json({
                code: 401,
                success: false,
                message: 'User do not existing',
                error: [
                    {
                        field: 'user',
                        message: `Do not find user`
                    }
                ]
            })

            existingUser.username = name;
            existingUser.address = address;
            existingUser.phone = phone;
            existingUser.email = email;
            await existingUser.save()

            return res.status(200).json({
                code: 200,
                success: true,
                message: 'Update User Successfully',
                user: existingUser
            })

        } catch (error) {
            console.error(error);
            return res.status(501).json({
                code: 501,
                success: false,
                message: `Error Internal Server ${error.message}`,
            })
        }
    }
}

