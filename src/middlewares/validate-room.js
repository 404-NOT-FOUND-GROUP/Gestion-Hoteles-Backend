import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createRoomValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
];

export const getRoomsValidator = [
    validateJWT
];

export const findyByRoomValidator = [
    validateJWT
];

export const updateRoomValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
];

export const deleteRoomValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
];

export const assingValidator = [
    validateJWT
]

export const freeValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE")
];
