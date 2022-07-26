import { sendEmail } from "./../utils/sendEmail";
import { TokenModel } from "./../models/Token";
import argon2 from "argon2";
import { Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";
import { UserAuthPayload } from "src/types/UserPayloadAuth";
import { InputUpdateUser, LoginInput, RegisterInput } from "../types/AuthType";
import { createToken } from "../utils/auth";
import cloudinaryImageUploadMethod from "../utils/cloudinary";
import { User } from "./../entities/User";
import {
  validateLoginInput,
  validateRegisterInput,
} from "./../utils/validateInputUser";
import { v4 as uuidv4 } from "uuid";
export class UserController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = <RegisterInput>req.body;

      const validate = validateRegisterInput({ username, email, password });

      if (validate !== null)
        return res.status(401).json({
          code: 401,
          success: false,
          ...validate,
        });
      const existingUser = await User.findOne({
        where: [{ username }, { email }],
      });
      if (existingUser)
        return res.status(401).json({
          code: 401,
          success: false,
          message: "Duplicated username or email ",
          error: [
            {
              field: existingUser.username === username ? "username" : "email",
              message: `${
                existingUser.username === username ? "username" : "email"
              } already exists`,
            },
          ],
        });
      const hashPassword = await argon2.hash(password);
      const newUser = User.create({
        username,
        password: hashPassword,
        email,
      });
      await User.save(newUser);
      newUser.password = "Password is hidden";
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Create User Successfully",
        user: newUser,
        accessToken: createToken("accessToken", newUser),
        refreshToken: createToken("refreshToken", newUser),
      });
    } catch (error) {
      return res.status(501).json({
        code: 501,
        success: false,
        message: `Error Server ${error.message} `,
      });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { usernameOrEmail, password } = <LoginInput>req.body;
      console.log("req.body", req.body);
      const validate = validateLoginInput({ usernameOrEmail, password });

      if (validate !== null)
        return res.status(401).json({
          code: 401,
          success: false,
          ...validate,
        });

      const existingUser = await User.findOne({
        where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });
      if (!existingUser)
        return res.status(401).json({
          code: 401,
          success: false,
          message: "Incorrect username or email ",
          error: [
            {
              field: "usernameOrEmail",
              message: `Username or email is wrong`,
            },
          ],
        });
      const isPasswordValid = await argon2.verify(
        existingUser.password,
        password
      );
      if (!isPasswordValid)
        return res.status(401).json({
          code: 401,
          success: false,
          message: "Incorrect Password ",
          error: [
            {
              field: "password",
              message: `Password is wrong`,
            },
          ],
        });
      existingUser.password = "Password is hidden";
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Login successfully",
        user: existingUser,
        accessToken: createToken("accessToken", existingUser),
        refreshToken: createToken("refreshToken", existingUser),
      });
    } catch (error) {
      return res.status(501).json({
        code: 501,
        success: false,
        message: `Error Server ${error.message} `,
      });
    }
  }
  async refreshToken(req: Request, res: Response) {
    try {
      const authHeader = req.header("RefreshToken");
      const refreshToken = authHeader?.split(" ")[1];
      if (!refreshToken)
        return res.status(401).json({
          code: 401,
          success: false,
          message: "Do not have refresh token in cookie",
        });
      const decodedUser = verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as Secret
      ) as UserAuthPayload;

      const existingUser = await User.findOne({
        where: { id: decodedUser.userId },
      });
      if (
        !existingUser ||
        existingUser.tokenVersion !== decodedUser.tokenVersion
      )
        return res.status(401).json({
          code: 401,
          success: false,
          message: "Refresh Token incorrect",
        });
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Refresh Token Successfully",
        accessToken: createToken("accessToken", existingUser),
        refreshToken: createToken("refreshToken", existingUser),
      });
    } catch (error) {
      return res.status(501).json({
        code: 501,
        success: false,
        message: `Error Internal Server ${error.message}`,
      });
    }
  }
  async me(_req: Request, res: Response) {
    try {
      const { userId } = res.locals;
      if (userId) {
        const existingUser = await User.findOne({ where: { id: userId } });
        if (!existingUser)
          return res.status(401).json({
            code: 401,
            success: false,
            message: "User do not existing",
            error: [
              {
                field: "user",
                message: `Do not find user`,
              },
            ],
          });
        existingUser.password = "Password is hidden";
        return res.status(200).json({
          code: 200,
          success: true,
          message: "Query me successfully",
          user: existingUser,
          accessToken: createToken("accessToken", existingUser),
          refreshToken: createToken("refreshToken", existingUser),
        });
      }
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Do not find user",
      });
    } catch (error) {
      return res.status(501).json({
        code: 501,
        success: false,
        message: `Error Internal Server ${error.message}`,
      });
    }
  }
  async logout(_req: Request, res: Response) {
    try {
      const { userId } = res.locals;
      if (userId) {
        const existingUser = await User.findOne({ where: { id: userId } });
        if (!existingUser)
          return res.status(401).json({
            code: 401,
            success: false,
            message: "User do not existing",
            error: [
              {
                field: "user",
                message: `Do not find user`,
              },
            ],
          });
        existingUser.tokenVersion += 1;
        await existingUser.save();
        return res.status(200).json({
          code: 200,
          success: true,
          message: "Logout successfully",
        });
      }
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Do not find user",
      });
    } catch (error) {
      return res.status(501).json({
        code: 501,
        success: false,
        message: `Error Internal Server ${error.message}`,
      });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { userId } = res.locals;
      const { name, address, email, phone } = <InputUpdateUser>req.body;
      const existingUser = await User.findOne({ where: { id: userId } });
      if (!existingUser)
        return res.status(401).json({
          code: 401,
          success: false,
          message: "User do not existing",
          error: [
            {
              field: "user",
              message: `Do not find user`,
            },
          ],
        });
      if (req.file) {
        const newPath: any = await cloudinaryImageUploadMethod(req.file.path);
        existingUser.avatar = newPath.res as string;
      }
      existingUser.fullName = name;
      existingUser.address = address;
      existingUser.phone = phone;
      existingUser.email = email;
      await existingUser.save();
      existingUser.password = "Password is hidden";
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Update User Successfully",
        user: existingUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(501).json({
        code: 501,
        success: false,
        message: `Error Internal Server ${error.message}`,
      });
    }
  }
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser)
        return res.status(401).json({
          code: 401,
          success: false,
          message: "User do not existing",
          error: [
            {
              field: "email",
              message: `Do not find user`,
            },
          ],
        });
      await TokenModel.findOneAndDelete({ userId: `${existingUser.id}` });

      const resetToken = uuidv4();
      const hashResetToken = await argon2.hash(resetToken);

      await new TokenModel({
        userId: `${existingUser.id}`,
        token: hashResetToken,
      }).save();
      await sendEmail(
        email,
        `<a href='http://localhost:3000/auth/change-password?token=${resetToken}&userId=${existingUser.id}'>Click Here 👻</a>`
      );
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Send Password Successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(501).json({
        code: 501,
        success: false,
        message: `Error Internal Server ${error.message}`,
      });
    }
  }
  async changePassword(req: Request, res: Response) {
    try {
      const { password, token, userId } = req.body;
      if (password.length < 3)
        return res.status(401).json({
          code: 400,
          success: false,
          message: "Invalid password",
          error: [
            {
              filed: "newPassword",
              message: "Length must be greater than two",
            },
          ],
        });
      const restPasswordToken = await TokenModel.findOne({ userId });
      if (!restPasswordToken)
        return res.status(401).json({
          code: 400,
          success: false,
          message: "Invalid or expired password rest token",
          error: [
            {
              filed: "token",
              message: "Invalid or expired password rest token",
            },
          ],
        });
      const restPasswordTokenValid = argon2.verify(
        restPasswordToken.token,
        token
      );
      if (!restPasswordTokenValid)
        return res.status(401).json({
          code: 400,
          success: false,
          message: "Invalid or expired password rest token",
          error: [
            {
              filed: "token",
              message: "Invalid or expired password rest token",
            },
          ],
        });
      const existingUser = await User.findOne({
        where: { id: userId },
      });
      if (!existingUser)
        return res.status(401).json({
          code: 400,
          success: false,
          message: "User no longer exists",
          error: [
            {
              filed: "token",
              message: "User no longer exists",
            },
          ],
        });
      const updatedPassword = await argon2.hash(password);
      await User.update({ id: userId }, { password: updatedPassword });
      await restPasswordToken.deleteOne();
      existingUser.password = "Password is hidden";
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Change password successfully",
        user: existingUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(501).json({
        code: 501,
        success: false,
        message: `Error Internal Server ${error.message}`,
      });
    }
  }
}
