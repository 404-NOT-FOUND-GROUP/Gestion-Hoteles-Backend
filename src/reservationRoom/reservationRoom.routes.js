import { Router } from "express";
import { createReservation, findReservationById, generatePDFById, cancelReservation } from "./reservationRoom.controller.js";
import { createReservationValidate, findReservationByIdValidate, generatePDFByIdValidate, cancelReservationValidate } from "../middlewares/validate-reservationRoom.js";

const router = Router();

router.post("/createReservation/:rid", createReservationValidate, createReservation);

router.get("/findReservation/:_id", findReservationByIdValidate, findReservationById);

router.get("/generatePDF/:_id", generatePDFByIdValidate, generatePDFById);

router.delete("/cancelReservation/:_id", cancelReservationValidate, cancelReservation )

export default router;