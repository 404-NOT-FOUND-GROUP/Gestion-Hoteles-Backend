import { Schema, model } from "mongoose";
import { setEventServicesPrice } from "../middlewares/events-middleware.js";

const SERVICES = [
    "Servicio de Meseros",
    "Servicio de Bartender",
    "Servicio de Bouffett",
    "Servicio de Reuniones",
    "Servicio de Fiesta",
    "Servicio de Decoracion",
    "Servicio de Staff"
]

const eventSchema = Schema({
    name:{
        type: String,
        required: [true, "El nombre del evento es obligatorio"],
        maxLength: [100, "El nombre del evento no puede exceder los 100 caracteres"]
    },
    hotel:{
        type: Schema.Types.ObjectId,
        ref: "Hotel",
        required: [true, "El hotel asociado es obligatorio"]
    },
    date:{
        type: Date,
        required: [true, "La fecha del evennto es obligatoria"]
    },
    type:{
        type: String,
        enum: ["CONFERENCE", "MARRIAGE", "MEETING", "PARTY"],
        required: [true, "El tipo de evento es obligatorio"]
    },
    resources:{
        type: [String],
        enum: SERVICES,
        default:[]
    },
        resourcesPrice: {
        type: Number,
        required: false,
        default: 0
    },
    status: {
        type: String,
        enum: ["PROGRAMADO", "CANCELADO"],
        default: "PROGRAMADO"
    }
},{
    versionKey: false,
    timestamps: true
});

setEventServicesPrice(eventSchema);
export default model("Event", eventSchema)