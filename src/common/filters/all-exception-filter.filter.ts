import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { responseFormatter } from "src/common/utils/respose-formatter";
import { log } from "../utils/log";
import { ENVIRONMENT } from "../config";
@Catch() // This will catch all exceptions
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500; // Default to 500 for unhandled exceptions

    if (status === 404) {
      return responseFormatter(
        response,
        status,
        "fail",
        "requested resource not exist",
      );
    }

    if (status === 400) {
      return responseFormatter(
        response,
        status,
        "fail",
        "bad request",
        null,
        exception.response,
      );
    }

    if (status === 401) {
      return responseFormatter(response, status, "fail", "unauthorized");
    }

    log("exception", "error", "============== exception ============");
    console.log(exception);
    log("exception", "error", "=====================================");
    return responseFormatter(
      response,
      status,
      "error",
      "Internal server error",
      null,
      {
        ...(ENVIRONMENT === "development" && {
          stack: exception.stack ? exception.stack.replace(/\n/g, "") : "",
        }),
        message: exception.message,
      },
    );
  }
}
