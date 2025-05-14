import { Schema, model } from "mongoose";

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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: null
    },
    status: {
        type: String,
        enum: ["OCCUPIED", "AVAILABLE"],
        default: "AVAILABLE"
    }
}, {
    versionKey: false,
    timestamps: true
});

roomSchema.methods.toJSON = function() {
    const { _id, ...room } = this.toObject();
    room.rid = _id;
    return room;
};

export default model("Room", roomSchema);
