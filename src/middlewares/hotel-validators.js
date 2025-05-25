import { body, param } from "express-validator";
import { hotelExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fileds.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createHotelValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre del hotel es requerido"),
    body("address").notEmpty().withMessage("La dirección del hotel es requerida"),
    body("phone").notEmpty().withMessage("El teléfono del hotel es requerido") 
    .isLength({ min: 8, max: 15 }).withMessage("El teléfono debe tener entre 8 y 15 caracteres"),
    body("description").optional().isString().withMessage("La descripción debe ser un texto"),
    validarCampos,
    handleErrors
];

export const getHotelByIdValidator = [
    validateJWT,
    param("hid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("hid").custom(hotelExists),
    validarCampos,
    handleErrors
];

export const getHotelsValidator = [
    validarCampos,
    handleErrors
];

export const updateHotelValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("hid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("hid").custom(hotelExists),
    body("name").optional().notEmpty().withMessage("El nombre del hotel no puede estar vacío"),
    body("address").optional().notEmpty().withMessage("La dirección no puede estar vacía"),
    body("phone").optional()
    .isLength({ min: 8, max: 15 }).withMessage("El teléfono debe tener entre 8 y 15 caracteres"),
    body("description").optional().isString().withMessage("La descripción debe ser un texto"),
    validarCampos,
    handleErrors
];

export const deleteHotelValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("hid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("hid").custom(hotelExists),
    validarCampos,
    handleErrors
];

export const getReservationsValidate = [
    validateJWT,
    hasRoles("ADMIN_ROLE")
]
