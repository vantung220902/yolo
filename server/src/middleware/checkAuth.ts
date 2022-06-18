import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";
import { UserAuthPayload } from "src/types/UserPayloadAuth";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.header('Authorization');
        const accessToken = authHeader?.split(' ')[1];
        if (!accessToken) throw new Error('Not In Cookie Authenticated Access Token ');
        const decodedUser = verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret) as UserAuthPayload;

        res.locals.userId = decodedUser.userId;
        return next();

    } catch (error) {
        console.error(error);
        return res.status(404).json({ message: error.message });
    }
}