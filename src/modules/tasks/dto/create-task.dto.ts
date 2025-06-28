import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty({ message: "title is required." })
  title: string;

  description: string;
}
