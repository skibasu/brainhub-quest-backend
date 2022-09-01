import { Response, Request, NextFunction } from "express"
import { AnyZodObject } from "zod"
import { AnySchema } from "yup"

export const validateResource =
    (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.body)
            return next()
        } catch (e: any) {
            return res.status(400).send(e.errors)
        }
    }
