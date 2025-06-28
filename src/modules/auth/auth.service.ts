import { HttpStatus, Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { responseFormatter } from "src/common/utils/respose-formatter";
import { Response } from "express";
import { models } from "src/database";
import { comparePassword } from "src/common/utils/encryption-helper";
import { generateJwtToken } from "src/common/utils/jwt-helper";
import { jwtTokens } from "src/common/config";

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto, res: Response) {
    const user = await models.UserModel.findOne({
      email: loginDto.email,
    });

    if (!user) {
      return responseFormatter(
        res,
        HttpStatus.NOT_FOUND,
        "error",
        "invalid credentials",
        null,
      );
    }
    const passwordResult = await comparePassword(
      loginDto.password,
      user.password,
    );
    if (!passwordResult) {
      return responseFormatter(
        res,
        HttpStatus.NOT_ACCEPTABLE,
        "error",
        "invalid credentials",
        null,
      );
    }
    const accessToken = generateJwtToken(
      jwtTokens.access,
      { userId: user._id },
      "1m",
    );
    const refreshToken = generateJwtToken(
      jwtTokens.refresh,
      { userId: user._id },
      "30d",
    );
    await models.TokenModel.create({
      token: refreshToken,
      active: true,
      type: "REFRESH",
      userId: user._id,
    });
    return responseFormatter(
      res,
      HttpStatus.OK,
      "success",
      "login successfully completed",
      {
        accessToken,
        refreshToken,
        name: user.name,
      },
    );
  }

  async generateAccessToken(res: Response, userId: string) {
    const accessToken = generateJwtToken(jwtTokens.access, { userId }, "10m");

    return responseFormatter(
      res,
      HttpStatus.OK,
      "success",
      "access token generated successfully",
      {
        accessToken,
      },
    );
  }

  async logout(token: string, userId: string, res: Response) {
    await models.TokenModel.updateOne(
      {
        token,
        type: "REFRESH",
        userId,
      },
      {
        active: false,
      },
    );

    return responseFormatter(
      res,
      HttpStatus.OK,
      "success",
      "user logged out successfully",
    );
  }
}
