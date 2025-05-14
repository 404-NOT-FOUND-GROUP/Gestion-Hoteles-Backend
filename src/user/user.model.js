import { Schema, model } from "mongoose"

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exced 25 characters"]
    },
    surname: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exced 25 characters"]
    },
    password: {
        type: String,
        minLength: 8
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    phone:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 8
    },
    role: {
        type: String,
        required: true,
        default: "USER_ROLE"
    },
    status:{
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)