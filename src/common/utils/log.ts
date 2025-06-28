import { Logger } from "@nestjs/common";

export function log(
  module: string,
  type: "log" | "warning" | "error",
  message: string,
) {
  const logger = new Logger(module[0].toUpperCase() + module.slice(1));

  switch (type) {
    case "log":
      return logger.log(message);
    case "warning":
      return logger.warn(message);
    case "error":
      return logger.error(message);
  }
}
