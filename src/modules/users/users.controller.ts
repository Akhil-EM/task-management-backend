import { Controller, Post, Body, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Response } from "express";

@Controller("/api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    return this.usersService.create(createUserDto, response);
  }
}
