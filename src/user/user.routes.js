import { Router } from "express";
import { findByUserValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator, getUserValidator } from "../middlewares/user-validator.js";
import { findByUser, deleteUser, getUsers, updatePassword, updateUser } from "./user.controller.js";

const router = Router()

router.get("/getUsers", getUserValidator, getUsers)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

router.put("/updateUser/:uid", updateUserValidator, updateUser)

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

router.get("/findByUser/:uid", findByUserValidator, findByUser)

export default router