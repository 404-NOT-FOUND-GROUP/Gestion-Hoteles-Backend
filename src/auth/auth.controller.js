import { hash, verify } from "argon2";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js"

export const register = async (req, res) => {
    try {
        const data = req.body;
        const encryptedPassword = await hash(data.password);
        data.password = encryptedPassword;

        const user = await User.create(data);

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ email: email }]
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: "The user or email entered does not exist"
            });
        }

        const validPassword = await verify(user.password, password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: "Incorrect password"
            });
        }

        const token = await generateJWT(user.id);

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        });
    }
};

const AddUserAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN_ROLE" });

        if (adminExists) {
            console.log("The administrator user already exists, another cannot be created");
            return;
        }

        const hashedPassword = await hash("admin123@");

        const userAdmin = new User({
            name: "Super",
            surname: "Admin",
            email: "supadmin@gmail.com",
            password: hashedPassword,
            phone: 12345678,
            role: "ADMIN_ROLE"
        });

        await userAdmin.save();
        console.log("Administrator created successfully");
    } catch (error) {
        console.error("Error verifying or creating the Administrator:", error.message);
    }
};

export const findByEmail = async (req, res) => {
    const { user } = req.body;

    if (!user) {
        return res.status(400).json({
            message: "Debes proporcionar el campo user con el email",
        });
    }

    try {
        const foundUser = await User.findOne({ email: user });

        if (!foundUser) {
            return res.status(404).json({
                message: "User not found",
                error: "The email entered does not exist"
            });
        }

        return res.status(200).json({
            message: "User found",
            userDetails: {
                id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email,
                username: foundUser.username
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error finding the user",
            error: err.message
        });
    }
}

export const updatePasswordById = async (req, res) => {
    const { uid } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: "The user does not exist"
            });
        }

        const hashedPassword = await hash(password);
        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            message: "Password updated successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error updating the password",
            error: err.message
        });
    }
}

export default AddUserAdmin;