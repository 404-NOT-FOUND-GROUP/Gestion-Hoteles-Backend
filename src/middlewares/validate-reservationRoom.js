import { validateJWT } from "./validate-jwt.js";
import { validateReservationOwner } from "./validate-token-reservation.js"; 

export const createReservationValidate = [
    validateJWT
];

export const findReservationByIdValidate = [
    validateJWT,
    validateReservationOwner
];

export const generatePDFByIdValidate = [
    validateJWT,
    validateReservationOwner
];

export const cancelReservationValidate = [
    validateJWT,
    validateReservationOwner
];
