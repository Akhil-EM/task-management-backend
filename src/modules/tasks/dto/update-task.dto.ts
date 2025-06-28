import { IsIn, IsNotEmpty } from "class-validator";

export class UpdateTaskDto {
  @IsNotEmpty({ message: "title is required." })
  title: string;

  description: string;

  @IsIn(["PENDING", "COMPLETED"], {
    message: "status must be PENDING or COMPLETED.",
  })
  status: string;
}
