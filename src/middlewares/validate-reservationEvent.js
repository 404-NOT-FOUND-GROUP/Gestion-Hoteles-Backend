import { validateJWT } from "./validate-jwt.js";
import { validateReservationEventOwner } from "./validate-token-reservation.js";

export const createReservationEventValidate = [
    validateJWT
];

export const findByIdReservationEventValidate = [
    validateJWT,
    validateReservationEventOwner
];

export const generatePDFReservationEventValidate = [
    validateJWT,
    validateReservationEventOwner
];

export const cancelReservationEventValidate = [
    validateJWT,
    validateReservationEventOwner
];