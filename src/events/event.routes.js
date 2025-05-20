import { Router } from "express";
import { createEvent, updateEvent, deleteEvent} from "./event.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.post("/createEvent",validateJWT, createEvent);
router.put("/updateEvent/:eid", validateJWT, updateEvent);
router.delete("/deleteEvent/:eid", validateJWT, deleteEvent);

export default router;