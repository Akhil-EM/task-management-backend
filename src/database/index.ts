import { MONGODB_URI } from "src/common/config";
import mongoose from "mongoose";
import { log } from "src/common/utils/log";

import { UserModel } from "./models/user.model";
import { TokenModel } from "./models/token.model";
import { TaskModel } from "./models/task.model";

async function createDbConnection() {
  try {
    await mongoose.connect(MONGODB_URI, {});
    log("database", "log", "mongodb connection success.!!!");
  } catch {
    log("database", "error", "mongodb connection error");
  }
}
async function closeDbConnection() {
  await mongoose.connection.close();
  log("database", "log", "mongo db connection closed successfully");
}

export { createDbConnection, closeDbConnection };
export const models = {
  UserModel,
  TokenModel,
  TaskModel,
};
