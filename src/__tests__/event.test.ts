import mongoose from "mongoose"
import supertest from "supertest"
import * as EventService from "../service/event.service"
import Server from "../app"

const app = Server.getApp()

const eventId = new mongoose.Types.ObjectId().toString()

const eventPayloadMessage = { message: "Event created" }
const eventPayloadBody = [
    {
        _id: eventId,
        email: "test@test.com",
        name: "Test",
        date: "12/01/2345",
    },
]

const eventInput = {
    email: "test@test.com",
    name: "Test",
    date: "12/01/2345",
}
const notValidEventInput = {
    email: "testtest.com",
    name: "Test",
    date: "09/12/1999",
}
const noFoundEventsPayload = {
    message: "Nothing found.",
    events: [],
}

describe("event", () => {
    describe("get events route", () => {
        describe("given : products array includes at least one event", () => {
            it("should return a 200", async () => {
                const getEventServiceMock = jest
                    .spyOn(EventService, "getEvents")
                    //@ts-ignore
                    .mockReturnValueOnce(eventPayloadBody)
                const {
                    body: { events },
                } = await supertest(app).get("/api/events").expect(200)

                expect(events).toEqual(eventPayloadBody)
                expect(getEventServiceMock).toHaveBeenCalled()
            })
        })
        describe("given : products empty array", () => {
            it("should return a empty array and not found message", async () => {
                jest.spyOn(EventService, "getEvents")
                    //@ts-ignore
                    .mockReturnValueOnce(noFoundEventsPayload)
                const {
                    body: {
                        events: { events: emptyEvents, message },
                    },
                } = await supertest(app).get("/api/events").expect(200)

                expect(emptyEvents).toHaveLength(0)
                expect(message).toBeDefined()
            })
        })
    })
    describe("post porducts route", () => {
        describe("given : success messege", () => {
            it("should create event and returns a success message and status 200 when payload is valid", async () => {
                const createEventServiceMock = jest
                    .spyOn(EventService, "createEvent")
                    //@ts-ignore
                    .mockReturnValueOnce(eventPayloadMessage)

                const { body } = await supertest(app)
                    .post("/api/event")
                    .send(eventInput)
                    .expect(200)

                expect(body).toEqual(eventPayloadMessage)
                expect(createEventServiceMock).toHaveBeenCalledWith(eventInput)
            })
        })
        describe("given : no valid error message", () => {
            it("should not create event, returns status 400 and error message", async () => {
                const createEventServiceMock = jest
                    .spyOn(EventService, "createEvent")
                    //@ts-ignore
                    .mockReturnValueOnce(eventPayloadMessage)
                const { body } = await supertest(app)
                    .post("/api/event")
                    .send(notValidEventInput)
                    .expect(400)

                expect(body[0]).toHaveProperty("message")
                expect(body[0].error).toBeTruthy()
                expect(createEventServiceMock).not.toHaveBeenCalledWith(
                    eventInput
                )
            })
        })
    })
})
