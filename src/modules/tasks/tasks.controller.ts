import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
  Put,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import {
  TokenCheckGuard,
  TokenType,
} from "src/common/guards/token-check.guard";
import { Response } from "express";
import { ExtendedRequest } from "src/common/interfaces/extended-request.interface";

@Controller("/api/tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @TokenType("access")
  @UseGuards(TokenCheckGuard)
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() request: ExtendedRequest,
    @Res() response: Response,
  ) {
    return this.tasksService.create(
      createTaskDto,
      request?.user?.userId,
      response,
    );
  }

  @TokenType("access")
  @UseGuards(TokenCheckGuard)
  @Get()
  findAll(
    @Res() response: Response,
    @Req() request: ExtendedRequest,
    @Query() query: any,
  ) {
    const userId = request?.user?.userId;
    const status = query.status;
    return this.tasksService.findAll(response, userId, status);
  }

  @TokenType("access")
  @UseGuards(TokenCheckGuard)
  @Get(":id")
  findOne(
    @Param("id") id: string,
    @Res() response: Response,
    @Req() request: ExtendedRequest,
  ) {
    const userId = request?.user?.userId;
    return this.tasksService.findOne(response, userId, id);
  }

  @TokenType("access")
  @UseGuards(TokenCheckGuard)
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() response: Response,
  ) {
    return this.tasksService.update(response, id, updateTaskDto);
  }

  @TokenType("access")
  @UseGuards(TokenCheckGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Res() response: Response) {
    return this.tasksService.remove(response, id);
  }
}
