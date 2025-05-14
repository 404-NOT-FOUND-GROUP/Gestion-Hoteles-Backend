import Room from "../rooms/rooms.model.js";
import User from "../user/user.model.js";

export const createRoom = async (req, res) => {
    try {
        const { number, type, hotel } = req.body; 

        const room = new Room({ number, type, hotel });
        await room.save();

        const populatedRoom = await Room.findById(room._id).populate('hotel', 'name address'); // "hotel" en minúscula

        res.status(201).json({
            success: true,
            msg: "Room created",
            room: populatedRoom
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error creating room",
            error: error.message
        });
    }
};

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find()
        .populate('hotel', 'name address')
        .populate('user', 'name surname username');
        res.status(200).json({
            success: true,
            msg: "Rooms retrieved",
            rooms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error retrieving rooms",
            error: error.message
        });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const { rid } = req.params;
        const room = await Room.findById(rid)
        .populate('hotel', 'name address')
        .populate('user', 'name surname username');
        if (!room) {
            return res.status(404).json({
                success: false,
                msg: "Room not found"
            });
        }
        res.status(200).json({
            success: true,
            room
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error retrieving room",
            error: error.message
        });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const { rid } = req.params;
        const data = req.body;

        console.log("Room ID:", rid); // Verifica el ID recibido
        console.log("Update Data:", data); // Verifica los datos enviados

        const roomExists = await Room.findById(rid);
        if (!roomExists) {
            return res.status(404).json({
                success: false,
                msg: "Room not found"
            });
        }

        const updatedRoom = await Room.findByIdAndUpdate(rid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: "Room updated",
            room: updatedRoom
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error updating room",
            error: error.message
        });
    }
};
export const deleteRoom = async (req, res) => {
    try {
        const { rid } = req.params;

        const deletedRoom = await Room.findByIdAndDelete(rid);

        if (!deletedRoom) {
            return res.status(404).json({
                success: false,
                msg: "Room not found"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Room deleted",
            room: deletedRoom
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error deleting room",
            error: error.message
        });
    }
};

export const assignRoomToUser = async (req, res) => {
    try {
        const { rid, uid } = req.params;

        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        const room = await Room.findById(rid).populate('hotel', 'name address');
        if (!room) {
            return res.status(404).json({ success: false, msg: "Room not found" });
        }

        if (room.status === "OCCUPIED") {
            return res.status(400).json({
                success: false,
                msg: "Room is already assigned to another user"
            });
        }

        room.user = uid;
        room.status = "OCCUPIED";
        await room.save();

        const populatedRoom = await Room.findById(room._id)
            .populate('hotel', 'name address')
            .populate('user', 'name username phone');

        res.status(200).json({
            success: true,
            msg: "Room assigned to user",
            room: populatedRoom
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error assigning room",
            error: error.message
        });
    }
};

export const freeRoom = async (req, res) => {
    try {
        const { rid } = req.params;

        const room = await Room.findById(rid)
            .populate('hotel', 'name address')
            .populate('user', 'name username phone');

        if (!room) {
            return res.status(404).json({
                success: false,
                msg: "Room not found"
            });
        }

        const previousUser = room.user;

        room.user = null;
        room.status = "AVAILABLE";
        await room.save();

        res.status(200).json({
            success: true,
            msg: "Room freed",
            room: {
                ...room.toObject(),
                previousUser
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error freeing room",
            error: error.message
        });
    }
};