import { body, param } from "express-validator";
import {userExists, emailExists, roleBlock} from "../helpers/db-validator.js"
import { validarCampos } from "./validate-fileds.js";
import { handleErrors } from "./handle-errors.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("phone").notEmpty().withMessage("El telefono es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("role").optional().custom(roleBlock),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const deleteUserValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const updateUserValidator = [
    validateJWT,
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(userExists),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    body("newPassword").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const findByUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(userExists),
    validarCampos,
    handleErrors
]

export const getUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE")
]
