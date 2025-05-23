import { Schema, model } from "mongoose";

const reservationEventSchema = Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
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
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model("ReservationEvent", reservationEventSchema);