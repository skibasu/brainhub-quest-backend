import { Request, Response } from "express"
import { CreateEventInput } from "../schema/event.schema"
import { createEvent, getEvents } from "../service/event.service"
import Logger from "../utils/logger"

export const createEventHandler = async (
    req: Request<{}, {}, CreateEventInput["body"]>,
    res: Response
) => {
    try {
        const event = await createEvent(req.body)
        return res.send(event.toJSON())
    } catch (e: any) {
        Logger.error(e.message)
        return res.status(409).send(e.message)
    }
}

export const getEventHandler = async (
    req: Request<{}, {}, CreateEventInput["body"]>,
    res: Response
) => {
    const events = await getEvents()
    if (events.length === 0) {
        return res
            .status(404)
            .send({ message: "Nothing found.", statusCode: res.status(404) })
    }
    return res.send({ events })
}
