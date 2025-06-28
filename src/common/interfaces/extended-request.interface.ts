import { Request } from "express";
export interface ExtendedRequest extends Request {
  user?: any; // or replace `any` with a specific type for your user
  token: string;
}
