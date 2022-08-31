import { DocumentDefinition } from "mongoose"
import EventModel, { EventDocument } from "../models/event.model"
import { databaseResponseTimeHistogram } from "../utils/metrics"

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
    const metricsLabels = {
        operation: "getEvents",
    }
    const timer = databaseResponseTimeHistogram.startTimer()
    try {
        const events = await EventModel.find()
        timer({ ...metricsLabels, success: "true" })
        return events
    } catch (e: any) {
        timer({ ...metricsLabels, success: "false" })
        throw new Error(e)
    }
}
