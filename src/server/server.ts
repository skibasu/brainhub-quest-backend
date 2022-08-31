import express, { Express } from "express"
import config from "config"
import Logger from "../utils/logger"
import routes from "../routes/routes"
import mongoose from "mongoose"

export default class Server {
    private port: number
    private host: string
    private app: Express
    private dbUri: string

    constructor() {
        this.port = config.get<number>("port")
        this.host = config.get<string>("host")
        this.dbUri = config.get<string>("dbUri")
        this.app = express()
        this.init()
    }
    private initServer() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.listen(this.port, () => {
            Logger.info(`App is runnig on ${this.host} port ${this.port}`)
            routes(this.app)
        })
    }
    private async init() {
        try {
            await mongoose.connect(this.dbUri)
            Logger.info("Database Connected")
            return this.initServer()
        } catch (error) {
            Logger.error(`Database Error : ${error}`)
            process.exit(1)
        }
    }
    public async getApp() {
        return this.app
    }
}
