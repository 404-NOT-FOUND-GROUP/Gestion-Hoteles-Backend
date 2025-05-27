import { Router } from "express";
import { createReservationEvent, findReservationEventById, generatePDFEventById, cancelReservationEvent, getListReservationsEventByUser } from "./reservationEvent.controller.js";
import { createReservationEventValidate, findByIdReservationEventValidate, generatePDFReservationEventValidate, cancelReservationEventValidate, getListReservationsEventByUserValidate } from "../middlewares/validate-reservationEvent.js";

const router = Router();

router.post("/createReservationEvent/:eid", createReservationEventValidate, createReservationEvent);

router.get("/findReservationEvent/:_id", findByIdReservationEventValidate, findReservationEventById);

router.get("/generatePDFEvent/:_id", generatePDFReservationEventValidate, generatePDFEventById);

router.delete("/cancelReservationEvent/:_id", cancelReservationEventValidate, cancelReservationEvent);

router.get("/getListReservationsEventByUser", getListReservationsEventByUserValidate, getListReservationsEventByUser);

export default router;