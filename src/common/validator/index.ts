import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "CustomIsEmail", async: false })
export class CustomIsEmail implements ValidatorConstraintInterface {
  validate(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  defaultMessage() {
    return "email is invalid.";
  }
}
