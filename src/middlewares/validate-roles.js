export const hasRoles = (...role) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                success: false,
                message: "Se requiere validar el role antes de validar el token"
            })
        }
            
        if (!role.includes(req.usuario.role)) {
            return res.status(401).json({
                success: false,
                message: `Role no autorizado, El recusrso requiere uno de los siguientes roles: ${role}` 
            })            
        }
        next()
    }
}