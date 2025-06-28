import { BadRequestException, ValidationPipe } from "@nestjs/common";

export const validationPipe = new ValidationPipe({
  exceptionFactory: (errors) => {
    const formattedErrors = {};
    errors.forEach((error) => {
      formattedErrors[error.property] = {
        value: error.value || null,
        message: Object.values(error.constraints), // Collect validation messages
      };
    });
    return new BadRequestException(formattedErrors);
  },
});
