import { Router } from "express";
import {
    createRoom,
    getRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
    assignRoomToUser,
    freeRoom
} from "./rooms.controller.js";

import { validateJWT } from "../middlewares/validate-jwt.js";
import { validateHotel } from "../middlewares/validate-hotel.js";

const router = Router();

router.post("/addRoom", validateJWT, validateHotel, createRoom);

router.get("/", validateJWT, getRooms);

router.get("/:rid", validateJWT, getRoomById);

router.put("/:rid", validateJWT, updateRoom);

router.delete("/:rid", validateJWT, deleteRoom);

router.put("/assign/:rid/:uid", validateJWT, validateHotel, assignRoomToUser);

router.put("/free/:rid", validateJWT, freeRoom);

export default router;
