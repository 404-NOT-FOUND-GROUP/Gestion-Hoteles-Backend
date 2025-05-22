import { Router } from "express";
import { createReservation, findReservationById } from "./reservationRoom.controller.js";
import { createReservationValidate } from "../middlewares/validate-reservationRoom.js";

const router = Router();

router.post("/createReservation/:rid", createReservationValidate, createReservation);

router.get("/findReservation/:_id", findReservationById);

export default router;