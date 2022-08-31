import { Response, Request, NextFunction } from "express"
import { AnyZodObject } from "zod"

export const validateResource =
    (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            })
            return next()
        } catch (e: any) {
            return res.status(400).send(e.errors)
        }
    }
