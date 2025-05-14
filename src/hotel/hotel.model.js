import { Schema, model } from "mongoose";

const hotelSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre del hotel se requiere"],
        unique: true,
        maxLength: [50, "El nombre excede los 50 caracteres"]
    },
    address: {
        type: String,
        required: [true, "La direccion se requiere"],
        maxLength: [100, "La direccion excede los 100 caracteres"]
    },
    phone: {
        type: String,
        required: [true, "Se requiere el numero de telefono"],
        minLength: 8,
        maxLength: 15
    },
    description: {
        type: String,
        maxLength: [500, "La descripcion excede los 500 caracteres"]
    },
    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: false
    }
}, {
    versionKey: false,
    timestamps: true
});

hotelSchema.methods.toJSON = function () {
    const { _id, ...hotel } = this.toObject();
    hotel.hid = _id;
    return hotel;
};

export default model("Hotel", hotelSchema);

