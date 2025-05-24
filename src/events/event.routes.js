import { Router } from "express";
import { createEvent, updateEvent, deleteEvent, listEvents, findEventById } from "./event.controller.js";
import { createEventValidator, updateEventValidator, deleteEventValidator, listEventsValidator, findEventByIdValidator } from "../middlewares/validate-event.js";

const router = Router();

router.post("/createEvent", createEventValidator, createEvent);
router.put("/updateEvent/:eid", updateEventValidator, updateEvent);
router.delete("/deleteEvent/:eid", deleteEventValidator, deleteEvent);
router.get("/listEvents", listEventsValidator, listEvents);
router.get("/findEventById/:eid", findEventByIdValidator, findEventById);

export default router;