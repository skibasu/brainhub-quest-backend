import { DocumentDefinition } from "mongoose"
import EventModel, { EventDocument } from "../models/event.model"

export const createEvent = async (
    input: DocumentDefinition<Omit<EventDocument, "createdAt" | "updatedAt">>
) => {
    try {
        return await EventModel.create(input)
    } catch (e: any) {
        throw new Error(e)
    }
}
export const getEvents = async () => {
    try {
        const events = await EventModel.find().select("-__v")
        return events
    } catch (e: any) {
        throw new Error(e)
    }
}
