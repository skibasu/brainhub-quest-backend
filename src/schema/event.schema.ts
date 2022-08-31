import { object, string, date, TypeOf, preprocess } from "zod"

export const createEventSchema = object({
    body: object({
        email: string({ required_error: "Email is required." }).email(
            "Invalid email"
        ),
        name: string({
            required_error: "Event name is required.",
        }).min(3, "Event name is to short - should be 3 chars minium."),
        date: preprocess((arg) => {
            if (typeof arg == "string" || arg instanceof Date)
                return new Date(arg)
        }, date()),
    }),
})

export type CreateEventInput = TypeOf<typeof createEventSchema>
