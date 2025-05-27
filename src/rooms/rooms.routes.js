import { Router } from "express";
import {
    createRoom,
    getRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
} from "./rooms.controller.js";

import { createRoomValidator, 
        findyByRoomValidator, 
        updateRoomValidator, 
        deleteRoomValidator } from "../middlewares/validate-room.js";

import { validateHotel } from "../middlewares/validate-hotel.js";

const router = Router();

router.post("/addRoom", validateHotel, createRoomValidator, createRoom);

router.get("/listRooms", getRooms);

router.get("/findByRoom/:rid", findyByRoomValidator, getRoomById);

router.put("/updateRoom/:rid", updateRoomValidator, updateRoom);

router.delete("/deleteRoom/:rid", deleteRoomValidator, deleteRoom);

export default router;
