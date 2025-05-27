import { Router } from "express";
import { createReservation, findReservationById, generatePDFById, cancelReservation, getListReservationsRoomByUser } from "./reservationRoom.controller.js";
import { createReservationValidate, findReservationByIdValidate, generatePDFByIdValidate, cancelReservationValidate, getListReservationsEventByUserValidate } from "../middlewares/validate-reservationRoom.js";

const router = Router();

router.post("/createReservationRoom/:rid", createReservationValidate, createReservation);

router.get("/findReservationRoom/:_id", findReservationByIdValidate, findReservationById);

router.get("/generatePDFRoom/:_id", generatePDFByIdValidate, generatePDFById);

router.delete("/cancelReservationRoom/:_id", cancelReservationValidate, cancelReservation )

router.get("/getListReservationsRoomByUser", getListReservationsEventByUserValidate, getListReservationsRoomByUser);

export default router;