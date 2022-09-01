import express, { Express } from "express"
import config from "config"
import Logger from "../utils/logger"
import routes from "../routes/routes"
import mongoose from "mongoose"

export default class Server {
    private port: number
    private host: string
    private dbUri: string
    private server: Express | null

    constructor() {
        this.port = config.get<number>("port")
        this.host = config.get<string>("host")
        this.dbUri = config.get<string>("dbUri")
        this.server = null

        this.init()
    }

    private initServer() {
        this.server = this.getApp()
        this.server.listen(this.port, async () => {
            Logger.info(`App is runnig on ${this.host} port ${this.port}`)
            //routes(this.server as Express)
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
    public getApp(): Express {
        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: false }))
        routes(app)
        return app
    }
}
