import { Router } from "express";
import { createHotel, getHotels, getHotelById, updateHotel, deleteHotel} from "./hotel.controller.js";
import { createHotelValidator, getHotelsValidator, getHotelByIdValidator, updateHotelValidator, deleteHotelValidator } from "../middlewares/hotel-validators.js";
import { uploadProfilePicture } from "../../configs/multer.js";

const router = Router();

router.post("/createHotel",uploadProfilePicture.single('image'), createHotelValidator, createHotel);

router.get("/getHotels", getHotelsValidator, getHotels);

router.get("/getHotelById/:hid", getHotelByIdValidator, getHotelById);

router.put("/updateHotel/:hid", updateHotelValidator, updateHotel);

router.delete("/deleteHotel/:hid", deleteHotelValidator, deleteHotel);

export default router