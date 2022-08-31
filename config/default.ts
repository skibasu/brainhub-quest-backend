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
    dbUri: "mongodb+srv://skibasu:Klementyna5@cluster0.r8wot.mongodb.net/sample?retryWrites=true&w=majority",
} as IDefaults
