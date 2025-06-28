import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PORT } from "./common/config";
import { log } from "./common/utils/log";
import { createDbConnection } from "./database";
import { validationPipe } from "./common/pipes/validation.pipe";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(validationPipe);
    app.enableCors({
      origin: "*",
    });
    await app.listen(PORT);
    log("bootstrap", "log", `Application is running on: ${await app.getUrl()}`);
    await createDbConnection();
  } catch (error) {
    log(
      "bootstrap",
      "error",
      `error starting server : ${(error as Error).message}`,
    );
  }
}
bootstrap();
