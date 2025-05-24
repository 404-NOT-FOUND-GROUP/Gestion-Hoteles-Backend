import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createEventValidator = [
    validateJWT,
];

export const updateEventValidator = [
    validateJWT,
];

export const deleteEventValidator = [
    validateJWT,
];

export const listEventsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE")
];

export const findEventByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE")
];