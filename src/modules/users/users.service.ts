import { Injectable, HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserModel } from "src/database/models/user.model";
import { generatePasswordHash } from "src/common/utils/encryption-helper";
import { responseFormatter } from "src/common/utils/respose-formatter";
import { Response } from "express";
import { generateJwtToken } from "src/common/utils/jwt-helper";
import { jwtTokens } from "src/common/config";
import { TokenModel } from "src/database/models/token.model";

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto, response: Response) {
    const userCheck = await UserModel.findOne({ email: createUserDto.email });
    if (userCheck) {
      return responseFormatter(
        response,
        HttpStatus.BAD_REQUEST,
        "error",
        "email already exists",
      );
    }
    const user = await UserModel.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: await generatePasswordHash(createUserDto.password),
    });
    const accessToken = generateJwtToken(
      jwtTokens.access,
      { userId: user._id },
      "10m",
    );
    const refreshToken = generateJwtToken(
      jwtTokens.refresh,
      { userId: user._id },
      "30d",
    );
    await TokenModel.create({
      token: refreshToken,
      active: true,
      type: "REFRESH",
      userId: user._id,
    });
    return responseFormatter(
      response,
      HttpStatus.CREATED,
      "success",
      "user registered successfully",
      {
        accessToken,
        refreshToken,
        name: user.name,
      },
    );
  }
}
