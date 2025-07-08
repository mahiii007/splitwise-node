// ... existing code ...
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

type RequestSource = "body" | "query" | "params" | "headers";
type ZodSchemaMap = Partial<Record<RequestSource, ZodSchema>>;

export const validateRequest =
  (schemas: ZodSchemaMap) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const source of Object.keys(schemas) as RequestSource[]) {
        const schema = schemas[source];
        if (schema) {
          const result = schema.safeParse(req[source]);
          if (!result.success) {
            res.status(400).json({
              message: "Validation failed",
              errors: result.error.errors.map((e) => ({
                path: e.path.join("."),
                message: e.message,
              })),
            });
            return;
          }
          req[source] = result.data;
        }
      }
      next();
    } catch (err) {
      next(err);
    }
  };
