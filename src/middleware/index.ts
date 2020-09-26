import { Request, Response, NextFunction } from "express";

export const CheckQueryParams = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.query.api) {
    request.api = request.query.api.toString();
    next();
  } else {
    response.status(400).json({
      message: "I think you are missing the api param",
      example: "http://localhost:3000/?api=api1",
    });
  }
};
