import { Request, Response } from "express"
import { CreateEventInput } from "../schema/event.schema"
import { createEvent, getEvents } from "../service/event.service"
import Logger from "../utils/logger"

export const createEventHandler = async (
    req: Request<{}, {}, CreateEventInput>,
    res: Response
) => {
    try {
        const event = await createEvent(req.body)
        return res.send({ message: "Event created" })
    } catch (e: any) {
        Logger.error(e.message)
        return res.status(400).send(e.message)
    }
}

export const getEventHandler = async (req: Request, res: Response) => {
    const events = await getEvents()
    if (events.length === 0) {
        return res.send({ message: "Nothing found.", events })
    }
    return res.send({ events })
}
