import ReservationRoom from './reservationRoom.model.js';
import Room from '../rooms/rooms.model.js';

export const createReservation = async (req, res) => {
    try {
        const { rid } = req.params;
        const { checkInDate, checkOutDate } = req.body;
        const user = req.usuario;

        // Validación de fechas
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        // checkInDate debe ser al menos un día después de hoy
        const minCheckIn = new Date(today);
        minCheckIn.setDate(minCheckIn.getDate() + 1);

        if (checkIn < minCheckIn) {
            return res.status(400).json({
                success: false,
                msg: "La fecha de entrada debe ser al menos un día después de hoy"
            });
        }

        // checkOutDate debe ser al menos un día después de checkInDate
        const minCheckOut = new Date(checkIn);
        minCheckOut.setDate(minCheckOut.getDate() + 1);

        if (checkOut < minCheckOut) {
            return res.status(400).json({
                success: false,
                msg: "La fecha de salida debe ser al menos un día después de la fecha de entrada"
            });
        }

        const room = await Room.findById(rid).populate('hotel', 'name');
        if (!room) {
            return res.status(404).json({ success: false, msg: "Room not found" });
        }

        if (room.status === "OCCUPIED") {
            return res.status(400).json({
                success: false,
                msg: "Room is already occupied"
            });
        }

        const reservation = await ReservationRoom.create({
            room: room._id,
            user: user._id,
            checkInDate,
            checkOutDate
        });

        room.status = "OCCUPIED";
        room.user = user._id;
        await room.save();

        res.status(201).json({
            success: true,
            msg: "Reservation created successfully",
            reservation: {
                _id: reservation._id,
                user: {
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    phone: user.phone
                },
                room: {
                    number: room.number,
                    hotel: room.hotel.name,
                    type: room.type
                },
                checkInDate: reservation.checkInDate,
                checkOutDate: reservation.checkOutDate
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error creating reservation",
            error: error.message
        });
    }
};

export const findReservationById = async (req, res) => {
    try {
        const { _id } = req.params;
        const reservation = await ReservationRoom.findById(_id)
            .populate('room', 'number type')
            .populate('user', 'name surname email phone');

        if (!reservation) {
            return res.status(404).json({
                success: false,
                msg: "Reservation not found"
            });
        }

        res.status(200).json({
            success: true,
            reservation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error retrieving reservation",
            error: error.message
        });
    }
}