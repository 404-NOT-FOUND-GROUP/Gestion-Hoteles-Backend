import ReservationEvent from './reservationEvent.model.js';
import Event from '../events/event.model.js';
import PDFDocument from 'pdfkit';

export const createReservationEvent = async (req, res) => {
    try {
        const { eid } = req.params;
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

        const event = await Event.findById(eid).populate('hotel', 'name');
        if (!event) {
            return res.status(404).json({ success: false, msg: "Event not found" });
        }

        const reservation = await ReservationEvent.create({
            event: event._id,
            user: user._id,
            checkInDate,
            checkOutDate
        });

        res.status(201).json({
            success: true,
            msg: "Event reservation created successfully",
            reservation: {
                _id: reservation._id,
                user: {
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    phone: user.phone
                },
                event: {
                    name: event.name,
                    hotel: event.hotel.name,
                    type: event.type,
                    date: event.date,
                    resources: event.resources,
                    resourcesPrice: event.resourcesPrice
                },
                checkInDate: reservation.checkInDate,
                checkOutDate: reservation.checkOutDate
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error creating event reservation",
            error: error.message
        });
    }
};

// Buscar reservación por ID
export const findReservationEventById = async (req, res) => {
    try {
        const { _id } = req.params;
        const reservation = await ReservationEvent.findById(_id)
            .populate({
                path: 'event',
                populate: { path: 'hotel', select: 'name' }
            })
            .populate('user', 'name surname email phone');

        if (!reservation || reservation.status === false) {
            return res.status(404).json({
                success: false,
                msg: "Reservation not found or has been cancelled"
            });
        }

        res.status(200).json({
            success: true,
            reservation: {
                _id: reservation._id,
                user: reservation.user,
                event: {
                    name: reservation.event.name,
                    hotel: reservation.event.hotel.name,
                    type: reservation.event.type,
                    date: reservation.event.date,
                    resources: reservation.event.resources,
                    resourcesPrice: reservation.event.resourcesPrice
                },
                checkInDate: reservation.checkInDate,
                checkOutDate: reservation.checkOutDate,
                createdAt: reservation.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error retrieving event reservation",
            error: error.message
        });
    }
};

// Generar PDF de reservación
export const generatePDFEventById = async (req, res) => {
    try {
        const { _id } = req.params;
        const reservation = await ReservationEvent.findById(_id)
            .populate({
                path: 'event',
                populate: { path: 'hotel', select: 'name' }
            })
            .populate('user', 'name surname email phone');

        if (!reservation || reservation.status === false) {
            return res.status(404).json({
                success: false,
                msg: "Reservation not found or has been cancelled"
            });
        }

        const doc = new PDFDocument();
        let filename = `Factura_Evento_${reservation._id}.pdf`;
        filename = encodeURIComponent(filename);

        res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-Type', 'application/pdf');

        doc.on('error', (err) => {
            if (!res.headersSent) {
                res.status(500).json({
                    success: false,
                    msg: "Error generating PDF",
                    error: err.message
                });
            }
        });

        doc.pipe(res);

        doc.fontSize(20).text('Factura de Reservación de Evento:', { align: 'center' });
        doc.moveDown();

        doc.fontSize(16).text(`Reservación ID: ${reservation._id}`);
        doc.moveDown();
        doc.text(`Fecha de creación: ${reservation.createdAt.toLocaleString()}`);
        doc.moveDown();
        doc.text(`Evento: ${reservation.event.name}`);
        doc.text(`Hotel: ${reservation.event.hotel.name}`);
        doc.text(`Tipo: ${reservation.event.type}`);
        doc.moveDown();
        doc.text(`Fecha del evento: ${reservation.event.date.toLocaleString()}`);
        doc.text(`Servicios: ${reservation.event.resources.join(', ')}`);
        doc.moveDown();
        doc.text(`Usuario: ${reservation.user.name} ${reservation.user.surname}`);
        doc.text(`Email: ${reservation.user.email}`);
        doc.text(`Teléfono: ${reservation.user.phone}`);
        doc.moveDown();
        doc.moveDown();
        doc.text(`Precio total: Q${reservation.event.resourcesPrice}`, { align: 'center' });
        doc.moveDown();
        doc.text('¡Gracias por reservar su evento!', { align: 'center' });
        doc.text('Esperamos que disfrute su experiencia con nosotros.', { align: 'center' });

        doc.end();
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                msg: "Error generating event reservation PDF",
                error: error.message
            });
        }
    }
};

export const cancelReservationEvent = async (req, res) => {
    try {
        const { _id } = req.params;
        const reservation = await ReservationEvent.findById(_id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                msg: "Reservation not found"
            });
        }

        reservation.status = false;
        await reservation.save();

        res.status(200).json({
            success: true,
            msg: "Event reservation cancelled successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error cancelling event reservation",
            error: error.message
        });
    }
};

export const getListReservationsEventByUser = async (req, res) => {
    try {
        const userId = req.usuario._id;

        const reservations = await ReservationEvent.find({ user: userId, status: { $ne: false } })
            .populate({
                path: 'event',
                populate: { path: 'hotel', select: 'name' }
            });

        if (!reservations || reservations.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "No se encontraron reservaciones para este usuario"
            });
        }

        const result = reservations.map(reservation => ({
            _id: reservation._id,
            event: {
                name: reservation.event.name,
                hotel: reservation.event.hotel.name,
                type: reservation.event.type,
                date: reservation.event.date,
                resources: reservation.event.resources,
                resourcesPrice: reservation.event.resourcesPrice
            },
            checkInDate: reservation.checkInDate,
            checkOutDate: reservation.checkOutDate,
            createdAt: reservation.createdAt
        }));

        res.status(200).json({
            success: true,
            reservations: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener las reservaciones del usuario",
            error: error.message
        });
    }
};