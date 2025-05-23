import { Router } from "express";
import { createReservationEvent, findReservationEventById, generatePDFEventById, cancelReservationEvent } from "./reservationEvent.controller.js";
import { createReservationEventValidate, findByIdReservationEventValidate, generatePDFReservationEventValidate, cancelReservationEventValidate } from "../middlewares/validate-reservationEvent.js";

const router = Router();

router.post("/createReservation/:eid", createReservationEventValidate, createReservationEvent);

router.get("/findReservation/:_id", findByIdReservationEventValidate, findReservationEventById);

router.get("/generatePDF/:_id", generatePDFReservationEventValidate, generatePDFEventById);

router.delete("/cancelReservation/:_id", cancelReservationEventValidate, cancelReservationEvent);

export default router;