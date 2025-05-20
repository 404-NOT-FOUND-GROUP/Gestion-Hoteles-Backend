import { Schema, model } from "mongoose";

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
        default:[]
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

export default model("Event", eventSchema)