import { blue, yellow, red } from "colorette"

export default class Logger {
    public static log = (args: any) => this.info(args)
    public static info = (args: any) =>
        console.log(blue(`[${new Date().toLocaleString()}][INFO] :::: ${args}`))
    public static warn = (args: any) =>
        console.log(
            yellow(`[${new Date().toLocaleString()}][INFO] :::: ${args}`)
        )
    public static error = (args: any) =>
        console.log(red(`[${new Date().toLocaleString()}][INFO] :::: ${args}`))
}
