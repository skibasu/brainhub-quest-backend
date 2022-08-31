import mongoose from "mongoose"
import supertest from "supertest"
import Server from "../app"
import MongoMemoryServer from "mongodb-memory-server"

export const eventPayload = {
    email: "test@test.com",
    name: "Test",
    date: "1999-09-11T22:00:00.000Z",
}
describe("event", () => {
    describe("get events route", () => {
        describe("given : products array is empty ", () => {
            it("should return a 404 error", async () => {
                const app = Server.getApp()
                const body = await supertest(app).get("/api/events")
                expect(body).toEqual([])
            })
        })

        describe("given : products array includes at least one event", () => {
            it("should return a 200", async () => {
                const app = Server.getApp()
                await supertest(app).get("/api/events").expect(200)
            })

            it("should return an array with at least one event", async () => {
                const app = Server.getApp()
                const {
                    body: { events },
                } = await supertest(app).get("/api/events")
                expect(events.length).toBeGreaterThanOrEqual(1)
            })
        })
    })
    describe("post porduct route", () => {
        describe("given : ")
    })
})
