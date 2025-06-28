import { All, Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { Response } from "express";
import { responseFormatter } from "./common/utils/respose-formatter";

@Controller()
export class AppController {
  @All()
  serverRunningStatus(@Res() res: Response) {
    return responseFormatter(
      res,
      HttpStatus.OK,
      "success",
      "server running successfully",
    );
  }
}
