import { Response } from "express";
export function responseFormatter(
  res: Response,
  statusCode: number,
  status: "success" | "fail" | "error",
  message: string,
  data: object | null = null,
  error: object | null = null,
) {
  return res.status(statusCode).json({
    path: res.req.url,
    timeStamp: new Date(),
    status,
    message,
    data,
    error,
  });
}
