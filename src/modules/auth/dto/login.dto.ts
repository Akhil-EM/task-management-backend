import { IsNotEmpty, Length, Validate } from "class-validator";
import { CustomIsEmail } from "src/common/validator";

export class LoginDto {
  @IsNotEmpty({ message: "email is required." })
  @Validate(CustomIsEmail)
  email: string;

  @IsNotEmpty({ message: "password is required." })
  @Length(5, 15, { message: "password must be between 5 and 15 characters." })
  password: string;
}
