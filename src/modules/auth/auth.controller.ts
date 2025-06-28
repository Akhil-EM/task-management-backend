import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Res,
  UseGuards,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { Response } from "express";
import {
  TokenCheckGuard,
  TokenType,
} from "src/common/guards/token-check.guard";
import { ExtendedRequest } from "src/common/interfaces/extended-request.interface";

@Controller("/api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() loginDto: LoginDto, @Res() response: Response) {
    return this.authService.login(loginDto, response);
  }

  @TokenType("refresh")
  @UseGuards(TokenCheckGuard)
  @Get("/access-token")
  getAccessToken(@Req() req: ExtendedRequest, @Res() res: Response) {
    return this.authService.generateAccessToken(res, req?.user?.userId);
  }

  @TokenType("refresh")
  @UseGuards(TokenCheckGuard)
  @Delete("/logout")
  logout(@Req() req: ExtendedRequest, @Res() res: Response) {
    return this.authService.logout(req.token, req.user.userId, res);
  }
}
