import { Schema, model } from "mongoose";
import { setRoomPrice } from "../middlewares/rooms-middleware.js";

const roomSchema = Schema({
    number: {
        type: Number,
        required: [true, "Room number is required"],
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: [false, "Hotel ID is required"]
    },
    type: {
        type: String,
        enum: ["STANDARD", "SUITE", "DELUXE", "PRESIDENTIAL"],
        required: [true, "Tipo de habitacion necesaria"]
    },
    image: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ["OCCUPIED", "AVAILABLE"],
        default: "AVAILABLE"
    },
    price:{
        type: Number,
        required: false,
    }
}, {
    versionKey: false,
    timestamps: true
});

setRoomPrice(roomSchema);

roomSchema.methods.toJSON = function() {
    const { _id, ...room } = this.toObject();
    room.rid = _id;
    return room;
};

export default model("Room", roomSchema);
