interface IDefaults {
    port: number
    host: string
    dbUri: string
    //dbConfig: any
    //  saltWorkFactor: number
}

export default {
    port: 1337,
    host: "localhost",
    dbUri: process.env.MONGO_URI,
} as IDefaults
