import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Response } from "express";
import { models } from "src/database";
import { responseFormatter } from "src/common/utils/respose-formatter";

@Injectable()
export class TasksService {
  async create(
    createTaskDto: CreateTaskDto,
    userId: string,
    response: Response,
  ) {
    await models.TaskModel.create({ ...createTaskDto, userId });
    return responseFormatter(
      response,
      HttpStatus.CREATED,
      "success",
      "task created successfully",
    );
  }

  async findAll(response: Response, userId: string, status: string) {
    const tasks = await models.TaskModel.find({
      userId,
      ...(status === "All"
        ? { status: { $in: ["PENDING", "COMPLETED"] } }
        : { status: status.toUpperCase() }),
    });
    return responseFormatter(
      response,
      HttpStatus.OK,
      "success",
      "tasks fetched successfully",
      tasks,
    );
  }

  async findOne(response: Response, userId: string, id: string) {
    const task = await models.TaskModel.findOne({ userId, _id: id });
    if (!task) {
      return responseFormatter(
        response,
        HttpStatus.NOT_FOUND,
        "error",
        "task not found",
      );
    }
    return responseFormatter(
      response,
      HttpStatus.OK,
      "success",
      "task fetched successfully",
      task,
    );
  }

  async update(response: Response, id: string, updateTaskDto: UpdateTaskDto) {
    const task = await models.TaskModel.findOneAndUpdate(
      { _id: id },
      updateTaskDto,
    );
    if (!task) {
      return responseFormatter(
        response,
        HttpStatus.NOT_FOUND,
        "error",
        "task not found",
      );
    }
    const updatedTask = await models.TaskModel.findOne({ _id: id });
    return responseFormatter(
      response,
      HttpStatus.OK,
      "success",
      "task updated successfully",
      { task: updatedTask },
    );
  }

  async remove(response: Response, id: string) {
    const task = await models.TaskModel.findOneAndDelete({ _id: id });
    if (!task) {
      return responseFormatter(
        response,
        HttpStatus.NOT_FOUND,
        "error",
        "task not found",
      );
    }
    return responseFormatter(
      response,
      HttpStatus.OK,
      "success",
      "task deleted successfully",
    );
  }
}
