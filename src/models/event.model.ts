import mongoose from "mongoose"

export interface EventDocument extends mongoose.Document {
    email: string
    name: string
    date: Date
    createdAt: Date
    updatedAt: Date
}

const eventSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const EventModel = mongoose.model("Event", eventSchema)

export default EventModel
