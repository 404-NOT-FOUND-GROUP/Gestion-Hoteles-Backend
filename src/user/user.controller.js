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
            message: "Error al obtener los usuarios",
            error: err.message
        });
    }
};

export const updateUser = async(req, res) =>{
    try{
        const {id} = req.params;
        const data = req.body;

        const user = await User.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: "El usuario se actualizo correctamente",
            user
        })
    }catch(err){
        res.status(500).json({
            success: false,
            msg: "Error al actualizar el usuario",
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
            message: "Se elimino el usuario",
            user
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
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
                message: "Se requiere la contraseña actual y la nueva contraseña."
            });
        }
 
        const matchOldPassword = await verify(user.password, oldPassword);
 
        if (!matchOldPassword) {
            return res.status(400).json({
                success: false,
                message: "La contraseña actual no es correcta."
            });
        }
 
        const matchOldAndNewPassword = await verify(user.password, newPassword);
 
        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }
 
        const encryptedPassword = await hash(newPassword);
 
        await User.findByIdAndUpdate(usuario._id, { password: encryptedPassword }, { new: true });
 
        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });
 
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
};

export const buscarUsuario = async(req, res) =>{
    try{
        const {id} = req.params;
        const user = await User.findById(id)

        if(!user){
            return res.status(404).jsons({
                success: false,
                message: "Este usuario no existe"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al buscar el usuario",
            error: err.message
        })
    }
}