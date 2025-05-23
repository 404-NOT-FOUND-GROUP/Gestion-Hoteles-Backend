import ReservationRoom from '../reservationRoom/reservationRoom.model.js';
import reservationEventModel from '../reservationEvent/reservationEvent.model.js';

export const validateReservationOwner = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const user = req.usuario;

        const reservation = await ReservationRoom.findById(_id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                msg: "Reservation not found"
            });
        }

        if (reservation.user.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                msg: "No tienes permiso para acceder a esta reservación"
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error validating reservation owner",
            error: error.message
        });
    }
};

export const validateReservationEventOwner = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const user = req.usuario;

        const reservation = await reservationEventModel.findById(_id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                msg: "Reservation not found"
            });
        }

        if (reservation.user.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                msg: "No tienes permiso para acceder a esta reservación"
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error validating reservation owner",
            error: error.message
        });
    }
};