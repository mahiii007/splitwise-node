// ... existing code ...
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { CustomRequest } from "../types/express";

type RequestSource = "body" | "query" | "params" | "headers";
type ZodSchemaMap = Partial<Record<RequestSource, ZodSchema>>;

export const validateRequest =
  (schemas: ZodSchemaMap) =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      req.validated = {};
      for (const source of Object.keys(schemas) as RequestSource[]) {
        const schema = schemas[source];
        if (schema) {
          const result = schema.safeParse(req[source]);
          if (!result.success) {
            return next({
              statusCode: 401,
              message: "Validation failed",
              stack: result.error.errors.map((e) => ({
                path: e.path.join("."),
                message: e.message,
              })),
            });
          }
          req.validated[source] = result.data;
        }
      }
      next();
    } catch (err) {
      next(err);
    }
  };
