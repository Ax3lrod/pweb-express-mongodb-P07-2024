import { Request, Response } from "express";
import { ApiResponse } from "../types/responseTypes";

export const healthCheck = (_: Request, res: Response) => {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const response: ApiResponse = {
    status: "success",
    message: "Hello World!",
    date: formattedDate,
  };
  
  res.status(200).json(response);
};
