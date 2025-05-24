import { Router } from "express";
import { register, login, findByEmail, updatePasswordById } from "./auth.controller.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/findByEmail", findByEmail);

router.put("/updatePasswordById/:uid", updatePasswordById);

export default router;