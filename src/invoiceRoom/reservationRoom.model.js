import { Schema, model } from "mongoose";

const reservationRoomSchema = Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    checkInDate: {
        type: Date,
        required: [true, "La fecha de entrada es requerida"]
    },
    checkOutDate: {
        type: Date,
        required: [true, "La fecha de salida es requerida"]
    },
}, {
    versionKey: false,
    timestamps: true
});

export default model("ReservationRoom", reservationRoomSchema);