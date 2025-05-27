import { Router } from "express";
import { createHotel, getHotels, getHotelById, updateHotel, deleteHotel, getReservations} from "./hotel.controller.js";
import { createHotelValidator, getHotelsValidator, getHotelByIdValidator, updateHotelValidator, deleteHotelValidator, getReservationsValidate } from "../middlewares/hotel-validators.js";
import { uploadProfilePicture } from "../../configs/multer.js";

const router = Router();

router.post("/createHotel",uploadProfilePicture.single('image'), createHotelValidator, createHotel);

router.get("/getHotels", getHotelsValidator, getHotels);

router.get("/getHotelById/:hid", getHotelByIdValidator, getHotelById);

router.put("/updateHotel/:hid", uploadProfilePicture.single('image'), updateHotelValidator, updateHotel);

router.delete("/deleteHotel/:hid", deleteHotelValidator, deleteHotel);

router.get("/getReservations", getReservationsValidate, getReservations);

export default router