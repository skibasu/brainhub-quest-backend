import { Express, Request, Response } from "express"
import {
    createEventHandler,
    getEventHandler,
} from "../controller/event.controller"
import { validateResource } from "../middleware/validateResource"
import { createEventSchema } from "../schema/event.schema"

export default function routes(app: Express) {
    app.get("/ping", (req: Request, res: Response) =>
        res.status(200).json({ message: "PONG" })
    )

    app.post(
        "/api/event",
        validateResource(createEventSchema),
        createEventHandler
    )
    app.get("/api/events", getEventHandler)
}
