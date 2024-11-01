import { Request, Response } from "express";
import { ApiResponse } from "../types/responseTypes";

export const healthCheck = (_: Request, res: Response) => {
  const response: ApiResponse = {
    status: "success",
    message: "Health check successful",
    data: { date: new Date().toISOString() },
  };
  res.status(200).json(response);
};
