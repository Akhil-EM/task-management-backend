import * as dotenv from "dotenv";
dotenv.config();

export const ENVIRONMENT = process.env.ENVIRONMENT;
export const PORT = process.env.PORT ?? 3000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const jwtTokens = {
  otp: process.env.JWT_OTP_VERIFICATION_TOKEN,
  access: process.env.JWT_ACCESS_TOKEN,
  refresh: process.env.JWT_REFRESH_TOKEN,
};
export const OTP_TIMEOUT = 1000 * 60 * 2; //2 min
export const APP_NAME = process.env.APP_NAME;
export const USE_SMS_API = process.env.USE_SMS_API;
export const API_VERSION = process.env.API_VERSION;
export const OTP_AUTH_TOKEN = process.env.OTP_AUTH_TOKEN;
export const OTP_LENGTH = 6;
export const admin = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};
