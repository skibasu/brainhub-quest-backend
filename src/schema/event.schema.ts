import { object, string, date, InferType, setLocale } from "yup"
import parse from "date-fns/parse"

const tommarow = new Date()
tommarow.setDate(tommarow.getDate() + 1)

setLocale({
    mixed: {
        default: { message: "Field invalid." },
        required: ({ path }) => ({
            message: `${path[0].toUpperCase()}${path.slice(1)} is required.`,
            error: true,
        }),
    },
})
export const createEventSchema = object({
    email: string()
        .required()
        .email(({ path }) => ({
            message: `${path[0].toUpperCase()}${path.slice(1)} is invalid.`,
            error: true,
        })),
    name: string()
        .required()
        .min(3, ({ min, path }) => ({
            message: `${path[0].toUpperCase()}${path.slice(
                1
            )} is to short : min ${min} characters.`,
            error: true,
        })),
    date: date()
        .transform(function (value, originalValue) {
            if (this.isType(value)) {
                return value
            }
            const result = parse(originalValue, "dd.MM.yyyy", new Date())
            return result
        })
        .typeError({ message: "Date type is invalid.", error: true })
        .required()
        .min(tommarow, { message: "Date is too early.", error: true }),
})

export type CreateEventInput = InferType<typeof createEventSchema>
