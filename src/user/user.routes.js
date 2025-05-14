import { Router } from "express";
import { buscarUsuarioValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/user-validator.js";
import { buscarUsuario, deleteUser, getUsers, updatePassword, updateUser } from "./user.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { hasRoles } from "../middlewares/validate-roles.js";

const router = Router()

router.get("/getUsers", validateJWT, hasRoles("ADMIN_ROLE"), getUsers)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

router.put("/updateUser/:id", validateJWT, updateUserValidator, updateUser)

router.patch("/updatePassword/:uid", validateJWT, updatePasswordValidator, updatePassword)

router.get("/buscarUser/:id", validateJWT, hasRoles("ADMIN_ROLE"), buscarUsuarioValidator, buscarUsuario)

export default router