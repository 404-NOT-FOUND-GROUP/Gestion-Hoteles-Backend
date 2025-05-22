import Event from "./event.model.js";

export const createEvent = async (req, res) => {
    try {
        const {name, hotel, date, type, resources, services} = req.body;
        const event = new Event({
            name,
            hotel,
            date,
            type,
            resources,
            services
        });

        await event.save();
        res.status(201).json({
            status: "success",
            message: "Evento creado correctamente",
            event
        });	
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};
 export const updateEvent = async (req, res) => {
    try {
        const {eid} = req.params;
        const data = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(eid, data, { new: true });        if (!updateEvent){
            return res.status(404).json({
                success:false,
                msg: "Evento no encontrado"
            })
        }
        res.status(200).json({
            success: true,
            msg: "Evento actualizado correctamente",
            event: updateEvent
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
 }

 export const deleteEvent = async (req, res) => {
    try {
        const { eid } = req.params;

        const updatedEvent = await Event.findByIdAndUpdate(
            eid,
            { status: "CANCELADO" },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({
                success: false,
                msg: "Evento no encontrado"
            });
        }

        const deletedEvent = await Event.findByIdAndDelete(eid);

        res.status(200).json({
            success: true,
            msg: "Evento cancelado y eliminado correctamente",
            event: deletedEvent
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};