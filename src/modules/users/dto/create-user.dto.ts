import { IsNotEmpty, Length, Validate } from "class-validator";
import { CustomIsEmail } from "src/common/validator";
export class CreateUserDto {
  @IsNotEmpty({ message: "email is required." })
  @Validate(CustomIsEmail)
  email: string;

  @IsNotEmpty({ message: "name is required." })
  name: string;

  @IsNotEmpty({ message: "password is required." })
  @Length(5, 15, { message: "password must be between 5 and 15 characters." })
  password: string;
}
