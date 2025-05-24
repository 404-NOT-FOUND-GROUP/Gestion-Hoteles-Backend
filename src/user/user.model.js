import { Schema, model } from "mongoose";

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname: {
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    password: {
        type: String,
        minLength: [8, "Password must be at least 8 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        minLength: [8, "Phone number must be 8 characters long"],
        maxLength: [8, "Phone number must be 8 characters long"]
    },
    role: {
        type: String,
        enum: ["USER_ROLE", "ADMIN_ROLE", "SOPORT_ROLE"],
        required: [true, "Role is required"],
        default: "USER_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

userSchema.methods.toJSON = function () {
    const { password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

export default model("User", userSchema);