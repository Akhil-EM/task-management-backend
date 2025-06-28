import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  SetMetadata,
} from "@nestjs/common";
import { verifyJwtToken } from "../utils/jwt-helper";
import { jwtTokens } from "../config";
import { TokenModel } from "src/database/models/token.model";
import { Reflector } from "@nestjs/core";

export const TokenType = (data: "access" | "refresh") => {
  return SetMetadata("tokenType", data);
};
@Injectable()
export class TokenCheckGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    const tokenType =
      this.reflector.get<string>("tokenType", context.getHandler()) ||
      this.reflector.get<string>("tokenType", context.getClass());

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new UnauthorizedException("unauthorized");
    }

    const token = authHeader.split(" ")[1];
    const verificationResult = verifyJwtToken(jwtTokens[tokenType], token);
    if (tokenType === "access") {
      if (!verificationResult.validToken) {
        throw new UnauthorizedException("Invalid or expired token");
      }
    } else {
      const tokenResult = await TokenModel.findOne({
        token,
        active: true,
        type: "REFRESH",
      });
      if (!verificationResult.validToken || !tokenResult) {
        throw new UnauthorizedException("Invalid or expired token");
      }
    }

    //add user id to request
    request.user = verificationResult.data;
    request.token = token;
    // await TokenModel.findOneAndUpdate({ token }, { active: false });
    return true;
  }
}
