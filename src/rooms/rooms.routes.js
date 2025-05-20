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

import { createRoomValidator, 
        getRoomsValidator, 
        findyByRoomValidator, 
        updateRoomValidator, 
        deleteRoomValidator, 
        assingValidator,
        freeValidator } from "../middlewares/validate-room.js";

import { validateHotel } from "../middlewares/validate-hotel.js";

const router = Router();

router.post("/addRoom", validateHotel, createRoomValidator, createRoom);

router.get("/listRooms", getRoomsValidator, getRooms);

router.get("/findByRoom/:rid", findyByRoomValidator, getRoomById);

router.put("/updateRoom/:rid", updateRoomValidator, updateRoom);

router.delete("/deleteRoom/:rid", deleteRoomValidator, deleteRoom);

router.put("/assign/:rid/:uid", validateHotel, assingValidator, assignRoomToUser);

router.put("/free/:rid", freeValidator, freeRoom);

export default router;
