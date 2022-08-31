import dotenv from "dotenv"

interface IDefaults {
    port: number
    host: string
    dbUri: string
}
dotenv.config()
export default {
    port: process.env.APP_PORT || 1337,
    host: process.env.APP_HOST || "localhost",
    dbUri: process.env.PP_MONGODB_URI || "",
} as IDefaults
