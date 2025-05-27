import { hash, verify } from "argon2";
import User from "./user.model.js"

export const getUsers = async (req, res) => {
    try {
        const query = { status: true };

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
        ]);

        return res.status(200).json({
            success: true,
            total,
            users
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error obtaining users",
            error: err.message
        });
    }
};

export const updateUser = async(req, res) =>{
    try{
        const {uid} = req.params;
        const data = req.body;

        const user = await User.findByIdAndUpdate(uid, data, {new: true});

        res.status(200).json({
            success: true,
            msg: "The user has been updated successfully.",
            user
        })
    }catch(err){
        res.status(500).json({
            success: false,
            msg: "Error updating the user",
            error: err.message
        });
    }
}

export const deleteUser = async(req, res) =>{
    try{
        const {uid} = req.params;

        const user = await User.findByIdAndUpdate(uid, {status: false}, {new:true})

        return res.status(200).json({
            success: true,
            message: "The user was removed",
            user
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error deleting the user",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const usuario = req.usuario;
        const { oldPassword, newPassword } = req.body;
 
        const user = await User.findById(usuario._id);
 
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "The current password and the new password are required"
            });
        }
 
        const matchOldPassword = await verify(user.password, oldPassword);
 
        if (!matchOldPassword) {
            return res.status(400).json({
                success: false,
                message: "The current password is not correct"
            });
        }
 
        const matchOldAndNewPassword = await verify(user.password, newPassword);
 
        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "The new password cannot be the same as the previous one"
            });
        }
 
        const encryptedPassword = await hash(newPassword);
 
        await User.findByIdAndUpdate(usuario._id, { password: encryptedPassword }, { new: true });
 
        return res.status(200).json({
            success: true,
            message: "Updated password",
        });
 
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating password",
            error: err.message
        });
    }
};

export const findByUser = async(req, res) =>{
    try{
        const {uid} = req.params;
        const user = await User.findById(uid)

        if(!user){
            return res.status(404).jsons({
                success: false,
                message: "This user does not exist"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error while searching for the user",
            error: err.message
        })
    }
}