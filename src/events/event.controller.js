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
            message: "Event created successfully",
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
                msg: "Event not found"
            })
        }
        res.status(200).json({
            success: true,
            msg: "Event updated successfully",
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
                msg: "Event not found"
            });
        }

        const deletedEvent = await Event.findByIdAndDelete(eid);

        res.status(200).json({
            success: true,
            msg: "Event canceled and deleted successfully",
            event: deletedEvent
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

export const listEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('hotel', 'name');
        res.status(200).json({
            success: true,
            msg: "List of events",
            events
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error obtaining events",
            error: error.message
        });
    }
};

export const findEventById = async (req, res) => {
    try {
        const { eid } = req.params;
        const event = await Event.findById(eid).populate('hotel', 'name');
        if (!event) {
            return res.status(404).json({
                success: false,
                msg: "Event not found"
            });
        }
        res.status(200).json({
            success: true,
            msg: "Event found",
            event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error while searching for the event",
            error: error.message
        });
    }
};